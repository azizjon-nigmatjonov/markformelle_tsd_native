import React from "react";
import Svg, { Path, Circle, Rect, Line } from "react-native-svg";
import { useTheme } from "@/hooks/useTheme";

interface SearchEmptyIconProps {
  size?: number;
}

/**
 * Empty state icon for search results
 */
export const SearchEmptyIcon: React.FC<SearchEmptyIconProps> = ({
  size = 200,
}) => {
  const { colors } = useTheme();
  const { primary, primary30, primary50, textSecondary } = colors;

  return (
    <Svg width={size} height={size} viewBox="0 0 200 200" fill="none">
      {/* Background */}
      <Circle cx="100" cy="95" r="70" fill={primary50} opacity="0.15" />

      {/* Large magnifying glass */}
      <Circle
        cx="95"
        cy="90"
        r="35"
        stroke={primary}
        strokeWidth="4"
        fill="none"
      />

      <Circle cx="95" cy="90" r="25" fill={primary30} opacity="0.2" />

      {/* Magnifying glass handle */}
      <Path
        d="M 120 115 L 140 135"
        stroke={primary}
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* Question mark inside */}
      <Path
        d="M 90 80 Q 95 75 100 80 Q 105 85 100 90 Q 95 93 95 97"
        stroke={textSecondary}
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.6"
      />
      <Circle cx="95" cy="105" r="2" fill={textSecondary} opacity="0.6" />

      {/* Decorative dots */}
      <Circle cx="55" cy="55" r="4" fill={primary} opacity="0.3" />
      <Circle cx="145" cy="60" r="3" fill={primary} opacity="0.4" />
      <Circle cx="60" cy="130" r="3.5" fill={primary} opacity="0.35" />
      <Circle cx="150" cy="135" r="4" fill={primary} opacity="0.3" />

      {/* Search lines */}
      <Line
        x1="30"
        y1="160"
        x2="70"
        y2="160"
        stroke={textSecondary}
        strokeWidth="2"
        opacity="0.3"
      />
      <Line
        x1="80"
        y1="160"
        x2="100"
        y2="160"
        stroke={textSecondary}
        strokeWidth="2"
        opacity="0.3"
      />
      <Line
        x1="45"
        y1="170"
        x2="85"
        y2="170"
        stroke={textSecondary}
        strokeWidth="2"
        opacity="0.3"
      />
    </Svg>
  );
};

export default SearchEmptyIcon;
