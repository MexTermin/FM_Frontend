import CreateBudget from "../Pages/CreateBudgetYears.vue";
import BudgetManagement from "../Pages/BudgetManagement.vue"
import EditButgetYears from "../Pages/EditBudgetYears.vue";
import Profile from "../Pages/Profile.vue";

import Login from "../Pages/Login.vue";
import imgLogin from "../img/account_circle_black.svg";
import imgProfile from "../img/account_circle_black.svg";

const BudgetPaths = [
    {
      path: "/login",
      component: Login,
      props: { imgLogin },
      name: "Login",
    },
    {
      path: "/create-budget",
      component: CreateBudget,
      props: { imgLogin },
      name: "CreateUser",
    },
    {
      path: "/budget-management",
      component: BudgetManagement,
      props: { imgProfile },
      name: "BudgetManagement",
    },
    {
      path: "/profile",
      component: Profile,
      props: { imgProfile },
      name: "Profile",
    },
    {
      path: "/edit-budgetyears",
      component: EditButgetYears,
      props: { imgLogin, imgProfile },
      name: "EditButgetYears",
    },
  ]

export default BudgetPaths;