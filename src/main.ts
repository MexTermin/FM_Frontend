import { createApp } from "vue";
import "./index.css";
import router from "./Routers/Router";
import App from "./App.vue";
import "flowbite";

const app = createApp(App);
app.use(router);

app.mount("#app");
