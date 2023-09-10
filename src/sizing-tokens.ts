import baseSizingTokens from "./tokens/sizing/base.json";
import touchSizingTokens from "./tokens/sizing/touch.json";
import { flattenObject } from "./utils/flatten-object";

export const base = flattenObject(baseSizingTokens);
export const touch = flattenObject(touchSizingTokens);