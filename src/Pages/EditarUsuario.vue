<template>
    <section class="h-full gradient-form bg-gray-200 md:h-screen">
        <div class="sidebar">
            <Sidebar userName="Yael" :imgProfile="imgProfile" @aaa="() => { }" />
        </div>
        <div class="container py-12 px-6 h-5/6 w-5/6 ml-auto">
            <div class="flex justify-center items-center flex-wrap h-full g-6 text-gray-800 ">
                <div class="w-3/6">
                    <div v-if="loading">
                        <Loader />
                    </div>
                    <div class="block bg-white shadow-lg rounded-lg w-full">
                        <div class="lg:flex lg:flex-wrap g-0 flex justify-center items-center">
                            <div class="lg:w-5/6 px-4 md:px-0">
                                <div class="md:p-8 md:mx-6">
                                    <div class="text-center">
                                        <img class="mx-auto w-48" :src="imgProfile" alt="logo" />
                                        <h4 class="text-xl font-semibold mt-1 mb-12 pb-1">Editar usuario</h4>
                                    </div>
                                    <form>
                                        <span class="text-center text-rose-500 mx-auto block" v-if="msg != null">
                                            {{ msg }}
                                        </span>
                                        <span class="text-center text-lime-600 mx-auto block" v-if="msgSuccess != null">
                                            {{ msgSuccess }}
                                        </span>
                                        <div class="mb-4">
                                            <input v-model="correo" type="email"
                                                class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                id="correo" placeholder="Correo" name="correo" />
                                        </div>
                                        <div class="mb-4">
                                            <input type="text" v-model="nombres"
                                                class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                id="nombres" placeholder="Nombres" name="nombres" />
                                        </div>
                                        <div class="mb-4">
                                            <input type="text" v-model="apellidos"
                                                class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                id="apellidos" placeholder="Apellidos" name="apellidos" />
                                        </div>
                                        <div class="mb-4">
                                            <input type="password" v-model="contrasegna"
                                                class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                id="contrasegna" placeholder="Contraseña" name="contrasegna" />
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
                                        <div class="text-center pt-1 mb-12 pb-1">
                                            <button v-on:click="ActualizarUsuario"
                                                class="btn_fm-primary inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                                                type="button" data-mdb-ripple="true" data-mdb-ripple-color="light"
                                                >
                                                Actualizar
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
import Sidebar from "../components/Sidebar.vue";
import imgProfile from "../img/account_circle_black.svg";
import Loader from "../components/Spinner.vue"
import Axios from "axios"
import { onMounted, ref } from "vue";

interface Props {
    imgLogin: string;
}

defineProps<Props>();
defineEmits(["aaa"])

const correo = ref<string>(null!);
const nombres = ref<string>(null!);
const apellidos = ref<string>(null!);
const contrasegna = ref<string>(null!);
const loading = ref(false);
const msg = ref<string>(null!);
const msgSuccess = ref<string>(null!);
const id = ref<number>(null!);
const isAdult = ref(false);
const { VITE_FM_API_URL } = import.meta.env;

onMounted(async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const url: string | undefined = `${VITE_FM_API_URL}/user/${urlParams.get("id")}`;

    let result = await Axios.get(url);

    correo.value = result.data.body.email;
    apellidos.value = result.data.body.lastname;
    nombres.value = result.data.body.name;
    id.value = Number(urlParams.get("id"));
    if (result.data.body.rol.id === 1) isAdult.value = true;
    else isAdult.value = false;
});

async function ActualizarUsuario() {
    const url: string | undefined = `${VITE_FM_API_URL}/user`;
    msgSuccess.value = null!;
    const body = {
        "id": id.value,
        "email": correo.value,
        "pass": contrasegna.value,
        "lastname": apellidos.value,
        "name": nombres.value,
        "id_rol": !isAdult.value ? "2" : "1"
    }

    if (!correo.value || !apellidos.value || !nombres.value) {
        msg.value = "Llene todos los campos correctamente"
        return
    }

    loading.value = true
    try {
        let result = await Axios.put(url, body)
        if (result?.status == 200) {
            msg.value = null!;
            msgSuccess.value = "Usuario actualizado correctamente"
        }
    }
    catch {
        msg.value = "No se ha podido actualizar el usuario";
    }
    loading.value = false
}
</script>
