import CreateAccount from "../Pages/CreateAccount.vue";
import UserManagement from "../Pages/UserManagement.vue";
import EditUser from "../Pages/EditUser.vue";
import Profile from "../Pages/Profile.vue";

import Login from "../Pages/Login.vue";
import imgLogin from "../img/account_circle_black.svg";
import imgProfile from "../img/account_circle_black.svg";

const UserPaths = [
    {
      path: "/login",
      component: Login,
      props: { imgLogin },
      name: "Login",
    },
    {
      path: "/create",
      component: CreateAccount,
      props: { imgLogin },
      name: "CreateUser",
    },
    {
      path: "/user-management",
      component: UserManagement,
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
      path: "/edit-user",
      component: EditUser,
      props: { imgLogin, imgProfile },
      name: "EditUser",
    },
  ]

export default UserPaths;
