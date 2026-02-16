import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { ProductFormScreen } from '../src/screens/ProductFormScreen';
import { createProduct } from '../src/api/productService';
import { validateId } from '../src/utils/validation';

// Mock dependencies
jest.mock('../src/api/productService');
jest.mock('../src/utils/validation');

const mockNavigate = jest.fn();
const mockGoBack = jest.fn();
const mockRoute = { params: {} }; // Create mode

describe('ProductFormScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders form fields correctly', () => {
    const { getByText, getByDisplayValue } = render(
      // @ts-ignore
      <ProductFormScreen navigation={{ navigate: mockNavigate, goBack: mockGoBack }} route={mockRoute} />
    );

    expect(getByText('Formulario de Registro')).toBeTruthy();
    expect(getByText('ID')).toBeTruthy();
    expect(getByText('Nombre')).toBeTruthy();
  });

  it('shows validation error when submitting empty form', async () => {
    const { getByText } = render(
      // @ts-ignore
      <ProductFormScreen navigation={{ navigate: mockNavigate, goBack: mockGoBack }} route={mockRoute} />
    );

    const submitButton = getByText('Enviar');
    fireEvent.press(submitButton);

    await waitFor(() => {
      // Check validation calls or alert
      // We can check if validateId was called
      expect(validateId).toHaveBeenCalled();
    });
  });

  // Add more tests for successful submission, etc.
});
