<script setup lang="ts">
import { ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const content = ref("");
const props = defineProps(["post"]);
const emit = defineEmits(["refreshComments"]);

const createComment = async (content: string) => {
  try {
    await fetchy(`/api/comment/:${props.post._id}`, "POST", {
      body: { content: content, itemToReplyTo: props.post._id },
    });
  } catch (_) {
    return;
  }
  emit("refreshComments");
  emptyForm();
};

const emptyForm = () => {
  content.value = "";
};
</script>

<template>
  <form @submit.prevent="createComment(content)">
    <textarea id="content" v-model="content" placeholder="Create a comment!" required> </textarea>
    <button type="submit" class="pure-button-primary pure-button">Post comment</button>
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
