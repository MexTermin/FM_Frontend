<template>
    <section class="h-screen gradient-form bg-gray-200 md:h-screen">
        <div class="sidebar">
            <Sidebar userName="Yael" :imgProfile="imgProfile" />
        </div>
        <div class="container py-5 px-6 h-full w-5/6 ml-auto">
            <div class="flex justify-center items-center flex-wrap h-full g-6 text-gray-800 ">
                <div class="sm:w-10/12">
                    <Loader v-if="isLoading" />
                    <AlertWarning :text="msg" v-if="showAlert" @close="showAlert = false" />
                    <div class="block bg-white shadow-lg rounded-lg ">
                        <div class="lg:flex lg:flex-wrap g-0 flex justify-center items-center">
                            <div class="lg:w-6/12 px-4 md:px-0">
                                <div class="md:p-12 md:mx-6">
                                    <div class="text-center">
                                        <img class="mx-auto w-48" :src="imgLogin" alt="logo" />
                                        <h4 class="text-xl font-semibold mt-1 mb-12 pb-1">Crear usuario</h4>
                                    </div>
                                    <form>
                                        <div class="mb-4">
                                            <input v-model="email" type="email" v-on:change="emailIsValid"
                                                class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                id="email" placeholder="Correo" name="email" />
                                        </div>
                                        <div class="mb-4">
                                            <input v-model="name" type="text"
                                                class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                id="name" placeholder="Nombres" name="name" />
                                        </div>
                                        <div class="mb-4">
                                            <input v-model="lastname" type="text"
                                                class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                id="lastname" placeholder="Apellidos" name="lastname" />
                                        </div>
                                        <div class="mb-4 w-100 d-flex justify-center ">
                                            <div class="inline-block w-fit mr-4">
                                                <input :checked="!isAdult" type="radio" class="mr-2" id="menor"
                                                    name="edad" value="1" @click="isAdult = false" />
                                                <label for="menor">Menor</label>
                                            </div>
                                            <div class="inline-block w-fit">
                                                <input :checked="isAdult" type="radio" class="mr-2" id="mayor"
                                                    name="edad" value="2" @click="isAdult = true" />
                                                <label for="mayor">Adulto</label>
                                            </div>
                                        </div>
                                        <div class="mb-4">
                                            <input v-model="pass" type="password"
                                                class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                id="pass" placeholder="Contraseña" name="pass" />
                                        </div>
                                        <div class="text-center pt-1 mb-12 pb-1">
                                            <button v-on:click="CreateUser" id="btn-guardar"
                                                class="inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                                                type="button" data-mdb-ripple="true" data-mdb-ripple-color="light">
                                                guardar
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
import Sidebar from "../components/Sidebar.vue";
import imgProfile from "../img/account_circle_black.svg";
import Loader from "../components/Spinner.vue";
import Router from "../Routers/Router";
import AlertWarning from "../components/CustomAlerts/Warning.vue";
import { ref } from "vue";
import "../types/TypesApi"
import { computed } from "@vue/reactivity";
import { validateEmail } from "../Utils/utils"
import { invalidEmail } from "../Utils/constants"

// Constans(Properties)
const email = ref<string>(null!);
const name = ref<string>(null!);
const lastname = ref<string>(null!);
const pass = ref<string>(null!)
const loading = ref(false);
const msg = ref<string>(null!);
const isAdult = ref(false);
const showAlert = ref(false);
const { VITE_FM_API_URL } = import.meta.env;
const isLoading = computed(() => loading.value === true);

// Props
interface Props {
    imgLogin: string;
}

defineProps<Props>();

// Funnctions

async function CreateUser() {
    const url: string | undefined = `${VITE_FM_API_URL}/user`;
    const body = {
        "email": email.value,
        "pass": pass.value,
        "lastname": lastname.value,
        "name": name.value,
        "id_rol": !isAdult.value ? "2" : "1"

    }
    if (!email.value || !lastname.value || !name.value || !pass.value) {
        showAlert.value = true;
        msg.value = "Llene todos los campos correctamente";
        return;
    }

    if (!validateEmail(email.value)) return;

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
        email.value = null!;
        lastname.value = null!;
        name.value = null!;
        isAdult.value = false;
        msg.value = null!;
        showAlert.value = true;
        Router.push({ name: "GestionUsuario" });

    } else {
        if (result.error) msg.value = result.message;
        else msg.value = "No se ha podido crear el usuario";
        showAlert.value = true;
    }

    loading.value = false
}

function emailIsValid() {
    if (!validateEmail(email.value)) {
        msg.value = invalidEmail;
        showAlert.value = true;
        return false;
    } else {
        msg.value = '';
        showAlert.value = false;
        return true;
    }
}

</script>

<style>
#btn-guardar {
    background-color: var(--primary-color);
}
</style>
