import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      // alias: "/tutorials",
      name: "home",
      component: () => import("./components/Home")
    },
    {
      path: "/tutorials",
      name: "tutorials",
      component: () => import("./components/TutorialsList")
    },
    {
      path: "/tutorials/:id",
      name: "tutorial-details",
      component: () => import("./components/Tutorial")
    },
    {
      path: "/add",
      name: "add",
      component: () => import("./components/AddTutorial")
    },
    {
      path: "/quote",
      name: "quote",
      component: () => import("./components/QuoteForm")
    },
    {
      path: "/rentals/",
      name: "rentals",
      component: () => import("./components/Rentals")
    },
    {
      path: "/rentals/:slug",
      name: "rentals",
      component: () => import("./components/Rentals")
    }
  ]
});