<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { fetchy } from "@/utils/fetchy";
import LocationOptForm from "@/components/Mapping/LocationOptForm.vue";
import SearchLocationForm from "@/components/Mapping/SearchLocationForm.vue";
import LocationUserComponent from "@/components/Mapping/LocationUserComponent.vue";
import { onBeforeMount, ref } from "vue";
import LocationUpdateForm from "@/components/Mapping/LocationUpdateForm.vue";

const { isLoggedIn } = storeToRefs(useUserStore());

const loaded = ref(false);
let users = ref<Array<Record<string, string>>>([]);
const city = ref("");
const selectedState = ref("");
const userLocation = ref("");
const printCity = ref("");
const printState = ref("");

async function getNearbyUsers(cityParam: string, stateParam: string) {
  let nearbyUsers;
  try {
    nearbyUsers = await fetchy("/api/maps", "GET", { query: { city: cityParam, state: stateParam } });
  } catch (e) {
    return;
  }
  users.value = nearbyUsers;
  city.value = cityParam;
  selectedState.value = stateParam;
}

async function getCurrentLocation() {
  let location;
  try {
    location = await fetchy("/api/maps/currentLocation", "GET");
  } catch (e) {
    userLocation.value = null;
    return;
  }

  userLocation.value = location;
  printCity.value = userLocation.value.map.city.toUpperCase();
  printState.value = userLocation.value.map.state.toUpperCase();
}

onBeforeMount(async () => {
  await getCurrentLocation();
  loaded.value = true;
});
</script>

<template>
  <section v-if="isLoggedIn && !userLocation">
    <h2>Opt In Your Location:</h2>
    <LocationOptForm @refreshLocation="getCurrentLocation" />
  </section>
  <section v-else-if="isLoggedIn && userLocation">
    <h2>Adjust your current Opted-In Location: {{ printCity }}, {{ printState }}</h2>
    <LocationUpdateForm @refreshLocation="getCurrentLocation" />
  </section>
  <div class="row">
    <div class="leftRow">
      <h2 v-if="city && selectedState">Users Nearby You:</h2>
      <h2 v-else>Search to Find Nearby Users</h2>
      <section class="users" v-if="loaded && users.length !== 0 && userLocation">
        <article v-for="user in users.map" :key="user._id">
          <LocationUserComponent :user="user" @refreshLocation="getCurrentLocation" />
        </article>
      </section>
      <p v-else-if="loaded">No users found</p>
      <p v-else>Loading...</p>
    </div>
    <div class="rightRow">
      <SearchLocationForm @getNearbyUsers="getNearbyUsers" />
    </div>
  </div>
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

.users {
  padding: 1em;
  width: 40em;
}

.row {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 60em;
  gap: 2em;
}

.leftRow {
  width: 20em;
}

.rightRow {
  display: flex;
  justify-content: flex-end;
  align-items: start;
}
</style>
