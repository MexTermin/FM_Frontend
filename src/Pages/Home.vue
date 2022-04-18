<template>
  <Sidebar :imgProfile="imgProfile" :userName="userName" />
</template>

<script lang="ts" setup>
import Sidebar from "../components/Sidebar.vue";

interface Props {
  imgProfile: string;
  userName: string;
}

defineProps<Props>();
</script>
