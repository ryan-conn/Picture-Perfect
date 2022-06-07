package com.pictureperfect;

import android.content.Context;
import android.content.res.Configuration;
import android.hardware.camera2.*;
import android.hardware.camera2.params.OutputConfiguration;
import android.hardware.camera2.params.SessionConfiguration;
import android.os.Handler;
import android.os.HandlerThread;
import android.util.Log;
import android.view.SurfaceHolder;
import android.view.SurfaceView;
import android.view.Surface;
import java.io.IOException;
import java.util.Collections;
import com.pictureperfect.HandlerExecutor;

public class CameraView extends SurfaceView implements SurfaceHolder.Callback {

	CameraManager cameraManager;
	HandlerThread cameraThread;
	SurfaceHolder holder;

	public CameraView(Context context, CameraManager cameraManager) {
		super(context);
		this.cameraManager = cameraManager;
		holder = getHolder();
		holder.addCallback(this);
	}

	private String getRearCameraId() {
		try {
			for (final String cameraId : cameraManager.getCameraIdList()) {
				CameraCharacteristics characteristics = cameraManager.getCameraCharacteristics(cameraId);
				int facing = characteristics.get(CameraCharacteristics.LENS_FACING);
				if (facing == CameraCharacteristics.LENS_FACING_BACK) return cameraId;
			}
		}
		catch (CameraAccessException e) {
			e.printStackTrace();
		}
		return null;
	}

	private CameraCaptureSession.StateCallback createCaptureSessionCallback(
		Handler cameraHandler,
		CaptureRequest.Builder captureRequestBuilder
	) {
		return new CameraCaptureSession.StateCallback() {
			@Override
			public void onConfigureFailed(CameraCaptureSession session) {}

			@Override
			public void onConfigured(CameraCaptureSession session) {
				try {
					session.setRepeatingRequest(captureRequestBuilder.build(), null, cameraHandler);
				}
				catch (CameraAccessException e) {
					e.printStackTrace();
				}
			}
		};
	}

	private CameraDevice.StateCallback createCameraStateCallback(Handler cameraHandler) {
		return new CameraDevice.StateCallback() {
			@Override
			public void onOpened(CameraDevice camera) {
				// Create camera capture request
				try {
					CaptureRequest.Builder captureRequestBuilder = camera.createCaptureRequest(CameraDevice.TEMPLATE_PREVIEW);
					Surface previewSurface = new Surface(getSurfaceControl());
					captureRequestBuilder.addTarget(previewSurface);
					CameraCaptureSession.StateCallback captureSessionCallback = createCaptureSessionCallback(cameraHandler, captureRequestBuilder);

					// Create camera session with request
					SessionConfiguration sessionConfig = new SessionConfiguration(
						SessionConfiguration.SESSION_REGULAR,
						Collections.singletonList(new OutputConfiguration(previewSurface)),
						new HandlerExecutor(cameraHandler),
						captureSessionCallback
					);
					camera.createCaptureSession(sessionConfig);
				}
				catch (CameraAccessException e) {
					e.printStackTrace();
				}
			}

			@Override
			public void onDisconnected(CameraDevice camera) {}

			@Override
			public void onError(CameraDevice camera, int error) {
				Log.e("CameraView", "Error accessing camera: " + error);
			}
		};
	}

	@Override
	public void surfaceCreated(SurfaceHolder holder) {
		// Start background thread to run the camera in, to use as handler when opening camera
		HandlerThread cameraThread = new HandlerThread("CameraThread");
		cameraThread.start();
		Handler cameraHandler = new Handler(cameraThread.getLooper());

		// Create StateCallback to handle camera status updates
		CameraDevice.StateCallback cameraStateCallback = createCameraStateCallback(cameraHandler);

		// Open camera
		String cameraId = getRearCameraId();
		try {
			cameraManager.openCamera(cameraId, cameraStateCallback, cameraHandler);
		}
		catch (CameraAccessException e) {
			e.printStackTrace();
		}
	}

	@Override
	public void surfaceChanged(SurfaceHolder holder, int format, int width, int height) {}

	@Override
	public void surfaceDestroyed(SurfaceHolder holder) {
		// Stop camera thread
		try {
			cameraThread.quitSafely();
			cameraThread.join();
		}
		catch (InterruptedException e) {
			e.printStackTrace();
		}
	}
}
