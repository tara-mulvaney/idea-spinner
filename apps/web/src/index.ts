import { createApp } from "vue";
import createStore from "./store";
import Main from "./pages/Main.vue";

// ISSUE #36: eslint not picking up vue type shim
/* eslint-disable @typescript-eslint/no-unsafe-argument */
createApp(Main).use(createStore()).mount("#app");
