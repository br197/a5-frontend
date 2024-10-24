<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import CreateUserGroupForm from "@/components/Groups/CreateUserGroupForm.vue";
import GroupComponent from "@/components/Groups/GroupComponent.vue";
import EditGroupNameForm from "@/components/Groups/EditGroupNameForm.vue";
import EditGroupDescriptionForm from "@/components/Groups/EditGroupDescriptionForm.vue";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref, computed } from "vue";

const { isLoggedIn } = storeToRefs(useUserStore());

const loaded = ref(false);
let editingName = ref("");
let editingDescription = ref("");
let groups = ref<Array<Record<string, string>>>([]);

async function getAllGroups() {
  let groupResults;
  try {
    groupResults = await fetchy("/api/allGroups", "GET");
  } catch (_) {
    return;
  }

  groups.value = groupResults;
}

function updateNameEditing(id: string) {
  editingName.value = id;
}

function updateDescriptionEditing(id: string) {
  editingDescription.value = id;
}

onBeforeMount(async () => {
  await getAllGroups();
  loaded.value = true;
});

const nonResourceGroup = computed(() => {
  return groups.value.filter((group) => !group.resource);
});
</script>

<template>
  <section v-if="isLoggedIn">
    <h2>Create a group:</h2>
    <CreateUserGroupForm @refreshGroups="getAllGroups" />
  </section>
  <section class="groups" v-if="loaded && nonResourceGroup.length !== 0">
    <article v-for="group in nonResourceGroup" :key="group._id">
      <GroupComponent
        v-if="editingName !== group._id && editingDescription !== group._id"
        :group="group"
        @refreshGroups="getAllGroups"
        @editGroupName="updateNameEditing"
        @editGroupDescription="updateDescriptionEditing"
      />
      <EditGroupNameForm v-else-if="editingDescription !== group._id" :group="group" @refreshGroups="getAllGroups" @editGroupName="updateNameEditing" />
      <EditGroupDescriptionForm v-else :group="group" @refreshGroups="getAllGroups" @editGroupDescription="updateDescriptionEditing" />
    </article>
  </section>
  <p v-else-if="loaded">No groups found</p>
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
