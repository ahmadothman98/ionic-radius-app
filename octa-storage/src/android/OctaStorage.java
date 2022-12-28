package com.octasolutions;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.provider.Settings;
import android.util.Log;
import android.content.pm.ResolveInfo;
import android.text.TextUtils;
import android.content.pm.PackageManager;
import android.os.Bundle;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.StringWriter;
import java.io.PrintWriter;
import java.util.List;

public class OctaStorage extends CordovaPlugin {

    private static String TAG = "OctaStorage";

    private static final int REQUEST_CODE_ENABLE_PERMISSION = 55433;
    private static int ACTION_REQUEST_CODE = 5461;

    private static final String KEY_ERROR = "error";
    private static final String KEY_MESSAGE = "message";
    private static final String KEY_HAS_PERM = "has_permission";

    private static final String ACTION_REQUEST = "request";
    private static final String ACTION_CHECK   = "check";

    @Override
    public boolean execute(String action, final JSONArray args, final CallbackContext callbackContext) throws JSONException {
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                try {
                    if (action.equals(ACTION_REQUEST)) {
                        requestPermissionAction(callbackContext);
                    } 
                    if (action.equals(ACTION_CHECK)) {
                        checkPermissionAction(callbackContext);
                    }
                } catch (Exception e) {
                    JSONObject returnObj = new JSONObject();
                    addProperty(returnObj, KEY_ERROR, err(e));
                    
                    callbackContext.error(returnObj);
                }
            }
        });
        return true;
    }
    private String err(Exception error) {
        // https://stackoverflow.com/questions/1149703/how-can-i-convert-a-stack-trace-to-a-string
        StringWriter sw = new StringWriter();
        PrintWriter pw = new PrintWriter(sw);
        error.printStackTrace(pw);

        return sw.toString();
    }

    private String getPackageName(Activity activity) {
        return "package:" + activity.getPackageName();
    }
    private Intent getIntent(Activity activity) {
        return new Intent(Settings.ACTION_MANAGE_APP_ALL_FILES_ACCESS_PERMISSION, Uri.parse(getPackageName(activity)));
    }
    private void requestPermissionAction(CallbackContext callbackContext) throws Exception {
        Activity activity = this.cordova.getActivity();

        activity.startActivityForResult(getIntent(activity), ACTION_REQUEST_CODE);
        
        callbackContext.success();
    }
    private void checkPermissionAction(CallbackContext callbackContext) throws Exception {
        JSONObject returnObj = new JSONObject();

        Activity activity = this.cordova.getActivity();
        PackageManager packageManager = activity.getPackageManager();
        int p = packageManager.checkPermission("android.permission.READ_EXTERNAL_STORAGE", getPackageName(activity));

        addProperty(returnObj, KEY_HAS_PERM, p);
        callbackContext.success(returnObj);
    }
    private void isPermissionSupportedAction(CallbackContext callbackContext) throws Exception {
        Activity activity = this.cordova.getActivity();
        Context context = activity.getApplicationContext();

        List<ResolveInfo> activities = context.getPackageManager().queryIntentActivities(getIntent(activity), 0);

        JSONObject returnObj = new JSONObject();
        addProperty(returnObj, KEY_HAS_PERM, !activities.isEmpty());

        callbackContext.success(returnObj);
    }

    private void addProperty(JSONObject obj, String key, Object value) {
        try {
            if (value == null) {
                obj.put(key, JSONObject.NULL);
            } else {
                obj.put(key, value);
            }
        } catch (JSONException ignored) {
            //Believe exception only occurs when adding duplicate keys, so just ignore it
        }
    }


   /*  private String[] getPermissions(JSONArray permissions) {
        String[] stringArray = new String[permissions.length()];
        for (int i = 0; i < permissions.length(); i++) {
            try {
                stringArray[i] = permissions.getString(i);
            } catch (JSONException ignored) {
                //Believe exception only occurs when adding duplicate keys, so just ignore it
            }
        }
        return stringArray;
    } */
}
