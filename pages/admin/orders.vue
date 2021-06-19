<template>
  <div v-if="!load">
    <b-button variant="outline-primary" @click.prevent="reload" class="mb-3 mt-3 ml-auto d-block">Обновить таблицу</b-button>
    <div class="table-responsive">
      <table class="table" width="100%">
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Имя</th>
          <th scope="col">Email</th>
          <th style="white-space: nowrap;" class="text-center" scope="col">Id продукта</th>
          <th style="white-space: nowrap;" class="text-center" scope="col">Общий этог</th>
          <th style="white-space: nowrap;" scope="col" class="text-center">Удалить заказ</th>
        </tr>
        </thead>
        <tbody>
        <tr  v-for="item in items">
          <th scope="row">{{item.id}}</th>
          <td>{{item.name}}</td>
          <td>{{item.email}}</td>
          <td class="text-center">{{item.products_id}}</td>
          <td class="text-center">{{item.total_price}} руб.</td>
          <td class="text-center">

            <b-icon @click.prevent="deleteProduct(item.id)" style="cursor: pointer" class="mr-3" title="удалить из бд" variant="danger" icon="calendar-x-fill" scale="1.2"></b-icon>

          </td>
        </tr>

        </tbody>
      </table>
    </div>

  </div>
  <div v-else class="wrap-spin">
    <b-icon icon="arrow-clockwise" animation="spin-pulse" font-scale="4"></b-icon>

  </div>
</template>
<script>
    export default {
        layout: 'admin',
        data: () => ({
            items: [

            ],
            img_URL: process.env.img_URL,
            load: true
        }),
        methods: {
            deleteProduct(id) {
                if (confirm('Удалить продукт?')) {
                    this.$axios.delete(`/order/${id}`)
                    .then(res => {
                        this.$bvToast.toast(`Заказ под номером ${res.data} удален`, {
                            title: `Заказ удален`,
                            autoHideDelay: 5000,
                            variant: 'danger',

                        })
                    })
                    .catch((res) => {
                        console.log(res.response)
                        this.load = false
                    })

                }
            },
            reload() {
                this.load = true
                const data = this.$axios.get('/orders').then((data) => {
                    this.items = data.data
                    this.load = false
                }).catch(res => {
                    console.log(res.response)
                    this.load = false
                })
            }
        },
        created() {

            const data = this.$axios.get('/orders').then((data) => {
                this.items = data.data
                console.log(this.items)
                this.load = false
            }).catch(res => {
                console.log(res.response)
                this.load = false
            })


        }
    }
</script>
