<template>
  <div v-if="!load">
    <div class="main-content d-flex">
      <h2>Редактирование продукта: {{form.title}}</h2>
    </div>
    <div>
      <b-form @submit.prevent="onSubmit">
        <b-form-group id="input-group-2"  label="Название продукта" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="form.title"
            placeholder="Введите название продукта"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Описание продукта">
          <b-form-textarea
            id="textarea"
            v-model="form.desc"
            placeholder="Введите описание"
            rows="8"
            max-rows="16"
          ></b-form-textarea>
        </b-form-group>
        <b-form-group label="Небольшое описание">
          <b-form-textarea
            id="textarea"
            v-model="form.exception"
            placeholder="Введите описание"
            rows="3"
            max-rows="6"

          ></b-form-textarea>
        </b-form-group>
        <b-form-group id="input-group-2" label="Цена продукта" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="form.price"
            placeholder="Введите цену"
          ></b-form-input>
        </b-form-group>
        <b-input-group class="mt-5">
          <b-form-group label="Код товара" class="mr-3">
            <b-input
              v-model="form.cod"
              placeholder="Код товара"
              class="mr-5"
            ></b-input>
          </b-form-group>
        <b-form-group label="Производитель" class="mr-3">
          <b-input
            v-model="form.manufacturer"
            placeholder="Производитель"
          ></b-input>
        </b-form-group>
        <b-form-group label="Страна" class="mr-3">
          <b-input
            v-model="form.country"
            placeholder="Страна"
            class="mr-5"
          ></b-input>
        </b-form-group>
        <b-form-group label="Форма выпуска" class="mr-3">
          <b-input
            v-model="form.view"
            placeholder="Форма выпуска"
          ></b-input>
        </b-form-group>
        <b-form-group label="Действующие вещества" class="mr-3">
          <b-input
            v-model="form.substance"
            placeholder="Действующие вещества"
            class="mr-5"
          ></b-input>
        </b-form-group>
          <b-form-group label="Отпуск по рецепту" class="mr-3">
            <b-form-select v-model="form.recipe" :options="options"></b-form-select>
          </b-form-group>

        </b-input-group>


        <b-form-group class="mt-5" label="Изоббражение продукта">
          <b-form-file
            @change="onFileChange"
            placeholder="Выберите файл или перетащите сюда..."
            drop-placeholder="Drop file here..."
          ></b-form-file>
          <img v-if="form.image" width="300" :src="img_URL+'storage/uploads/'+form.image" alt="">
        </b-form-group>

        <b-button type="submit" variant="primary">Добавить</b-button>

      </b-form>
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
            form: {
                title: '',
                desc: '',
                price: '',
                image: null,
                cod: '',
                manufacturer: '',
                exception: '',
                country: '',
                view: '',
                substance: '',
                recipe: 'Без рецепта',

            },
            options: [
                { value: 'Без рецепта', text: 'Без рецепта' },
                { value: 'По рецепту', text: 'По рецепту' },
            ],
            img_URL: process.env.img_URL,
            load: true

        }),
        async asyncData({$axios, params, error, redirect}) {
            try {
                const product = await $axios.$get(`/product/${params.id}`)
                return {product: product}
            } catch (e) {
              // console.log(e)
            }
        },
        mounted() {

          Object.keys(this.form).forEach(key => {

              if (this.product.hasOwnProperty(key)) {
                  this.form[key] = this.product[key]
              }
          })
            this.load = false
        },
        methods: {
            onFileChange(e) {

                var files = e.target.files || e.dataTransfer.files;
                if (!files.length) return;

                let data = new FormData();
                data.append('image', files[0]);

                this.$axios.post(`/upload`, data,{
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                    })
                    .then(res => {
                        this.form.image = res.data;
                    })
                    .catch((res) => {
                        console.log(res.response)
                    })
            },
            onSubmit() {
                let data = new FormData();
                data.append('image', this.form.image);
                data.append('title', this.form.title);
                data.append('desc', this.form.desc);
                data.append('price', this.form.price);
                data.append('cod', this.form.cod);
                data.append('manufacturer', this.form.manufacturer);
                data.append('country', this.form.country);
                data.append('exception', this.form.exception);
                data.append('view', this.form.view);
                data.append('substance', this.form.substance);
                data.append('recipe', this.form.recipe);
                data.append('_method', 'put');
                this.$axios.post(`/product/${this.$route.params.id}`, data)
                    .then(res => {
                    console.log(res)
                })
                .catch((res) => {
                    console.log(res.response)
                })


            }
        }

    }
</script>
