<template>
  <div>
    <b-navbar toggleable="sm" type="light" variant="secondary">
      <div :class="[{'wrap-admin': show,'container-admin': !show}, 'wrap','admin-nav'] ">
<!--        <b-navbar-toggle target="nav-text-collapse" ></b-navbar-toggle>-->
        <b-row class="align-items-center" style="flex-wrap: nowrap">
          <b-icon class="mr-3" variant="light" v-b-toggle:sidebar-variant icon="bar-chart-fill" scale="1.2"></b-icon>
          <nuxt-link :to="{name: 'admin.home'}">
            <b-navbar-brand style="color: #fff">Админ-панель</b-navbar-brand>
          </nuxt-link>
        </b-row>

        <b-navbar-nav>

          <nuxt-link class="color-link" v-if="!$auth.loggedIn" custom :to="{name: 'register'}" v-slot="{ href, navigate}">
            <b-nav-item :href="href" @click="navigate">Регистрация</b-nav-item>
          </nuxt-link>
          <nuxt-link class="color-link" v-if="!$auth.loggedIn" custom :to="{name: 'login'}" v-slot="{ href, navigate}">
            <b-nav-item :href="href" @click="navigate">Авторизация</b-nav-item>
          </nuxt-link>
          <nuxt-link class="color-link" custom :to="{name: 'index'}" v-slot="{ href, navigate}">
            <b-nav-item :href="href" @click="navigate">сайт</b-nav-item>
          </nuxt-link>
          <b-nav-item v-if="$auth.loggedIn" class="color-link" href="#" @click.prevent="logout">выйти</b-nav-item>



        </b-navbar-nav>
      </div>
    </b-navbar>

    <b-sidebar :no-close-on-route-change="true"  id="sidebar-variant" title="Аптека" v-model="show" bg-variant="dark" text-variant="light" shadow>
      <div class="px-3 py-2">

        <b-nav vertical>
          <nuxt-link class="color-link nav-block" custom :to="{name: 'index'}" v-slot="{ href, navigate}">
            <b-nav-item :href="href" @click="navigate">Cайт</b-nav-item>
          </nuxt-link>
          <nuxt-link custom :to="{name: 'admin.pharmacy.all'}" v-slot="{ href, navigate}">
            <b-nav-item :href="href" @click="navigate">
                 <span class="color-link" >
                  Все лекарства
                  </span>
            </b-nav-item>
          </nuxt-link>
          <nuxt-link custom :to="{name: 'admin.pharmacy.create'}" v-slot="{ href, navigate}">
            <b-nav-item :href="href" @click="navigate">
                 <span class="color-link" >
                  Добавить лекарства
                  </span>
            </b-nav-item>
          </nuxt-link>
          <nuxt-link disabled custom :to="{name: 'admin.user.all'}" v-slot="{ href, navigate}">
            <b-nav-item :href="href" @click="navigate">
                 <span class="color-link" >
                    Пользователи
                  </span>
            </b-nav-item>
          </nuxt-link>
          <nuxt-link disabled custom :to="{name: 'admin.orders'}" v-slot="{ href, navigate}">
            <b-nav-item :href="href" @click="navigate">
                 <span class="color-link" >
                    Заказы
                  </span>
            </b-nav-item>
          </nuxt-link>
        </b-nav>
        <b-nav class="nav-block">
          <nuxt-link class="color-link" v-if="!$auth.loggedIn" custom :to="{name: 'register'}" v-slot="{ href, navigate}">
            <b-nav-item :href="href" @click="navigate">Регистрация</b-nav-item>
          </nuxt-link>
          <nuxt-link class="color-link" v-if="!$auth.loggedIn" custom :to="{name: 'login'}" v-slot="{ href, navigate}">
            <b-nav-item :href="href" @click="navigate">Авторизация</b-nav-item>
          </nuxt-link>

          <b-nav-item v-if="$auth.loggedIn" class="color-link" href="#" @click.prevent="logout">выйти</b-nav-item>
        </b-nav>
      </div>
    </b-sidebar>
    <div :class="[{'wrap-admin': show,'container-admin': !show}, 'wrap']">
      <Nuxt />
    </div>

  </div>
</template>
<script>
    import { VBToggle } from 'bootstrap-vue'
    export default {
        data: () => ({
            show: false,
            window: null,
            document: null
        }),
        watch: {
            show: function(e) {
                if (e) {
                    this.document.querySelector('body').classList.add('overflow-hidden-admin')
                    this.document.querySelector('#__layout').classList.add('overflow-hidden-admin')
                    return
                }
                this.document.querySelector('body').classList.remove('overflow-hidden-admin')
                this.document.querySelector('#__layout').classList.remove('overflow-hidden-admin')
            }
        },
        methods: {
            logout() {
                this.$auth.logout()
            },
            hide() {

            },
            onResize() {
                if (window.innerWidth < 1000){ //some code }

                    this.show =false
                }
                if (window.innerWidth > 1000){ //some code }

                    this.show = true
                }

            }
        },
        created() {

        },
        mounted: function () {
            this.document = document
            this.$nextTick(function () {
                this.onResize();
            })
            window.addEventListener('resize', this.onResize)
        },

        components: {
            VBToggle
        },
        destroyed() {
            this.document.querySelector('body').classList.remove('overflow-hidden-admin')
            this.document.querySelector('#__layout').classList.remove('overflow-hidden-admin')
        }

    }
</script>

<style>
  .wrap-spin {
    position: absolute;
    left: 50%;
    right: 0;
    top: 300px;
    bottom: 0;
    z-index: 9999;
  }

  .container-admin {
    padding: 0 30px;
    position: relative;
  }
  .main-content {
    margin-bottom: 30px;
    margin-top: 30px;
  }
  div#sidebar-variant {
    transition: all 0.4s ease-in-out!important;
  }
  .wrap {
    transition: all 0.4s ease-in-out;
  }
  .admin-nav {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }
  .wrap-admin {
    margin-left: 320px;
    position: relative;
    padding: 0 29px;

  }
  button.collapsed-custom {
    border:none
  }
  button.collapsed-custom:hover {
    background-color: transparent;
    border:none;

  }
  button.collapsed-custom:focus {
    outline: none;
    background-color: transparent;
    border:none;
    box-shadow: none!important;
  }
  button.collapsed-custom:active {
    outline: none;
    background-color: transparent!important;;
    border:none;
    box-shadow: none!important;;
  }
  svg.text-light {
    cursor: pointer;
  }
  svg.text-light:focus {
    outline: none;
  }
  .color-link {
    color: #fff;
  }
  .color-link:hover {
    color: #9a9a9a;
  }
  .color-link .nav-link {
    color: #fff!important;
  }
  .color-link .nav-link:hover {
    color: #d1d1d1!important;;
  }

  #collapse-2 span {
    margin-left: 10px;
  }
  /*.overflow-hidden-admin {*/
  /*  overflow: hidden;*/
  /*}*/

  .navbar.bg-secondary {
    position: sticky;
    left: 0;
    right: 0;
    top: 0;
    z-index: 1000;
  }

  .wrap-admin form {
    padding-bottom: 40px;
  }

  /*320px-576px*/
  @media screen and (min-width: 576px) {
.nav-block {
  display: none;
}

  }
  /*320px-576px*/
  @media screen and (max-width: 576px) {
.nav-block {
  display: block;
}

  .admin-nav .navbar-nav {
    display: none;
  }
  }
</style>
