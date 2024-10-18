<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";

const props = defineProps(["badge"]);
const { currentUsername } = storeToRefs(useUserStore());
</script>

<template>
  <p class="user">{{ props.badge.user }}</p>
  <p>{{ props.badge.userMilestone }}</p>
</template>

<style scoped>
p {
  margin: 0em;
}

.user {
  font-weight: bold;
  font-size: 1.2em;
}

menu {
  list-style-type: none;
  display: flex;
  flex-direction: row;
  gap: 1em;
  padding: 0;
  margin: 0;
}

.timestamp {
  display: flex;
  justify-content: flex-end;
  font-size: 0.9em;
  font-style: italic;
}

.base {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.base article:only-child {
  margin-left: auto;
}
</style>
