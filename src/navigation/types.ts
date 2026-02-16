import { FinancialProduct } from "../types/interface";

export type RootStackParamList = {
  List: undefined;
  Detail: { product: FinancialProduct };
  Form: { product?: FinancialProduct };
};