<template>
    <section class="h-screen gradient-form bg-gray-200 md:h-screen">
        <div class="sidebar">
            <Sidebar :userName="userName" :imgProfile="imgProfile" :isAdult="true"/>
        </div>
        <div class="container py-3 px-2 h-full w-5/6 ml-auto">
            <div class="flex justify-center items-center flex-wrap h-full g-6 text-gray-800 ">
                <div class="sm:w-6/12">
                    <Loader v-if="isLoading" />
                    <AlertWarning :text="msg" v-if="showAlert" @close="showAlert = false" />
                    <div class="block bg-white shadow-lg rounded-lg ">
                        <div class="lg:flex lg:flex-wrap g-0 flex justify-center items-center">
                            <div class="lg:w-11/12 px-4 md:px-0">
                                <div class="md:p-5 md:mx-6">
                                    <div class="text-center">
                                        <img class="mx-auto w-48" :src="imgProfile" alt="logo" />
                                        <h4 class="text-xl font-semibold mt-1 mb-12 pb-1">Crear presupuesto anual</h4>
                                    </div>
                                    <form>
                                        <div class="mb-4">
                                            <input v-model="agno" type="text"
                                                class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                id="agno" placeholder="Año" name="agno" />
                                        </div>
                                        <div class="text-center pt-1 mb-12 pb-1">
                                            <button v-on:click="CreateBudget" id="btn-guardar"
                                                class="inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                                                type="button" data-mdb-ripple="true" data-mdb-ripple-color="light">
                                                Guardar
                                            </button>
                                            <button @click='Router.push({ name: "BudgetManagement" })'
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
    </section>
</template>

<script lang="ts" setup>
// Imports
import AlertWarning from "../components/CustomAlerts/Warning.vue";
import imgProfile from "../img/account_circle_black.svg";
import Router from "../Routers/Router"
import Sidebar from "../components/Sidebar.vue";
import Loader from "../components/Spinner.vue";
import { ref, onMounted } from "vue";
import { computed } from "@vue/reactivity";
import { getUserInfo } from "../Utils/utils"
import "../types/TypesApi"

// Constans(Properties)
const { VITE_FM_API_URL } = import.meta.env;
// --- Current page
const agno = ref<string>(null!);
// --- Notifications
const msg = ref<string>(null!);
const showAlert = ref(false);
// --- Loader
const loading = ref(false);
const isLoading = computed(() => loading.value === true);
/// --- Current login user
const user = ref<any>();
const userName = ref("");

// Props
interface Props {
    imgProfile: string;
}

defineProps<Props>();

// Funnctions
onMounted(async () => {
    user.value = (await getUserInfo()).body;
    userName.value = user.value.name;

})

async function CreateBudget() {
    const url: string | undefined = `${VITE_FM_API_URL}/budgetyears`;
    const body = {
        "year": agno.value

    }
    if (!agno.value) {
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

    const result = (await data.json()) as DataResponse;

    if (data.ok) {
        agno.value = null!;
        msg.value = null!;
        showAlert.value = true;
        Router.push({ name: "BudgetManagement" });

    } else {
        if (result.error) msg.value = result.message;
        else msg.value = "No se ha podido crear el presupuesto";
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
ñ