<script setup lang="ts">
import { ref } from "vue";
import { fetchy } from "../../utils/fetchy";
import { formatDate } from "../../utils/formatDate";

const content = ref("");
const props = defineProps(["post", "comment"]);
const emit = defineEmits(["refreshComments", "replyComment"]);

const createComment = async (content: string) => {
  try {
    await fetchy(`/api/comment/${props.post._id}`, "POST", {
      body: { content: content, itemToReplyTo: props.post._id },
    });
  } catch (e) {
    console.log(e);
    return;
  }
  emit("refreshComments");
  emit("replyComment");
  emptyForm();
};

const emptyForm = () => {
  content.value = "";
};
</script>

<template>
  <form @submit.prevent="createComment(content)">
    <p class="author">{{ props.comment.author }}</p>
    <textarea id="content" v-model="content" placeholder="Create a comment!" required> </textarea>
    <div class="base">
      <menu>
        <li><button class="btn-small pure-button" type="submit">Post comment</button></li>
        <li><button class="btn-small pure-button" @click="emit('replyComment')">Cancel</button></li>
      </menu>
      <p v-if="props.comment.dateCreated !== props.comment.dateUpdated" class="timestamp">Edited on: {{ formatDate(props.comment.dateUpdated) }}</p>
      <p v-else class="timestamp">Created on: {{ formatDate(props.comment.dateCreated) }}</p>
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

textarea {
  font-family: inherit;
  font-size: inherit;
  height: 6em;
  padding: 0.5em;
  border-radius: 4px;
  resize: none;
}
</style>
