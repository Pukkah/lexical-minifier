import type { SerializedTabNode } from "lexical";
import { mode } from "../lookups/lookup-data";
import { buildMinifier } from "../builder";
import { omitDefault, restoreDefault } from "../default-values";

export default buildMinifier(
  {
    type: "tab",
    minifiedType: "s",
    version: 1,
  },
  (raw: SerializedTabNode, config) => ({
    ...omitDefault("d", raw.detail, 2),
    ...omitDefault("f", raw.format, 0),
    ...omitDefault("m", mode.toKey(raw.mode), 0),
    ...omitDefault("s", raw.style, ""),
    ...omitDefault("x", raw.text, "\t"),
    t: config.minifiedType,
    v: config.version,
  }),
  (minified, config) => ({
    detail: restoreDefault(minified.d, 2),
    format: restoreDefault(minified.f, 0),
    mode: mode.fromKey(restoreDefault(minified.m, 0)),
    style: restoreDefault(minified.s, ""),
    text: restoreDefault(minified.x, "\t"),
    type: config.type,
    version: config.version,
  }),
);
