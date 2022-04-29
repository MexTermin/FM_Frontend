<template>
    <div class="category-container w-screen h-screen">
        <SuccessAlert :text="msg" v-if="showSuccessAlert" @close="showSuccessAlert = false" />
        <WarnignAlert :text="msg" v-if="showErrorAlert" @close="showErrorAlert = false" />
        <Sidebar :imgProfile="imgProfile" :userName="userName" />
        <Loader v-if="loading" />
        <Modal :show="showModal" text="¿Deseas eliminar esta categoría?" btnColor="red"
            @confirm="deleteCategory(categoryId, categoryIndex)" @close="showModal = false" />
        <div class="flex flex-col w-5/6 ml-auto">
            <div class="overflow-x-auto mx-1">
                <div class="flex fixed bottom-5 right-5">
                    <a href="/create-category"
                        class="inline-block px-6 py-2.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out">
                        Crear
                    </a>
                </div>
                <h3 class="text-3xl	 text-center mt-4">Categorias</h3>
                <div class="py-4 inline-block min-w-full ">
                    <div class="overflow-hidden">
                        <table class="min-w-full text-center">
                            <thead class="border-b  td-head">
                                <tr>
                                    <th scope="col" class="text-lg font-medium text-white px-3 py-4">
                                        Nombre
                                    </th>
                                    <th scope="col" class="text-lg font-medium text-white px-3 py-4">
                                        Opciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in categories" :key="index" class="bg-slate-50 border-b">
                                    <td class="text-lg text-gray-900 font-light px-1 py-4 whitespace-nowrap">
                                        {{ item.name }}
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
import SuccessAlert from "../components/CustomAlerts/Success.vue"
import WarnignAlert from "../components/CustomAlerts/Warning.vue"
import Sidebar from "../components/Sidebar.vue";
import Modal from "../components/Modal.vue"
import Loader from "../components/Spinner.vue"
import { getUserInfo } from "../Utils/utils"
import { ref, onMounted } from "vue"
import Axios from "axios"

// Props
interface Props {
    imgProfile: string;
}
defineProps<Props>();

// Contants
const { VITE_FM_API_URL } = import.meta.env;
// --- Current user constants
const user = ref<any>();
const userName = ref("");
const loading = ref(false);
// --- Current Pages constants
const categories = ref<any>();
const categoryId = ref<number>(0);
const categoryIndex = ref<number>(0);
// ---- Notifications
const msg = ref("");
const showModal = ref(false);
const showSuccessAlert = ref(false);
const showErrorAlert = ref(false);

// Functions
onMounted(async () => {
    loading.value = true;

    const url: string = `${VITE_FM_API_URL}/category`;
    let categoriesData = await Axios.get(url);
    categories.value = categoriesData.data.body;

    // Current login user data
    user.value = (await getUserInfo()).body;
    userName.value = user.value.name;

    loading.value = false;
})

function openModal(id: number, index: number) {
    categoryId.value = id;
    categoryIndex.value = index;
    showModal.value = true;
}

async function deleteCategory(id: any, index: number) {
    loading.value = true;
    const url: string = `${VITE_FM_API_URL}/category?idEntity=${id}`;
    try {
        let result = await Axios.delete(url)
        if (result?.status == 200) {
            categories.value.splice(index, 1);
            msg.value = "Categoría eliminada correctamente";
            showSuccessAlert.value = true;
            showErrorAlert.value = false;
        }
    }
    catch {
        msg.value = "No se ha podido eliminar la categoría";
        showSuccessAlert.value = false;
        showErrorAlert.value = true;
    }
    loading.value = false;
}

</script>

<style>
.category-container {
    background-color: var(--secundary-color);
}
</style>
