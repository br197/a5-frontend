<script setup lang="ts">
import CreatePostForm from "@/components/Post/CreatePostForm.vue";
import EditPostForm from "@/components/Post/EditPostForm.vue";
import PostComponent from "@/components/Post/PostComponent.vue";
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";

const { isLoggedIn } = storeToRefs(useUserStore());
const props = defineProps(["group"]);

const loaded = ref(false);
let posts = ref<Array<Record<string, string>>>([]);
let editing = ref("");
let groupName = ref();
async function getPostByGroup() {
  let postResults;
  try {
    postResults = await fetchy(`/api/groupPosts/${props.group.id}`, "GET");
  } catch (e) {
    return;
  }
  posts.value = postResults;
}

async function getGroupsById() {
  let groupResult;
  try {
    groupResult = await fetchy(`/api/groups/${props.group.id}`, "GET");
  } catch (e) {
    return;
  }
  groupName.value = groupResult.groupName;
}

function updateEditing(id: string) {
  editing.value = id;
}

onBeforeMount(async () => {
  await getPostByGroup();
  await getGroupsById();
  loaded.value = true;
});
</script>

<template>
  <section v-if="isLoggedIn">
    <h1>Welcome to the {{ groupName }} group!</h1>
    <h2>Create a post:</h2>
    <CreatePostForm :groupId="group.id" @refreshPosts="getPostByGroup" />
  </section>
  <section class="posts" v-if="loaded && posts.length !== 0">
    <article v-for="post in posts" :key="post._id">
      <PostComponent v-if="editing !== post._id" :post="post" @refreshPosts="getPostByGroup" @editPost="updateEditing" />
      <EditPostForm v-else :post="post" @refreshPosts="getPostByGroup" @editPost="updateEditing" />
    </article>
  </section>
  <p v-else-if="loaded">No posts found</p>
  <p v-else>Loading...</p>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  gap: 1em;
}

h1 {
  margin: auto;
  margin-top: 2em;
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

.posts {
  padding: 1em;
}

.row {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 60em;
}
</style>
