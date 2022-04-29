<template>
  <div class="home-container w-screen h-screen">
    <Sidebar :imgProfile="imgProfile" :userName="userName" :isAdult="isAdult"/>
  </div>
</template>

<script lang="ts" setup>
// Imports
import Sidebar from "../components/Sidebar.vue";
import { getUserInfo } from "../Utils/utils"
import { ref, onMounted } from "vue"

// Props
interface Props {
  imgProfile: string;
}
defineProps<Props>();

// Contants
const user = ref<any>();
const userName = ref("");
const isAdult = ref(false);

// Functions
onMounted(async () => {
  user.value = (await getUserInfo()).body;
  userName.value = user.value.name;
  isAdult.value = (user.value.rol.rol_type as string).toLowerCase() == 'adulto';
})

</script>

<style>
.home-container {
  background-color: var(--secundary-color);
}
</style>
