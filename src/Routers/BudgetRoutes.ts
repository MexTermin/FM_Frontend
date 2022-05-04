import CreateBudget from "../Pages/CreateBudget.vue";
import BudgetManagement from "../Pages/BudgetManagement.vue"
import EditButget from "../Pages/EditBudget.vue";
import DetailsBudget from "../Pages/DetailsBudget.vue";

import imgLogin from "../img/account_circle_black.svg";
import imgProfile from "../img/account_circle_black.svg";

const BudgetPaths = [
    {
      path: "/create-budget",
      component: CreateBudget,
      props: { imgLogin },
      name: "CreateBudget",
    },
    {
      path: "/budget-management",
      component: BudgetManagement,
      props: { imgProfile },
      name: "BudgetManagement",
    },
    {
      path: "/details-budget",
      component: DetailsBudget,
      props: { imgProfile },
      name: "DetailsBudget",
    },
    {
      path: "/edit-budget",
      component: EditButget,
      props: { imgLogin, imgProfile },
      name: "EditButget",
    },
  ]

export default BudgetPaths;