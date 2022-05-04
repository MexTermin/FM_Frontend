<template>
    <section class="h-screen gradient-form bg-gray-200 md:h-screen">
        <div class="sidebar">
            <Sidebar :userName="userName" :imgProfile="imgProfile" :isAdult="true" />
        </div>
        <div class="container py-12 px-6 h-5/6 w-5/6 ml-auto">
            <div class="flex justify-center items-center flex-wrap h-full g-6 text-gray-800 ">
                <div class="w-3/6">
                    <Loader v-if="loading" />
                    <div class="block bg-white shadow-lg rounded-lg w-full">
                        <div class="lg:flex lg:flex-wrap g-0 flex justify-center items-center">
                            <div class="lg:w-5/6 px-4 md:px-0">
                                <div class="md:p-4 md:mx-6">
                                    <div class="text-center">
                                        <img class="mx-auto w-48" :src="imgProfile" alt="logo" />
                                        <h4 class="text-xl font-semibold mt-1 mb-6 pb-1">Editar presupuesto</h4>
                                    </div>
                                    <form>
                                        <span class="text-center text-rose-500 mx-auto block" v-if="msg">
                                            {{ msg }}
                                        </span>
                                        <span class="text-center text-lime-600 mx-auto block" v-if="msgSuccess">
                                            {{ msgSuccess }}
                                        </span>
                                        <div class="mb-4">
                                            <span class="text-center pl-1">Fecha:</span>
                                            <input v-model="date" type="month"
                                                class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                id="date" placeholder="Fecha" name="date" />
                                        </div>
                                        <div class="text-center pt-1 mb-12 pb-1">
                                            <button v-on:click="ActualizarBudget"
                                                class="btn_fm-primary inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                                                type="button" data-mdb-ripple="true" data-mdb-ripple-color="light">
                                                Actualizar
                                            </button>
                                            <a :href="`/budget-management`"
                                                class="bg-red-800 inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                                                type="button" data-mdb-ripple="true" data-mdb-ripple-color="light">
                                                Cancelar
                                            </a>
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
import Sidebar from "../components/Sidebar.vue";
import imgProfile from "../img/account_circle_black.svg";
import Loader from "../components/Spinner.vue"
import Router from "../Routers/Router"
import Axios from "axios"
import { getUserInfo } from "../Utils/utils"
import { onMounted, ref } from "vue";
import "../types/TypesApi"

// Props
interface Props {
    imgProfile: string;
}

defineProps<Props>();

// Contants
const { VITE_FM_API_URL } = import.meta.env;

const date = ref<string>(null!);
const id = ref<number>(null!);

const loading = ref(false);
const msg = ref<string>(null!);
const msgSuccess = ref<string>(null!);
const user = ref<any>();

const userName = ref("");

// Functions
onMounted(async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const url: string = `${VITE_FM_API_URL}/budget/${urlParams.get("id")}`;
    let result = await Axios.get(url);
    const month = (result.data.body.month as Number) < 10
        ? `0${result.data.body.month}`
        : result.data.body.month;

    date.value = `${result.data.body.year}-${month}`;
    id.value = Number(urlParams.get("id"));

    user.value = (await getUserInfo()).body;
    userName.value = user.value.name;

});

async function ActualizarBudget() {
    const url: string = `${VITE_FM_API_URL}/budget`;
    msgSuccess.value = null!;
    const body = {
        "id": id.value,
        "year": date.value.split("-")[0],
        "month": date.value.split("-")[1],
    }

    if (!date.value) {
        msg.value = "Llene todos los campos correctamente"
        return
    }

    loading.value = true

    const data = await fetch(url, {
        body: JSON.stringify(body),
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
        }
    })

    const result = (await data.json()) as DataResponse;
    if (data.ok) {
        msg.value = null!;
        msgSuccess.value = "Presupuesto actualizado correctamente"
        Router.push({ name: "BudgetManagement" });

    } else {
        if (result.error) msg.value = result.message;
        else msg.value = "No se ha podido actualizar el presupuesto";
    }

    loading.value = false
}
</script>
