import Todos from "../../example-shared/components/Todos.vue";
import About from "../../example-shared/components/About.vue";

const routes = [
  {
    path: "/todo/:status?",
    name: "todos",
    component: Todos,
    props: true,
    alias: ["/"],
  },
  {
    path: "/about",
    name: "about",
    component: About,
  },
];

export { routes };
