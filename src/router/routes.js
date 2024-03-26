const routes = [
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
  {
    path: "/register",
    component: () => import("pages/registerPage.vue"),
  },
  {
    path: "/",
    component: () => import("pages/loginPage.vue"),
  },
  {
    path: "/menu",
    component: () => import("pages/MenuApartmentPage.vue"),
  },
];

export default routes;
