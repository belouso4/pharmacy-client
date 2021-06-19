<template>
    <b-container>
      <b-row>
        <b-col class="mx-auto mt-5 col-lg-5 col-sm-7 col-fluid" >
          <b-card>
            <h4 class="text-center mb-3">Регистрация</h4>
            <b-form @submit.prevent="onSubmit">
              <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
                <b-form-input
                  id="input-2"
                  v-model="form.name"
                  placeholder="Enter name"
                  :class="{ 'is-invalid': form.errors.has('name') }"
                ></b-form-input>
                <has-error :form="form" field="name"></has-error>
              </b-form-group>

              <b-form-group
                id="input-group-1"
                label="Email address:"
                label-for="input-1"
              >
                <b-form-input
                  id="input-1"
                  v-model="form.email"
                  type="text"
                  :class="{ 'is-invalid': form.errors.has('email') }"
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

              <b-form-group id="input-group-3" label="password:" label-for="input-3">
                <b-form-input
                  id="input-3"
                  v-model="form.password_confirmation"
                  placeholder="Enter password"

                > </b-form-input>
              </b-form-group>
              <b-button :disabled="form.busy" type="submit" variant="primary">Submit</b-button>

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
                    name: '',
                    password: '',
                    password_confirmation: '',
                })
            }
        },
        methods: {
            onSubmit(event) {
                this.form.post('/register', this.form).then(res => {
                    this.$auth.login({data: this.form})

                })
                    .catch((res) => {
                        console.log(res.response)
                })





            },
        }
    }
</script>
