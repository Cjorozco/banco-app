import { api } from "./instance";
import { FinancialProduct } from "../types/interface";

export const getProducts = async () => {
  const response = await api.get<{ data: FinancialProduct[] }>("/bp/products");
  return response.data.data || response.data;
};

export const getProductById = async (id: string) => {
  const response = await api.get<{ data: FinancialProduct }>(`/bp/products/verification/${id}`);
  return response.data;
};

export const createProduct = async (product: any) => {
  const response = await api.post<{ data: FinancialProduct }>(`/bp/products`, product);
  return response.data;
};

export const updateProduct = async (id: string, product: any) => {
  const response = await api.put<{ data: FinancialProduct }>(`/bp/products/${id}`, product);
  return response.data;
};

export const deleteProduct = async (id: string) => {
  const response = await api.delete<{ data: FinancialProduct }>(`/bp/products/${id}`);
  return response.data;
};
