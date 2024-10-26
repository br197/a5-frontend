<script setup lang="ts">
import CreateResourceGroupForm from "@/components/Groups/CreateResourceGroupForm.vue";
import EditResourceDescriptionForm from "@/components/Groups/EditResourceDescriptionForm.vue";
import EditResourceNameForm from "@/components/Groups/EditResourceNameForm.vue";
import ResourceGroupComponent from "@/components/Groups/ResourceGroupComponent.vue";
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";

const { isLoggedIn } = storeToRefs(useUserStore());

const loaded = ref(false);
let resourceGroups = ref<Array<Record<string, string>>>([]);
let editingName = ref("");
let editingDescription = ref("");

async function getAllResourceGroups() {
  let groupResults;
  try {
    groupResults = await fetchy(`/api/resourceGroups`, "GET");
  } catch (e) {
    return;
  }

  resourceGroups.value = groupResults.groups;
}

function updateNameEditing(id: string) {
  editingName.value = id;
}

function updateDescriptionEditing(id: string) {
  editingDescription.value = id;
}

onBeforeMount(async () => {
  await getAllResourceGroups();
  loaded.value = true;
});
</script>

<template>
  <section v-if="isLoggedIn">
    <h2>Create a Resource group:</h2>
    <CreateResourceGroupForm @refreshResource="getAllResourceGroups" />
  </section>
  <section class="groups" v-if="loaded && resourceGroups.length !== 0">
    <article v-for="resource in resourceGroups" :key="resource._id">
      <ResourceGroupComponent
        v-if="editingName !== resource._id && editingDescription !== resource._id"
        :resource="resource"
        @refreshResource="getAllResourceGroups"
        @editGroupName="updateNameEditing"
        @editGroupDescription="updateDescriptionEditing"
      />
      <EditResourceNameForm v-else-if="editingDescription !== resource._id" :resource="resource" @refreshResource="getAllResourceGroups" @editGroupName="updateNameEditing" />
      <EditResourceDescriptionForm v-else :resource="resource" @refreshResource="getAllResourceGroups" @editGroupDescription="updateDescriptionEditing" />
    </article>
  </section>
  <p v-else-if="loaded">No resource groups found</p>
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
