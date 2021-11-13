import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { VuexI18nPlugin } from "../../src/index";
import { store } from "./store";
import App from "./app.vue";
import { routes } from "./routes";

const app = createApp(App);
const router = createRouter({
  history: createWebHistory(),
  routes,
});

app.use(store);
app.use(router);
app.use(VuexI18nPlugin);

import translationsEn from "../../example-shared/i18n/en.js";
import translationsDe from "../../example-shared/i18n/de.js";

app.config.globalProperties.$i18n.add("en", translationsEn);
app.config.globalProperties.$i18n.add("de", translationsDe);
app.config.globalProperties.$i18n.set("en");

app.mount("#app");
