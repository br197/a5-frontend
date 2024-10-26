<script setup lang="ts">
import ResourceItemComponent from "@/components/Groups/ResourceItemComponent.vue";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
const { currentUsername, isLoggedIn } = storeToRefs(useUserStore());
const route = useRoute();
</script>

<template>
  <main>
    <ResourceItemComponent :resource="{ id: route.params.id }" />
  </main>
</template>

<style scoped>
h1 {
  text-align: center;
}
</style>
