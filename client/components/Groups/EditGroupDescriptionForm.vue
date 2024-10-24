<script setup lang="ts">
import { ref } from "vue";
import { fetchy } from "../../utils/fetchy";
import { formatDate } from "../../utils/formatDate";

const props = defineProps(["group"]);
const description = ref(props.group.groupDescription);
const emit = defineEmits(["editGroupDescription", "refreshGroups"]);

const editGroupDescription = async (description: string) => {
  try {
    await fetchy(`/api/groups/description/${props.group._id}`, "PATCH", { body: { groupDescription: description } });
  } catch (e) {
    return;
  }
  emit("editGroupDescription");
  emit("refreshGroups");
};
</script>

<template>
  <form @submit.prevent="editGroupDescription(description)">
    <p class="groupDescription">{{ props.group.groupDescription }}</p>
    <textarea id="description" v-model="description" placeholder="New Group Description!" required> </textarea>
    <div class="base">
      <menu>
        <li><button class="btn-small pure-button-primary pure-button" type="submit">Save</button></li>
        <li><button class="btn-small pure-button" @click="emit('editGroupDescription')">Cancel</button></li>
      </menu>
      <p v-if="props.group.dateCreated !== props.group.dateUpdated" class="timestamp">Edited on: {{ formatDate(props.group.dateUpdated) }}</p>
      <p v-else class="timestamp">Created on: {{ formatDate(props.group.dateCreated) }}</p>
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
  height: 2em;
  border-radius: 4px;
  resize: none;
}

p {
  margin: 0em;
}

.groupDescription {
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
