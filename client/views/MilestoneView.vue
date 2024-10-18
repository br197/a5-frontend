<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import BadgeListComponent from "@/components/Milestone/BadgeListComponent.vue";
const { currentUsername, isLoggedIn } = storeToRefs(useUserStore());
</script>

<template>
  <main>
    <h1>Milestones</h1>
    <section>
      <h1 v-if="isLoggedIn">Welcome {{ currentUsername }}!</h1>
      <h1 v-else>Please login!</h1>
    </section>
    <BadgeListComponent />
  </main>
</template>

<style scoped>
h1 {
  text-align: center;
}
</style>
