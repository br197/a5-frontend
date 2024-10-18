<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import BadgeComponent from "@/components/Milestone/BadgeComponent.vue";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";

const { isLoggedIn } = storeToRefs(useUserStore());

const loaded = ref(false);
let badges = ref<Array<Record<string, string>>>([]);

async function getBadges() {
  let query: Record<string, string> = author !== undefined ? { author } : {};
  let badgeResults;
  try {
    badgeResults = await fetchy("/api/milestones:id", "GET");
  } catch (_) {
    return;
  }
  badges.value = badgeResults;
}

onBeforeMount(async () => {
  await getBadges();
  loaded.value = true;
});
</script>

<template>
  <section class="badges" v-if="loaded && posts.length !== 0">
    <article v-for="b in badges" :key="b._id">
      <BadgeComponent v-if="editing !== b._id" :b="badge" @refreshPosts="getPosts" />
    </article>
  </section>
  <p v-else-if="loaded">No badges found</p>
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

.badges {
  padding: 1em;
}

.row {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 60em;
}
</style>
