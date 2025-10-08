# 🚀 Toast System - Quick Start Guide

## ✅ Installation Complete!

The Toast notification system is now installed and ready to use in your app!

## 📝 How to Use (3 Simple Steps)

### Step 1: Import the Hook
```tsx
import { useToast } from '@/components/UI/ToastProvider';
```

### Step 2: Get the Toast Instance
```tsx
const toast = useToast();
```

### Step 3: Show Toasts!
```tsx
// Success
toast.success('Операция выполнена успешно!');

// Error
toast.error('Произошла ошибка!');

// Warning
toast.warning('Внимание!');

// Info
toast.info('Информация');
```

## 🎯 Real Examples Already Implemented

### 1. Login Page (`app/(login)/index.tsx`)
```tsx
// Success on login
toast.success("Добро пожаловать! 👋");

// Error on invalid credentials
toast.error("Этот пользователь не определен! Попробуйте еще раз");
```

### 2. Get Product UI (`app/chni/machines/components/GetProductUI.tsx`)
```tsx
// Success on product retrieval
toast.success(`Продукт успешно получен! Количество: ${data.quantity}`);

// Error on validation
toast.error("Пожалуйста, введите корректное количество");
```

## 🎨 Features

✨ **4 Beautiful Types:**
- 🎉 Success (Green) - For completed operations
- ❌ Error (Red) - For failures and errors
- ⚠️ Warning (Orange) - For cautions
- ℹ️ Info (Blue) - For information

✨ **Smart UX:**
- Smooth animations
- Haptic feedback on mobile
- Auto-dismiss (3 seconds default)
- Tap to dismiss
- Stack multiple toasts
- Progress bar

## 💡 Common Use Cases

### Form Submission
```tsx
const handleSubmit = async (data) => {
  try {
    await api.submit(data);
    toast.success('Форма успешно отправлена!');
  } catch (error) {
    toast.error('Ошибка отправки формы');
  }
};
```

### Delete Operation
```tsx
const handleDelete = async (id) => {
  try {
    await api.delete(id);
    toast.success('Запись удалена');
  } catch (error) {
    toast.error('Не удалось удалить запись');
  }
};
```

### Validation
```tsx
if (!isValid) {
  toast.warning('Пожалуйста, заполните все поля');
  return;
}
```

### Loading with Update
```tsx
toast.info('Загрузка...');
try {
  await api.fetch();
  toast.success('Данные загружены!');
} catch (error) {
  toast.error('Ошибка загрузки');
}
```

### Network Status
```tsx
if (!navigator.onLine) {
  toast.warning('Нет подключения к интернету');
}
```

## 🎭 Try the Demo

Want to see all features in action?

1. Import the example component:
```tsx
import { ToastExample } from '@/components/UI/ToastExample';
```

2. Add it to any page:
```tsx
<ToastExample />
```

This shows interactive examples of all toast types and features!

## ⚙️ Advanced Usage

### Custom Duration
```tsx
// Short message (1.5 seconds)
toast.success('Сохранено!', 1500);

// Long message (5 seconds)
toast.info('Длинное сообщение, которое нужно прочитать', 5000);
```

### Custom Position
```tsx
// Show at bottom
toast.showToast('Сообщение внизу', 'info', 3000, 'bottom');

// Show at top (default)
toast.showToast('Сообщение вверху', 'info', 3000, 'top');
```

### Sequential Toasts
```tsx
const handleMultiStep = async () => {
  toast.info('Начало операции...');
  
  await step1();
  toast.success('Шаг 1 завершен');
  
  await step2();
  toast.success('Шаг 2 завершен');
  
  await step3();
  toast.success('Все шаги завершены! 🎉');
};
```

## 📱 Platform Support

✅ iOS - Full support with haptic feedback
✅ Android - Full support with haptic feedback
✅ Web - Full support (no haptic)
✅ Tablet - Responsive design
✅ Desktop - Works perfectly

## 🎯 Best Practices

1. **Keep it short** - Users should understand quickly
2. **Be specific** - Tell what happened
3. **Use emojis sparingly** - They're already built in!
4. **Don't spam** - Max 3 toasts at once
5. **Match the type** - Use appropriate color for message

### ✅ Good
```tsx
toast.success('Профиль обновлен');
toast.error('Не удалось сохранить. Проверьте подключение.');
```

### ❌ Bad
```tsx
toast.success('Успех'); // Too vague
toast.error('Ошибка'); // Not helpful
```

## 🔧 Configuration

The app is already configured in `app/_layout.tsx`:

```tsx
<ToastProvider maxToasts={3}>
  {/* Your app */}
</ToastProvider>
```

You can adjust `maxToasts` to show more/fewer toasts at once.

## 📚 Full Documentation

For complete API reference and more examples, see:
- `components/UI/Toast.README.md` - Complete documentation
- `components/UI/ToastExample.tsx` - Interactive examples

## 🆘 Need Help?

Common issues:

**Toast not showing?**
- Make sure you're inside a component (not at file level)
- Check that component is inside `ToastProvider`

**Want different colors?**
- Edit colors in `components/UI/Toast.tsx`
- Look for `getToastConfig()` function

**Want longer/shorter duration?**
- Pass duration as second parameter:
  `toast.success('Message', 5000)`

---

**That's it! Start using toasts in your app now! 🎉**

Replace old error states, alerts, and console.logs with beautiful toast notifications!

