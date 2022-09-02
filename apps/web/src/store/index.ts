import { AppState } from "./types";
import { createSpinnerModule } from "./spinner";
import demoData from "./demo.json";
import getters from "./getters";
import persist from "./persist";
import { SpinnerWheelProps } from "../components";
import { createLogger, createStore } from "vuex";
import { Spinner, SpinnerParameters } from "@idea-spinner/spinner";

const hashPersistancePlugin = persist<AppState>({
  load: state => {
    if (!window.location.hash) return state;

    const [oldState, newState] = [state, { ...state }];

    try {
      const spinnerState = newState.spinner;

      spinnerState.spinner = new Spinner(spinnerState.spinner.parameters);

      const spin = spinnerState.spinner.createSpin().stop();

      spinnerState.currentSpinID = spin.id;

      const wheels = JSON.parse(
        window.atob(window.location.hash.slice(1))
      ) as SpinnerWheelProps[];

      for (const { name, value, description, isLocked } of wheels) {
        if (!Boolean(value)) continue;

        spinnerState.wheelOverrides[name] = {
          isLocked,
          value: { description: description ?? "", value: value as string },
        };
      }

      newState.spinner = spinnerState;
    } catch (error) {
      console.error(error);

      // don't return corrupted state in event of a parsing error
      return oldState;
    }

    return newState;
  },
  save: (_, state) => {
    if (!state.spinner.isSpinning) {
      window.location.hash = window.btoa(
        JSON.stringify(
          getters
            .spinnerWheelsProps(state)
            .map(({ value, name, description, isLocked }) => ({
              description,
              isLocked: isLocked ? true : undefined,
              name,
              value,
            }))
        )
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
    plugins:
      process.env.NODE_ENV === "development"
        ? [createLogger(), hashPersistancePlugin]
        : [hashPersistancePlugin],
  });
