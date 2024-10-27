<script setup lang="ts">
import CommentResourceComponent from "@/components/Comment/CommentResourceComponent.vue";
import { useUserStore } from "@/stores/user";
import { formatDate } from "@/utils/formatDate";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
import { fetchy } from "../../utils/fetchy";
const { currentUsername } = storeToRefs(useUserStore());

const props = defineProps(["resource", "comment", "resourceGroup"]);
const emit = defineEmits(["refreshResources"]);
let comments = ref<Array<Record<string, string>>>([]);
const post = ref();
const author = ref("");
const content = ref("");
const dateUpdated = ref();
const dateCreated = ref();

async function getCommentsById() {
  let commentResults;

  try {
    commentResults = await fetchy(`/api/comments/${props.resource}`, "GET");
  } catch (e) {
    return;
  }
  comments.value = commentResults;
}

async function getPostById() {
  let postResult;

  try {
    postResult = await fetchy(`/api/posts/${props.resource}`, "GET");
  } catch (e) {
    return;
  }
  post.value = postResult;
  author.value = post.value.author;
  content.value = post.value.content;
  dateUpdated.value = post.value.dateUpdated;
  dateCreated.value = post.value.dateUpdated;
}

async function removeResource() {
  try {
    await fetchy(`/api/resourceGroups/${props.resource}`, "PATCH", { body: { groupId: props.resourceGroup.id } });
  } catch (e) {
    return;
  }

  emit("refreshResources");
}

onBeforeMount(async () => {
  await getCommentsById();
  await getPostById();
});
</script>

<template>
  <p class="author">{{ author }}</p>
  <p class="postContent">{{ content }}</p>
  <div class="base">
    <button class="button-error btn-small pure-button" @click="removeResource">Remove Resource</button>
  </div>
  <article class="timestamp">
    <p v-if="dateCreated !== dateUpdated">Edited on: {{ formatDate(dateUpdated) }}</p>
    <p v-else>Created on: {{ formatDate(dateCreated) }}</p>
  </article>
  <section v-if="comments.length !== 0">
    <h4>Comments:</h4>
    <article v-for="comment in comments" :key="comment._id">
      <CommentResourceComponent :comment="comment" />
    </article>
  </section>
</template>

<style scoped>
p {
  margin: 0em;
}

.author {
  font-weight: bold;
  font-size: 1.5em;
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

.postContent {
  font-size: 1.2em;
}

.base article:only-child {
  margin-left: auto;
}
</style>
