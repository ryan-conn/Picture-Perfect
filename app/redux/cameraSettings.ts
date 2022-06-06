import { createAction, createReducer } from "@reduxjs/toolkit";
import { WhiteBalance } from "expo-camera";

export enum CameraSetting {
  Focus = 'focusDepth',
  ISO = 'iso',
  ShutterSpeed = 'shutterSpeed',
  WhiteBalance = 'whiteBalance',
  Zoom = 'zoom',
}

interface CameraSettingsState {
  autoFocus: boolean,
  focusDepth: number,
  ISO: number,
  shutterSpeed: number,
  whiteBalance: number,
  zoom: number,
}

const setAutoFocus = createAction<boolean>('settings/autoFocus/set');
const setFocusDepth = createAction<number>('settings/focusDepth/set');
const setISO = createAction<number>('settings/iso/set');
const setShutterSpeed = createAction<number>('settings/shutterSpeed/set');
const setWhiteBalance = createAction<number>('settings/whiteBalance/set');
const setZoom = createAction<number>('settings/zoom/set');

const initialState: CameraSettingsState = {
  autoFocus: true,
  focusDepth: 0,
  ISO: 4500,
  shutterSpeed: 0.05,
  whiteBalance: 0.5,
  zoom: 0,
};

export const cameraSettingsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setFocusDepth, (state, action) => {
      state.focusDepth = action.payload;
    })
    .addCase(setISO, (state, action) => {
      state.ISO = action.payload;
    })
    .addCase(setShutterSpeed, (state, action) => {
      state.shutterSpeed = action.payload;
    })
    .addCase(setWhiteBalance, (state, action) => {
      state.whiteBalance = action.payload;
    })
    .addCase(setZoom, (state, action) => {
      state.zoom = action.payload;
    });
});
