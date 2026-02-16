import { validateId, validateName, validateDescription, validateReleaseDate, validateRevisionDate } from "../src/utils/validation";

// Mock API
jest.mock("../src/api/productService", () => ({
  getProductById: jest.fn(),
}));
import { getProductById } from "../src/api/productService";

describe("Validation Utils", () => {
  describe("validateId", () => {
    it("should return error if ID is empty", async () => {
      expect(await validateId("", true)).toBe("Este campo es requerido");
    });
    it("should return error if ID is short", async () => {
      expect(await validateId("12", true)).toBe("ID debe tener entre 3 y 10 caracteres");
    });
    it("should return error if ID is long", async () => {
      expect(await validateId("12345678901", true)).toBe("ID debe tener entre 3 y 10 caracteres");
    });
    it("should return error if ID exists", async () => {
      (getProductById as jest.Mock).mockResolvedValue(true);
      expect(await validateId("exist", true)).toBe("ID ya existe");
    });
    it("should return null if ID is valid and unique", async () => {
      (getProductById as jest.Mock).mockResolvedValue(false);
      expect(await validateId("unique", true)).toBeNull();
    });
    it("should skip existence check if not create mode", async () => {
      expect(await validateId("exist", false)).toBeNull();
    });
  });

  describe("validateName", () => {
    it("should return error if name is empty", () => {
      expect(validateName("")).toBe("Este campo es requerido");
    });
    it("should return error if name is short", () => {
      expect(validateName("abcd")).toBe("Nombre debe tener entre 5 y 100 caracteres");
    });
    it("should return null if name is valid", () => {
      expect(validateName("Valid Name")).toBeNull();
    });
  });

  describe("validateDescription", () => {
    it("should return error if description is empty", () => {
      expect(validateDescription("")).toBe("Este campo es requerido");
    });
    it("should return error if description is short", () => {
      expect(validateDescription("short")).toBe("Descripción debe tener entre 10 y 200 caracteres");
    });
    it("should return null if description is valid", () => {
      expect(validateDescription("Valid description text")).toBeNull();
    });
  });

  describe("validateDates", () => {
    it("should return error if release date is past", () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      expect(validateReleaseDate(yesterday.toISOString().split('T')[0])).toBe("La fecha debe ser igual o mayor a la fecha actual");
    });
    it("should return null if release date is today", () => {
      const today = new Date();
      expect(validateReleaseDate(today.toISOString().split('T')[0])).toBeNull();
    });

    it("should return error if revision date is not exactly one year later", () => {
      expect(validateRevisionDate("2023-01-01", "2023-01-01")).toBe("La fecha de revisión debe ser exactamente un año después de la fecha de liberación");
    });
    it("should return null if revision date is exactly one year later", () => {
      expect(validateRevisionDate("2023-01-01", "2024-01-01")).toBeNull();
    });
  });

});
