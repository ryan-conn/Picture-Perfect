import { configureStore } from "@reduxjs/toolkit";
import {
  TypedUseSelectorHook,
  useDispatch as useDispatchBase,
  useSelector as useSelectorBase
} from "react-redux";
import { cameraSettingsReducer } from "./cameraSettings";

const store = configureStore({
  reducer: {
    cameraSettings: cameraSettingsReducer,
  }
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Custom hooks to reduce overhead
export const useDispatch = () => useDispatchBase<AppDispatch>()
export const useSelector: TypedUseSelectorHook<RootState> = useSelectorBase
