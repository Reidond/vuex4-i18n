import Todos from "./components/Todos.vue";
import About from "./components/About.vue";

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
