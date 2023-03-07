import { describe, expect, it } from "@jest/globals";
import { getFileExtension } from "./getFileExtension";

describe("getFileExtension", () => {
  it("returns the file extension", () => {
    expect(getFileExtension("/path/to/a.file.extension")).toBe("extension");
  });
});
