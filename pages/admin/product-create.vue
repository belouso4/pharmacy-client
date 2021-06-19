<template>
  <div>
      <div class="main-content d-flex">
        <h2>Создание нового продукта</h2>
      </div>
      <div>
        <b-form @submit.prevent="onSubmit">
          <b-form-group id="input-group-2"  label="Название продукта" label-for="input-2">
            <b-form-input
              id="input-2"
              v-model="title"
              placeholder="Введите название продукта"
            ></b-form-input>
          </b-form-group>
          <b-form-group label="Описание продукта">
            <b-form-textarea
              id="textarea"
              v-model="desc"
              placeholder="Введите описание"
              rows="8"
              max-rows="16"

            ></b-form-textarea>
          </b-form-group>
          <b-form-group label="Небольшое описание">
            <b-form-textarea
              id="textarea"
              v-model="exception"
              placeholder="Введите описание"
              rows="3"
              max-rows="6"

            ></b-form-textarea>
          </b-form-group>
          <b-form-group id="input-group-2" label="Цена продукта" label-for="input-2">
            <b-form-input
              id="input-2"
              v-model="price"
              placeholder="Введите цену"
            ></b-form-input>
          </b-form-group>


              <b-input-group class="mt-5">
                <b-form-group label="Код товара" class="mr-3">
                  <b-input
                    v-model="cod"
                    placeholder="Код товара"
                    class="mr-5"
                  ></b-input>
                </b-form-group>
                <b-form-group label="Производитель" class="mr-3">
                  <b-input
                    v-model="manufacturer"
                    placeholder="Производитель"
                  ></b-input>
                </b-form-group>
                <b-form-group label="Страна" class="mr-3">
                  <b-input
                    v-model="country"
                    placeholder="Страна"
                    class="mr-5"
                  ></b-input>
                </b-form-group>
                <b-form-group label="Форма выпуска" class="mr-3">
                  <b-input
                    v-model="view"
                    placeholder="Форма выпуска"
                  ></b-input>
                </b-form-group>
                <b-form-group label="Действующие вещества" class="mr-3">
                  <b-input
                    v-model="substance"
                    placeholder="Действующие вещества"
                    class="mr-5"
                  ></b-input>
                </b-form-group>
                <b-form-group label="Отпуск по рецепту" class="mr-3">
                  <b-form-select v-model="recipe" :options="options"></b-form-select>
                </b-form-group>

              </b-input-group>

          <b-form-group class="mt-5" label="Изоббражение продукта">
            <b-form-file
              @change="onFileChange"
              placeholder="Выберите файл или перетащите сюда..."
              drop-placeholder="Drop file here..."
            ></b-form-file>
            <img v-if="image" width="300" :src="img_URL+'storage/uploads/'+image" alt="">
          </b-form-group>

          <b-button type="submit" variant="primary">Добавить</b-button>

        </b-form>
      </div>
  </div>
</template>
<script>
    export default {
        layout: 'admin',
        data: () => ({
            img_URL: process.env.img_URL,
            title: '',
            desc: '',
            price: '',
            image: null,
            cod: '',
            manufacturer: '',
            country: '',
            view: '',
            substance: '',
            exception: '',
            recipe: 'Без рецепта',
            options: [
                { value: 'Без рецепта', text: 'Без рецепта' },
                { value: 'По рецепту', text: 'По рецепту' },
            ]

        }),
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
                        console.log(res)
                        this.image = res.data;
                    })
                    .catch((res) => {
                        console.log(res.response)
                    })
            },
            onSubmit() {
                let data = new FormData();
                data.append('image', this.image);
                data.append('title', this.title);
                data.append('desc', this.desc);
                data.append('price', this.price);
                data.append('cod', this.cod);
                data.append('manufacturer', this.manufacturer);
                data.append('country', this.country);
                data.append('exception', this.exception);
                data.append('view', this.view);
                data.append('substance', this.substance);
                data.append('recipe', this.recipe);


                this.$axios.post('/create', data, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(res => {
                    this.$bvToast.toast(`Товар добавлен`, {
                        title: `Товар добавлен`,
                        autoHideDelay: 5000,
                        variant: "success",

                    })
                    this.image = null
                    this.title = ''
                    this.desc = ''
                    this.price = ''
                    this.manufacturer = ''
                    this.cod = ''
                    this.country = ''
                    this.exception = ''
                    this.view = ''
                    this.substance = ''
                    this.$router.push({name: 'admin.pharmacy.all'})
                })
                .catch((res) => {
                    console.log(res.response)
                })


            }
        }

    }
</script>
