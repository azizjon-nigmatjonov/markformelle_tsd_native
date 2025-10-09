import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
  FadeInDown,
} from "react-native-reanimated";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useTheme } from "@/hooks/useTheme";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
}) => {
  const { colors } = useTheme();

  // Animation values
  const floatY = useSharedValue(0);
  const scale = useSharedValue(1);

  useEffect(() => {
    // Floating animation
    floatY.value = withRepeat(
      withSequence(
        withTiming(-10, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 2000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );

    // Subtle scale animation
    scale.value = withRepeat(
      withSequence(
        withTiming(1.05, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );
  }, []);

  const animatedIconStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: floatY.value }, { scale: scale.value }],
    };
  });

  return (
    <ThemedView style={styles.container}>
      <Animated.View style={[styles.iconContainer, animatedIconStyle]}>
        {icon}
      </Animated.View>

      <Animated.View
        entering={FadeInDown.delay(200).duration(600)}
        style={styles.textContainer}
      >
        <ThemedText type="subtitle" style={styles.title}>
          {title}
        </ThemedText>
        {description && (
          <ThemedText
            style={[styles.description, { color: colors.textSecondary }]}
          >
            {description}
          </ThemedText>
        )}
      </Animated.View>

      {action && (
        <Animated.View entering={FadeInDown.delay(400).duration(600)}>
          {action}
        </Animated.View>
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  iconContainer: {
    marginBottom: 24,
  },
  textContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 8,
  },
  description: {
    fontSize: 15,
    textAlign: "center",
    lineHeight: 22,
    maxWidth: 320,
  },
});
