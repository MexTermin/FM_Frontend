<template>
  <div class="home-container w-screen h-screen">
    <Sidebar :imgProfile="imgProfile" :userName="userName" />
  </div>
</template>

<script lang="ts" setup>
import Sidebar from "../components/Sidebar.vue";

interface Props {
  imgProfile: string;
  userName: string;
}

defineProps<Props>();
</script>

<style>
.home-container{
  background-color:var(--secundary-color);
}
</style>
