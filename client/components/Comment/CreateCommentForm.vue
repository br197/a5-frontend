<script setup lang="ts">
import { ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const content = ref("");
const props = defineProps(["post", "comment"]);
const emit = defineEmits(["refreshComments", "replyComment"]);
const createComment = async (content: string) => {
  try {
    if (props.post) {
      await fetchy(`/api/comment/${props.post._id}`, "POST", {
        body: { content: content, itemToReplyTo: props.post._id },
      });
    } else if (props.comment) {
      await fetchy(`/api/comment/${props.comment._id}`, "POST", {
        body: { content: content, itemToReplyTo: props.comment._id },
      });
    }
  } catch (e) {
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
    <div v-if="props.comment">
      <p class="author">{{ props.comment.author }}</p>
      <p class="commentContent">{{ props.comment.content }}</p>
    </div>
    <textarea id="content" v-model="content" placeholder="Create a comment!" required> </textarea>
    <div class="base">
      <menu>
        <li><button class="btn-small pure-button" type="submit">Post comment</button></li>
        <li><button class="btn-small button-error pure-button" @click="emit('replyComment')">Cancel</button></li>
      </menu>
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
.commentContent {
  font-size: 1.2em;
}

textarea {
  font-family: inherit;
  font-size: inherit;
  height: 6em;
  padding: 0.5em;
  border-radius: 4px;
  resize: none;
}

.base {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
menu {
  display: flex;
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.author {
  font-weight: bold;
  font-size: 1.5em;
}

li {
  margin-right: 0.5em;
}
</style>
