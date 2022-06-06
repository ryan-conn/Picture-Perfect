package com.pictureperfect;

import android.content.Context;
import android.content.res.Configuration;
import android.hardware.Camera;
import android.view.SurfaceHolder;
import android.view.SurfaceView;
import java.io.IOException;

public class CameraView extends SurfaceView implements SurfaceHolder.Callback {

	Camera camera;
	SurfaceHolder holder;

	public CameraView(Context context, Camera camera) {
		super(context);
		this.camera = camera;
		holder = getHolder();
		holder.addCallback(this);
	}

	@Override
	public void surfaceCreated(SurfaceHolder holder) {
		Camera.Parameters params = camera.getParameters();

		// Set orientation
		if (this.getResources().getConfiguration().orientation == Configuration.ORIENTATION_LANDSCAPE) {
			params.set("orientation", "landscape");
			params.setRotation(0);
			camera.setDisplayOrientation(0);
		}
		else {
			params.set("orientation", "portrait");
			params.setRotation(90);
			camera.setDisplayOrientation(90);
		}

		// Set parameters
		camera.setParameters(params);

		// Start camera
		try {
			camera.setPreviewDisplay(holder);
			camera.startPreview();
		}
		catch (IOException e) {
			e.printStackTrace();
		}
	}

	@Override
	public void surfaceChanged(SurfaceHolder holder, int format, int width, int height) {

	}

	@Override
	public void surfaceDestroyed(SurfaceHolder holder) {

	}
}
