<script setup lang="ts">
import CreateCommentForm from "@/components/Comment/CreateCommentForm.vue";
import EditCommentForm from "@/components/Comment/EditCommentForm.vue";
import CommentComponent from "@/components/Comment/CommentComponent.vue";
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";

const { isLoggedIn } = storeToRefs(useUserStore());

const loaded = ref(false);
let comments = ref<Array<Record<string, string>>>([]);
let editing = ref("");
const username = ref("");

async function getComments(username: string) {
  let commentResults;
  try {
    commentResults = await fetchy("/api/comment", "GET", { query: { author: username } });
  } catch (_) {
    return;
  }
  comments.value = commentResults;
  username.value = username;
}

function updateEditing(id: string) {
  editing.value = id;
}

onBeforeMount(async () => {
  await getComments(username);
  loaded.value = true;
});
</script>

<template>
  <section v-if="isLoggedIn">
    <h2>Create a comment:</h2>
    <CreateCommentForm @refreshPosts="getComments" />
  </section>
  <section class="comments" v-if="loaded && comments.length !== 0">
    <article v-for="comment in comments" :key="comment._id">
      <CommentComponent v-if="editing !== comment._id" :comment="comment" @refreshPosts="getComments" @editComment="updateEditing" />
      <EditCommentForm v-else :comment="comment" @refreshPosts="getPosts" @editPost="updateEditing" />
    </article>
  </section>
  <p v-else-if="loaded">No comments found</p>
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

.comments {
  padding: 1em;
}

.row {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 60em;
}
</style>
