<template>
    <div class="gestion_usuario-container w-screen h-screen">
        <div class="sidebar">
            <Sidebar userName="Yael" :imgProfile="imgProfile" />
        </div>
        <SuccessAlert :text="msg" v-if="showSuccessAlert" @close="showSuccessAlert = false" />
        <WarnignAlert :text="msg" v-if="showErrorAlert" @close="showErrorAlert = false" />
        <Loader v-if="loading" />
        <Modal :show="showModal" text="¿Deseas eliminar este usuario?" btnColor="red"
            @confirm="deleteUser(userId, userIndex)" @close="showModal = false" />
        <div class="flex flex-col w-5/6 ml-auto">
            <div class="overflow-x-auto mx-1">
                <h3 class="text-3xl	 text-center mt-4">Gestion de usuarios</h3>
                <div class="flex fixed bottom-5 right-5">
                    <a href="/create"
                        class="inline-block px-6 py-2.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out">
                        Crear
                    </a>
                </div>
                <div class="py-4 inline-block min-w-full ">
                    <div class="overflow-hidden">
                        <table class="min-w-full text-center">
                            <thead class="border-b  td-head">
                                <tr>
                                    <th scope="col" class="text-lg font-medium text-white px-3 py-4">
                                        Nombre
                                    </th>
                                    <th scope="col" class="text-lg font-medium text-white px-3 py-4">
                                        Apellido
                                    </th>
                                    <th scope="col" class="text-lg font-medium text-white px-3 py-4">
                                        Correo
                                    </th>
                                    <th scope="col" class="text-lg font-medium text-white px-3 py-4">
                                        Rol
                                    </th>
                                    <th scope="col" class="text-lg font-medium text-white px-3 py-4">
                                        Opciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in usuarios" :key="index" class="bg-slate-50 border-b">
                                    <td class="text-lg text-gray-900 font-light px-1 py-4 whitespace-nowrap">
                                        {{ item.name }}
                                    </td>
                                    <td class="text-lg text-gray-900 font-light px-1 py-4 whitespace-nowrap">
                                        {{ item.lastname }}
                                    </td>
                                    <td class="text-lg text-gray-900 font-light px-1 py-4 whitespace-nowrap">
                                        {{ item.email }}
                                    </td>
                                    <td class="text-lg text-gray-900 font-light px-1 py-4 whitespace-nowrap">
                                        {{ item.rol?.rol_type }}
                                    </td>
                                    <td class="text-lg text-gray-900 font-light px-1 py-4 whitespace-nowrap">
                                        <a :href="`/editar-usuario/?id=${item.id}`"
                                            class="inline-block mr-2 px-6 py-2.5 bg-blue-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-500 hover:shadow-lg focus:bg-blue-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-600 active:shadow-lg transition duration-150 ease-in-out">
                                            Editar
                                        </a>
                                        <button
                                            class="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
                                            type="button" v-on:click='openModal(item.id, index)'>
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script lang="ts" setup>
// Imports
import Sidebar from "../components/Sidebar.vue";
import SuccessAlert from "../components/CustomAlerts/Success.vue"
import WarnignAlert from "../components/CustomAlerts/Success.vue"
import { onMounted, ref } from "vue";
import Axios from "axios"
import Modal from "../components/Modal.vue"
import Loader from "../components/Spinner.vue"

// Props
interface Props {
    imgProfile: string;
    userName: string;
}

defineProps<Props>();

// Constans
const userId = ref<number>(0);
const userIndex = ref<number>(0);
const usuarios = ref<Array<any>>([]);
const loading = ref(false);
const showSuccessAlert = ref(false);
const showErrorAlert = ref(false);
const msg = ref("");
const { VITE_FM_API_URL } = import.meta.env;

// Functions
onMounted(async () => {
    loading.value = true;
    const url: string | undefined = `${VITE_FM_API_URL}/user`;
    let users = await Axios.get(url);
    usuarios.value = users.data.body;
    loading.value = false;
})

async function deleteUser(id: any, index: number) {
    loading.value = true;
    const url: string | undefined = `${VITE_FM_API_URL}/user?idEntity=${id}`;
    try {
        let result = await Axios.delete(url)
        if (result?.status == 200) {
            usuarios.value.splice(index, 1);
            msg.value = "Usuario eliminado correctamente";
            showSuccessAlert.value = true;
            showErrorAlert.value = false;
        }
    }
    catch {
        msg.value = "No se ha podido eliminar el usuario";
        showSuccessAlert.value = false;
        showErrorAlert.value = true;
    }
    loading.value = false;
}

const showModal = ref(false);

function openModal(id: number, index: number) {
    userId.value = id;
    userIndex.value = index;
    showModal.value = true;
}

</script>

<style>
.gestion_usuario-container {
    background-color: var(--secundary-color);
}

.td-head {
    background-color: var(--primary-color);
}
</style>