import { FinancialProduct } from "../types/interface";
import { getProductById } from "../api/productService";

export const validateId = async (id: string, isCreateMode: boolean): Promise<string | null> => {
  if (!id) return "Este campo es requerido";
  if (id.length < 3 || id.length > 10) return "ID debe tener entre 3 y 10 caracteres";

  if (isCreateMode) {
    try {
      const exists = await getProductById(id);
      if (exists) return "ID ya existe";
    } catch (error) {
      // El endpoint de verificación puede retornar 200 false o 200 true, 
      // pero si la API retorna 404 o error, asumimos que no existe para permitir continuar.
      // Ajustar según comportamiento real del backend.
    }
  }
  return null;
};

export const validateName = (name: string): string | null => {
  if (!name) return "Este campo es requerido";
  if (name.length < 5 || name.length > 100) return "Nombre debe tener entre 5 y 100 caracteres";
  return null;
};

export const validateDescription = (description: string): string | null => {
  if (!description) return "Este campo es requerido";
  if (description.length < 10 || description.length > 200) return "Descripción debe tener entre 10 y 200 caracteres";
  return null;
};

export const validateLogo = (logo: string): string | null => {
  if (!logo) return "Este campo es requerido";
  return null;
};

export const validateReleaseDate = (dateRelease: string): string | null => {
  if (!dateRelease) return "Este campo es requerido";

  // Validate format YYYY-MM-DD
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateRelease)) return "Formato de fecha inválido (YYYY-MM-DD)";

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const todayString = `${year}-${month}-${day}`;

  if (dateRelease < todayString) return "La fecha debe ser igual o mayor a la fecha actual";
  return null;
};

export const validateRevisionDate = (dateRelease: string, dateRevision: string): string | null => {
  if (!dateRevision) return "Este campo es requerido";

  if (!dateRelease) return null; // No valida si falta la fecha de liberación

  const release = new Date(dateRelease);
  const revision = new Date(dateRevision);

  const expectedRevision = new Date(release);
  expectedRevision.setFullYear(expectedRevision.getFullYear() + 1);

  // Compara timestamps para asegurar exactitud de +1 año
  if (revision.getTime() !== expectedRevision.getTime()) {
    return "La fecha de revisión debe ser exactamente un año después de la fecha de liberación";
  }

  return null;
};

export const formatDate = (date: Date): string => {
  // YYYY-MM-DD
  return date.toISOString().split('T')[0];
};

export const parseDate = (dateString: string): Date => {
  return new Date(dateString);
};
