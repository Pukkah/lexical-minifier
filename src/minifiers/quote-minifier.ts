import type { SerializedQuoteNode } from "@lexical/rich-text";
import { buildMinifier } from "../builder";
import { direction, format } from "../lookups/lookup-data";

export default buildMinifier(
  {
    type: "quote",
    minifiedType: "q",
    version: 1,
  },
  (raw: SerializedQuoteNode, config) => ({
    c: raw.children,
    d: direction.toKey(raw.direction),
    f: format.toKey(raw.format),
    i: raw.indent,
    t: config.minifiedType,
    v: config.version,
  }),
  (minified, config) => ({
    children: minified.c,
    direction: direction.fromKey(minified.d),
    format: format.fromKey(minified.f),
    indent: minified.i,
    type: config.type,
    version: config.version,
  }),
);
