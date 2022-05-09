<template>
    <Loader v-if="loading" />
    <div
        class="fixed w-screen h-screen bg-black/75 backdrop-blur-sm top-0 left-0 flex items-center justify-center z-10">
        <div class="estimate-container fixed left-1/4 top-1/4 w-4/6 p-3 shadow-lg shadow-gray-500/50">
            <!-- Modals region -->
            <SuccessAlert :text="msg" v-if="showSuccessAlert" @close="showSuccessAlert = false" />
            <WarnignAlert :text="msg" v-if="showErrorAlert" @close="showErrorAlert = false" />
            <Modal :show="showModal" text="¿Deseas eliminar esta estimación?" btnColor="red"
                @confirm="deleteEstimate(estimateId, estimateIndex)" @close="showModal = false" />
            <CreateEstimateVue v-if="canCreateEstimate" @close="canCreateEstimate = false" :idBudget="idBudget"
                @estimateData="insertEstimate" />
            <!--- End region-->
            <div class="flex justify-end">
                <button type="button" @click="$emit('close')"
                    class="text-red-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clip-rule="evenodd"></path>
                    </svg>
                </button>
            </div>
            <div class="flex flex-col w-6/6 ml-auto">
                <div class="overflow-x-auto mx-1">
                    <h3 class="text-3xl	 text-center mt-4">Estimaciones</h3>
                    <div class="py-4 inline-block min-w-full ">
                        <div class="overflow-hidden">
                            <table class="min-w-full text-center">
                                <thead class="border-b  td-head">
                                    <tr>
                                        <th scope="col" class="text-lg font-medium text-white px-3 py-4">
                                            Plan
                                        </th>
                                        <th scope="col" class="text-lg font-medium text-white px-3 py-4">
                                            Categoría
                                        </th>
                                        <th scope="col" class="text-lg font-medium text-white px-3 py-4">
                                            Gasto
                                        </th>
                                        <th scope="col" class="text-lg font-medium text-white px-3 py-4">
                                            Ingreso
                                        </th>
                                        <th scope="col" class="text-lg font-medium text-white px-3 py-4">
                                            Opciones
                                        </th>
                                    </tr>
                                </thead>
                                <tbody class="max-w-xs">
                                    <tr v-for="(item, index) in estimates" :key="index" class="bg-slate-50 border-b">
                                        <td class="text-lg text-gray-900 font-light px-1 py-4 whitespace-nowrap">
                                            {{ item.plan }}
                                        </td>
                                        <td class="text-lg text-gray-900 font-light px-1 py-4 whitespace-nowrap">
                                            {{ item.category.name }}
                                        </td>
                                        <td class="text-lg text-gray-900 font-light px-1 py-4 whitespace-nowrap">
                                            <span v-for="(income, index) in item.income">
                                                {{ income.income.amount }}
                                                <span
                                                    v-if="(income.income as Array<any>)?.length > 1 && (item.income as Array<any>)?.length > index">
                                                    ,
                                                </span>
                                            </span>

                                        </td>
                                        <td class="text-lg text-gray-900 font-light px-1 py-4 whitespace-nowrap">
                                            <span v-for="(spent, index) in item.expenses">
                                                {{ spent.spent.amount }}
                                                <span
                                                    v-if="(spent.spent as Array<any>)?.length > 1 && (item.spent as Array<any>)?.length > index">
                                                    ,
                                                </span>
                                            </span>
                                        </td>
                                        <td class="text-lg text-gray-900 font-light px-1 py-4 whitespace-nowrap">
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
                        <div class="flex pt-2" v-if="estimates?.length === 0">
                            <button @click="canCreateEstimate = true"
                                class="inline-block px-6 py-2.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out">
                                Añadir
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
// Imports
import SuccessAlert from "./CustomAlerts/Success.vue"
import WarnignAlert from "./CustomAlerts/Warning.vue"
import CreateEstimateVue from "./CreateEstimate.vue";
import Modal from "./Modal.vue"
import Loader from "./Spinner.vue"
import { getUserInfo } from "../Utils/utils"
import { ref, onMounted } from "vue"
import Axios from "axios"

// Props
interface Props {
    idBudget: number;
}

let props = defineProps<Props>();

// Contants
const { VITE_FM_API_URL } = import.meta.env;
// --- Current user constants
const user = ref<any>();
const userName = ref("");
const loading = ref(false);
// --- Current Pages constants
const estimates = ref<Array<any>>();
const estimateId = ref<number>(0);
const estimateIndex = ref<number>(0);
const canCreateEstimate = ref(false);
// ---- Notifications
const msg = ref("");
const showModal = ref(false);
const showSuccessAlert = ref(false);
const showErrorAlert = ref(false);

// Functions
onMounted(async () => {
    loading.value = true;

    const url: string = `${VITE_FM_API_URL}/estimate/budget/${props.idBudget}`;
    let estimateData = await Axios.get(url);
    estimates.value = estimateData.data.body;

    console.log(estimates.value)

    // Current login user data
    user.value = (await getUserInfo()).body;
    userName.value = user.value.name;

    loading.value = false;
})

function openModal(id: number, index: number) {
    estimateId.value = id;
    estimateIndex.value = index;
    showModal.value = true;
}

async function deleteEstimate(id: any, index: number) {
    loading.value = true;
    const url: string = `${VITE_FM_API_URL}/estimate?idEntity=${id}`;
    try {
        let result = await Axios.delete(url)
        if (result?.status == 200) {
            estimates.value?.splice(index, 1);
            msg.value = "Estimación eliminada correctamente";
            showSuccessAlert.value = true;
            showErrorAlert.value = false;
        }
    }
    catch {
        msg.value = "No se ha podido eliminar la estimación";
        showSuccessAlert.value = false;
        showErrorAlert.value = true;
    }
    loading.value = false;
}

function insertEstimate(estimate: any) {
    estimates.value?.push(estimate)
}

</script>

<style>
.estimate-container {
    background-color: var(--secundary-color);
}
</style>
