package com.pictureperfect;

import android.hardware.Camera;
import android.view.SurfaceView;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.pictureperfect.CameraView;
import java.util.Map;
import java.util.HashMap;

public class CameraViewManager extends SimpleViewManager<SurfaceView> {

	ReactApplicationContext mCallerContext;
	Camera camera;

	public CameraViewManager(ReactApplicationContext reactContext) {
		camera = Camera.open();
		mCallerContext = reactContext;
	}

	@Override
	public String getName() {
		return "CameraView";
	}

	@Override
	public SurfaceView createViewInstance(ThemedReactContext context) {
		return new CameraView(context, camera);
	}
}
