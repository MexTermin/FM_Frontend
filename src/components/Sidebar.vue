<template>
  <div class=" w-1/5 h-full shadow-md bg-white absolute" id="sidenavSecExample">
    <div class="pt-4 pb-2 px-6">
      <a href="#!">
        <div class="flex items-center">
          <div class="shrink-0">
            <img :src="imgProfile" class="rounded-full w-10" alt="Avatar" />
          </div>
          <div class="grow ml-3">
            <p class="text-sm font-semibold text-blue-600">{{ userName }}</p>
          </div>
        </div>
      </a>
    </div>
    <ul class="relative px-1">
      <li class="relative">
        <a class="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out"
          href="#!">
          <span>Presupuestos</span>
        </a>
      </li>
      <li class="relative" id="sidenavSecEx2">
        <a
          class="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer">
          <span>Estimaciones</span>
        </a>
      </li>
      <li class="relative" id="sidenavSecEx3">
        <a
          class="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer">
          <span>Perfil</span>
        </a>
        <a class="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer"
          href="/gestion-usuario">
          <span>Gestionar Usuarios</span>
        </a>
      </li>
    </ul>
    <div class="text-center bottom-0 absolute w-full">
      <hr class="m-0" />
      <!-- <p class="py-2 text-sm text-gray-700">tailwind-elements.com</p> -->
    </div>
  </div>
</template>

<script lang="ts" setup>

interface Props {
  userName: string;
  imgProfile: string;
}

defineProps<Props>();

</script>
