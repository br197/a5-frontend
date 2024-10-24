<script setup lang="ts">
const props = defineProps(["badge"]);
</script>

<template>
  <p class="badgeName">{{ props.badge[0] }}</p>
  <p v-if="props.badge[1]">{{ "ACHIEVED!" }}</p>
  <p v-else>{{ "NOT ACHIEVED YET!" }}</p>
</template>

<style scoped>
p {
  margin: 0em;
}

.badgeName {
  font-weight: bold;
  font-size: 1.2em;
}
</style>
