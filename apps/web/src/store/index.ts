import { AppState } from "./types";
import { createSpinnerModule } from "./spinner";
import demoData from "./demo.json";
import getters from "./getters";
import persist from "./persist";
import { SpinnerParameters } from "@idea-spinner/spinner";
import { SpinnerWheelProps } from "../components";
import { createLogger, createStore } from "vuex";

const hashPersistancePlugin = persist<AppState>({
  load: state => {
    if (!window.location.hash) return state;

    try {
      const spinnerState = state.spinner;

      const spin = spinnerState.spinner.createSpin().stop();

      spinnerState.currentSpinID = spin.id;

      const wheels = JSON.parse(
        window.atob(window.location.hash.slice(1))
      ) as SpinnerWheelProps[];

      for (const { name, value, description, isLocked } of wheels) {
        spinnerState.wheelOverrides[name] = {
          isLocked,
          value: { description: description ?? "", value: value ?? "" },
        };
      }

      state.spinner = spinnerState;
    } catch (e) {
      console.error(e);
    }

    return state;
  },
  save: (_, state) => {
    if (!state.spinner.isSpinning) {
      window.location.hash = window.btoa(
        JSON.stringify(getters.spinnerWheelProps(state))
      );
    }
  },
});

export default (
  parameters: { spinner: SpinnerParameters } = {
    spinner: {
      ...demoData,
      wheels: new Map(Object.entries(demoData.wheels)),
    },
  }
) =>
  createStore<AppState>({
    getters,
    modules: {
      spinner: createSpinnerModule(parameters.spinner),
    },
    plugins: [createLogger(), hashPersistancePlugin],
  });
