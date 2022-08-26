import { AppState } from "./types";
import demoData from "./demo.json";
import getters from "./getters";
import persist from "./persist";
import { createLogger, createStore } from "vuex";
import { createSpinnerModule, SpinnerWheelProps } from "../modules/Spinner";

const hashPersistancePlugin = persist<AppState>({
  load: state => {
    if (!document.location.hash) return state;

    try {
      const _spinner = state.spinner;

      const spin = _spinner.spinner.createSpin({
        endingFrameLength: 0,
        friction: 1,
        startingFrameLength: 0,
      });

      _spinner.currentSpinID = spin.id;

      const wheels = JSON.parse(
        window.atob(document.location.hash.slice(1))
      ) as SpinnerWheelProps[];

      for (const { name, value, description, isLocked } of wheels) {
        if (isLocked && typeof value === "string") {
          _spinner.lockedWheelValues[name] = value;
        }

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
      document.location.hash = window.btoa(
        JSON.stringify(getters.spinnerWheelProps(state))
      );
    }
  },
});

export default () =>
  createStore<AppState>({
    getters,
    modules: {
      spinner: createSpinnerModule({
        ...demoData,
        wheels: new Map(Object.entries(demoData.wheels)),
      }),
    },
    plugins: [createLogger(), hashPersistancePlugin],
  });