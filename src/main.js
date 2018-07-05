import Vue from 'vue'
import router from "./router/index";
import http from "./helper/http.js";
import util from "./helper/util.js";

Vue.prototype.http = http;
Vue.prototype.util = util;

router.beforeEach((to, from, next) => {
  let is_logged_in = logged_in();
  let going_admin_page = /^\/admin/.test(to.fullPath);

  if (going_admin_page) {
      if (is_logged_in)
          next();
      else
          router.push('/login');
  } else {
      next();
  }
});

function logged_in() {
  return !!localStorage.getItem('logged_in');
}

new Vue({
    router,
  }).$mount('#app')