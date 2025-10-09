import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import App from "./App";

describe("App Component", () => {
  it("renders hello message", () => {
    render(<App />);
    expect(screen.getByText(/Hello EduRate/i)).toBeInTheDocument();
  });
});