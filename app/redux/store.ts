import { configureStore } from "@reduxjs/toolkit";
import { cameraSettingsReducer } from "./cameraSettings";

const store = configureStore({
  reducer: {
    cameraSettings: cameraSettingsReducer,
  }
});

export default store;
