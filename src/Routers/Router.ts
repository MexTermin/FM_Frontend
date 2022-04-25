import { createWebHistory, createRouter } from "vue-router";
import Home from "../Pages/Home.vue";
import Login from "../Pages/Login.vue";
import CreateAccount from "../Pages/CreateAccount.vue";
import GestionUsuario from "../Pages/GetionUsuario.vue";
import EditarUsuario from "../Pages/EditarUsuario.vue";
import Profile from "../Pages/Profile.vue";
import { isAuthenticated } from "../Utils/utils";

import imgLogin from "../img/account_circle_black.svg";
import imgProfile from "../img/account_circle_black.svg";

const history = createWebHistory();
const router = createRouter({
  history,
  routes: [
    {
      path: "/",
      component: Home,
      props: { imgProfile, userName: "Yael" },
      name: "Home",
    },
    { path: "/login", component: Login, props: { imgLogin }, name: "Login" },
    { path: "/create", component: CreateAccount, props: { imgLogin } },
    {
      path: "/gestion-usuario",
      component: GestionUsuario,
      props: { imgProfile, userName: "User" },
      name: "GestionUsuario",
    },
    {
      path: "/profile",
      component: Profile,
      props: { imgProfile, userName: "User" },
      name: "Profile",
    },
    {
      path: "/editar-usuario",
      component: EditarUsuario,
      props: { imgLogin, imgProfile, userName: "User" },
    },
  ],
});

router.beforeEach(async (to, from) => {
  if (to.name !== "Login") {
    let isAuth = await isAuthenticated();
    if (!isAuth) {
      return { name: "Login" };
    }
  }
});

export default router;
