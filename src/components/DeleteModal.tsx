import React from "react";
import { View, Text, Modal, StyleSheet, TouchableOpacity } from "react-native";
import { colors, spacing, fontSize } from "../theme";
import { Button } from "./Button";
import { Ionicons } from "@expo/vector-icons";

interface DeleteModalProps {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  productName: string;
}

export const DeleteModal: React.FC<DeleteModalProps> = ({
  visible,
  onConfirm,
  onCancel,
  productName,
}) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.closeButton} onPress={onCancel}>
            <Ionicons name="close" size={24} color={colors.textSecondary} />
          </TouchableOpacity>
          <Text style={styles.text}>
            ¿Estás seguro de eliminar el producto {productName}?
          </Text>
          <View style={styles.line} />
          <Button text="Confirmar" onPress={onConfirm} variant="primary" />
          <Button text="Cancelar" onPress={onCancel} variant="secondary" />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  container: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: spacing.lg,
    paddingBottom: spacing.xl,
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: spacing.sm
  },
  text: {
    fontSize: fontSize.md,
    textAlign: "center",
    marginBottom: spacing.lg,
    marginTop: spacing.sm,
    fontWeight: '500',
    color: colors.textPrimary
  },
  line: {
    borderBottomColor: colors.secondary,
    borderBottomWidth: 1,
    marginBottom: spacing.lg,
  }
});
