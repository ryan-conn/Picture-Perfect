import { createAction, createReducer } from "@reduxjs/toolkit";
import { NativeModules } from 'react-native';

// All interfacing with the camera native module should be done through redux, setters should be encapsulated to this file
const { CameraModule } = NativeModules;

// Export getters so UI components can determine the range of available values
export const getAvailableISOValues: () => Promise<[number, number]> = CameraModule.getAvailableISOValues;
/**
 * Get available exposure times (unit: nanoseconds)
 */
export const getAvailableExposureTimes: () => Promise<[number, number]> = CameraModule.getAvailableExposureTimes;
export const getAvailableFocusDistances: () => Promise<[number, number]> = CameraModule.getAvailableFocusDistances;
export const getAvailableZoomValues: () => Promise<[number, number]> = CameraModule.getAvailableZoomValues;

export enum CameraSetting {
  AutoFocus = 'autoFocus',
  FocusDistance = 'focusDistance',
  AutoExposure = 'autoExposure',
  ISO = 'ISO',
  ExposureTime = 'exposureTime',
  AutoWhiteBalance = 'autoWhiteBalance',
  WhiteBalance = 'whiteBalance',
  Zoom = 'zoom',
}

interface CameraSettingsState {
  autoFocus: boolean,
  focusDistance: number,
  autoExposure: boolean,
  ISO: number,
  exposureTime: number,
  autoWhiteBalance: boolean,
  whiteBalance: number,
  zoom: number,
}

export const setAutoFocus = createAction<boolean>('settings/autoFocus/set');
export const setFocusDistance = createAction<number>('settings/focusDistance/set');
export const setAutoExposure = createAction<boolean>('settings/autoExposure/set');
export const setISO = createAction<number>('settings/iso/set');
export const setExposureTime = createAction<number>('settings/exposureTime/set');
export const setAutoWhiteBalance = createAction<boolean>('settings/autoWhiteBalance/set');
export const setWhiteBalance = createAction<number>('settings/whiteBalance/set');
export const setZoom = createAction<number>('settings/zoom/set');

const initialState: CameraSettingsState = {
  autoFocus: true,
  focusDistance: 0,
  autoExposure: true,
  ISO: 4500,
  exposureTime: 20000000,
  autoWhiteBalance: true,
  whiteBalance: 0.5,
  zoom: 0,
};

// TODO: make each of these settings call camera module functions
export const cameraSettingsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setAutoFocus, (state, action) => {
      CameraModule.setAutoFocus(action.payload);
      state.autoFocus = action.payload;
    })
    .addCase(setFocusDistance, (state, action) => {
      CameraModule.setFocusDistance(action.payload);
      state.focusDistance = action.payload;
      state.autoFocus = false;
    })
    .addCase(setAutoExposure, (state, action) => {
      state.autoExposure = action.payload;
    })
    .addCase(setISO, (state, action) => {
      const valueToUse = Math.round(action.payload);
      CameraModule.setISO(valueToUse);
      state.ISO = valueToUse;
      state.autoExposure = false;
    })
    .addCase(setExposureTime, (state, action) => {
      const valueToUse = Math.round(action.payload);
      CameraModule.setExposureTime(valueToUse)
      state.exposureTime = valueToUse;
      state.autoExposure = false;
    })
    .addCase(setAutoWhiteBalance, (state, action) => {
      state.autoWhiteBalance = action.payload;
    })
    .addCase(setWhiteBalance, (state, action) => {
      state.whiteBalance = action.payload;
    })
    .addCase(setZoom, (state, action) => {
      state.zoom = action.payload;
    });
});
