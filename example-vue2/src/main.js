import Vue from "vue2";
import Router from "vue-router3";
import { VuexI18nPlugin } from "../../src/index";
import { store } from "./store";
import App from "./app.vue";
import { routes } from "./routes";

Vue.use(Router);
Vue.use(VuexI18nPlugin, store);

const router = new Router({
  mode: "history",
  routes: routes,
});

import translationsEn from "../../example-shared/i18n/en.js";
import translationsDe from "../../example-shared/i18n/de.js";

Vue.i18n.add("en", translationsEn);
Vue.i18n.add("de", translationsDe);
Vue.i18n.set("en");

new Vue({
  router,
  store,
  el: "#app",
  render: (h) => h(App),
});
