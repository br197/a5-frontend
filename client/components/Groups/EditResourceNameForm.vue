<script setup lang="ts">
import { ref } from "vue";
import { fetchy } from "../../utils/fetchy";
import { formatDate } from "../../utils/formatDate";

const props = defineProps(["resource"]);
const name = ref(props.resource.groupName);
const emit = defineEmits(["editGroupName", "refreshGroups", "refreshResource"]);

const editGroupName = async (name: string) => {
  try {
    await fetchy(`/api/groups/name/${props.resource._id}`, "PATCH", { body: { groupName: name } });
  } catch (e) {
    return;
  }
  emit("editGroupName");
  emit("refreshGroups");
  emit("refreshResource");
};
</script>

<template>
  <form @submit.prevent="editGroupName(name)">
    <p class="groupName">{{ props.resource.groupName }}</p>
    <textarea id="newGroupName" v-model="name" placeholder="New Group Name!" required> </textarea>
    <div class="base">
      <menu>
        <li><button class="btn-small pure-button-primary pure-button" type="submit">Save</button></li>
        <li><button class="btn-small pure-button" @click="emit('editGroupName')">Cancel</button></li>
      </menu>
      <p v-if="props.resource.dateCreated !== props.resource.dateUpdated" class="timestamp">Edited on: {{ formatDate(props.resource.dateUpdated) }}</p>
      <p v-else class="timestamp">Created on: {{ formatDate(props.resource.dateCreated) }}</p>
    </div>
  </form>
</template>

<style scoped>
form {
  background-color: var(--base-bg);
  display: flex;
  flex-direction: column;
  gap: 0.5em;
}

textarea {
  font-family: inherit;
  font-size: inherit;
  height: 6em;
  border-radius: 4px;
  resize: none;
}

p {
  margin: 0em;
}

.groupName {
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

.base {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.timestamp {
  display: flex;
  justify-content: flex-end;
  font-size: 0.9em;
  font-style: italic;
}
</style>
