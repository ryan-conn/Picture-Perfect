package com.pictureperfect; // replace com.your-app-name with your app’s name

import android.hardware.camera2.*;
import android.util.Log;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableNativeArray;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.List;
import android.util.Range;
import android.hardware.camera2.CameraCharacteristics.Key;
import com.pictureperfect.CameraUtils;

public class CameraModule extends ReactContextBaseJavaModule {

	private CameraViewManager cameraViewManager;

	CameraModule(ReactApplicationContext context, CameraViewManager cameraViewManager) {
		super(context);
		// Link this module to the camera view manager so it can be manipulated
		this.cameraViewManager = cameraViewManager;
	}

	@Override
	public String getName() {
		return "CameraModule";
	}

	private CameraCharacteristics getCameraCharacteristics() throws CameraAccessException {
		CameraManager cameraManager = cameraViewManager.getCameraManager();
		return cameraManager.getCameraCharacteristics(CameraUtils.getRearCameraId(cameraManager));
	}

	// TODO: use WritableArrays instead of strings for sending ranges to frontend

	@ReactMethod
	public void getAvailableISOValues(final Promise promise) {
		try {
			Range<Integer> values = getCameraCharacteristics().get(CameraCharacteristics.SENSOR_INFO_SENSITIVITY_RANGE);
			WritableNativeArray ret = new WritableNativeArray();
			ret.pushInt(values.getLower());
			ret.pushInt(values.getUpper());
			promise.resolve(ret);
		}
		catch (CameraAccessException e) {
			promise.reject("Error getting camera characteristics.");
			e.printStackTrace();
		}
	}

	@ReactMethod
	public void getAvailableExposureTimes(final Promise promise) {
		try {
			Range<Long> values = getCameraCharacteristics().get(CameraCharacteristics.SENSOR_INFO_EXPOSURE_TIME_RANGE);
			WritableNativeArray ret = new WritableNativeArray();
			ret.pushInt(values.getLower().intValue());
			ret.pushInt(values.getUpper().intValue());
			promise.resolve(ret);
		}
		catch (CameraAccessException e) {
			promise.reject("Error getting camera characteristics.");
			e.printStackTrace();
		}
	}

	@ReactMethod
	public void getAvailableWhiteBalanceValues() {
		// TODO: need to manually adjust white balance, it's not in the camera2 API
	}

	@ReactMethod
	public void getAvailableZoomValues(final Promise promise) {
		// TODO: graceful fallback when CONTROL_ZOOM_RATIO_RANGE not supported
		// Range<Float> values = getCameraCharacteristics().get(CameraCharacteristics.CONTROL_ZOOM_RATIO_RANGE);
		WritableNativeArray ret = new WritableNativeArray();
		ret.pushDouble(0.0);
		ret.pushDouble(1.0);
		promise.resolve(ret);
	}

	// TODO: just use [0, 1] and translate after sending value to android
	@ReactMethod
	private void getAvailableFocusDistances(final Promise promise) {
		try {
			Float minFocus = getCameraCharacteristics().get(CameraCharacteristics.LENS_INFO_MINIMUM_FOCUS_DISTANCE);
			WritableNativeArray ret = new WritableNativeArray();
			ret.pushDouble(0.0);
			ret.pushDouble(minFocus);
			promise.resolve(ret);
		}
		catch (CameraAccessException e) {
			promise.reject("Error getting camera characteristics.");
			e.printStackTrace();
		}
	}

	// Helper method to update settings
	private void changeCameraSettings(Map<CaptureRequest.Key, Object> settings) {
		CameraView cameraView = cameraViewManager.getCameraViewInstance();
		if (cameraView == null) return;

		cameraView.updateSettings(settings);
	}

	@ReactMethod
	public void setAutoFocus(boolean enabled) {
		Integer CONTROL_AF_MODE = enabled ? CameraMetadata.CONTROL_AF_MODE_CONTINUOUS_PICTURE : CameraMetadata.CONTROL_AF_MODE_OFF;

		changeCameraSettings(Map.of(
			CaptureRequest.CONTROL_AF_MODE, CONTROL_AF_MODE
		));
	}

	@ReactMethod
	public void setFocusDistance(Double newValue) {
		Log.d("ReactNative", "setting focus");
		changeCameraSettings(Map.of(
			CaptureRequest.CONTROL_AF_MODE, CameraMetadata.CONTROL_AF_MODE_OFF,
			CaptureRequest.LENS_FOCUS_DISTANCE, newValue.floatValue()
		));
	}

	@ReactMethod
	public void setISO(Double newValue) {
		changeCameraSettings(Map.of(
			CaptureRequest.CONTROL_AE_MODE, CameraMetadata.CONTROL_AE_MODE_OFF,
			CaptureRequest.SENSOR_SENSITIVITY, newValue.intValue()
		));
	}

	@ReactMethod
	public void setExposureTime(Double newValue) {
		changeCameraSettings(Map.of(
			CaptureRequest.CONTROL_AE_MODE, CameraMetadata.CONTROL_AE_MODE_OFF,
			CaptureRequest.SENSOR_EXPOSURE_TIME, newValue.longValue()
		));
	}
}
