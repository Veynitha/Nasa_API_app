import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; // Import MemoryRouter
import { register } from "../../services/ExternalAPIAuthService";
import Register from "../Register";

jest.mock("../../services/ExternalAPIAuthService");

describe("Register Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Submits registration form with valid data", async () => {
    const mockResponse = {
      message: "Registration successful",
    };
    register.mockResolvedValueOnce(mockResponse);

    const { getByPlaceholderText, getByText } = render(
      <MemoryRouter> {/* Wrap your component with MemoryRouter */}
        <Register />
      </MemoryRouter>
    );

    const nameInput = getByPlaceholderText("Name");
    const emailInput = getByPlaceholderText("Email");
    const passwordInput = getByPlaceholderText("Password");

    fireEvent.change(nameInput, { target: { value: "Test User" } });
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });

    fireEvent.submit(getByText("Register"));

    await waitFor(() => {
      expect(register).toHaveBeenCalledTimes(1);
      expect(register).toHaveBeenCalledWith({
        name: "Test User",
        email: "test@example.com",
        password: "password",
      });
      expect(window.alert).toBeTruthy();
    });
  });

  it("Displays error message if registration fails", async () => {
    register.mockResolvedValueOnce(null);

    const { getByPlaceholderText, getByText } = render(
      <MemoryRouter> {/* Wrap your component with MemoryRouter */}
        <Register />
      </MemoryRouter>
    );

    const nameInput = getByPlaceholderText("Name");
    const emailInput = getByPlaceholderText("Email");
    const passwordInput = getByPlaceholderText("Password");

    fireEvent.change(nameInput, { target: { value: "Test User" } });
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });

    fireEvent.submit(getByText("Register"));

    await waitFor(() => {
      expect(register).toHaveBeenCalledTimes(1);
      expect(register).toHaveBeenCalledWith({
        name: "Test User",
        email: "test@example.com",
        password: "password",
      });
      expect(window.alert).toBeTruthy();
    });
  });
});
