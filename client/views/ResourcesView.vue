<script setup lang="ts">
import ResourceItemComponent from "@/components/Post/ResourceItemComponent.vue";
import { useRoute } from "vue-router";
const route = useRoute();
</script>

<template>
  <main>
    <ResourceItemComponent :resourceGroup="{ id: route.params.id }" />
  </main>
</template>

<style scoped>
h1 {
  text-align: center;
}
</style>
