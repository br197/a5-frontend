<script setup lang="ts">
import { ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const groupName = ref("");
const groupDescription = ref("");
const emit = defineEmits(["refreshResource"]);

const createResourceGroup = async (groupName: string, groupDescription: string) => {
  try {
    await fetchy("/api/resourceGroups", "POST", {
      body: { groupName, groupDescription },
    });
  } catch (_) {
    return;
  }
  emit("refreshResource");
  emptyForm();
};

const emptyForm = () => {
  groupName.value = "";
  groupDescription.value = "";
};
</script>

<template>
  <form @submit.prevent="createResourceGroup(groupName, groupDescription)">
    <label for="folderName">Folder name:</label>
    <textarea id="folderName" v-model="groupName" placeholder="Write your folder name here" required> </textarea>
    <label for="description">Folder Description:</label>
    <textarea id="description" v-model="groupDescription" placeholder="Add your folder's description!" required> </textarea>
    <button type="submit" class="pure-button-primary pure-button button-color">Create Folder</button>
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

textarea {
  font-family: inherit;
  font-size: inherit;
  height: 6em;
  padding: 0.5em;
  border-radius: 4px;
  resize: none;
}

.radio-group {
  display: flex;
  align-items: center;
  gap: 1em;
}

.button-color {
  background-color: #1c4698;
}

#folderName {
  font-family: inherit;
  font-size: inherit;
  height: 1em;
  padding: 0.5em;
  border-radius: 4px;
  resize: none;
}
</style>
