import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { colors, fontSize, spacing } from "../theme";
import { Ionicons } from "@expo/vector-icons";

export const Header = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Ionicons name="card-outline" size={24} color={colors.headerTitle} style={styles.icon} />
        <Text style={styles.title}>BANCO</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.secondary,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: spacing.sm,
  },
  title: {
    fontSize: fontSize.lg,
    fontWeight: "bold",
    color: colors.headerTitle,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
});
