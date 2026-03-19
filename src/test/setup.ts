import { GlobalRegistrator } from "@happy-dom/global-registrator";
GlobalRegistrator.register();

import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { afterEach } from "bun:test";

afterEach(() => {
  cleanup();
});
