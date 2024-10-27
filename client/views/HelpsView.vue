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
    <h2>Welcome to the HelloUSA app!</h2>
    <p>There are a couple of key things that you will need to know in order to use this app to its full potential.</p>
    <h3>What can you do on HelloUSA?</h3>
    <div>
      <li>Make posts and comments</li>
      <li>Create saved folders that can hold saved resources (posts)</li>
      <li>Create and join user groups based on your interests</li>
      <li>Find other users nearby using the Community Map</li>
      <li>Receive milestones for using certain features of the app!</li>
    </div>

    <h3>What are milestones?</h3>
    <p>Milestones are badges that you can earn when you perform an action on the app. (ie make a post)</p>
    <h4>There are a couple milestones you can earn. Let's go through them:</h4>
    <div>
      <li>Getting Started: Created Account - You get this milestone when you create an account with HelloUSA.</li>
      <li>Building Community - You get this milestone when you join a user group for the first time.</li>
      <li>Branching Out - You get this milestone when you search for nearby users for the first time.</li>
      <li>Post Superstar - You get this milestone when you make your first post.</li>
      <li>Comment Guru - You get this milestone when you make your first comment.</li>
    </div>

    <h3>Things to Know!</h3>
    <h4><i>Milestones are a way to gain access to features on the app.</i></h4>
    <p>Before you can create a user group of your own, <strong>YOU MUST HAVE POSTED AND COMMENTED AT LEAST ONCE!</strong></p>

    <h3>Now that you know the basics of HelloUSA, it is time to explore the app!</h3>
  </main>
</template>

<style scoped>
h1 {
  text-align: center;
  margin-bottom: 0.5em;
}

main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  text-align: center;
}

li {
  padding: 10px;
}
</style>
