import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { Header } from "../components/Header";
import { FormField } from "../components/FormField";
import { Button } from "../components/Button";
import { createProduct, updateProduct } from "../api/productService";
import { validateDescription, validateId, validateLogo, validateName, validateReleaseDate, validateRevisionDate, formatDate } from "../utils/validation";
import { colors, spacing, fontSize } from "../theme";
import { FinancialProduct } from "../types/interface";

type Props = NativeStackScreenProps<RootStackParamList, "Form">;

export const ProductFormScreen: React.FC<Props> = ({ route, navigation }) => {
  const { product } = route.params;
  const isEditMode = !!product;

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [logo, setLogo] = useState("");
  const [dateRelease, setDateRelease] = useState("");
  const [dateRevision, setDateRevision] = useState("");

  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditMode && product) {
      setId(product.id);
      setName(product.name);
      setType(product.type);
      setDescription(product.description);
      setLogo(product.logo);

      // Manejo de formato de fechas, asumiendo ISO strings
      setDateRelease(formatDate(new Date(product.date_release)));
      setDateRevision(formatDate(new Date(product.date_revision)));
    } else {
      resetForm(false);
    }
  }, [isEditMode, product]);

  const resetForm = (fullReset: boolean = true) => {
    if (fullReset) {
      setId("");
    }
    setName("");
    setType("");
    setDescription("");
    setLogo("");
    setDateRelease("");
    setDateRevision("");
    setErrors({});
  };

  const validateForm = async (): Promise<boolean> => {
    const newErrors: { [key: string]: string | null } = {};

    newErrors.id = await validateId(id, !isEditMode);
    newErrors.name = validateName(name);
    if (!type) {
      newErrors.type = "Este campo es requerido";
    }
    newErrors.description = validateDescription(description);
    newErrors.logo = validateLogo(logo);
    newErrors.dateRelease = validateReleaseDate(dateRelease);
    newErrors.dateRevision = validateRevisionDate(dateRelease, dateRevision);

    // Filter out nulls
    const activeErrors = Object.keys(newErrors).reduce((acc, key) => {
      if (newErrors[key]) {
        acc[key] = newErrors[key];
      }
      return acc;
    }, {} as { [key: string]: string });

    setErrors(activeErrors);
    return Object.keys(activeErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (loading) return;

    const isValid = await validateForm();
    if (!isValid) {
      Alert.alert("Error", "Por favor corrige los errores del formulario");
      return;
    }

    setLoading(true);
    try {
      const productData: FinancialProduct = {
        id,
        name,
        type,
        description,
        logo,
        date_release: dateRelease,
        date_revision: dateRevision,
      };

      if (isEditMode) {
        await updateProduct(id, productData);
        Alert.alert("Éxito", "Producto actualizado correctamente", [
          { text: "OK", onPress: () => navigation.goBack() }
        ]);
      } else {
        await createProduct(productData);
        Alert.alert("Éxito", "Producto creado correctamente", [
          { text: "OK", onPress: () => navigation.goBack() }
        ]);
      }
    } catch (error) {
      Alert.alert("Error", "Ocurrió un error al guardar el producto");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Lógica para auto-establecer fecha de revisión (+1 año)
  const handleDateReleaseChange = (text: string) => {
    setDateRelease(text);
    // Intenta autocompletar si la fecha es válida
    const date = new Date(text);
    if (!isNaN(date.getTime()) && text.length === 10) { // Verificación simple YYYY-MM-DD
      const revDate = new Date(date);
      revDate.setFullYear(revDate.getFullYear() + 1);
      setDateRevision(formatDate(revDate));
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header />
      <View style={styles.container}>
        <Text style={styles.title}>Formulario de Registro</Text>
        <ScrollView style={styles.form} showsVerticalScrollIndicator={false}>
          <FormField
            label="ID"
            value={id}
            onChangeText={setId}
            error={errors.id}
            editable={!isEditMode}
            maxLength={10}
          />
          <FormField
            label="Nombre"
            value={name}
            onChangeText={setName}
            error={errors.name}
            maxLength={100}
          />
          <FormField
            label="Tipo"
            value={type}
            onChangeText={setType}
            error={errors.type}
            maxLength={50}
          />
          <FormField
            label="Descripción"
            value={description}
            onChangeText={setDescription}
            error={errors.description}
            maxLength={200}
          />
          <FormField
            label="Logo"
            value={logo}
            onChangeText={setLogo}
            error={errors.logo}
          />
          <FormField
            label="Fecha Liberación (YYYY-MM-DD)"
            value={dateRelease}
            onChangeText={handleDateReleaseChange}
            error={errors.dateRelease}
            placeholder="YYYY-MM-DD"
          />
          <FormField
            label="Fecha Revisión (YYYY-MM-DD)"
            value={dateRevision}
            onChangeText={setDateRevision}
            error={errors.dateRevision}
            placeholder="YYYY-MM-DD"
            editable={false} // Calculado automáticamente: fecha liberación + 1 año
          />

          <View style={styles.buttonContainer}>
            <Button
              text="Enviar"
              onPress={handleSubmit}
              variant="primary"
              loading={loading}
            />
            <Button
              text="Reiniciar"
              onPress={() => resetForm(true)}
              variant="secondary"
              disabled={loading}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {
    flex: 1,
    padding: spacing.md,
  },
  title: {
    fontSize: fontSize.xxl,
    fontWeight: "bold",
    marginBottom: spacing.lg,
    color: colors.textPrimary,
  },
  form: {
    flex: 1,
  },
  buttonContainer: {
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
  },
});