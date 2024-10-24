<script setup lang="ts">
const props = defineProps(["user"]);
const emit = defineEmits(["refreshLocation"]);
emit("refreshLocation");
</script>

<template>
  <p class="user">{{ props.user.user }}</p>
  <p>LOCATION: {{ props.user.city.toUpperCase() }}, {{ props.user.state.toUpperCase() }}</p>
</template>

<style scoped>
p {
  margin: 0em;
}

.user {
  font-weight: bold;
  font-size: 1.5em;
}
</style>
