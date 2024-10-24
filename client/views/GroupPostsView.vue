<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import GroupListComponent from "@/components/Groups/GroupListComponent.vue";
const { currentUsername, isLoggedIn } = storeToRefs(useUserStore());
</script>

<template>
  <main>
    <h1>Groups</h1>
    <section>
      {{ $route.params.id }}
    </section>
    <GroupListComponent />
  </main>
</template>

<style scoped>
h1 {
  text-align: center;
}
</style>
