# API Documentation

This directory contains all API-related code including client configuration, services, and types.

## 📁 Structure

```
api/
├── client.ts                 # Axios client configuration with interceptors
├── services/                 # API service modules
│   ├── auth.service.ts      # Authentication endpoints
│   ├── example.service.ts   # Example service template
│   └── index.ts             # Service exports
└── README.md                # This file
```

## 🔧 Configuration

### Environment Variables

Set your API base URL in `app.json`:

```json
{
  "expo": {
    "extra": {
      "API_BASE_URL": "https://your-api-url.com/api"
    }
  }
}
```

Or access it via `config/env.ts` which handles environment variable loading.

## 🚀 API Client

The API client (`client.ts`) is a configured Axios instance with:

### Features

- **Automatic token injection** - Auth tokens are automatically added to requests
- **Request/Response logging** - Development logs for debugging
- **Error handling** - Centralized error handling with status code management
- **Auto logout on 401** - Unauthorized requests automatically clear auth

### Usage

```typescript
import { api } from '@/api/client';

// GET request
const data = await api.get('/endpoint');

// POST request
const result = await api.post('/endpoint', { data });

// PUT request
const updated = await api.put('/endpoint/:id', { data });

// DELETE request
await api.delete('/endpoint/:id');
```

## 📝 Creating Services

### 1. Create Service File

Create a new file in `api/services/` (e.g., `user.service.ts`):

```typescript
import { api } from '../client';
import { AxiosResponse } from 'axios';

// Define types
export interface User {
  id: number;
  name: string;
  email: string;
}

// Create service
export const userService = {
  getAll: async (): Promise<User[]> => {
    const response: AxiosResponse<User[]> = await api.get('/users');
    return response.data;
  },

  getById: async (id: number): Promise<User> => {
    const response: AxiosResponse<User> = await api.get(`/users/${id}`);
    return response.data;
  },

  create: async (data: Partial<User>): Promise<User> => {
    const response: AxiosResponse<User> = await api.post('/users', data);
    return response.data;
  },
};
```

### 2. Export Service

Add to `api/services/index.ts`:

```typescript
export * from './user.service';
```

### 3. Create React Query Hook

Create a hook in `hooks/` (e.g., `hooks/useUser.ts`):

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userService, User } from '@/api/services';

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => userService.getAll(),
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<User>) => userService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};
```

### 4. Use in Component

```typescript
import { useUsers, useCreateUser } from '@/hooks/useUser';

const MyComponent = () => {
  const { data: users, isLoading } = useUsers();
  const { mutate: createUser } = useCreateUser();

  const handleCreate = () => {
    createUser({ name: 'John', email: 'john@example.com' });
  };

  // ... rest of component
};
```

## 🔐 Authentication Flow

### Login

```typescript
import { useLogin } from '@/hooks/useAuth';

const LoginComponent = () => {
  const { mutate: login, isPending } = useLogin();

  const handleLogin = (credentials) => {
    login(credentials);
  };
};
```

### Logout

```typescript
import { useLogout } from '@/hooks/useAuth';

const LogoutButton = () => {
  const { mutate: logout } = useLogout();

  return <Button onPress={() => logout()}>Logout</Button>;
};
```

### Access User Info

```typescript
import { useAuth } from '@/hooks/useAuth';

const Profile = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Text>Please login</Text>;
  }

  return <Text>Welcome {user.name}</Text>;
};
```

## 📚 Available Services

### Auth Service (`auth.service.ts`)

- `login(credentials)` - User login
- `logout()` - User logout
- `getProfile()` - Get current user profile
- `refreshToken()` - Refresh auth token
- `verifyToken()` - Verify token validity

### Example Service (`example.service.ts`)

Template service showing common CRUD operations. Copy this to create new services.

## 🎣 React Query Hooks

All API calls should be wrapped in React Query hooks for:

- Automatic caching
- Background refetching
- Loading/error states
- Mutation handling

### Query Example

```typescript
const { data, isLoading, error, refetch } = useQuery({
  queryKey: ['key'],
  queryFn: () => service.method(),
});
```

### Mutation Example

```typescript
const { mutate, isPending, isError, isSuccess } = useMutation({
  mutationFn: (data) => service.method(data),
  onSuccess: () => {
    // Handle success
  },
});
```

## 🛡️ Error Handling

Errors are automatically handled by the API client interceptors:

- **401 Unauthorized** - Auto logout and redirect to login
- **403 Forbidden** - Access denied
- **404 Not Found** - Resource not found
- **500 Server Error** - Server error

Custom error handling in hooks:

```typescript
const { mutate } = useMutation({
  mutationFn: service.method,
  onError: (error) => {
    console.error('Custom error handling:', error);
    toast.error('Operation failed');
  },
});
```

## 📝 Best Practices

1. **Always use TypeScript types** for request/response data
2. **Create separate services** for different API domains
3. **Use React Query hooks** for all API calls
4. **Handle loading and error states** in components
5. **Invalidate queries** after mutations to refresh data
6. **Use query keys consistently** for caching

## 🔍 Debugging

The API client logs all requests and responses in development mode:

- 🚀 Request logs show method, URL, and data
- ✅ Success logs show status and response data
- ❌ Error logs show status and error details

Check console for detailed API logs during development.

