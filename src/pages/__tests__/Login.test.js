import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { login } from "../../services/ExternalAPIAuthService";
import { useNavigate } from "react-router-dom";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import LoginForm from "../Login";

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

jest.mock("react-auth-kit/hooks/useSignIn");

jest.mock("../../services/ExternalAPIAuthService");

describe("LoginForm Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Submits form with valid credentials and redirects to home page", async () => {
    const mockedSignIn = jest.fn();
    useSignIn.mockReturnValue(mockedSignIn);

    const mockResponse = {
      accessToken: "mockAccessToken",
      email: "test@example.com",
      id: "123",
    };
    login.mockResolvedValueOnce(mockResponse);

    const mockedNavigate = jest.fn();
    useNavigate.mockReturnValue(mockedNavigate);

    const { getByLabelText, getByText } = render(<LoginForm />);

    const emailInput = getByLabelText("Email");
    const passwordInput = getByLabelText("Password");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });

    fireEvent.submit(getByText("Sign In"));

    await waitFor(() => {
      expect(login).toHaveBeenCalledTimes(1);
      expect(login).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password",
      });
      expect(mockedSignIn).toHaveBeenCalledWith({
        auth: { token: "mockAccessToken", type: "Bearer" },
        userState: { name: "test@example.com", uid: "123" },
      });
      expect(mockedNavigate).toHaveBeenCalledWith("/");
    });
  });
});
