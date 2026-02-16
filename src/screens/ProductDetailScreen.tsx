import React, { useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { Header } from "../components/Header";
import { Button } from "../components/Button";
import { DeleteModal } from "../components/DeleteModal";
import { deleteProduct } from "../api/productService";
import { colors, spacing, fontSize } from "../theme";
import { formatDate } from "../utils/validation";

type Props = NativeStackScreenProps<RootStackParamList, "Detail">;

export const ProductDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { product } = route.params;
  const [modalVisible, setModalVisible] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteProduct(product.id);
      setModalVisible(false);
      navigation.goBack();
    } catch (error) {
      setModalVisible(false);
      Alert.alert("Error", "No se pudo eliminar el producto");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerSection}>
          <Text style={styles.idLabel}>ID: {product.id}</Text>
          <Text style={styles.subtitle}>Información extra</Text>
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.row}>
            <Text style={styles.label}>Nombre</Text>
            <Text style={styles.value}>{product.name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Descripción</Text>
            <Text style={styles.value}>{product.description}</Text>
          </View>
          <View style={styles.logoRow}>
            <Text style={styles.label}>Logo</Text>
            <View style={styles.logoContainer}>
              <Image
                source={{ uri: product.logo }}
                style={styles.logo}
                resizeMode="contain"
                defaultSource={require('../../assets/adaptive-icon.png')}
              />
            </View>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Fecha liberación</Text>
            <Text style={styles.value}>{formatDate(new Date(product.date_release))}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Fecha revisión</Text>
            <Text style={styles.value}>{formatDate(new Date(product.date_revision))}</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Button
            text="Editar"
            variant="secondary"
            onPress={() => navigation.navigate("Form", { product })}
          />
          <Button
            text="Eliminar"
            variant="danger"
            onPress={() => setModalVisible(true)}
          />
        </View>
      </ScrollView>

      <DeleteModal
        visible={modalVisible}
        onConfirm={handleDelete}
        onCancel={() => setModalVisible(false)}
        productName={product.name}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {
    padding: spacing.lg,
    paddingBottom: spacing.xl,
  },
  headerSection: {
    marginBottom: spacing.xl,
  },
  idLabel: {
    fontSize: fontSize.xxl,
    fontWeight: "bold",
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
  },
  detailsContainer: {
    flex: 1,
    marginBottom: spacing.xl,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center", // Alinear ítems verticalmente
    marginBottom: spacing.md,
    paddingVertical: spacing.xs, // Añadir padding vertical para mejor tacto/visual
  },
  logoRow: {
    marginBottom: spacing.md,
    alignItems: "center", // Centrar sección de logo
    flexDirection: 'column', // Apilar etiqueta y logo
    alignSelf: 'stretch',
  },
  label: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    flex: 1, // Permitir que la etiqueta ocupe espacio
  },
  value: {
    fontSize: fontSize.md,
    fontWeight: 'bold',
    color: colors.textPrimary,
    flex: 1, // Permitir que el valor ocupe espacio
    textAlign: 'right', // Alinear valor a la derecha
  },
  logoContainer: {
    marginTop: spacing.sm,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 120, // Altura aumentada
    backgroundColor: colors.secondary, // Fondo visible
    borderRadius: 8
  },
  logo: {
    width: 150,
    height: 100,
  },
  footer: {
    marginTop: "auto",
  }
});