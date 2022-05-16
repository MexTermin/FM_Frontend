<template>
    <Loader v-if="loading" />
    <div class="fixed w-screen h-screen top-0 left-0 flex items-center justify-center z-20 backdrop-blur-sm">
        <div class="fixed left-1/4 w-4/6 p-3">
            <div class="flex justify-center items-center flex-wrap h-full g-6 text-gray-800 ">
                <div class="sm:w-6/12">
                    <AlertWarning :text="msg" v-if="showAlert" @close="showAlert = false" />
                    <div class="block bg-white shadow-lg rounded-lg ">
                        <div class="lg:flex lg:flex-wrap g-0 flex justify-center items-center">
                            <div class="lg:w-11/12 px-4 md:px-0">
                                <div class="md:p-5 md:mx-6">
                                    <div class="text-center">
                                        <h4 class="text-xl font-semibold mt-3 mb-8 pb-1">Crear transación</h4>
                                    </div>
                                    <form>
                                        <div class="mb-4">
                                            <span>Importe</span>
                                            <input v-model="amount" type="number"
                                                class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                id="amount" placeholder="Importe" name="amount" />
                                            <span>Descripción</span>
                                            <input v-model="description" type="text"
                                                class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                id="description" placeholder="Descripción" name="description" />
                                            <span>Tipo</span>
                                            <div class="mb-4 w-100 d-flex justify-center ">
                                                <div class="inline-block w-fit mr-4">
                                                    <input checked type="radio" class="mr-2" id="ingreso" name="tipo" value="1"
                                                        @click="tipo = 'ingreso'" />
                                                    <label for="ingreso">Ingreso</label>
                                                </div>
                                                <div class="inline-block w-fit">
                                                    <input type="radio" class="mr-2" id="gasto" name="tipo" value="2"
                                                        @click="tipo = 'gasto'" />
                                                    <label for="gasto">Gasto</label>
                                                </div>
                                            </div>
                                            <span>Cantidad</span>
                                            <input v-model="tipoAmount" type="number"
                                                class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                id="amount" placeholder="Cantidad" name="amount" />
                                            <span>Seleccione una Categoría</span>
                                            <select v-model="categoryId" name="categoryId" id="categoryId"
                                                class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none">
                                                <option disabled value="">Seleccione una Categoría</option>
                                                <option v-for="option in categories" :value="option.id">
                                                    {{ option.name }}
                                                </option>
                                            </select>
                                        </div>
                                        <div class="text-center pt-1 mb-12 pb-1">
                                            <button v-on:click="CreateTransaction" id="btn-guardar"
                                                class="inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                                                type="button" data-mdb-ripple="true" data-mdb-ripple-color="light">
                                                Guardar
                                            </button>
                                            <button @click="$emit('close')"
                                                class="bg-red-800 inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                                                type="button" data-mdb-ripple="true" data-mdb-ripple-color="light">
                                                Cancelar
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
// Imports
import AlertWarning from "../components/CustomAlerts/Warning.vue";
import { ref, onMounted } from "vue";
import { computed } from "@vue/reactivity";
import { getUserInfo } from "../Utils/utils"
import "../types/TypesApi"
import Axios from "axios"
import Loader from "./Spinner.vue"

// Constans(Properties)
const { VITE_FM_API_URL } = import.meta.env;
// --- Current page
const categoryId = ref(0);
const amount = ref(0); // Importe
const tipo = ref('ingreso');
const tipoAmount = ref(0);
const description = ref("");
const categories = ref<any>();
// --- Notifications
const msg = ref<string>(null!);
const showAlert = ref(false);
// --- Loader
const loading = ref(false);
const isLoading = computed(() => loading.value === true);
/// --- Current login user
const user = ref<any>();
const userName = ref("");

const emits = defineEmits(['close', "transactionData"])

// Props
interface Props {
    idBudget: number;
}
let props = defineProps<Props>();

// Funnctions
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

async function CreateTransaction() {
    const url: string = `${VITE_FM_API_URL}/transaction`;
    const body = {
        "amount": amount.value,
        "id_category": categoryId.value,
        "id_budget": props.idBudget,
        "description": description.value,
        "expenses": null as null | { amount: number }[],
        "income": null as null | { amount: number }[]
    }

    if (tipo.value == "gasto") body.expenses = [{ "amount": tipoAmount.value }];
    else if (tipo.value == "ingreso") body.income = [{ "amount": tipoAmount.value }];

    if (!amount.value || !categoryId.value || !tipoAmount.value) {
        showAlert.value = true;
        msg.value = "Llene todos los campos correctamente";
        return;
    }

    loading.value = true;

    const data = await fetch(url, {
        body: JSON.stringify(body),
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        }
    })
    const estimateData = (await data.json()) as DataResponse;

    if (data.ok) {
        msg.value = "Creado correctamente";
        showAlert.value = true;
        emits("close");
        emits("transactionData", estimateData.body);

    } else {
        if (estimateData.error) msg.value = estimateData.message;
        else msg.value = "No se ha podido crear la transación";
        showAlert.value = true;
    }

    loading.value = false
}

</script>

<style>
#btn-guardar {
    background-color: var(--primary-color);
}
</style>
