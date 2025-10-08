# 🎨 Toast System - Visual Design Guide

## 🖼️ How It Looks

### Success Toast
```
╔════════════════════════════════════════════════════════╗
║  ┌──────┐                                              ║
║  │  ✅  │  Operation completed successfully! 🎉    ✕  ║
║  └──────┘                                              ║
║  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░                ║
╚════════════════════════════════════════════════════════╝
   Green (#10b981)
   Border: Darker green (#059669)
   Shadow: Green glow
   Haptic: Success feedback
```

### Error Toast
```
╔════════════════════════════════════════════════════════╗
║  ┌──────┐                                              ║
║  │  ❌  │  Something went wrong. Try again. 😔    ✕  ║
║  └──────┘                                              ║
║  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░                ║
╚════════════════════════════════════════════════════════╝
   Red (#ef4444)
   Border: Darker red (#dc2626)
   Shadow: Red glow
   Haptic: Error feedback
```

### Warning Toast
```
╔════════════════════════════════════════════════════════╗
║  ┌──────┐                                              ║
║  │  ⚠️  │  Low storage space. Free up memory. ⚠️  ✕  ║
║  └──────┘                                              ║
║  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░                ║
╚════════════════════════════════════════════════════════╝
   Orange (#f59e0b)
   Border: Darker orange (#d97706)
   Shadow: Orange glow
   Haptic: Warning feedback
```

### Info Toast
```
╔════════════════════════════════════════════════════════╗
║  ┌──────┐                                              ║
║  │  ℹ️  │  New features available. Check them! ℹ️ ✕  ║
║  └──────┘                                              ║
║  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░                ║
╚════════════════════════════════════════════════════════╝
   Blue (#3b82f6)
   Border: Darker blue (#2563eb)
   Shadow: Blue glow
   Haptic: Light impact
```

## 📐 Layout Structure

```
┌─────────────────────────────────────────────────────────┐
│ Toast Container (Full Width, Positioned at Top/Bottom) │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ [Icon] [Message Text..................] [Emoji] [X] │ │
│ │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │ │
│ │ Progress Bar (fills left to right)                  │ │
│ └─────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

### Anatomy of a Toast

```
┌──────────────────────────────────────────────────────┐
│ │←6px│                                                │
│ █     ┌────────┐                                      │
│ █     │        │  ← Icon Container (40x40)            │
│ █     │   ✅   │     - Rounded background            │
│ █     │        │     - White transparent bg           │
│ █     └────────┘                                      │
│ █                                                      │
│ █     Message Text Area                               │
│ █     - Font: 15px, weight: 600                      │
│ █     - Color: White (#fff)                          │
│ █     - Max 3 lines                                  │
│ █                                                      │
│ █              🎉 ← Emoji (24px)                      │
│ █                                                      │
│ █                    ┌────┐                          │
│ █                    │ ✕  │ ← Close Button (32x32)   │
│ █                    └────┘   - Semi-transparent bg  │
│ │                                                      │
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░ ← Progress Bar (3px)      │
└──────────────────────────────────────────────────────┘
     ↑
  Border (6px left)
```

## 🎬 Animation Sequence

### Entrance (300ms)

```
Frame 0ms:
  Position: -100px (off screen)
  Opacity: 0
  Scale: 0.8

Frame 150ms:
  Position: -20px
  Opacity: 0.7
  Scale: 0.95
  [Haptic feedback triggers]

Frame 300ms:
  Position: 0px
  Opacity: 1
  Scale: 1
  [Toast fully visible]
```

### Auto-Dismiss (3000ms)

```
0ms ─────────── 3000ms
▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░
[Progress bar fills from left to right]
```

### Exit (250ms)

```
Frame 0ms:
  Position: 0px
  Opacity: 1
  Scale: 1

Frame 125ms:
  Position: -50px
  Opacity: 0.3
  Scale: 0.9

Frame 250ms:
  Position: -100px (off screen)
  Opacity: 0
  Scale: 0.8
  [Toast removed from DOM]
```

## 📏 Dimensions & Spacing

### Toast Container
- **Width**: Screen width - 32px (16px margin each side)
- **Max Width**: 500px (for tablets/desktop)
- **Min Height**: 70px
- **Border Radius**: 16px
- **Padding**: 16px all sides
- **Margin Top**: 50px (mobile), 20px (web)
- **Margin Bottom**: 50px (mobile), 20px (web)

### Icon Container
- **Size**: 40x40px
- **Border Radius**: 20px (circle)
- **Background**: rgba(255, 255, 255, 0.2)
- **Icon Size**: 28px
- **Margin Right**: 12px

### Message Text
- **Font Size**: 15px
- **Font Weight**: 600
- **Line Height**: 20px
- **Letter Spacing**: 0.2px
- **Color**: #ffffff
- **Max Lines**: 3

### Emoji
- **Font Size**: 24px
- **Margin Right**: 8px

### Close Button
- **Size**: 32x32px
- **Border Radius**: 16px (circle)
- **Background**: rgba(255, 255, 255, 0.15)
- **Icon Size**: 20px
- **Hit Area**: 44x44px (accessibility)

### Progress Bar
- **Height**: 3px
- **Background**: rgba(255, 255, 255, 0.4)
- **Position**: Absolute bottom

### Shadows
- **Offset**: 0px horizontal, 8px vertical
- **Blur**: 16px
- **Opacity**: 0.3
- **Elevation**: 12 (Android)

## 🎨 Color Palette

### Success
```
Background:  #10b981 ■
Border:      #059669 ■
Shadow:      #10b981 ■ (30% opacity)
Text:        #ffffff ■
Icon BG:     rgba(255, 255, 255, 0.2) ◻
```

### Error
```
Background:  #ef4444 ■
Border:      #dc2626 ■
Shadow:      #ef4444 ■ (30% opacity)
Text:        #ffffff ■
Icon BG:     rgba(255, 255, 255, 0.2) ◻
```

### Warning
```
Background:  #f59e0b ■
Border:      #d97706 ■
Shadow:      #f59e0b ■ (30% opacity)
Text:        #ffffff ■
Icon BG:     rgba(255, 255, 255, 0.2) ◻
```

### Info
```
Background:  #3b82f6 ■
Border:      #2563eb ■
Shadow:      #3b82f6 ■ (30% opacity)
Text:        #ffffff ■
Icon BG:     rgba(255, 255, 255, 0.2) ◻
```

## 📱 Responsive Behavior

### Mobile (< 768px)
- Full width minus 32px margins
- Position: Top 50px or Bottom 50px
- Stack vertically with 80px spacing

### Tablet (768px - 1024px)
- Max width: 500px
- Centered horizontally
- Position: Top 40px or Bottom 40px
- Stack vertically with 80px spacing

### Desktop (> 1024px)
- Max width: 500px
- Positioned right side (optional customization)
- Position: Top 20px or Bottom 20px
- Stack vertically with 80px spacing

## 🔊 Haptic Feedback Patterns

### iOS/Android
```
Success:  ━━━ (Heavy impact, pleasant)
Error:    ━ ━ ━ (Three light impacts, attention)
Warning:  ━━  (Medium impact, cautionary)
Info:     ━ (Light impact, subtle)
```

### Web
```
No haptic feedback
Relies on visual cues only
```

## 🎯 Interaction States

### Default State
```
┌──────────────────────┐
│ [Icon] Message  [X]  │
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░   │
└──────────────────────┘
```

### Hover State (Web)
```
┌──────────────────────┐
│ [Icon] Message  [X]  │  ← Subtle brightness increase
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░   │
└──────────────────────┘
Cursor: pointer
```

### Pressed State
```
┌──────────────────────┐
│ [Icon] Message  [X]  │  ← Slight scale down (0.98)
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░   │
└──────────────────────┘
```

### Close Button Hover
```
┌──────────────────────┐
│ [Icon] Message  ⦿   │  ← Close button highlighted
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░   │
└──────────────────────┘
```

## 🎪 Multiple Toasts

### Stack Behavior
```
Screen Top
┌──────────────────────┐
│ Toast 1 (newest)     │  ← Top position + 0px
└──────────────────────┘

┌──────────────────────┐
│ Toast 2              │  ← Top position + 80px
└──────────────────────┘

┌──────────────────────┐
│ Toast 3 (oldest)     │  ← Top position + 160px
└──────────────────────┘

(Max 3 toasts shown)
```

## 🎨 Design Philosophy

### Emotional Design
- **Success**: Celebratory (🎉) - Make users feel accomplished
- **Error**: Empathetic (😔) - Show understanding, not blame
- **Warning**: Cautionary (⚠️) - Alert without alarming
- **Info**: Informative (ℹ️) - Neutral and helpful

### Micro-interactions
- **Spring animations**: Natural, bouncy feel
- **Progress bar**: Sets expectations
- **Haptic feedback**: Physical confirmation
- **Easy dismiss**: User control
- **Auto-dismiss**: Doesn't require action

### Accessibility
- **High contrast**: White text on colored backgrounds
- **Large touch targets**: 44x44px minimum
- **Clear icons**: Universal symbols
- **Timed display**: Consistent duration
- **Dismiss options**: Tap anywhere or close button

## 📊 Performance

### Metrics
- **Entrance animation**: 300ms
- **Exit animation**: 250ms
- **Auto-dismiss**: 3000ms (configurable)
- **Frame rate**: 60fps
- **GPU acceleration**: Yes (useNativeDriver: true)

### Optimization
- React.memo for toast components
- Minimal re-renders
- Efficient animation drivers
- Lightweight dependencies

---

**This visual guide shows how every detail was considered to create a delightful user experience!**

