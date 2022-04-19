<template>
  <div class="sidenav-container w-1/6 h-full shadow-md absolute" id="sidenav">
    <div class="pt-4 pb-2 px-6">
      <a href="#!">
        <div class="flex items-center">
          <div class="shrink-0">
            <img :src="imgProfile" class="rounded-full w-12" alt="Avatar" />
          </div>
          <div class="grow ml-3">
            <p class="text-xl font-semibold text-white">{{ userName }}</p>
          </div>
        </div>
      </a>
    </div>
    <ul class="relative px-1">
      <li class="relative">
        <a class="flex items-center text-lg py-4 px-6 h-12 overflow-hidden text-white text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out"
          href="/">
          <span>Inicio</span>
        </a>
      </li>
      <li class="relative">
        <a class="flex items-center text-lg py-4 px-6 h-12 overflow-hidden text-white text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out"
          href="#!">
          <span>Presupuestos</span>
        </a>
      </li>
      <li class="relative" id="sidenavSecEx2">
        <a
          class="flex items-center text-lg py-4 px-6 h-12 overflow-hidden text-white text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer">
          <span>Estimaciones</span>
        </a>
      </li>
      <li class="relative" id="sidenavSecEx3">
        <a
          href="/profile"
          class="flex items-center text-lg py-4 px-6 h-12 overflow-hidden text-white text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer">
          <span>Perfil</span>
        </a>
        <a class="flex items-center text-lg py-4 px-6 h-12 overflow-hidden text-white text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer"
          href="/gestion-usuario">
          <span>Gestionar Usuarios</span>
        </a>
      </li>
      <li class="relative" id="sidenavSecEx2">

      </li>
    </ul>
    <div class="text-center bottom-0 absolute w-full">
      <hr class="m-0" />
      <a
      href="/login"
        class="flex items-center text-lg py-4 px-6 h-12 overflow-hidden text-white text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer">
        <span>Salir</span>
      </a>
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

<style>
.sidenav-container {
  background-color: var(--primary-color);
}
</style>