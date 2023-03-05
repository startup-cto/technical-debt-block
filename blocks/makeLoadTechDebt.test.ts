import { describe, expect, it } from "@jest/globals";
import { makeLoadTechDebt } from "./makeLoadTechDebt";

describe("makeLoadTechDebt", () => {
  it("returns an empty array if the tree is empty", async () => {
    const loadTechDebt = makeLoadTechDebt(() => Promise.resolve([]));

    expect(await loadTechDebt([])).toEqual([]);
  });
});
