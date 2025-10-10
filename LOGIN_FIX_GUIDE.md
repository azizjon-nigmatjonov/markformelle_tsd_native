# Android APK Login Crash Fix Guide

## Problem Summary
Your Android APK was closing immediately during login. This was caused by several issues that have now been fixed.

## Root Causes Identified and Fixed

### 1. **Invalid Navigation Route (CRITICAL)**
**Problem:** In `hooks/useAuth.ts`, the code was trying to navigate to `sections[data.user_info.podr_id]` which could be `undefined` if the user's `podr_id` didn't match the available sections (841 or 842).

**Fix Applied:**
- Added validation to check if the section exists before navigating
- Added fallback navigation to `/home` for invalid sections
- Wrapped navigation in try-catch block
- Added 100ms delay to ensure state updates before navigation

### 2. **Missing Error Boundary**
**Problem:** Any unhandled JavaScript errors would crash the entire app with no recovery option.

**Fix Applied:**
- Created `components/ErrorBoundary.tsx` to catch all React errors
- Wrapped the entire app in the error boundary in `app/_layout.tsx`
- Shows user-friendly error message instead of crashing
- Displays detailed error info in development mode

### 3. **Emoji in Toast Message**
**Problem:** The emoji (👋) in the success toast could cause encoding issues on some Android builds.

**Fix Applied:**
- Removed emoji from the toast message
- Changed from `Добро пожаловать, ${name}! 👋` to `Добро пожаловать, ${name}!`

### 4. **Insufficient Error Handling in API Client**
**Problem:** The API interceptors could crash if `useAuthStore.getState()` failed or `__DEV__` was undefined.

**Fix Applied:**
- Wrapped request interceptor in try-catch
- Added check for `__DEV__` existence before using it
- Added try-catch around auth store access
- Better error logging for network issues

### 5. **Insufficient Error Handling in Storage**
**Problem:** AsyncStorage operations could fail silently or crash the app.

**Fix Applied:**
- Added detailed logging for all storage operations
- Better error messages identifying which operation failed
- Re-throw errors for critical failures (like setItem)

## Files Modified

1. **hooks/useAuth.ts**
   - Fixed navigation logic
   - Added comprehensive error handling
   - Added detailed console logging for debugging

2. **components/ErrorBoundary.tsx** (NEW)
   - Global error catching
   - User-friendly error UI
   - Development error details

3. **app/_layout.tsx**
   - Wrapped app with ErrorBoundary
   - Imported ErrorBoundary component

4. **api/client.ts**
   - Added try-catch in request interceptor
   - Fixed `__DEV__` check
   - Better error handling in response interceptor

5. **utils/storage.ts**
   - Added detailed logging
   - Better error messages
   - Re-throw critical errors

6. **store/sections/index.ts**
   - Improved type safety
   - Changed number keys to string keys ("841", "842")
   - Added `getSectionRoute` helper method

7. **app/(login)/index.tsx**
   - Added error handling in onSubmit
   - Added console logging for debugging

## How to Test

### 1. Build a New APK
```bash
# For preview/development build
eas build --platform android --profile preview

# For production build
eas build --platform android --profile production
```

### 2. Install and Test
1. Install the new APK on your Android device
2. Open the app
3. Try logging in with various user credentials

### 3. Check Logs
To see the detailed logs, connect your device via USB and run:
```bash
adb logcat | grep -i "ReactNativeJS\|chromium"
```

Or use React Native Debugger:
```bash
npx react-native log-android
```

## What to Look for in Logs

When you login, you should see logs in this order:
```
1. "Login attempt started"
2. "Login mutation started"
3. "Login successful, processing response"
4. "Saving auth to store"
5. "Storage setItem: app-state-auth"
6. "Storage setItem successful: app-state-auth"
7. "Showing success toast"
8. "User podr_id: XXX, Available sections: ..."
9. "Navigating after login"
10. "Navigating to: /XXX" or "No matching section, navigating to /home"
```

If you see any errors, they will be clearly logged with `❌` or "Error:" prefixes.

## Additional Recommendations

### 1. Add Error Reporting Service (Optional)
Consider adding Sentry or similar service for production error tracking:
```bash
npm install @sentry/react-native
```

### 2. Test on Multiple Android Versions
- Test on Android 9 (Pie) or higher
- Test on both physical devices and emulators
- Test with different screen sizes

### 3. Network Issues
Make sure your device can reach `http://10.40.14.193:8070`:
- The device must be on the same network
- The server must be running
- Firewall must allow connections

### 4. Check AsyncStorage Permissions
In `android/app/src/main/AndroidManifest.xml`, ensure you have:
```xml
<uses-permission android:name="android.permission.INTERNET" />
```

## Debugging Tips

### If the app still closes:

1. **Check Android Logcat:**
   ```bash
   adb logcat *:E
   ```
   This shows only errors.

2. **Check for missing routes:**
   - Ensure `/home` route exists and is properly configured
   - Verify user's `podr_id` matches available sections

3. **Test in development mode first:**
   ```bash
   npx expo start
   # Then press 'a' for Android
   ```
   This will give you better error messages.

4. **Check AsyncStorage size:**
   AsyncStorage has size limits. Clear it if needed:
   ```javascript
   // Add to login screen temporarily
   import AsyncStorage from '@react-native-async-storage/async-storage';
   AsyncStorage.clear();
   ```

## Common Android-Specific Issues

1. **Cleartext traffic:** Already configured in `app.json` ✓
2. **Network Security:** Make sure HTTP is allowed for your API URL
3. **Permissions:** Ensure internet permission is granted
4. **Memory:** Large apps may crash on low-memory devices

## Next Steps

1. Build a new APK with these fixes
2. Test on your Android device
3. Check logs to see where the flow stops (if it still fails)
4. Report back with the logs if issues persist

## Summary of Key Changes

✅ Fixed invalid route navigation (main issue)  
✅ Added global error boundary  
✅ Removed problematic emoji  
✅ Added comprehensive error handling  
✅ Added detailed logging for debugging  
✅ Improved type safety  
✅ Better AsyncStorage error handling  

The app should now:
- Not crash on login
- Show error UI if something goes wrong
- Provide detailed logs for debugging
- Gracefully handle navigation errors
- Handle missing or invalid user sections

---

**Need Help?**
If the app still closes after these fixes, please:
1. Run `adb logcat` during login
2. Copy the error logs
3. Share the logs so we can identify any remaining issues

