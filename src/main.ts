import { createApp } from "vue";
import "./index.css";
import router from "./Routers/Router";
import App from "./App.vue";
// import dotenv from "dotenv"

const app = createApp(App);
app.use(router);

app.mount("#app");
