import { storeToRefs } from "pinia";
import { createRouter, createWebHistory } from "vue-router";

import { useUserStore } from "@/stores/user";
import GroupPostsView from "../views/GroupPostsView.vue";
import GroupView from "../views/GroupView.vue";
import HelpsView from "../views/HelpsView.vue";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import MapView from "../views/MapView.vue";
import MilestoneView from "../views/MilestoneView.vue";
import NotFoundView from "../views/NotFoundView.vue";
import ResourcesView from "../views/ResourcesView.vue";
import SelectedResourceGroupView from "../views/SelectedResourceGroupView.vue";
import SettingView from "../views/SettingView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomeView,
    },
    {
      path: "/resource/:id",
      name: "Resources",
      component: ResourcesView,
      meta: { requiresAuth: true },
    },
    {
      path: "/setting",
      name: "Settings",
      component: SettingView,
      meta: { requiresAuth: true },
    },
    {
      path: "/help",
      name: "Help",
      component: HelpsView,
      meta: { requiresAuth: true },
    },
    {
      path: "/map",
      name: "Community Map",
      component: MapView,
      meta: { requiresAuth: true },
    },
    {
      path: "/milestones",
      name: "Milestones",
      component: MilestoneView,
      meta: { requiresAuth: true },
    },
    {
      path: "/groups",
      name: "Groups",
      component: GroupView,
      meta: { requiresAuth: true },
    },
    {
      path: "/groups/:id",
      name: "Group Posts",
      component: GroupPostsView,
      meta: { requiresAuth: true },
    },
    {
      path: "/resourceSelect",
      name: "Select Resource Group",
      component: SelectedResourceGroupView,
      meta: { requiresAuth: true },
    },
    {
      path: "/login",
      name: "Login",
      component: LoginView,
      meta: { requiresAuth: false },
      beforeEnter: (to, from) => {
        const { isLoggedIn } = storeToRefs(useUserStore());
        if (isLoggedIn.value) {
          return { name: "Settings" };
        }
      },
    },
    {
      path: "/:catchAll(.*)",
      name: "not-found",
      component: NotFoundView,
    },
  ],
});

/**
 * Navigation guards to prevent user from accessing wrong pages.
 */
router.beforeEach((to, from) => {
  const { isLoggedIn } = storeToRefs(useUserStore());

  if (to.meta.requiresAuth && !isLoggedIn.value) {
    return { name: "Login" };
  }
});

export default router;
