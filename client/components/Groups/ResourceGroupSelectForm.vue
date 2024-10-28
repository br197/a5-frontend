<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const selectedGroup = ref("");
const props = defineProps(["post"]);
const loaded = ref(false);
const resourceGroups = ref<{ _id: string; name: string }[]>([]);
const emit = defineEmits(["savePost"]);

async function getAllResourceGroups() {
  let groupResults;
  try {
    groupResults = await fetchy("/api/resourceGroups", "GET");
  } catch (e) {
    return;
  }

  for (const g of groupResults.groups) {
    if (g && g.groupName) {
      const inGroup = await isResourceInGroup(g._id);
      if (!inGroup) {
        resourceGroups.value.push({ _id: g._id, name: g.groupName });
      }
    }
  }
}

async function addResource(groupId: string) {
  try {
    await fetchy(`/api/resourceGroups/${props.post._id}`, "POST", { body: { groupId: groupId } });
  } catch (e) {
    return;
  }
  emptyForm();
}

async function isResourceInGroup(groupId: string) {
  let resourceGroupMembers;
  try {
    resourceGroupMembers = await fetchy(`/api/resourceGroups/${groupId}`, "GET");
  } catch (e) {
    return;
  }

  if (resourceGroupMembers.includes(props.post._id)) {
    return true;
  }
}

const emptyForm = () => {
  selectedGroup.value = "";
};

onBeforeMount(async () => {
  await getAllResourceGroups();
  loaded.value = true;
});
</script>

<template>
  <form @submit.prevent="addResource(selectedGroup)">
    <div>
      <label for="states">Select folder:</label>
      <select class="resourceDropdown" id="resoureGroups" v-model="selectedGroup">
        <option v-for="group in resourceGroups" :key="group._id" :value="group._id">
          {{ group.name }}
        </option>
      </select>
    </div>
    <div class="button-container">
      <button type="submit" class="pure-button-primary pure-button">Add Resource</button>
      <button class="pure-button-primary pure-button button-error" @click="emit('savePost')">Cancel</button>
    </div>
  </form>
</template>

<style scoped>
form {
  background-color: var(--base-bg);
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  padding: 1em;
}

.resourceDropdown {
  padding: 2px;
  margin: 10px;
}

.button-container {
  display: flex;
  justify-content: flex-start;
  margin-top: 1em;
}

button {
  width: 10em;
  margin-right: 10px;
}
</style>
