import Registration from "../components/auth/Registration";
import Login from "../components/auth/Login";
import Catalog from "../views/Catalog";
import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/catalog",
    name: "Catalog",
    component: Catalog
  },
  {
    path: "/registration",
    name: "Registration",
    component: Registration
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  }
];
const router = new VueRouter({
  routes
});

export default router;
