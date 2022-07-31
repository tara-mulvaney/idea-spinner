import App from "./App.vue";
import { createApp } from "vue";
import { createSpinnerStore } from "./Spinner";
import demoData from "./demo.json";

// ISSUE #36: eslint not picking up vue type shim
/* eslint-disable @typescript-eslint/no-unsafe-argument */
const app = createApp(App);
/* eslint-enable @typescript-eslint/no-unsafe-argument */

app.use(
  createSpinnerStore({
    ...demoData,
    wheels: new Map(Object.entries(demoData.wheels)),
  })
);

app.mount("#app");
