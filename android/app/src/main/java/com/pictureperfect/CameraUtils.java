package com.pictureperfect;

import android.hardware.camera2.*;
import android.graphics.Rect;

public class CameraUtils {
	public static String getRearCameraId(CameraManager cameraManager) {
		try {
			int bestRes = 0;
			String bestCameraId = null;
			for (final String cameraId : cameraManager.getCameraIdList()) {
				CameraCharacteristics characteristics = cameraManager.getCameraCharacteristics(cameraId);
				int facing = characteristics.get(CameraCharacteristics.LENS_FACING);
				if (facing == CameraCharacteristics.LENS_FACING_BACK) {
					Rect size = characteristics.get(CameraCharacteristics.SENSOR_INFO_ACTIVE_ARRAY_SIZE);
					int res = size.width() * size.height();
					if (res > bestRes) {
						bestRes = res;
						bestCameraId = cameraId;
					}
				}
			}
			return bestCameraId;
		}
		catch (CameraAccessException e) {
			e.printStackTrace();
		}
		return null;
	}
}
