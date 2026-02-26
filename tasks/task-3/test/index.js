import assert from "node:assert";
import path from "node:path";

import { check } from "../linter.js";

const expectedErrorsList = [
  {
    start: 145,
    end: 152,
  },
];

assert.deepEqual(
  check(path.resolve(import.meta.dirname, "./code.js")),
  expectedErrorsList
);
