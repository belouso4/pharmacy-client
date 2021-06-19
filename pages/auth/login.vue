<template>
  <b-container>
    <b-row>
      <b-col class="mx-auto mt-5 col-lg-5 col-sm-7 col-fluid" >
        <b-card>
          <h4 class="text-center mb-3">Авторизация</h4>
          <b-form @submit.prevent="onSubmit">
      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.email"
          :class="{ 'is-invalid': form.errors.has('email') }"
          type="text"
          placeholder="Enter email"
        ></b-form-input>
        <has-error :form="form" field="email"></has-error>
      </b-form-group>



      <b-form-group id="input-group-3" label="password:" label-for="input-3">
        <b-form-input
          id="input-3"
          v-model="form.password"
          placeholder="Enter password"
          :class="{ 'is-invalid': form.errors.has('password') }"
        > </b-form-input>
        <has-error :form="form" field="password"></has-error>
      </b-form-group>
      <b-button type="submit" variant="primary">Submit</b-button>
<!--      <nuxt-link to="/register" v-slot="{ href, route, navigate, isActive, isExactActive }">-->
<!--        <b-nav-item :href="href" @click="navigate">Регистрация</b-nav-item>-->
<!--      </nuxt-link>-->
    </b-form>
    </b-card>
    </b-col>
    </b-row>


  </b-container>


</template>

<script>
    export default {
        data() {
            return {
                form: this.$vform({
                    email: '',
                    password: '',
                })
            }
        },
        methods: {
            onSubmit(event) {
                this.$auth.loginWith('local', {
                    data: this.form
                }).then(res => {
                    this.$router.push({name:'index'})
                }).catch(res => {
                    console.log(res.response)
                })

                // this.$auth.login({data: this.form})

                //

            },
        }
    }
</script>
