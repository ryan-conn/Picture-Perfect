package com.pictureperfect;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.pictureperfect.CameraViewManager;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class PicturePerfectPackage implements ReactPackage {

   @Override
   public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
       List<ViewManager> viewManagers = new ArrayList<>();
       viewManagers.add(new CameraViewManager(reactContext));
       return viewManagers;
   }

   @Override
   public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
       return Collections.emptyList();
   }

}
