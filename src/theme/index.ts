import { StyleSheet } from "react-native";

export const colors = {
  primary: "#ffdd00", // Amarillo del diseño
  secondary: "#eaeaea", // Gris claro para botones
  danger: "#d50000", // Rojo
  textPrimary: "#333333",
  textSecondary: "#666666",
  background: "#ffffff",
  border: "#cccccc",
  error: "#d50000",
  white: "#ffffff",
  headerTitle: "#0f265c", // Azul oscuro corporativo
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const fontSize = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 20,
  xxl: 24,
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
