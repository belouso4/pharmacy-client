import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const page = path => () => import(`~/pages/${path}`).then(m => m.default || m)

const routes = [
  {path: '/', name: 'index', component: page('index.vue')},
  {path: '/login', name: 'login', component: page('auth/login.vue')},
  {path: '/register', name: 'register', component: page('auth/register.vue')},
  {path: '/admin/home', name: 'admin.home', component: page('admin/home.vue')},
  {path: '/admin/pharmacy/all', name: 'admin.pharmacy.all', component: page('admin/products.vue')},
  {path: '/admin/pharmacy/create', name: 'admin.pharmacy.create', component: page('admin/product-create.vue')},
  {path: '/admin/pharmacy/edit/:id', name: 'admin.pharmacy.edit', component: page('admin/product-edit.vue')},
  {path: '/admin/user/all', name: 'admin.user.all', component: page('admin/users.vue')},
  {path: '/single/:slug/:id', name: 'product.single', component: page('single.vue')},
  {path: '/cart/:id', name: 'product.cart', component: page('cart.vue')},
  {path: '/admin/orders', name: 'admin.orders', component: page('admin/orders.vue')},
];

export function createRouter() {
  return new Router({
    routes,
    mode: 'history'
  })
}
