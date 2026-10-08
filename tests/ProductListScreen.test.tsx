import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import { ProductListScreen } from '../src/screens/ProductListScreen';
import { getProducts } from '../src/api/productService';

// Mock the API service
jest.mock('../src/api/productService');

// Mock Navigation
const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
  useFocusEffect: jest.fn((callback) => callback()), // Execute callback immediately
}));

describe('ProductListScreen', () => {
  const mockProducts = [
    {
      id: '1',
      name: 'Producto 1',
      description: 'Descripción 1',
      logo: 'logo1.png',
      date_release: '2023-01-01',
      date_revision: '2024-01-01',
    },
    {
      id: '2',
      name: 'Producto 2',
      description: 'Descripción 2',
      logo: 'logo2.png',
      date_release: '2023-02-01',
      date_revision: '2024-02-01',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (getProducts as jest.Mock).mockResolvedValue(mockProducts);
  });

  it('renders correctly and loads products', async () => {
    const { getByText, getByPlaceholderText } = render(<ProductListScreen />);

    // Check loading state (optional, might be too fast)
    // await waitFor(() => expect(getByTestId('skeleton-loader')).toBeTruthy());

    await waitFor(() => {
      expect(getByText('Producto 1')).toBeTruthy();
      expect(getByText('Producto 2')).toBeTruthy();
    });

    expect(getByPlaceholderText('Search...')).toBeTruthy();
  });

  it('filters products by search text', async () => {
    const { getByText, getByPlaceholderText, queryByText } = render(<ProductListScreen />);

    await waitFor(() => {
      expect(getByText('Producto 1')).toBeTruthy();
    });

    const searchInput = getByPlaceholderText('Search...');
    fireEvent.changeText(searchInput, 'Producto 1');

    await waitFor(() => {
      expect(getByText('Producto 1')).toBeTruthy();
      expect(queryByText('Producto 2')).toBeNull();
    });
  });

  it('navigates to form on add button press', async () => {
    const { getByText } = render(<ProductListScreen />);

    await waitFor(() => expect(getByText('Producto 1')).toBeTruthy());

    const addButton = getByText('Agregar');
    fireEvent.press(addButton);

    expect(mockNavigate).toHaveBeenCalledWith('Form', {});
  });
});
