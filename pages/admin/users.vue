<template>
  <div v-if="!load">
    <div class="table-responsive">
      <table class="table">
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Имя</th>
          <th scope="col">Роль</th>
          <th scope="col">Email</th>
          <th class="text-center" scope="col">Действие</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in items" :key="item.id">
          <th scope="row">{{ item.id }}</th>
          <td>{{ item.name }}</td>
          <td>{{ item.role ? item.role : 'user'}}</td>
          <td>{{ item.email }}</td>
          <td class="text-center">

            <b-icon style="cursor: pointer" @click.prevent="deleteProduct(item.id)" class="mr-3" title="удалить из бд" variant="danger" icon="calendar-x-fill" scale="1.2"></b-icon>

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
            items: [],
            img_URL: process.env.img_URL,
            load: true
        }),
        methods: {
            deleteProduct(id) {
                if (confirm('Удалить продукт?')) {
                    this.load = true
                    this.$axios.delete(`/user/${id}`)
                        .then(res => {
                            console.log(res)
                            const data = this.$axios.get('/users').then(({data}) => {
                                let item = [];
                                this.items = data.data
                                this.load = false

                            }).catch(res => {
                                console.log(res.response)
                                this.load = false
                            })
                        })
                        .catch((res) => {
                            console.log(res.response)
                            this.load = false
                        })
                }

            }
        },
        created() {

            const data = this.$axios.get('/users').then(({data}) => {
                let item = [];
                this.items = data.data
                this.load = false
            }).catch(res => {
                console.log(res.response)
                this.load = false
            })


        }
    }
</script>
