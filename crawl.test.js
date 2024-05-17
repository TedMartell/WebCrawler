
import { test, expect } from "@jest/globals";
import { normalizeURL } from "./crawl.js";



test('https://blog.boot.dev/path/ to be blog.boot.dev/path', () => {
    const result = normalizeURL('https://blog.boot.dev/path/');
  expect(result).toBe('blog.boot.dev/path/');
});