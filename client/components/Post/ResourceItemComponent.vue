<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
import ResourcePostComponent from "./ResourcePostComponent.vue";

const { isLoggedIn } = storeToRefs(useUserStore());
const props = defineProps(["resourceGroup"]);

const loaded = ref(false);
const groupName = ref("");
const resources = ref();
const res = ref();

async function getGroupsById() {
  let groupResult;
  try {
    groupResult = await fetchy(`/api/groups/${props.resourceGroup.id}`, "GET");
  } catch (e) {
    return;
  }
  groupName.value = groupResult.groupName;
  resources.value = groupResult;
}

async function getResources() {
  let resourceResults;
  try {
    resourceResults = await fetchy(`/api/resourceGroups/${props.resourceGroup.id}`, "GET");
  } catch (e) {
    return;
  }
  res.value = resourceResults;
}

onBeforeMount(async () => {
  await getGroupsById();
  await getResources();
  loaded.value = true;
});
</script>

<template>
  <section v-if="isLoggedIn">
    <h1>Saved Resources In {{ groupName }} Folder:</h1>
  </section>
  <section class="posts" v-if="loaded && resources.length !== 0">
    <article v-for="resource in resources.groupMembers" :key="resource._id">
      <ResourcePostComponent :resource="resource" :resourceGroup="resourceGroup" @refreshResources="getResources" />
    </article>
  </section>
  <p v-else-if="loaded">No resources found</p>
  <p v-else>Loading...</p>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  gap: 1em;
}

section,
p,
.row {
  margin: 0 auto;
  max-width: 60em;
}

article {
  background-color: var(--base-bg);
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  padding: 1em;
}

.groups {
  padding: 1em;
}

.row {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 60em;
}
</style>
