import { MutationPayload, Plugin, Store } from "vuex";

interface PersistParameters<T> {
  load: (state: T) => T;
  save: (mutation: MutationPayload, state: T) => void;
}

export default <T>(parameters: PersistParameters<T>) => {
  const plugin: Plugin<T> = (store: Store<T>) => {
    store.replaceState(parameters.load(store.state));
    store.subscribe(parameters.save);
  };

  return plugin;
};
