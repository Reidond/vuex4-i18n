import Vue from "vue2";
import Vuex from "vuex3";
import storeModule from "../../example-shared/store/index";

Vue.use(Vuex);

const store = new Vuex.Store({
  ...storeModule,
});

export { store };
