import Vue from 'vue'
import VueMq from 'vue-mq'

Vue.use(VueMq, {
  breakpoints: { // default breakpoints - customize this
    xs: 576,
    es: 576,
    sm: 768,
    md: 992,
    lg: 1140,
  },
  defaultBreakpoint: 'sm' // customize this for SSR
})

