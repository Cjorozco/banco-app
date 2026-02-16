import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import { ProductListScreen } from "../screens/ProductListScreen";
import { ProductDetailScreen } from "../screens/ProductDetailScreen";
import { ProductFormScreen } from "../screens/ProductFormScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="List"
        screenOptions={{
          headerShown: false,
          headerStyle: { backgroundColor: "#f5f5f5" },
        }}>

        <Stack.Screen name="List" component={ProductListScreen} options={{ title: "Productos" }} />
        <Stack.Screen name="Detail" component={ProductDetailScreen} options={{ title: "Detalle" }} />
        <Stack.Screen name="Form" component={ProductFormScreen} options={{ title: "Formulario" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};