import { describe, expect, it } from "@jest/globals";
import { makeLoadTechDebt } from "./makeLoadTechDebt";

describe("makeLoadTechDebt", () => {
  it("returns an empty array if the tree is empty", async () => {
    const loadTechDebt = makeLoadTechDebt(() => Promise.resolve([]));

    expect(await loadTechDebt([])).toEqual([]);
  });

  it("returns the commit count for the path", async () => {
    const commitCount = 5;
    const loadTechDebt = makeLoadTechDebt(() =>
      Promise.resolve(Array.from({ length: commitCount }).fill({}))
    );

    expect(
      await loadTechDebt([
        {
          type: "blob",
          path: "/test.ts",
        },
      ])
    ).toContainEqual(expect.objectContaining({ commitCount }));
  });

  it("filters out folders", async () => {
    const loadTechDebt = makeLoadTechDebt(() => Promise.resolve([]));

    expect(
      await loadTechDebt([
        {
          type: "tree",
          path: "/test.ts",
        },
      ])
    ).toEqual([]);
  });

  it("calculates the complexity of a file", async () => {
    const commitCount = 5;
    const size = 10;
    const complexity = commitCount * size;
    const loadTechDebt = makeLoadTechDebt(() =>
      Promise.resolve(Array.from({ length: commitCount }).fill({}))
    );

    expect(
      await loadTechDebt([
        {
          type: "blob",
          path: "/test.ts",
          size,
        },
      ])
    ).toContainEqual(expect.objectContaining({ complexity }));
  });

  it("filters out non-code extensions", async () => {
    const loadTechDebt = makeLoadTechDebt(() => Promise.resolve([]));

    expect(
      await loadTechDebt([
        {
          type: "blob",
          path: "/test.png",
        },
      ])
    ).toEqual([]);
  });
});
