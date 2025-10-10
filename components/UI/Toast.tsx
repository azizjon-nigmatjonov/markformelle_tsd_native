import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableOpacity,
  Platform,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

const { width } = Dimensions.get("window");

export type ToastType = "success" | "error" | "warning" | "info";

interface ToastProps {
  message: string;
  type?: ToastType;
  duration?: number;
  onDismiss: () => void;
  position?: "top" | "bottom";
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type = "info",
  duration = 3000,
  onDismiss,
  position = "top",
}) => {
  const slideAnim = useRef(new Animated.Value(-100)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // Trigger haptic feedback
    if (Platform.OS !== "web") {
      if (type === "success") {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      } else if (type === "error") {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      } else if (type === "warning") {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      } else {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
    }

    // Entrance animation
    Animated.parallel([
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 100,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    // Auto dismiss
    const timer = setTimeout(() => {
      handleDismiss();
    }, duration);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: position === "top" ? -100 : 100,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.8,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onDismiss();
    });
  };

  const getToastConfig = () => {
    switch (type) {
      case "success":
        return {
          backgroundColor: "#10b981",
          icon: "check-circle",
          emoji: "🎉",
          borderColor: "#059669",
          shadowColor: "#10b981",
        };
      case "error":
        return {
          backgroundColor: "#ef4444",
          icon: "error",
          emoji: "😔",
          borderColor: "#dc2626",
          shadowColor: "#ef4444",
        };
      case "warning":
        return {
          backgroundColor: "#f59e0b",
          icon: "warning",
          emoji: "⚠️",
          borderColor: "#d97706",
          shadowColor: "#f59e0b",
        };
      case "info":
      default:
        return {
          backgroundColor: "#3b82f6",
          icon: "info",
          emoji: "ℹ️",
          borderColor: "#2563eb",
          shadowColor: "#3b82f6",
        };
    }
  };

  const config = getToastConfig();

  return (
    <Animated.View
      style={[
        styles.container,
        position === "top" ? styles.topPosition : styles.bottomPosition,
        {
          opacity: opacityAnim,
          transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
        },
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={handleDismiss}
        style={[
          styles.toast,
          {
            backgroundColor: config.backgroundColor,
            borderLeftColor: config.borderColor,
            shadowColor: config.shadowColor,
          },
        ]}
      >
        {/* Animated background gradient effect */}
        <View style={styles.shimmerOverlay} />

        {/* Icon with pulse animation */}
        <View style={styles.iconContainer}>
          <MaterialIcons name={config.icon as any} size={28} color="#fff" />
        </View>

        {/* Message */}
        <View style={styles.messageContainer}>
          <Text style={styles.message} numberOfLines={3}>
            {message}
          </Text>
        </View>

        {/* Emoji decoration */}
        <Text style={styles.emoji}>{config.emoji}</Text>

        {/* Close button */}
        <TouchableOpacity
          onPress={handleDismiss}
          style={styles.closeButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <MaterialIcons name="close" size={20} color="rgba(255,255,255,0.8)" />
        </TouchableOpacity>

        {/* Progress bar */}
        <Animated.View
          style={[
            styles.progressBar,
            {
              transform: [
                {
                  scaleX: opacityAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                  }),
                },
              ],
            },
          ]}
        />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 99999,
    paddingHorizontal: 16,
  },
  topPosition: {
    top: Platform.OS === "web" ? 20 : 50,
  },
  bottomPosition: {
    bottom: Platform.OS === "web" ? 20 : 50,
  },
  toast: {
    maxWidth: width - 32,
    minWidth: 280,
    minHeight: 70,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderLeftWidth: 6,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
    overflow: "hidden",
  },
  shimmerOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  messageContainer: {
    flex: 1,
    marginRight: 8,
  },
  message: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
    lineHeight: 20,
    letterSpacing: 0.2,
  },
  emoji: {
    fontSize: 24,
    marginRight: 8,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    justifyContent: "center",
    alignItems: "center",
  },
  progressBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    transformOrigin: "left",
  },
});
