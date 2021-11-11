import { createStore } from "vuex";
import storeModule from "./store/index";

const store = createStore({
  ...storeModule,
});

export { store };
