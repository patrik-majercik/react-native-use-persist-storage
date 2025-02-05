import { renderHook, act } from "@testing-library/react-hooks";
import usePersistStorage from "../src/usePersistStorage";
import createAsyncStorage from "../src/createAsyncStorage";
import { transformStorageValue } from "../src/utils";
import { sleep } from "./utils";

const toStorageValue = (value: any, version = 0) =>
  JSON.stringify(transformStorageValue(value, version));

const KEY = "@TEST";
const store = createAsyncStorage();

beforeAll(async () => {
  await store.removeItem(KEY);
});

afterAll(async () => {
  await store.removeItem(KEY);
});

test("init, setState, version = 10", async () => {
  const { result } = renderHook(() =>
    usePersistStorage(KEY, "test", { version: 10 })
  );

  expect(result.current[0]).toBe("test");
  expect(typeof result.current[1]).toBe("function");
  expect(result.current[2]).toBe(false);

  await sleep(100); // wait mount && init asyncStorage;
  expect(await store.getItem(KEY)).toBe(toStorageValue("test", 10));
  expect(result.current[2]).toBe(true);

  act(() => {
    result.current[1]("change");
  });
  expect(result.current[0]).toBe("change");

  await sleep(100); // wait update asyncStorage;
  expect(await store.getItem(KEY)).toBe(toStorageValue("change", 10));

  result.current[1]("async change"); // setState
  await sleep(300);
  expect(result.current[0]).toBe("async change");
  expect(await store.getItem(KEY)).toBe(toStorageValue("async change", 10));

  result.current[1](prev => prev + " callback"); // setState callback
  await sleep(300);
  expect(result.current[0]).toBe("async change callback");
  expect(await store.getItem(KEY)).toBe(toStorageValue("async change callback", 10));
  
});

test("restore state", async () => {
  const { result } = renderHook(() => usePersistStorage(KEY, "test"));
  
  await sleep(300); // wait restore
  expect(result.current[0]).toBe("async change callback");
  expect(typeof result.current[1]).toBe("function");
  expect(result.current[2]).toBe(true);
  expect(await store.getItem(KEY)).toBe(toStorageValue("async change callback", 10));
});

test("no persist state", async () => {
  const { result } = renderHook(() => usePersistStorage(KEY, "test", { persist: false }));

  await sleep(300); // wait remove item
  expect(result.current[0]).toBe("test");
  expect(typeof result.current[1]).toBe("function");
  expect(await store.getItem(KEY)).toBeNull();

  act(() => {
    result.current[1]("change");
  });

  expect(result.current[0]).toBe("change");
  expect(await store.getItem(KEY)).toBeNull();
});
