<template>
  <div v-if="!load">
    <VueSlickCarousel :arrows="true" :dots="true" :autoplay="true">
      <b-card
        class="none-border"
        overlay
        :img-src="img_URL+'storage/uploads/10093782892574.jpg'"
        img-alt="Card Image"
        text-variant="white"
      >
      </b-card>
      <b-card
        class="none-border"
        overlay
        :img-src="img_URL+'storage/uploads/10058928488478.jpg'"
        img-alt="Card Image"
        text-variant="white"
      >
      </b-card>
      <b-card
        class="none-border"
        overlay
        :img-src="img_URL+'storage/uploads/10037773926430.jpg'"
        img-alt="Card Image"
        text-variant="white"
      >
      </b-card>
      <b-card
        class="none-border"
        overlay
        :img-src="img_URL+'storage/uploads/10078092525598.jpg'"
        img-alt="Card Image"
        text-variant="white"
      >
      </b-card>
    </VueSlickCarousel>

    <div class="container-xl">
      <b-row class="padding-50px">

            <b-card-group deck v-for="(row, index) in formattedClubs">

              <b-card
                v-for="(item,ss) in row"
                class="mb-5 "
                      no-body
                      :key="item.id"
                      :img-src="img_URL+'storage/uploads/'+item.image" img-alt="Card image" img-top>
                <template #header>
                  <nuxt-link :to="{name: 'product.single', params: {slug: item.slug, id: item.id}}">
                    <h6 class="mb-0">{{ item.title }}</h6>
                  </nuxt-link>

                </template>
                <b-card-body>
                  <b-card-text>
                    {{ item.exception }}
                  </b-card-text>
                </b-card-body>
                <b-card-footer>
                  <b-row style="flex-wrap: nowrap">
                    <b-col class="no-wrap">
                      {{ getPrice(item.price) }} руб.
                    </b-col>
                    <b-col class="text-right">

                      <button class="no-wrap" @click.prevent="toCart(item.id)">
                        В корзину
                      </button>

                    </b-col>
                  </b-row>
                </b-card-footer>
                <b-card-text>

                </b-card-text>
              </b-card>
            </b-card-group>
      </b-row>
    </div>
    <div v-if="cart.length" class="cart">
      <nuxt-link :to="{name: 'product.cart', params: {id: $auth.user.id}}">
        <b-icon icon="cart"></b-icon>
        <p>{{cart.length}}</p>
      </nuxt-link>

    </div>

  </div >
  <div class="show-spin" v-else>
    <b-icon icon="star-fill" variant="light" animation="fade" font-scale="4"></b-icon>
  </div>
</template>

<script>
    import VueSlickCarousel from 'vue-slick-carousel'
export default {
    data: () => ({
        items: [],
        img_URL: process.env.img_URL,
        load: true,
        cart: []
    }),
    computed: {
        formattedClubs() {
            if (this.$mq === 'md') {
                return this.items.reduce((c, n, i) => {
                    if (i % 3 === 0) c.push([]);
                    c[c.length - 1].push(n);
                    return c;
                }, []);
            }
            if (this.$mq === 'sm') {
                return this.items.reduce((c, n, i) => {
                    if (i % 2 === 0) c.push([]);
                    c[c.length - 1].push(n);
                    return c;
                }, []);
            }
            if (this.$mq === 'xs') {
                return this.items.reduce((c, n, i) => {
                    if (i % 1 === 0) c.push([]);
                    c[c.length - 1].push(n);
                    return c;
                }, []);
            }
            return this.items.reduce((c, n, i) => {
                if (i % 4 === 0) c.push([]);
                c[c.length - 1].push(n);
                return c;
            }, []);

        },

    },
    methods: {
        getPrice(x) {
            try {
                return x.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
            } catch (e) {

            }
        },
        toCart(id) {
            if(this.$auth.loggedIn) {
                if(contains(this.cart, id)) return;
                function contains(arr, elem) {
                    for (var i = 0; i < arr.length; i++) {
                        if (arr[i] === elem) {
                            return true;
                        }
                    }
                    return false;
                }
                this.cart.push(id)
                localStorage.setItem(this.$auth.user.id, JSON.stringify(this.cart))
                this.$bvToast.toast(`Товар добавлен в корзину`, {
                    title: `Товар добавлен в корзину`,
                    autoHideDelay: 5000

                })
            } else {
                this.$router.push({name: 'login'})
            }

        }
    },
    created() {

        const data = this.$axios.get('/products').then(({data}) => {
            let item = [];
            this.items = data.data
            this.load = false
            if (this.$route.query.message === 'order') {

                this.$bvToast.toast(`Заказ под номером ${this.$route.query.id} оформлен`, {
                    title: `Заказ оформлен`,
                    autoHideDelay: 5000

                })
                this.$router.replace('/')
            }

        }).catch(res => {
            console.log(res.response)
        })
    },
    mounted() {
      if(this.$auth.loggedIn) {
          if (localStorage.getItem(this.$auth.user.id)) {
              try {
                  this.cart = JSON.parse(localStorage.getItem(this.$auth.user.id));
              } catch(e) {
                  localStorage.removeItem(this.$auth.user.id);
              }
          }
      }

    },
    components: { VueSlickCarousel },
}
</script>
<style>
  .cart {
    font-size: 37px;
    position: fixed;
    right: 67px;
    bottom: 67px;
    z-index: 10;
  }
  .no-wrap {
    white-space: nowrap;
  }
  .cart p {
    font-size: 16px;
    width: 26px;
    height: 26px;
    text-align: center;
    background: black;
    color: #fff;
    border-radius: 50%;
    position: absolute;
    top: 6px;
    right: -11px;
  }
  .show-spin {
    background: #17a2b8;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
  }
  .card-deck .card {
    max-width: calc(25% - 30px);
  }

  .none-border {

     border: none!important;

  }
  .slick-track .card-img {
    padding: 0;
  }
.padding-50px {
  padding: 80px 0;
}
.card-img-top {
  padding: 55px;
}
  .slick-prev {
    left: 25px;
    z-index: 12;
  }
  .slick-next {
    right: 50px;
    z-index: 12;
  }
  .slick-prev:before, .slick-next:before {
    font-size: 44px;
  }

  /*.slick-dots li>* {*/
  /*  width: inherit;*/
  /*  height: inherit;*/
  /*  padding: 0;*/
  /*  overflow: hidden;*/
  /*  text-indent: -1000px;*/
  /*  vertical-align: top;*/
  /*  background: #f5f5f5;*/
  /*  cursor: pointer;*/
  /*  border: 2px solid #e84c04;*/
  /*  -moz-border-radius: 0;*/
  /*  -webkit-border-radius: 0;*/
  /*  border-radius: 0;*/
  /*}*/
  .slick-dots li button {
    width: inherit!important;
    height: inherit;
    padding: 0!important;
    overflow: hidden;
    text-indent: -1000px;
    vertical-align: top;
    background: #f5f5f5!important;
    cursor: pointer!important;
    border: 2px solid #e84c04!important;
    -moz-border-radius: 0;
    -webkit-border-radius: 0;
    border-radius: 0;
  }

  .slick-dots li.slick-active>* {
    background: #e84c04!important;
    border-color: #e84c04!important;
    border: 2px solid #fff!important;
  }
  .slick-dots li button:before {
    display: none;
  }

  .slick-dots {
    bottom: 22px;
  }

  @media (min-width: 992px) {
    .container, .container-sm, .container-md, .container-lg {
      max-width: 960px;
    }
  }

  @media (min-width: 768px) {
    .card-deck .card {
      max-width: calc(33% - 30px);
    }
  }

  @media (min-width: 576px) {
    .card-deck .card {
      max-width: calc(50% - 30px);
    }
  }
  @media (max-width: 576px) {
    .card-deck .card {
      max-width: calc(100% - 30px);
    }
    .slick-dots li {
     display: none;
    }
    .card {
      margin-right: 30px;
      margin-left: 30px;
    }
  }
</style>
