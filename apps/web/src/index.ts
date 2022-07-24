import App from "./App.vue";
import { createApp } from "vue";
import { createSpinnerStore } from "./Spinner";
import demoData from "./demo.json";

const app = createApp(App);

// ISSUE #30:
// clarify separation between UI store and Spinner object with types and docs
app.use(
  createSpinnerStore({
    ...demoData,
    wheels: new Map(Object.entries(demoData.wheels)),
  })
);

app.mount("#app");
