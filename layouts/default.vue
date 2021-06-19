<template>
  <div>
    <b-navbar toggleable="sm" type="light" variant="info">
      <b-container>
        <b-navbar-toggle target="navbar-toggle-collapse"></b-navbar-toggle>
        <nuxt-link :to="{name: 'index'}">
          <b-navbar-brand style="color: white;font-size: 1.75rem;">Аптека</b-navbar-brand>
        </nuxt-link>
        <b-collapse id="navbar-toggle-collapse"  is-nav>
          <b-navbar-nav id="navbar-toggle-collapse" class="ml-auto">
            <nuxt-link class="color-link" v-if="!$auth.loggedIn" custom :to="{name: 'register'}" v-slot="{ href, navigate}">
              <b-nav-item :href="href" @click="navigate">Регистрация</b-nav-item>
            </nuxt-link>
            <nuxt-link class="color-link" v-if="!$auth.loggedIn" custom :to="{name: 'login'}" v-slot="{ href, navigate}">
              <b-nav-item :href="href" @click="navigate">Авторизация</b-nav-item>
            </nuxt-link>
            <nuxt-link class="color-link" v-if="$auth.loggedIn" custom to="/admin/home" v-slot="{ href, navigate}">
              <b-nav-item :href="href" @click="navigate">админ</b-nav-item>
            </nuxt-link>
            <b-nav-item class="color-link" v-if="$auth.loggedIn" href="#" @click.prevent="logout">выйти</b-nav-item>
          </b-navbar-nav>





        </b-collapse>


      </b-container>


    </b-navbar>

    <Nuxt />

    <footer :class="getStyle()">
      <b-navbar toggleable="sm" type="light" variant="info">
        <b-container>
          <nuxt-link :to="{name: 'index'}">
            <b-navbar-brand style="color: white;font-size: 1.75rem;">Аптека</b-navbar-brand>
          </nuxt-link>
          <b-navbar-nav>

            <nuxt-link class="color-link" v-if="!$auth.loggedIn" custom :to="{name: 'register'}" v-slot="{ href, navigate}">
              <b-nav-item :href="href" @click="navigate">Регистрация</b-nav-item>
            </nuxt-link>
            <nuxt-link class="color-link" v-if="!$auth.loggedIn" custom :to="{name: 'login'}" v-slot="{ href, navigate}">
              <b-nav-item :href="href" @click="navigate">Авторизация</b-nav-item>
            </nuxt-link>
            <nuxt-link class="color-link" v-if="$auth.loggedIn" custom to="/admin/home" v-slot="{ href, navigate}">
              <b-nav-item :href="href" @click="navigate">админ</b-nav-item>
            </nuxt-link>
            <b-nav-item class="color-link" v-if="$auth.loggedIn" href="#" @click.prevent="logout">выйти</b-nav-item>

          </b-navbar-nav>
        </b-container>


      </b-navbar>
    </footer>

  </div>
</template>
<script>
  export default {
      methods: {
          logout() {
              this.$auth.logout()
          },
          getStyle() {
              if (this.$route.name === 'login' || this.$route.name === 'register') {
                  return 'fixed-footer'
              }
              return
          }
      },
  }
</script>
<style>
  .fixed-footer {
    left: 0;
    right: 0;
    bottom: 0;
    position: fixed;

  }
</style>
