<script setup lang="ts">
import CommentComponent from "@/components/Comment/CommentComponent.vue";
import CreateCommentForm from "@/components/Comment/CreateCommentForm.vue";
import EditCommentForm from "@/components/Comment/EditCommentForm.vue";
import router from "@/router";
import { useUserStore } from "@/stores/user";
import { formatDate } from "@/utils/formatDate";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const props = defineProps(["post", "comment"]);
const emit = defineEmits(["editPost", "refreshPosts", "replyComment"]);
const { currentUsername } = storeToRefs(useUserStore());
const editing = ref("");
const replying = ref("");
let comments = ref<Array<Record<string, string>>>([]);

const deletePost = async () => {
  try {
    await fetchy(`/api/posts/${props.post._id}`, "DELETE");
  } catch (e) {
    return;
  }
  emit("refreshPosts");
};

const addResourceGroup = async () => {
  try {
    await fetchy(`/api/resourceGroups/{props.post._id}`, "POST");
  } catch (e) {
    return;
  }
  emit("refreshPosts");
};

async function getCommentsById() {
  let commentResults;
  try {
    commentResults = await fetchy(`/api/comments/${props.post._id}`, "GET");
  } catch (e) {
    return;
  }
  comments.value = commentResults;
}

function updateCommenting(id: string) {
  editing.value = id;
}

function makeReply(id: string) {
  replying.value = id;
}

onBeforeMount(async () => {
  await getCommentsById();
});
</script>

<template>
  <p class="author">{{ props.post.author }}</p>
  <p class="postContent">{{ props.post.content }}</p>
  <div class="base">
    <menu>
      <menu v-if="props.post.author == currentUsername">
        <li><button class="btn-small pure-button" @click="emit('editPost', props.post._id)">Edit</button></li>
        <li><button class="button-error btn-small pure-button" @click="deletePost">Delete</button></li>
      </menu>
      <button class="btn-small pure-button">Comment</button>
      <button class="btn-small pure-button" @click="router.push(`/resourceSelect`)">Add Post To Folder</button>
    </menu>
    <article class="timestamp">
      <p v-if="props.post.dateCreated !== props.post.dateUpdated">Edited on: {{ formatDate(props.post.dateUpdated) }}</p>
      <p v-else>Created on: {{ formatDate(props.post.dateCreated) }}</p>
    </article>
  </div>
  <section v-if="comments.length !== 0">
    <h4>Comments:</h4>
    <article v-for="comment in comments" :key="comment._id">
      <CommentComponent v-if="editing !== comment._id && replying !== comment._id && replying !== props.post._id" :comment="comment" @editComment="updateCommenting" />
      <CreateCommentForm v-else-if="replying === comment._id || replying !== props.post._id" :comment="comment" @replyComment="makeReply" @refreshComments="getCommentsById" />
      <EditCommentForm v-else-if="editing === comment._id" :comment="comment" @editComment="updateCommenting" @refreshComments="getCommentsById" />
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
