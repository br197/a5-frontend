<script setup lang="ts">
import PostGroupComponent from "@/components/Post/PostGroupComponent.vue";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
const { currentUsername, isLoggedIn } = storeToRefs(useUserStore());
</script>

<template>
  <main>
    <h1>Groups</h1>
    <section>
      {{ $route.params.id }}
    </section>
    <PostGroupComponent />
  </main>
</template>

<style scoped>
h1 {
  text-align: center;
}
</style>
