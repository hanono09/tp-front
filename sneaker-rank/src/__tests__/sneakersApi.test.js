import { describe, it, expect } from "vitest";
import { searchSneakers } from "../lib/sneakersApi";

describe("searchSneakers", () => {
  it("devuelve resultados cuando la query coincide con el nombre", async () => {
    const results = await searchSneakers("jordan");
    expect(results.length).toBeGreaterThan(0);
    results.forEach((s) =>
      expect(
        s.name.toLowerCase().includes("jordan") ||
          s.brand.toLowerCase().includes("jordan")
      ).toBe(true)
    );
  });

  it("devuelve resultados cuando la query coincide con la marca", async () => {
    const results = await searchSneakers("nike");
    expect(results.length).toBeGreaterThan(0);
    results.forEach((s) =>
      expect(
        s.name.toLowerCase().includes("nike") ||
          s.brand.toLowerCase().includes("nike")
      ).toBe(true)
    );
  });

  it("es case-insensitive", async () => {
    const upper = await searchSneakers("ADIDAS");
    const lower = await searchSneakers("adidas");
    expect(upper).toEqual(lower);
  });

  it("devuelve los primeros 6 cuando la query no matchea nada", async () => {
    const results = await searchSneakers("zzznomatch999");
    expect(results).toHaveLength(6);
  });

  it("cada sneaker tiene las propiedades esperadas", async () => {
    const results = await searchSneakers("nike");
    results.forEach((s) => {
      expect(s).toHaveProperty("id");
      expect(s).toHaveProperty("name");
      expect(s).toHaveProperty("brand");
      expect(s).toHaveProperty("sku");
    });
  });
});
