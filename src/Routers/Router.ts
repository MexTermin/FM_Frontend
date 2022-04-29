import { createWebHistory, createRouter } from "vue-router";
import Home from "../Pages/Home.vue";
import Login from "../Pages/Login.vue";
import CreateAccount from "../Pages/CreateAccount.vue";
import GestionUsuario from "../Pages/GetionUsuario.vue";
import EditarUsuario from "../Pages/EditarUsuario.vue";
import Category from "../Pages/Category.vue";
import CreateCategory from "../Pages/CreateCategory.vue";
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
      props: { imgProfile },
      name: "Home",
    },
    { path: "/login", component: Login, props: { imgLogin }, name: "Login" },
    {
      path: "/create",
      component: CreateAccount,
      props: { imgLogin },
      name: "CreateUser",
    },
    {
      path: "/gestion-usuario",
      component: GestionUsuario,
      props: { imgProfile },
      name: "UserManagement",
    },
    {
      path: "/profile",
      component: Profile,
      props: { imgProfile },
      name: "Profile",
    },
    {
      path: "/editar-usuario",
      component: EditarUsuario,
      props: { imgLogin, imgProfile },
      name: "EditUser",
    },
    {
      path: "/category",
      component: Category,
      props: { imgProfile },
      name: "Category",
    },
    {
      path: "/create-category",
      component: CreateCategory,
      props: { imgProfile },
      name: "CreateCategory",
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
