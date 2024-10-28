<script setup lang="ts">
import { useToastStore } from "@/stores/toast";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { computed, onBeforeMount } from "vue";
import { RouterLink, RouterView, useRoute } from "vue-router";

const currentRoute = useRoute();
const currentRouteName = computed(() => currentRoute.name);
const userStore = useUserStore();
const { isLoggedIn } = storeToRefs(userStore);
const { toast } = storeToRefs(useToastStore());

// Make sure to update the session before mounting the app in case the user is already logged in
onBeforeMount(async () => {
  try {
    await userStore.updateSession();
  } catch {
    // User is not logged in
  }
});
</script>

<template>
  <header>
    <nav>
      <div class="title">
        <img class="logo" src="@/assets/images/flag.png" />
        <RouterLink :to="{ name: 'Home' }">
          <h1>HelloUSA</h1>
        </RouterLink>
      </div>
      <ul>
        <li>
          <RouterLink :to="{ name: 'Home' }" :class="{ underline: currentRouteName == 'Home' }"> Home </RouterLink>
        </li>
        <li class="links" v-if="isLoggedIn">
          <RouterLink class="link" :to="{ name: 'Groups' }" :class="{ underline: currentRouteName == 'Groups' }"> Groups </RouterLink>
          <RouterLink class="link" :to="{ name: 'Community Map' }" :class="{ underline: currentRouteName == 'Community Map' }"> Community Map </RouterLink>
          <RouterLink class="link" :to="{ name: 'Milestones' }" :class="{ underline: currentRouteName == 'Milestones' }"> Milestones </RouterLink>
          <RouterLink class="link" :to="{ name: 'Help' }" :class="{ underline: currentRouteName == 'Help' }"> Help </RouterLink>
          <RouterLink class="link" :to="{ name: 'Settings' }" :class="{ underline: currentRouteName == 'Settings' }"> Settings </RouterLink>
        </li>
        <li v-else>
          <RouterLink :to="{ name: 'Login' }" :class="{ underline: currentRouteName == 'Login' }"> Login </RouterLink>
        </li>
      </ul>
    </nav>
    <article v-if="toast !== null" class="toast" :class="toast.style">
      <p>{{ toast.message }}</p>
    </article>
  </header>
  <RouterView />
</template>

<style scoped>
@import "./assets/toast.css";

nav {
  padding: 1em 2em;
  background-color: #b93838;
  display: flex;
  align-items: center;
}

.link {
  margin: 10px;
}

h1 {
  font-size: 2em;
  margin: 0;
  color: white;
}

.title {
  display: flex;
  align-items: center;
  gap: 0.5em;
}

img {
  height: 2em;
}

a {
  font-size: large;
  color: white;
  text-decoration: none;
}

ul {
  list-style-type: none;
  margin-left: auto;
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 0.5em;
}

.underline {
  text-decoration: underline;
}

.logo {
  width: 40px;
  height: 40px;
}
</style>
