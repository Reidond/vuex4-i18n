import { createStore } from "vuex";
import storeModule from "../../example-shared/store/index";

const store = createStore({
  ...storeModule,
});

export { store };
