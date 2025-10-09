# Quick Start Guide - Authentication System

## ✅ What's Been Set Up

Your app now has a complete authentication system with:

1. ✅ **Zustand store** for auth state management with persistence
2. ✅ **React Query** for API data fetching and caching
3. ✅ **Axios client** with automatic token injection and error handling
4. ✅ **Auth service** with login/logout endpoints
5. ✅ **Custom hooks** for easy auth operations
6. ✅ **Updated login component** using React Query

## 🚀 Quick Start (3 Steps)

### Step 1: Set Your API Base URL

Edit `app.json` and update the API URL:

```json
{
  "expo": {
    "extra": {
      "API_BASE_URL": "https://your-actual-api-url.com/api"
    }
  }
}
```

**Example:**
```json
"API_BASE_URL": "https://api.mycompany.com/v1"
```

### Step 2: Verify Your Login Endpoint

The system expects your `/login` endpoint to return:

```json
{
  "token": "your-jwt-token-here",
  "user": {
    "id": 1,
    "name": "User Name",
    "login": "username",
    "role": "admin"
  }
}
```

**Request format:**
```json
POST /login
{
  "login": "username",
  "password": "password"
}
```

### Step 3: Test the Login

The login component (`app/(login)/index.tsx`) is already updated to use the new system:

```typescript
// Already implemented - no changes needed!
const { mutate: login, isPending } = useLogin();

const onSubmit = (data) => {
  login({
    login: data.login,
    password: data.password,
  });
};
```

## 📱 How to Use

### Login
```typescript
import { useLogin } from '@/hooks/useAuth';

const { mutate: login, isPending } = useLogin();

login({ login: 'user', password: 'pass' });
```

### Logout
```typescript
import { useLogout } from '@/hooks/useAuth';

const { mutate: logout } = useLogout();

logout();
```

### Check Auth Status
```typescript
import { useAuth } from '@/hooks/useAuth';

const { user, isAuthenticated } = useAuth();

if (isAuthenticated) {
  console.log('Logged in as:', user.name);
}
```

## 🔧 Customization

### Need Different Login Fields?

Edit `api/services/auth.service.ts`:

```typescript
export interface LoginCredentials {
  login: string;
  password?: string;
  email?: string;  // Add new fields
  otp?: string;    // Add OTP
}
```

### Need Different Response Format?

Update `api/services/auth.service.ts`:

```typescript
export interface LoginResponse {
  token: string;
  user: {
    id: number;
    name: string;
    // Add your fields here
  };
}
```

### Add New API Endpoints?

1. Create service in `api/services/your-service.ts`
2. Create hook in `hooks/useYourService.ts`
3. Use in component

See `api/services/example.service.ts` and `hooks/useExample.ts` for templates!

## 🎯 Current Login Component

Your login component now:
- ✅ Uses React Query for API calls
- ✅ Shows loading state while authenticating
- ✅ Handles errors automatically with toast messages
- ✅ Saves user data to Zustand store (persists to AsyncStorage)
- ✅ Navigates based on user role
- ✅ Disables button during submission

## 🔍 File Changes Summary

### New Files
- `api/client.ts` - Axios client with interceptors
- `api/services/auth.service.ts` - Auth endpoints
- `api/services/example.service.ts` - Service template
- `api/services/index.ts` - Service exports
- `config/env.ts` - Environment configuration
- `hooks/useAuth.ts` - Auth React Query hooks
- `hooks/useExample.ts` - Example hook template
- `providers/QueryProvider.tsx` - React Query provider
- `.env.example` - Environment variables template
- `api/README.md` - API documentation
- `AUTHENTICATION_SETUP.md` - Full auth guide
- `QUICK_START.md` - This file

### Modified Files
- `app/_layout.tsx` - Added QueryProvider, cleaned up auth logic
- `app/(login)/index.tsx` - Updated to use React Query hooks
- `store/auth/index.ts` - Enhanced with TypeScript types and new actions
- `app.json` - Added API_BASE_URL to extra config

## 🐛 Troubleshooting

### API Calls Not Working?

1. Check your API URL in `app.json`
2. Verify your endpoint returns the correct format
3. Check console logs for detailed error messages

### Token Not Being Sent?

The API client automatically adds tokens to all requests. If it's not working:

1. Check if user is logged in: `useAuthStore.getState()`
2. Verify token is in the response from `/login`
3. Check network tab in browser/debugger

### Login Redirects Immediately?

The app checks authentication on startup. If you're already logged in, it will redirect to home. To test login:

```typescript
// Clear auth
useAuthStore.getState().clearAuth();

// Or manually in console
import AsyncStorage from '@react-native-async-storage/async-storage';
await AsyncStorage.removeItem('app-state-auth');
```

## 📚 Next Steps

1. **Update API URL** in `app.json`
2. **Test login** with your actual API
3. **Add more services** using the templates
4. **Customize user fields** as needed
5. **Add token refresh** if needed (see auth.service.ts)

## 💡 Pro Tips

- All API requests are logged in development mode (check console)
- Auth state persists across app restarts automatically
- Use `useAuth()` hook to access user data anywhere
- React Query handles caching, refetching, and loading states
- Create new services by copying `example.service.ts`

## 📖 Documentation

- **Full Auth Guide**: See `AUTHENTICATION_SETUP.md`
- **API Documentation**: See `api/README.md`
- **Service Templates**: See `api/services/example.service.ts`
- **Hook Templates**: See `hooks/useExample.ts`

## 🆘 Need Help?

Check the comprehensive guides:
1. `AUTHENTICATION_SETUP.md` - Complete auth documentation
2. `api/README.md` - API client and services guide
3. Look at example files in `api/services/` and `hooks/`

---

**You're all set! 🎉**

Just update the API URL and you're ready to go!

