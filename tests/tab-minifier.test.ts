import { SerializedTabNode } from "lexical";
import tabMinifier from "../src/minifiers/tab-minifier";
import { create, oneOf } from "./utils";

describe("tab-minifier", () => {
  it("should minify and unminify data correctly", async () => {
    const serialized: SerializedTabNode = {
      detail: 2,
      format: 0,
      mode: "normal",
      style: "",
      text: "\t",
      type: "tab",
      version: 1,
    };
    const minified = tabMinifier.minify(serialized);

    expect(minified).toEqual({
      t: "s",
      v: 1,
    });

    const outputData = tabMinifier.unminify(minified);

    expect(outputData).toEqual(serialized);
  });

  it("should minify and unminify tab nodes with different properties", () => {
    const tabNodes = create<SerializedTabNode>({
      detail: oneOf(0, 1),
      format: oneOf(0, 1),
      mode: oneOf("normal", "token", "segmented"),
      style: "style",
      text: "\t",
      type: "tab",
      version: 1,
    });
    tabNodes.forEach((t) => {
      const minified = tabMinifier.minify(t);
      const unminified = tabMinifier.unminify(minified);
      expect(unminified).toEqual(t);
    });
  });
});
