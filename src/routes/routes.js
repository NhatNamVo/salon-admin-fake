import { getUserLogged } from "@/helpers/utils/sesstion-storage/session-storage";
import { createRouter, createWebHistory } from "vue-router";

export const routes = [
  {
    path: "/",
    name: "dashboard",
    text: 'Home',
    group: 'home',
    component: () => import("../pages/dashboard/dashboard-page.vue"),
    meta: {
      requiredAuth: true,
      layout: 'main-layout',
    },
  },
  {
    path: "/client-list",
    name: "client-list",
    text: 'Client List',
    group: 'client',
    component: () => import("../pages/clients/client-list/client-list.vue"),
    meta: {
      requiredAuth: true,
      layout: 'main-layout',
    },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../pages/auth/login/login.vue"),
    meta: {
      requiredAuth: false,
      layout: 'default-layout',
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const userLogged = getUserLogged();
  console.log(userLogged)
    if (to.name === "login" && userLogged) {
      next({ name: "client-list" });
    }
  if (to.matched.some((record) => record.meta.requiredAuth)) {
    if (!userLogged) {
      next({
        name: "login",
      });
    } else {
      next();
    }
  }
  else {
    next();
  }
});

export default router;
