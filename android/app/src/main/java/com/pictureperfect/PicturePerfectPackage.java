package com.pictureperfect;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.pictureperfect.CameraModule;
import com.pictureperfect.CameraViewManager;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class PicturePerfectPackage implements ReactPackage {

	private CameraViewManager cameraViewManager;

   @Override
   public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
		if (cameraViewManager == null) {
			cameraViewManager = new CameraViewManager(reactContext);
		}
		return Arrays.<NativeModule>asList(
			new CameraModule(reactContext, cameraViewManager)
		);
   }

   @Override
   public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
		if (cameraViewManager == null) {
			cameraViewManager = new CameraViewManager(reactContext);
		}
		return Arrays.<ViewManager>asList(
			cameraViewManager
		);
   }

}
