import CategoryManagement from "../Pages/CategoryManagement.vue";
import CreateCategory from "../Pages/CreateCategory.vue";
import EditCategory from "../Pages/EditCategory.vue";
import DetailsCategory from "../Pages/DetailsCategory.vue";

import imgProfile from "../img/account_circle_black.svg";

const CategoryPaths = [
  {
    path: "/categories-management",
    component: CategoryManagement,
    props: { imgProfile },
    name: "CategoriesManagement",
  },
  {
    path: "/create-category",
    component: CreateCategory,
    props: { imgProfile },
    name: "CreateCategory",
  },
  {
    path: "/edit-category",
    component: EditCategory,
    props: { imgProfile },
    name: "EditCategory",
  },
  {
    path: "/details-category",
    component: DetailsCategory,
    props: { imgProfile },
    name: "DetailsCategory",
  },
];

export default CategoryPaths;
