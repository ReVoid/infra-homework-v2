import fs from "node:fs";
import { parse } from "acorn";
import { walk } from "zimmerframe";

export function check(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");

  const ast = parse(content, {
    ecmaVersion: "latest",
    sourceType: "module",
    locations: true,
  });

  const errors = [];
  const asyncFunctions = new Set();

  // 1. Сначала соберем все асинхронные функции.
  walk(ast, undefined, {
    FunctionDeclaration(node) {
      if (node.async && node.id) {
        asyncFunctions.add(node.id.name);
      }
    }
  });

  // 2. Ищем вызовы асинхронных функций без await внутри IfStatement.
  walk(ast, undefined, {
    IfStatement(node) {
      walk(node.test, undefined, {
        AwaitExpression(node, { stop }) {
          // Если есть await, то внутри него вызовы уже корректны
          stop();
        },
        CallExpression(node, { visit }) {
          if (node.callee.type === "Identifier" && asyncFunctions.has(node.callee.name)) {
            errors.push({
              start: node.start,
              end: node.end,
            });
          }
        }
      });
    }
  });

  return errors;
}
