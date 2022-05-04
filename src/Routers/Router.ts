import { createWebHistory, createRouter } from "vue-router";
import Home from "../Pages/Home.vue";

import UserPaths from "./UserRoutes";
import BudgetPaths from "./BudgetRoutes";
import CategoryPaths from "./CategoryRoutes";

import { isAuthenticated, getUserInfo } from "../Utils/utils";

import imgProfile from "../img/account_circle_black.svg";

const history = createWebHistory();
const router = createRouter({
  history,
  routes: [
    ...UserPaths,
    ...BudgetPaths,
    ...CategoryPaths,
    {
      path: "/",
      component: Home,
      props: { imgProfile },
      name: "Home",
    },
  ],
});

const AdultRoute = [
  "CategoriesManagement",
  "DetailsCategory",
  "CreateCategory",
  "EditCategory",
  "EditUser",
  "UserManagement",
  "CreateUser",
  "BudgetManagement",
];

router.beforeEach(async (to, from) => {
  if (to.name !== "Login") {
    let isAuth = await isAuthenticated();
    if (!isAuth) {
      return { name: "Login" };
    }

    let user = await getUserInfo();
    const rol = (user.body?.rol.rol_type as string).toLowerCase();

    if (AdultRoute.includes(to.name as string) && rol != "adulto") {
      return { name: "Home" };
    }
  }
});

export default router;
