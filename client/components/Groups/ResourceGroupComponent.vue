<script setup lang="ts">
import router from "@/router";
import { useUserStore } from "@/stores/user";
import { formatDate } from "@/utils/formatDate";
import { storeToRefs } from "pinia";
import { fetchy } from "../../utils/fetchy";

const props = defineProps(["resource"]);
const emit = defineEmits(["editGroupName", "editGroupDescription", "refreshResource"]);
const { currentUsername } = storeToRefs(useUserStore());

const deleteResourceGroup = async (groupName: string) => {
  try {
    await fetchy(`/api/groups/${groupName}`, "DELETE");
  } catch {
    return;
  }
  emit("refreshResource");
};
</script>

<template>
  <p class="owner">{{ props.resource.groupName }}</p>
  <p>{{ props.resource.groupDescription }}</p>
  <div class="base">
    <menu>
      <li><button class="btn-small pure-button" @click="router.push(`/resource/${props.resource._id}`)">Enter Group</button></li>
      <menu v-if="props.resource.groupOwner == currentUsername">
        <li><button class="btn-small pure-button" @click="emit('editGroupName', props.resource._id)">Edit Name</button></li>
        <li><button class="btn-small pure-button" @click="emit('editGroupDescription', props.resource._id)">Edit Description</button></li>
        <li><button class="button-error btn-small pure-button" @click="deleteResourceGroup(props.resource.groupName)">Delete</button></li>
      </menu>
    </menu>

    <article class="timestamp">
      <p v-if="props.resource.dateCreated !== props.resource.dateUpdated">Edited on: {{ formatDate(props.resource.dateUpdated) }}</p>
      <p v-else>Created on: {{ formatDate(props.resource.dateCreated) }}</p>
    </article>
  </div>
</template>

<style scoped>
p {
  margin: 0em;
}

.owner {
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
