<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
const { currentUsername, isLoggedIn } = storeToRefs(useUserStore());
const route = useRoute();
</script>

<template>
  <main>
    <h1>HelloUSA Tutorial</h1>
    <p>Welcome to the HelloUSA app!</p>
    <p>There are a couple of key things that you will need to know in order to use this app to its full potential.</p>
    <h4>What can you do on HelloUSA?</h4>
    <div>
      <li>Create saved folders that can hold saved resources (posts and comments)</li>
      <li>Create and join user groups based on your interests</li>
      <li>Find other users nearby using the Community Map</li>
      <li>Receive milestones for using certain features of the app!</li>
    </div>

    <h4>What are milestones?</h4>
    <p>Milestones are badges that you can earn when you perform an action on the app. (ie make a post)</p>
    <p>There are a couple milestones you can earn. Let's go through them:</p>
    <div>
      <li>Getting Started: Created Account - You get this milestone when you create an account with HelloUSA.</li>
      <li>Building Community - You get this milestone when you join a user group.</li>
      <li>Branching Out - You get this milestone when you create a user group.</li>
      <li>Post Superstar - You get this milestone when you make your first post.</li>
      <li>Comment Guru - You get this milestone when you make your first comment.</li>
    </div>
  </main>
</template>

<style scoped>
h1 {
  text-align: center;
}
</style>
