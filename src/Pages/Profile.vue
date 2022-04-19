<template>
    <div class="profile-container w-screen h-screen">
        <section class="h-full gradient-form bg-gray-200 md:h-screen">
            <div class="sidebar">
                <Sidebar userName="Yael" :imgProfile="imgProfile" />
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
                                            <h4 class="text-xl font-semibold mt-1 mb-6 pb-1">Perfil</h4>
                                        </div>
                                        <form>
                                            <div class="mb-4">
                                                <input v-model="correo" type="email"
                                                    class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                    id="correo" placeholder="Correo" name="correo" disabled />
                                            </div>
                                            <div class="mb-4">
                                                <input v-model="nombres" type="text"
                                                    class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                    id="nombres" placeholder="Nombres" name="nombres" disabled />
                                            </div>
                                            <div class="mb-4">
                                                <input v-model="apellidos" type="text"
                                                    class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                    id="apellidos" placeholder="Apellidos" name="apellidos" disabled />
                                            </div>
                                            <div class="mb-4">
                                                <input v-model="rol" type="text"
                                                    class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                    id="rol" placeholder="Rol" name="rol" disabled />
                                            </div>
                                            <div class="text-center pt-1 mb-12 pb-1">

                                                <button data-modal-toggle="popup-modal"
                                                    class="bg-red-800 inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                                                    type="button" data-mdb-ripple="true" data-mdb-ripple-color="light">
                                                    Eliminar
                                                </button>
                                                <Modal text="¿Deseas eliminar tu perfil?" btnColor="red"
                                                    @confirm="deletePerfil(data.userId)" />
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
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import Sidebar from "../components/Sidebar.vue";
import Loader from "../components/Spinner.vue"
import Axios from "axios"
import router from "../Routers/Router"
import Modal from "../components/Modal.vue"

interface Props {
    imgProfile: string;
    userName: string;
}

defineProps<Props>();

const correo = ref<string>(null!);
const nombres = ref<string>(null!);
const apellidos = ref<string>(null!);
const rol = ref<string>(null!);
const usuario = ref<any>({});
const loading = ref(false);
const { VITE_FM_API_URL } = import.meta.env;
const logUser = localStorage.getItem('FMUserAuth') as string;
const data = (JSON.parse(logUser)) as { token: string, userId: number }

onMounted(async () => {
    const url: string | undefined = `${VITE_FM_API_URL}/user/${data.userId}`;

    let user = await Axios.get(url);
    if (!user.data.body) {
        router.push({ name: "login" });
        return;
    }
    usuario.value = user.data.body;

    correo.value = usuario.value.email;
    nombres.value = usuario.value.name;
    apellidos.value = usuario.value.lastname;
    rol.value = usuario.value.rol.rol_type;

})

async function deletePerfil(id: number) {
    const url: string | undefined = `${VITE_FM_API_URL}/user?idEntity=${id}`;
    try {
        let result = await Axios.delete(url)
        if (result?.status == 200) {
            localStorage.removeItem('FMUserAuth');
            router.push({ name: "login" });
        }
    }
    catch { }
}

</script>

<style>
.profile-container {
    background-color: var(--secundary-color);
}
</style>