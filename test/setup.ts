import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

// vi.mock("zustand"); // to make it work like Jest (auto-mocking)

// runs a clean after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
});
