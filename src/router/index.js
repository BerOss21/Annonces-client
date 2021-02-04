import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Categories from "../views/Categories.vue";
import Search from "../views/Search.vue";
import Show from "../views/Show.vue";
import Dashboard from "../views/Dashboard.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Annoucements from "../components/dashboard/Annoucements.vue";
import CategoriesList from "../components/dashboard/Categories.vue";
import CitiesList from "../components/dashboard/Cities.vue";
import Profile from "../components/dashboard/Profile.vue";
import CreateAnnoucement from "../components/dashboard/CreateAnnoucement.vue";
import EditAnnoucement from "../components/dashboard/EditAnnoucement.vue";
import CreateCategory from "../components/dashboard/CreateCategory.vue";
import EditCategory from "../components/dashboard/EditCategory.vue";
import CreateCity from "../components/dashboard/CreateCity.vue";
import EditCity from "../components/dashboard/EditCity.vue";
import EditProfile from "../components/dashboard/EditProfile.vue";
import store from "../store";



const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/categories",
    name: "Categories",
    component: Categories
  },
  {
    path: "/search",
    name: "Search",
    component: Search
  },
  {
    path: "/single-annoucements/:id",
    name: "Show",
    component: Show
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    beforeEnter: (to, from, next) => {
      if(store.getters.user){
        next();
      }
      else{
        next({name:"Login"});
      }
    },
    children: [
      {
        path: "/dashboard/annoucements",
        name: "Annoucements",
        component: Annoucements
      },
      {
        path: "/dashboard/categories",
        name: "CategoriesList",
        component: CategoriesList,
        beforeEnter: (to, from, next) => {
          if(store.getters.user.role=="admin"){
            next();
          }
          else{
            next({name:from.name});
          }
        }
      },
      {
        path: "/dashboard/cities",
        name: "CitiesList",
        component: CitiesList,
        beforeEnter: (to, from, next) => {
          if(store.getters.user.role=="admin"){
            next();
          }
          else{
            next({name:from.name});
          }
        }
      },
      {
        path: "/dashboard/profile",
        name: "Profile",
        component: Profile
      },
      {
        path: "/dashboard/edit-profile",
        name: "EditProfile",
        component: EditProfile
      },
      {
        path: "/dashboard/annoucements/create",
        name: "CreateAnnoucement",
        component: CreateAnnoucement
      },
      {
        path: "/dashboard/annoucements/edit/:id",
        name: "EditAnnoucement",
        component:EditAnnoucement
      },
      {
        path: "/dashboard/categories/edit/:id",
        name: "EditCategory",
        component:EditCategory,
        beforeEnter: (to, from, next) => {
          if(store.getters.user.role=="admin"){
            next();
          }
          else{
            next({name:from.name});
          }
        }
      },
      {
        path: "/dashboard/categories/create",
        name: "CreateCategory",
        component: CreateCategory,
        beforeEnter: (to, from, next) => {
          if(store.getters.user.role=="admin"){
            next();
          }
          else{
            next({name:from.name});
          }
        }
      },
      {
        path: "/dashboard/cities/edit/:id",
        name: "EditCity",
        component:EditCity,
        beforeEnter: (to, from, next) => {
          if(store.getters.user.role=="admin"){
            next();
          }
          else{
            next({name:from.name});
          }
        }
      },
      {
        path: "/dashboard/cities/create",
        name: "CreateCity",
        component: CreateCity,
        beforeEnter: (to, from, next) => {
          if(store.getters.user.role=="admin"){
            next();
          }
          else{
            next({name:from.name});
          }
        }
      }
      
    ]
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    beforeEnter: (to, from, next) => {
      if(store.getters.user){
        next({name:"Home"});
      }
      else{
        next();
      }
    },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    beforeEnter: (to, from, next) => {
      if(store.getters.user){
        next({name:"Home"});
      }
      else{
        next();
      }
    },
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
