import React from "react";
import Svg, { Path, Circle, Rect, G } from "react-native-svg";
import { useTheme } from "@/hooks/useTheme";

interface InstructionEmptyIconProps {
  size?: number;
}

export const InstructionEmptyIcon: React.FC<InstructionEmptyIconProps> = ({
  size = 200,
}) => {
  const { colors } = useTheme();
  const { primary, primary30, primary50, grey20, textSecondary } = colors;

  return (
    <Svg width={size} height={size} viewBox="0 0 200 200" fill="none">
      {/* Background circle */}
      <Circle cx="100" cy="100" r="80" fill={primary50} opacity="0.2" />

      {/* Document stack */}
      <G opacity="0.4">
        <Rect x="55" y="75" width="90" height="70" rx="8" fill={grey20} />
      </G>

      <G opacity="0.6">
        <Rect x="60" y="70" width="90" height="70" rx="8" fill={grey20} />
      </G>

      {/* Main document */}
      <Rect
        x="65"
        y="65"
        width="90"
        height="70"
        rx="8"
        fill={primary30}
        opacity="0.3"
      />

      <Rect
        x="65"
        y="65"
        width="90"
        height="70"
        rx="8"
        stroke={primary}
        strokeWidth="2"
        fill="none"
      />

      {/* Document lines */}
      <Rect
        x="78"
        y="80"
        width="45"
        height="3"
        rx="1.5"
        fill={primary}
        opacity="0.6"
      />
      <Rect
        x="78"
        y="90"
        width="64"
        height="3"
        rx="1.5"
        fill={textSecondary}
        opacity="0.4"
      />
      <Rect
        x="78"
        y="100"
        width="55"
        height="3"
        rx="1.5"
        fill={textSecondary}
        opacity="0.4"
      />
      <Rect
        x="78"
        y="110"
        width="60"
        height="3"
        rx="1.5"
        fill={textSecondary}
        opacity="0.4"
      />

      {/* Magnifying glass */}
      <Circle
        cx="130"
        cy="120"
        r="18"
        stroke={primary}
        strokeWidth="3"
        fill="none"
      />
      <Circle cx="130" cy="120" r="12" fill={primary50} opacity="0.3" />
      <Path
        d="M 143 133 L 153 143"
        stroke={primary}
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Decorative dots */}
      <Circle cx="45" cy="50" r="4" fill={primary} opacity="0.3" />
      <Circle cx="155" cy="55" r="3" fill={primary} opacity="0.4" />
      <Circle cx="50" cy="150" r="3.5" fill={primary} opacity="0.35" />
      <Circle cx="160" cy="145" r="4" fill={primary} opacity="0.3" />
    </Svg>
  );
};

export default InstructionEmptyIcon;
