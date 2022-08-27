import { AppState } from "./types";
import { createSpinnerModule } from "./spinner";
import demoData from "./demo.json";
import getters from "./getters";
import persist from "./persist";
import { SpinnerParameters } from "@idea-spinner/spinner";
import { SpinnerWheelProps } from "../views/Spinner";
import { createLogger, createStore } from "vuex";

const hashPersistancePlugin = persist<AppState>({
  load: state => {
    if (!window.location.hash) return state;

    try {
      const _spinner = state.spinner;

      const spin = _spinner.spinner
        .createSpin()
        // ISSUE #39: remove unsafeForceValue and the "persist force spin stop"
        .advanceTime(Number.MAX_SAFE_INTEGER);

      _spinner.currentSpinID = spin.id;

      const wheels = JSON.parse(
        window.atob(window.location.hash.slice(1))
      ) as SpinnerWheelProps[];

      for (const { name, value, description, isLocked } of wheels) {
        if (isLocked && typeof value === "string") {
          _spinner.lockedWheelValues[name] = value;
        }

        // ISSUE #39: remove unsafeForceValue and the "persist force spin stop"
        spin.wheels.get(name)?.unsafeForceValue({
          description: description ?? "",
          value: value ?? "",
        });
      }

      state.spinner = _spinner;
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
