<template>
    <div class="budget-container w-screen h-screen">
        <SuccessAlert :text="msg" v-if="showSuccessAlert" @close="showSuccessAlert = false" />
        <WarnignAlert :text="msg" v-if="showErrorAlert" @close="showErrorAlert = false" />
        <Sidebar :imgProfile="imgProfile" :userName="userName" :isAdult="true" />
        <Loader v-if="loading" />
        <Modal :show="showModal" text="¿Deseas eliminar este presupuesto?" btnColor="red"
            @confirm="deleteBudget(budgetId, budgetIndex)" @close="showModal = false" />
        <EstimateManagementVue v-if="showEstimate" @close="showEstimate = false" :idBudget="budgetId" />
        <TransactionManagementVue v-if="showTransaction" @close="showTransaction = false" :idBudget="budgetId" />
        <div class="flex flex-col w-5/6 ml-auto">
            <div class="overflow-x-auto mx-1">
                <div class="flex fixed bottom-5 right-5">
                    <a href="/create-budget"
                        class="z-0 inline-block px-6 py-2.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out">
                        Crear
                    </a>
                </div>
                <h3 class="text-3xl	 text-center mt-4">Presupuestos</h3>
                <div class="py-4 inline-block min-w-full ">
                    <div class="overflow-hidden">
                        <table class="min-w-full text-center">
                            <thead class="border-b  td-head">
                                <tr>
                                    <th scope="col" class="text-lg font-medium text-white px-3 py-4">
                                        Mes
                                    </th>
                                    <th scope="col" class="text-lg font-medium text-white px-3 py-4">
                                        Año
                                    </th>
                                    <th scope="col" class="text-lg font-medium text-white px-3 py-4">
                                        Opciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in budgets" :key="index" class="bg-slate-50 border-b">
                                    <td class="text-lg text-gray-900 font-light px-1 py-4 whitespace-nowrap">
                                        {{ toMonthName(item.month) }}
                                    </td>
                                    <td class="text-lg text-gray-900 font-light px-1 py-4 whitespace-nowrap">
                                        {{ item.year }}
                                    </td>
                                    <td class="text-lg text-gray-900 font-light px-1 py-4 whitespace-nowrap">
                                        <a :href="`/edit-budget/?id=${item.id}`"
                                            class="inline-block mr-2 px-6 py-2.5 bg-blue-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-500 hover:shadow-lg focus:bg-blue-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-600 active:shadow-lg transition duration-150 ease-in-out">
                                            Editar
                                        </a>
                                        <a :href="`/details-budget/?id=${item.id}`"
                                            class="inline-block mr-2 px-6 py-2.5 bg-blue-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-500 hover:shadow-lg focus:bg-blue-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-600 active:shadow-lg transition duration-150 ease-in-out">
                                            Detalles
                                        </a>
                                        <button @click="budgetId = item.id; showEstimate = true;"
                                            class="inline-block mr-2 px-6 py-2.5 bg-blue-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-500 hover:shadow-lg focus:bg-blue-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-600 active:shadow-lg transition duration-150 ease-in-out">
                                            Estimación
                                        </button>
                                        <button @click="budgetId = item.id; showTransaction = true;"
                                            class="inline-block mr-2 px-6 py-2.5 bg-blue-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-500 hover:shadow-lg focus:bg-blue-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-600 active:shadow-lg transition duration-150 ease-in-out">
                                            Trasacciones
                                        </button>
                                        <button @click="generateReport(item.id)"
                                            class="inline-block mr-2 px-6 py-2.5 bg-blue-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-500 hover:shadow-lg focus:bg-blue-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-600 active:shadow-lg transition duration-150 ease-in-out">
                                            Reporte
                                        </button>
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
import EstimateManagementVue from "../components/EstimateManagement.vue";
import TransactionManagementVue from "../components/TransactionManagement.vue";
import Sidebar from "../components/Sidebar.vue";
import Modal from "../components/Modal.vue"
import Loader from "../components/Spinner.vue"
import { getUserInfo, toMonthName } from "../Utils/utils"
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
const budgets = ref<any>();
const budgetId = ref<number>(0);
const budgetIndex = ref<number>(0);
const showEstimate = ref(false);
const showTransaction = ref(false);
// ---- Notifications
const msg = ref("");
const showModal = ref(false);
const showSuccessAlert = ref(false);
const showErrorAlert = ref(false);

// Functions
onMounted(async () => {
    loading.value = true;

    const url: string = `${VITE_FM_API_URL}/budget`;
    let budgetsData = await Axios.get(url);
    budgets.value = budgetsData.data.body;

    // Current login user data
    user.value = (await getUserInfo()).body;
    userName.value = user.value.name;

    loading.value = false;
})

function openModal(id: number, index: number) {
    budgetId.value = id;
    budgetIndex.value = index;
    showModal.value = true;
}

async function deleteBudget(id: any, index: number) {
    loading.value = true;
    const url: string = `${VITE_FM_API_URL}/budget?idEntity=${id}`;
    try {
        let result = await Axios.delete(url)
        if (result?.status == 200) {
            budgets.value.splice(index, 1);
            msg.value = "Presupuesto eliminado correctamente";
            showSuccessAlert.value = true;
            showErrorAlert.value = false;
        }
    }
    catch {
        msg.value = "No se ha podido eliminar el presupuesto";
        showSuccessAlert.value = false;
        showErrorAlert.value = true;
    }
    loading.value = false;
}

async function generateReport(id: number) {
    loading.value = true;
    const url: string = `${VITE_FM_API_URL}/pdf/${id}`;
    const newWindow = window.open(
        '_blank',
    );
    const { data } = await Axios.get(url);
    const frame = newWindow?.document.createElement("iframe");
    if (frame && newWindow) {
        frame.style.width = "100vw";
        frame.style.height = "100vh";
        frame.style.border = "0px solid transparent";
        frame.src = `data:application/pdf;base64,${data.buffer}`;

        newWindow.document.body.style.padding = "0px";
        newWindow.document.body.style.margin = "0px";
        newWindow.document.body.appendChild(frame as Node);
    }
    loading.value = false;
}
</script>

<style>
.budget-container {
    background-color: var(--secundary-color);
}
</style>
