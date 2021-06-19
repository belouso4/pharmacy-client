<template>
  <div v-if="!load" class="padding-50px">
    <b-container>
      <div style="position:relative;">
        <div class="table-responsive">
          <table :class="[{'spinner': spinner},'table']">
            <thead>
            <tr>
              <th scope="col" class="display-none-td">Название</th>
              <th scope="col" class="text-center">Изображение</th>
              <th scope="col" class="text-center">Цена</th>
              <th scope="col" class="text-center">Колличество</th>
              <th scope="col" class="text-center">Удалить</th>
            </tr>
            </thead>
            <tbody>

            <tr v-for="item in carts" :key="item.id">
              <td class="display-none-td">
                <nuxt-link class="no-wram-sm" :to="{name: 'product.single', params: {slug: item.slug, id: item.id}}">
                  {{ item.title }}
                </nuxt-link>

              </td>
              <td class="text-center">
                <nuxt-link :to="{name: 'product.single', params: {slug: item.slug, id: item.id}}">
                  <img width="100" :src="img_URL+'storage/uploads/'+item.image" alt="">
                </nuxt-link>
              </td>
              <td class="text-center">{{ item.price }}</td>
              <td class="text-center"><b-form-spinbutton inline id="demo-sb" v-model="item.quantity" min="1" max="100"></b-form-spinbutton></td>
              <td class="text-center">
                <b-icon @click.prevent="deleteCart(item.id)" style="cursor: pointer" title="удалить из бд" variant="danger" icon="calendar-x-fill" scale="1.2"></b-icon>
              </td>
            </tr>

            </tbody>
          </table>
        </div>


          <b-spinner v-if="spinner" type="grow" label="Loading..."></b-spinner>

      </div>


      <table style="max-width: 400px;width: 100%;margin-left: auto;" class="table mt-5">
        <thead>
        <tr>
          <th scope="col">Название</th>
          <th scope="col">Цена</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <th scope="col">общая цена:</th>
          <td>{{ total }} руб</td>

        </tr>
        <tr>
          <th scope="col">скидка:</th>
          <td>5%</td>

        </tr>
        <tr>
          <th scope="col">цена со скидкой:</th>
          <td>{{ sale }} руб</td>

        </tr>
        <tr>
          <th scope="col">итого:</th>
          <td>{{sale ? sale : total}} руб</td>

        </tr>

        </tbody>
      </table>
      <b-button @click.prevent="sendOrder" block class="mt-5">
        Оформить заказ
      </b-button>
    </b-container>

  </div>
  <div class="show-spin" v-else>
    <b-icon icon="star-fill" variant="light" animation="fade" font-scale="4"></b-icon>
  </div>
</template>

<script>

    export default {
        data: () => ({
            spinner: false,
            carts: [],
            value: 1,
            load: true,
            img_URL: process.env.img_URL,
            cart: []
            // total: 0
        }),

        computed: {
            total() {
                let total = 0
                if (this.carts.length > 1) {
                    this.carts.forEach(res => {
                        total += res.price.replace(/\s/g, '') * res.quantity
                    })
                    return total
                }
                total += this.carts.price.replace(/\s/g, '') * this.carts.quantity
                return total
            },
            sale() {
                return Math.floor(this.total - (this.total / 100 * 5))
            },
        },
        mounted() {
            this.fetchProduct()

        },
        methods: {
            async fetchProduct(x = 'load') {
                try {
                    let id = JSON.parse(localStorage.getItem(this.$auth.user.id))


                    if (id.length) {
                        const product = await this.$axios.get(`/product/${id}`)

                        if (product.data.length > 1) {
                            this.carts = product.data
                            x === 'load' ?  this.load = false : this.spinner = false
                            return
                        }
                        this.carts = []
                        this.carts.push(product.data)

                    } else {
                        this.$router.push({name: 'index'})
                    }

                    x === 'load' ?  this.load = false : this.spinner = false

                } catch (e) {
                    console.log(e)
                    this.load = false
                    this.spinner = false
                }
            },
            deleteCart(id) {
                if (localStorage.getItem(this.$auth.user.id)) {
                    try {
                        this.cart = JSON.parse(localStorage.getItem(this.$auth.user.id));

                        const index = this.cart.indexOf(id);
                        console.log(this.cart)
                        if (index > -1) {
                            this.cart.splice(index, 1);
                        }
                        console.log(this.cart)
                        this.saveCats();
                    } catch(e) {
                        localStorage.removeItem(this.$auth.user.id);
                    }
                }
            },
            saveCats() {
                this.spinner = true
                const parsed = JSON.stringify(this.cart);
                localStorage.setItem(this.$auth.user.id, parsed);
                this.fetchProduct('spinner')
            },
            sendOrder() {
                this.load = true
                let data = new FormData();
                data.append('user_id', this.$auth.user.id);
                data.append('products_id', JSON.parse(localStorage.getItem(this.$auth.user.id)))
                data.append('total_price', this.sale)

                this.$axios.post('/create/order', data, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(res => {

                    localStorage.removeItem(this.$auth.user.id);
                    this.$router.push(`/?message=order&id=${res.data.id}`)
                })
                    .catch((res) => {
                        this.load = false
                        console.log(res.response)
                    })

            }
        }
    }
</script>
<style>
  .spinner-grow {
    position: absolute;
    top: 50%;
    right: 50%;
  }
  .spinner {
    opacity: 0.2;
    position: relative;
  }
  table td {
    vertical-align: middle!important;
  }
  .row-center {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media (max-width: 768px) {
    .card-deck .card {
      max-width: calc(33% - 30px);
    }
    .display-none-td {
      display: none;
    }

  }
</style>
