import React from "react";
import { createContextSelector } from "react-context-selector";
import usePersistStorage, {
  SetState,
  UsePersistStorageOptions,
} from "./usePersistStorage";

export type PersistContext<T> = [T, SetState, boolean];

const createPersistContext = <T extends {}>({
  storageKey,
  defaultData,
  options,
}: {
  storageKey: string;
  defaultData: T;
  options?: UsePersistStorageOptions<T>;
}) => {
  const createDefaultData = () => defaultData;

  const Context = React.createContext<PersistContext<T>>([
    createDefaultData(), // state
    () => {}, // update state function
    false, // restored
  ]);

  const [Cleaner, useContextSelector] = createContextSelector(Context);

  const Provider: React.FC<{
    persist?: boolean;
  }> = (props) => {
    const [data, setData, restored] = usePersistStorage<T>(
      storageKey,
      createDefaultData,
      {
        persist: props.persist,
        ...options,
      }
    );

    return (
      <Context.Provider value={[data, setData, restored]}>
        <Cleaner />
        {props.children}
      </Context.Provider>
    );
  };

  return {
    Provider,
    Context,
    useData: useContextSelector,
  };
};

export default createPersistContext;
