<template>
    <section class="h-full gradient-form bg-gray-200 md:h-screen">
        <div class="container py-12 px-6 h-full mx-auto">
            <Loader v-if="loading" />
            <div class="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
                <div class="xl:w-10/12">
                    <div class="block bg-white shadow-lg rounded-lg">
                        <div class="lg:flex lg:flex-wrap g-0">
                            <div class="lg:w-6/12 px-4 md:px-0">
                                <div class="md:p-12 md:mx-6">
                                    <div class="text-center">
                                        <img class="mx-auto w-48" :src="imgLogin" alt="logo" />
                                        <h4 class="text-xl font-semibold mt-1 mb-12 pb-1">Iniciar sección</h4>
                                    </div>
                                    <form>
                                        <div class="mb-4">
                                            <input v-model="correo" type="text"
                                                class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                placeholder="Correo">
                                        </div>
                                        <div class="mb-4">
                                            <input v-model="contrasegna" type="password"
                                                class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                placeholder="Contraseña" required />
                                            <span class="text-center text-rose-500" v-if="msg">{{ msg }}</span>
                                        </div>
                                        <div class="text-center pt-1 mb-12 pb-1">
                                            <button
                                                class="btn_fm-primary inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                                                type="button" data-mdb-ripple="true" data-mdb-ripple-color="light"
                                                v-on:click="login">
                                                Inicias sección
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div
                                class="section-color lg:w-6/12 flex items-center lg:rounded-r-lg rounded-b-lg lg:rounded-bl-none">
                                <div class="text-white px-4 py-6 md:p-12 md:mx-6">
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
import Axios from "axios"
import Loader from "../components/Spinner.vue"
import router from "../Routers/Router"
import { ref } from "vue";
// import jwt from 'json-web-token';

interface Props {
    imgLogin: string;
}

defineProps<Props>();

const { VITE_FM_API_URL } = import.meta.env;
const correo = ref("");
const contrasegna = ref("");
const loading = ref(false);
const msg = ref<string>(null!);
const url: string = `${VITE_FM_API_URL}/user/login`;

async function login() {
    let user;
    const body = {
        "email": correo.value,
        "pass": contrasegna.value
    }
    loading.value = true
    try {
        user = await Axios.post(url, body);
    } catch {
        msg.value = "Usuario o contraseña invalido";
    }
    if (user?.status == 200) {
        msg.value = null!;
        const token: string = user.data.body;
        localStorage.setItem('FMUserAuth', JSON.stringify(token));
        router.push("/")
    }
    loading.value = false
}

</script>

<style>
.section-color {
    background: linear-gradient(to right, var(--primary-gradient));
}
</style>