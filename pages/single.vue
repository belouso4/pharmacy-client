<template>
  <div v-if="!load" class="padding-single">
    <b-container>
      <h1 class="mb-5">{{product.title}}</h1>
      <b-row>
        <b-col>
          <b-img style="margin: 0 auto;display: block;" :src="img_URL+'storage/uploads/'+product.image" fluid alt="Fluid image"></b-img>

        </b-col>
        <b-col>
          <b-list-group>
            <b-list-group-item>Код товара: <strong>{{product.cod}}</strong></b-list-group-item>
            <b-list-group-item>Производитель: <strong>{{product.manufacturer}}</strong></b-list-group-item>
            <b-list-group-item>Страна происхождения: <strong>{{product.country}}</strong></b-list-group-item>
            <b-list-group-item>Форма выпуска: <strong>{{product.view}}</strong></b-list-group-item>
            <b-list-group-item>Действующие вещества: <strong>{{product.substance}}</strong></b-list-group-item>
            <b-list-group-item>Отпуск по рецепту: <strong>{{product.recipe}}</strong></b-list-group-item>
          </b-list-group>
          <b-row class="mt-5 align-items-center">
            <b-col class="text-center">
              <h4 class="mr-5 no-wrap">Цена: {{product.price}} руб.</h4>
            </b-col>
            <b-col class="text-center">
              <button @click.prevent="toCart(product.id)">
                <h4>В корзину</h4>

              </button>


            </b-col>


          </b-row>
        </b-col>
      </b-row>
      <h3 class="mb-3 mt-4">Описание</h3>
      <div class="desc" v-html="product.desc">

      </div>
      <h3 class="mb-4 mt-5">Рекомендованные</h3>
      {{slider.length}}
      <VueSlickCarousel v-if="slider" :arrows="false" :dots="true" :slidesToShow="3">
        <b-card
          v-for="item in slider" :key="item.id"
          class="none-border"
          overlay
          :img-src="img_URL+'storage/uploads/'+item.image"
          img-alt="Card Image"
          text-variant="white"
        >
        </b-card>
        <div style="display: none">

        </div>
        <div style="display: none">

        </div>
        <div style="display: none">

        </div>
        <div style="display: none">

        </div>


      </VueSlickCarousel>

    </b-container>
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
    // optional style for arrows & dots
    export default {
        data: () => ({
            items: {
                desc: "eeeeeedfvwefwef",
                id: 1,
                image: "1619129659_Snimok_ekrana_(28)_LI_jpg",
                price: "1111favfweefwf",
                slug: "eeeeeeeeeefdv",
                title: "eeeeeeeeeefdv",
            },
            img_URL: process.env.img_URL,
            load: true,
            cart: [],
            slider: []
        }),
        methods: {
            randomFiveNumber(min, max) {
                let stringNumber = ''
                for (let i = 0; i < 5; i++) {

                    stringNumber += getRandomInt(min,max)+','
                }

                function getRandomInt(min, max) {
                    min = Math.ceil(min);
                    max = Math.floor(max);
                    let number = Math.floor(Math.random() * (max - min)) + min
                    if (stringNumber.includes(number)) {
                        return getRandomInt(min, max)
                    }

                    return number;
                }
                return stringNumber.replace(/,\s*$/, "")

            },
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
        components: { VueSlickCarousel },
        async asyncData({$axios, params, error, redirect}) {
            try {
                const product = await $axios.$get(`/product/${params.id}`)

                return {product: product}
            } catch (e) {
                console.log(e)
            }
        },
        async mounted() {
            if(this.$auth.loggedIn) {
                if (localStorage.getItem(this.$auth.user.id)) {
                    try {
                        this.cart = JSON.parse(localStorage.getItem(this.$auth.user.id));
                    } catch(e) {
                        localStorage.removeItem(this.$auth.user.id);
                    }
                }
            }
            try {
                const products = await this.$axios.get(`/products`)
                let data = products.data.data
                let array = this.randomFiveNumber(0,data.length).split(',')
                let slider = []
                for (var indexs in array) {    // вообще-то, не стоит так делать
                    slider.push(data[array[indexs]])

                }
                this.slider = slider

            } catch (e) {
                console.log(e)
            }
        },
        created() {
            this.load = false
        }

    }
</script>
<style>
/*.no-wrap {*/
/*  white-space: nowrap;*/
/*}*/
  .desc > div {
    margin-bottom: 20px;
  }
.card-img {
  padding: 60px;
}
.padding-single {
  padding: 50px 0;
}
.slick-cloned[data-index="5"], .slick-cloned[data-index="6"],
.slick-cloned[data-index="7"],.slick-cloned[data-index="8"],
.slick-cloned[data-index="-1"],.slick-cloned[data-index="-2"],
.slick-cloned[data-index="-3"] {
  display: none!important;
  width: 0;
}



  @media (max-width: 992px) {
    h4 {
      font-size: 18px;
    }
  }



  @media (max-width: 768px) {
   .padding-single .container > .row {
     flex-direction: column;
   }
    h1 {
      font-size: 30px;
    }
  }

  @media (min-width: 576px) {
    .card-deck .card {
      max-width: calc(50% - 30px);
    }
  }
  @media (max-width: 576px) {
   .img-fluid {
     padding: 38px;
   }
    .card-img {
      padding: 26px;
    }
  }
</style>
