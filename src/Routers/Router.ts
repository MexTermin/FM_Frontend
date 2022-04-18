import { createWebHistory, createRouter } from "vue-router";
import Home from "../Pages/Home.vue";
import Login from "../Pages/Login.vue";
import CreateAccount from "../Pages/CreateAccount.vue";
import GestionUsuario from "../Pages/GetionUsuario.vue";
import EditarUsuario from "../Pages/EditarUsuario.vue";

import imgLogin from "../img/account_circle_black.svg";
import imgProfile from "../img/account_circle_black.svg";

const history = createWebHistory();
const router = createRouter({
  history,
  routes: [
    { path: "/", component: Home, props: { imgProfile, userName: "Yael" } },
    { path: "/login", component: Login, props: { imgLogin }, name: "login" },
    { path: "/create", component: CreateAccount, props: { imgLogin } },
    { path: "/gestion-usuario", component: GestionUsuario, props: { imgProfile, userName: "User" }, name:"GestionUsuario" },
    { path: "/editar-usuario", component: EditarUsuario, props: { imgLogin, imgProfile, userName: "User" } },
  ],
});

export default router;
