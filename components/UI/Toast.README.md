# 🎉 Toast Notification System

A beautiful, emotionally engaging toast notification system with smooth animations, haptic feedback, and delightful visual feedback.

## ✨ Features

- **4 Toast Types**: Success, Error, Warning, and Info
- **Smooth Animations**: Spring-based entrance with fade and scale effects
- **Haptic Feedback**: Physical feedback on iOS/Android for better UX
- **Auto Dismiss**: Configurable duration with visual progress bar
- **Multiple Toasts**: Support for stacking multiple toasts
- **Responsive Design**: Works on mobile, tablet, and web
- **Customizable Position**: Show toasts at top or bottom
- **Easy to Use**: Simple hook-based API
- **Accessible**: Touch to dismiss functionality
- **Beautiful Design**: Modern UI with emojis and icons

## 📦 Installation

The package is already installed and configured in your project!

Required dependencies (already installed):
- `expo-haptics` - For haptic feedback
- `@expo/vector-icons` - For icons

## 🚀 Quick Start

### 1. Basic Usage

Import the `useToast` hook and call the methods:

```tsx
import { useToast } from '@/components/UI/ToastProvider';

function MyComponent() {
  const toast = useToast();

  const handleSuccess = () => {
    toast.success('Operation completed successfully!');
  };

  const handleError = () => {
    toast.error('Something went wrong!');
  };

  return (
    <Button onPress={handleSuccess}>
      Complete Operation
    </Button>
  );
}
```

### 2. All Toast Types

```tsx
const toast = useToast();

// Success - Green, celebratory
toast.success('Profile updated successfully! 🎉');

// Error - Red, empathetic
toast.error('Failed to save changes. Please try again.');

// Warning - Orange, cautionary
toast.warning('Your session will expire in 5 minutes.');

// Info - Blue, informative
toast.info('New features are available. Check them out!');
```

### 3. Custom Duration

```tsx
// Default is 3000ms (3 seconds)
toast.success('Quick message!', 1500); // 1.5 seconds
toast.info('Long message that needs time to read', 5000); // 5 seconds
```

### 4. Custom Position

```tsx
// Show at top (default)
toast.showToast('Top toast message', 'success', 3000, 'top');

// Show at bottom
toast.showToast('Bottom toast message', 'info', 3000, 'bottom');
```

## 📚 API Reference

### `useToast()` Hook

Returns an object with the following methods:

#### `success(message: string, duration?: number)`
Shows a success toast (green) with a celebration emoji.
- **message**: The message to display
- **duration**: Optional duration in milliseconds (default: 3000)

#### `error(message: string, duration?: number)`
Shows an error toast (red) with an empathetic emoji.
- **message**: The message to display
- **duration**: Optional duration in milliseconds (default: 3000)

#### `warning(message: string, duration?: number)`
Shows a warning toast (orange) with a warning emoji.
- **message**: The message to display
- **duration**: Optional duration in milliseconds (default: 3000)

#### `info(message: string, duration?: number)`
Shows an info toast (blue) with an info emoji.
- **message**: The message to display
- **duration**: Optional duration in milliseconds (default: 3000)

#### `showToast(message: string, type?: ToastType, duration?: number, position?: 'top' | 'bottom')`
Shows a custom toast with full control.
- **message**: The message to display
- **type**: 'success' | 'error' | 'warning' | 'info' (default: 'info')
- **duration**: Duration in milliseconds (default: 3000)
- **position**: 'top' | 'bottom' (default: 'top')

## 🎨 Design Features

### Visual Elements
- **Color Coded**: Each type has a distinct color scheme
- **Icons**: Material Icons for clear communication
- **Emojis**: Add emotional context (🎉, 😔, ⚠️, ℹ️)
- **Progress Bar**: Visual indicator of time remaining
- **Shimmer Effect**: Subtle overlay for depth
- **Shadows**: Elevated appearance with proper shadows

### Animations
- **Spring Animation**: Natural, bouncy entrance
- **Fade In/Out**: Smooth opacity transitions
- **Scale**: Subtle scale effect for depth
- **Slide**: Slides in from off-screen

### Interactions
- **Tap to Dismiss**: Touch anywhere on the toast
- **Close Button**: Dedicated close button
- **Auto Dismiss**: Automatically disappears after duration
- **Haptic Feedback**: Physical feedback on show (iOS/Android)

## 💡 Real-World Examples

### Form Submission
```tsx
const handleSubmit = async (data) => {
  try {
    await api.submitForm(data);
    toast.success('Form submitted successfully!');
    router.push('/success');
  } catch (error) {
    toast.error('Failed to submit form. Please try again.');
  }
};
```

### File Upload
```tsx
const handleUpload = async (file) => {
  toast.info('Uploading file...');
  try {
    await uploadFile(file);
    toast.success('File uploaded successfully! 🎉');
  } catch (error) {
    toast.error('Upload failed. Please check your connection.');
  }
};
```

### Authentication
```tsx
const handleLogin = async (credentials) => {
  try {
    await login(credentials);
    toast.success('Welcome back! 👋');
  } catch (error) {
    toast.error('Invalid credentials. Please try again.');
  }
};
```

### Network Status
```tsx
useEffect(() => {
  const unsubscribe = NetInfo.addEventListener(state => {
    if (!state.isConnected) {
      toast.warning('No internet connection. Working offline.');
    } else {
      toast.success('Back online!');
    }
  });
  return unsubscribe;
}, []);
```

### Multiple Steps
```tsx
const handleComplexOperation = async () => {
  toast.info('Starting operation...');
  
  await step1();
  toast.success('Step 1 completed!');
  
  await step2();
  toast.success('Step 2 completed!');
  
  await step3();
  toast.success('All steps completed! 🎉');
};
```

## 🎯 Best Practices

1. **Keep messages concise** - Users should understand at a glance
2. **Use appropriate types** - Match the toast type to the message severity
3. **Provide context** - Tell users what happened and why
4. **Be empathetic** - Use friendly language, especially for errors
5. **Don't spam** - Avoid showing too many toasts at once
6. **Consider timing** - Adjust duration based on message length

### ✅ Good Examples
```tsx
toast.success('Profile updated successfully!');
toast.error('Failed to save. Please check your internet connection.');
toast.warning('Low storage space. Please free up some space.');
```

### ❌ Bad Examples
```tsx
toast.success('Success'); // Too vague
toast.error('Error occurred'); // Not helpful
toast.info('Lorem ipsum dolor sit amet, consectetur adipiscing elit...'); // Too long
```

## 🔧 Configuration

### Customize Toast Provider

In `app/_layout.tsx`, you can configure the maximum number of toasts:

```tsx
<ToastProvider maxToasts={3}>
  {/* Your app */}
</ToastProvider>
```

## 🎨 Customization

### Colors
The toast uses the following color scheme:
- Success: `#10b981` (Green)
- Error: `#ef4444` (Red)
- Warning: `#f59e0b` (Orange)
- Info: `#3b82f6` (Blue)

### Animations
The toast uses:
- Spring tension: 50-100
- Spring friction: 7-8
- Duration: 300ms entrance, 250ms exit

## 🐛 Troubleshooting

### Toast not showing?
1. Ensure `ToastProvider` is wrapping your app in `_layout.tsx`
2. Check that you're calling `useToast()` inside a component
3. Verify the component is a child of `ToastProvider`

### Haptic feedback not working?
- Haptic feedback only works on iOS and Android devices
- Web doesn't support haptic feedback (gracefully falls back)

### Multiple toasts overlapping?
- Adjust `maxToasts` prop in `ToastProvider`
- The system automatically stacks toasts with proper spacing

## 📱 Platform Support

- ✅ iOS
- ✅ Android
- ✅ Web
- ✅ Tablet
- ✅ Desktop (via web)

## 🎭 See It In Action

Check out `components/UI/ToastExample.tsx` for a complete demo with all features!

## 📝 License

Part of your Markformelle TSD Native app.

---

Made with ❤️ and lots of attention to UX details

