import { RNSensitiveInfoOptions } from "react-native-sensitive-info";
import { TMigrationFuncParams } from "./createMigrate";
export interface PersistStorageValue<Value> {
    _currentVersion: number;
    value: Value;
}
export declare type UsePersistStorageOptions<Value = any> = {
    debug?: boolean;
    version?: number;
    persist?: boolean;
    migrate?: ((params: TMigrationFuncParams) => PersistStorageValue<Value>) | null;
    sensitive?: false | RNSensitiveInfoOptions;
};
declare type CallbackFn<S> = (prev: S) => S;
export declare type SetState<S = any> = (stateOrCallbackFn: S | CallbackFn<S>) => void;
declare const usePersistStorage: <Value>(key: string, initialValue: Value | (() => Value), { debug, version, persist, migrate, sensitive, }?: UsePersistStorageOptions<Value>) => [Value, SetState<any>, boolean];
export default usePersistStorage;
