import './sass/app.scss'
import 'bootstrap'
import 'slick-carousel'
import sweetalert2 from 'sweetalert2'

import Vue from 'vue'

import App from './App.vue'
import router from './router'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

window.swal = sweetalert2;

(function ($) {
  $('.slider').not('.slick-initialized').removeAttr('hidden').slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1
  })

  $('button.sweet').click(() => {
    window.swal({
      title: 'Yo!',
      text: 'Yeaaah!',
      type: 'success',
      confirmButtonText: 'Cool'
    })
  })
})(jQuery)
