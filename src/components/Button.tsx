import React from "react";
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from "react-native";
import { colors, spacing, fontSize } from "../theme";

interface ButtonProps {
  text: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  text,
  onPress,
  variant = "primary",
  disabled = false,
  loading = false,
}) => {
  const getBackgroundColor = () => {
    if (disabled) return colors.secondary;
    switch (variant) {
      case "primary":
        return colors.primary;
      case "secondary":
        return colors.secondary; // Gris claro / blanquecino
      case "danger":
        return colors.danger;
      default:
        return colors.primary;
    }
  };

  const getTextColor = () => {
    if (disabled) return colors.textSecondary;
    switch (variant) {
      case "primary":
        return colors.headerTitle; // Azul oscuro sobre amarillo
      case "secondary":
        return colors.headerTitle; // Azul oscuro sobre gris
      case "danger":
        return colors.white; // Blanco sobre rojo
      default:
        return colors.headerTitle;
    }
  };

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: getBackgroundColor() }]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <Text style={[styles.text, { color: getTextColor() }]}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: spacing.md,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: spacing.xs,
  },
  text: {
    fontSize: fontSize.md,
    fontWeight: "bold",
  },
});
