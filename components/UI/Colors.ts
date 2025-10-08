export const lightColors = {
  white: "#fff",
  black: "#18191f",
  black20: "#1E1E1E",
  black30: "#1B1B1D",
  background: "#fff",
  cardBackground: "#f9f9f9",
  text: "#18191f",
  textSecondary: "#9092a3",
  primary: "#3559c7",
  primary20: "#8ebcee",
  primary30: "#8ebcee55",
  primary40: "#BBD7EC",
  primary50: "#3559C733",
  primary60: "#e5f6fd",
  grey: "#9092a3",
  grey20: "#eceff2",
  grey30: "#f9f9f9",
  lightGrey: "#ebf0fa",
  hover: "#9092a322",
  border: "#E0E3EB",
  main: "#ab077e",
  main10: "#a63afd10",
  main20: "#9b1c78",
  main50: "#a63afd55",
  orange: "#ff7f00",
  error: "#db5757",
  success: "#0fc44c",
  yellow: "rgb(255, 168, 0)",
} as const;

export const darkColors = {
  white: "#fff",
  black: "#18191f",
  black20: "#1E1E1E",
  black30: "#1B1B1D",
  background: "#111015",
  cardBackground: "#18191f",
  text: "#ECEDEE",
  textSecondary: "#9BA1A6",
  primary: "#5c7fd8",
  primary20: "#8ebcee",
  primary30: "#8ebcee55",
  primary40: "#BBD7EC",
  primary50: "#3559C733",
  primary60: "#2a3f6f",
  grey: "#9BA1A6",
  grey20: "#2a2b33",
  grey30: "#1E1E1E",
  lightGrey: "#2a2b33",
  hover: "#9092a322",
  border: "#2a2b33",
  main: "#c458a3",
  main10: "#a63afd10",
  main20: "#b84396",
  main50: "#a63afd55",
  orange: "#ff9933",
  error: "#e67373",
  success: "#3dd66b",
  yellow: "rgb(255, 190, 51)",
} as const;

export type GlobalColors = {
  white: string;
  black: string;
  black20: string;
  black30: string;
  background: string;
  cardBackground: string;
  text: string;
  textSecondary: string;
  primary: string;
  primary20: string;
  primary30: string;
  primary40: string;
  primary50: string;
  primary60: string;
  grey: string;
  grey20: string;
  grey30: string;
  lightGrey: string;
  hover: string;
  border: string;
  main: string;
  main10: string;
  main20: string;
  main50: string;
  orange: string;
  error: string;
  success: string;
  yellow: string;
};

// For backward compatibility
export const globalColors = lightColors;
