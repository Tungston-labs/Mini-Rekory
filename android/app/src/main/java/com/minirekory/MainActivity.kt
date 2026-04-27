package com.minirekory

import android.os.Bundle
import android.os.Handler
import android.os.Looper
import androidx.core.splashscreen.SplashScreen.Companion.installSplashScreen
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

class MainActivity : ReactActivity() {

  override fun getMainComponentName(): String = "MiniRekory"

  override fun onCreate(savedInstanceState: Bundle?) {
    // ① Install splash screen (fixes Android 12+ shrinking logo animation)
    val splashScreen = installSplashScreen()
    splashScreen.setKeepOnScreenCondition { false } // dismiss immediately

    // ② Keep LaunchTheme during JS bundle load (prevents white flash)
    setTheme(R.style.LaunchTheme)

    super.onCreate(savedInstanceState)
  }

  override fun onResume() {
    super.onResume()
    // ③ Switch to AppTheme after RN has mounted (short delay ensures RN is drawn)
    Handler(Looper.getMainLooper()).postDelayed({
      setTheme(R.style.AppTheme)
    }, 100)
  }

  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
}