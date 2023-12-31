import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Search Results text", () => {
  render(<App />);
  const linkElement = screen.getByText(/Search Results/i);
  expect(linkElement).toBeInTheDocument();
});
