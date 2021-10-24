import React from "react";
import { SetState, UsePersistStorageOptions } from "./usePersistStorage";
export declare type PersistContext<T> = [T, SetState, boolean];
declare const createPersistContext: <T extends {}>({ storageKey, defaultData, options, }: {
    storageKey: string;
    defaultData: T;
    options?: UsePersistStorageOptions<T> | undefined;
}) => {
    Provider: React.FC<{
        persist?: boolean | undefined;
    }>;
    Context: React.Context<PersistContext<T>>;
    useData: (selector: (data: T) => any) => any;
};
export default createPersistContext;
