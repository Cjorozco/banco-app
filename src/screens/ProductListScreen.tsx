import React, { useEffect, useState, useCallback } from "react";
import { View, Text, FlatList, StyleSheet, Alert, BackHandler } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FinancialProduct } from "../types/interface";
import { getProducts } from "../api/productService";
import { RootStackParamList } from "../navigation/types";
import { ProductItem } from "../components/ProductItem";
import { SearchInput } from "../components/SearchInput";
import { Button } from "../components/Button";
import { SkeletonLoader } from "../components/SkeletonLoader";
import { Header } from "../components/Header";
import { colors, spacing, globalStyles } from "../theme";

export const ProductListScreen: React.FC = () => {
  const [products, setProducts] = useState<FinancialProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<FinancialProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(Array.isArray(data) ? data : []);
      setFilteredProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      Alert.alert("Error", "Ocurrió un error al cargar los productos.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadProducts();

      // Manejo del botón de atrás del hardware (opcional)
      const onBackPress = () => {
        return false; // Comportamiento por defecto
      };
      const backHandler = BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () => backHandler.remove();
    }, [])
  );

  const handleSearch = (text: string) => {
    setSearchText(text);
    if (!text) {
      setFilteredProducts(products);
    } else {
      const lowerText = text.toLowerCase();
      const filtered = products.filter(
        (p) =>
          p.name.toLowerCase().includes(lowerText) ||
          p.id.toLowerCase().includes(lowerText)
      );
      setFilteredProducts(filtered);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header />
      <View style={styles.container}>
        <SearchInput
          value={searchText}
          onChangeText={handleSearch}
          placeholder="Search..."
        />

        {loading ? (
          <SkeletonLoader />
        ) : (
          <>
            <View style={styles.listContainer}>
              <FlatList
                data={filteredProducts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <ProductItem
                    item={item}
                    onPress={(product) => navigation.navigate("Detail", { product })}
                  />
                )}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                  <Text style={styles.emptyText}>No se encontraron productos</Text>
                }
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                text="Agrega"
                onPress={() => navigation.navigate("Form", {})}
                variant="primary"
              />
            </View>
          </>
        )}
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
  listContainer: {
    flex: 1,
    marginBottom: spacing.md
  },
  listContent: {
    flexGrow: 1,
    paddingBottom: 80 // Espacio para el botón
  },
  emptyText: {
    textAlign: "center",
    marginTop: spacing.xl,
    color: colors.textSecondary,
  },
  buttonContainer: {
    paddingTop: spacing.sm,
  }
});