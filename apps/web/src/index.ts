import { createApp } from "vue";
import { App, store } from "./App";

// ISSUE #36: eslint not picking up vue type shim
/* eslint-disable @typescript-eslint/no-unsafe-argument */
createApp(App).use(store()).mount("#app");
