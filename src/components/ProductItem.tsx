import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FinancialProduct } from "../types/interface";
import { colors, spacing, fontSize } from "../theme";
import { Ionicons } from "@expo/vector-icons";

interface ProductItemProps {
  item: FinancialProduct;
  onPress: (product: FinancialProduct) => void;
}

export const ProductItem: React.FC<ProductItemProps> = ({ item, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(item)}>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.id}>ID: {item.id}</Text>
      </View>
      <View style={styles.iconContainer}>
        <Ionicons name="chevron-forward" size={24} color={colors.textSecondary} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.secondary,
    backgroundColor: colors.white,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: fontSize.md,
    fontWeight: "600",
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  id: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  iconContainer: {
    marginLeft: spacing.sm,
  },
});