import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import Homepage from "../Homepage";

afterEach(cleanup);

it("Renders Hompage component", () => {
  render(<Homepage />);

  expect(screen.getAllByText("Welcome to the Space Explorer")).toBeTruthy();
  expect(screen.getAllByText("Explore the Universe")).toBeTruthy();
  expect(screen.getAllByText("and discover new worlds")).toBeTruthy();
});
