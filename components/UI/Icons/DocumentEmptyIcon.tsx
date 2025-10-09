import React from "react";
import Svg, { Path, Circle, Rect, G } from "react-native-svg";
import { useTheme } from "@/hooks/useTheme";

interface DocumentEmptyIconProps {
  size?: number;
}

/**
 * Empty state icon for document sections
 */
export const DocumentEmptyIcon: React.FC<DocumentEmptyIconProps> = ({
  size = 200,
}) => {
  const { colors } = useTheme();
  const { primary, primary30, primary50, grey20, textSecondary } = colors;

  return (
    <Svg width={size} height={size} viewBox="0 0 200 200" fill="none">
      {/* Background circle */}
      <Circle cx="100" cy="100" r="75" fill={primary50} opacity="0.15" />

      {/* File/folder icon */}
      <Path
        d="M60 70 L60 145 C60 148 62 150 65 150 L135 150 C138 150 140 148 140 145 L140 85 L120 65 L65 65 C62 65 60 67 60 70 Z"
        fill={grey20}
        opacity="0.6"
      />

      <Path d="M120 65 L120 85 L140 85" fill={primary30} opacity="0.4" />

      <Path
        d="M60 70 L60 145 C60 148 62 150 65 150 L135 150 C138 150 140 148 140 145 L140 85 L120 65 L65 65 C62 65 60 67 60 70 Z"
        stroke={primary}
        strokeWidth="2"
        fill="none"
      />

      {/* Document lines */}
      <Rect
        x="75"
        y="95"
        width="50"
        height="3"
        rx="1.5"
        fill={textSecondary}
        opacity="0.4"
      />
      <Rect
        x="75"
        y="105"
        width="45"
        height="3"
        rx="1.5"
        fill={textSecondary}
        opacity="0.4"
      />
      <Rect
        x="75"
        y="115"
        width="40"
        height="3"
        rx="1.5"
        fill={textSecondary}
        opacity="0.4"
      />
      <Rect
        x="75"
        y="125"
        width="50"
        height="3"
        rx="1.5"
        fill={textSecondary}
        opacity="0.4"
      />

      {/* Plus icon */}
      <Circle cx="130" cy="125" r="15" fill={primary} opacity="0.9" />
      <Path
        d="M130 118 L130 132 M123 125 L137 125"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Decorative elements */}
      <Circle cx="50" cy="60" r="3" fill={primary} opacity="0.3" />
      <Circle cx="150" cy="65" r="2.5" fill={primary} opacity="0.4" />
      <Circle cx="55" cy="155" r="3.5" fill={primary} opacity="0.35" />
    </Svg>
  );
};

export default DocumentEmptyIcon;
