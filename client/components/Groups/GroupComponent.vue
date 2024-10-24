<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { formatDate } from "@/utils/formatDate";
import { storeToRefs } from "pinia";
import { fetchy } from "../../utils/fetchy";
import router from "@/router";

const props = defineProps(["group"]);
const emit = defineEmits(["editGroupName", "editGroupDescription", "refreshGroups"]);
const { currentUsername } = storeToRefs(useUserStore());

const deleteGroup = async (groupName: string) => {
  try {
    await fetchy(`/api/groups/${groupName}`, "DELETE");
  } catch {
    return;
  }
  emit("refreshGroups");
};

const joinUserGroup = async () => {
  try {
    await fetchy(`/api/groups/${props.group._id}`, "POST");
  } catch (e) {
    return;
  }
  emit("refreshGroups");
};

const leaveUserGroup = async () => {
  try {
    await fetchy(`/api/groups/${props.group._id}`, "PATCH");
  } catch (e) {
    return;
  }
  emit("refreshGroups");
};
</script>

<template>
  <p class="owner">{{ props.group.groupName }}</p>
  <p>{{ props.group.groupDescription }}</p>
  <div class="base">
    <menu>
      <li v-if="!props.group.groupMembers.includes(currentUsername)"><button class="btn-small pure-button" @click="joinUserGroup">Join Group</button></li>
      <menu v-else-if="props.group.groupMembers.includes(currentUsername)">
        <li><button class="btn-small pure-button" @click="router.push(`/groups/${props.group._id}`)">Enter Group</button></li>
        <li><button class="btn-small pure-button" @click="leaveUserGroup">Leave Group</button></li>
      </menu>
      <menu v-if="props.group.groupOwner == currentUsername">
        <li><button class="btn-small pure-button" @click="emit('editGroupName', props.group._id)">Edit Name</button></li>
        <li><button class="btn-small pure-button" @click="emit('editGroupDescription', props.group._id)">Edit Description</button></li>
        <li><button class="button-error btn-small pure-button" @click="deleteGroup(props.group.groupName)">Delete</button></li>
      </menu>
    </menu>

    <article class="timestamp">
      <p v-if="props.group.dateCreated !== props.group.dateUpdated">Edited on: {{ formatDate(props.group.dateUpdated) }}</p>
      <p v-else>Created on: {{ formatDate(props.group.dateCreated) }}</p>
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
