import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LoginForm from '../../src/pages/Login';
import { login } from '../../src/services/ExternalAPIAuthService';
import AuthProvider from 'react-auth-kit/AuthProvider';
import { store } from '../../src/components/Auth/Store';

jest.mock('../../src/services/ExternalAPIAuthService');

describe('LoginForm Integration Tests', () => {
  it('should display login form and navigate to homepage on successful login', async () => {
    const mockAccessToken = 'mockAccessToken';
    const mockUserData = { email: 'test@example.com', id: '123' };
    login.mockResolvedValueOnce({ accessToken: mockAccessToken, ...mockUserData });

    const { getByLabelText, getByText } = render(
      <BrowserRouter>
        <AuthProvider store={store}>
          <LoginForm />
        </AuthProvider>
      </BrowserRouter>
    );

    fireEvent.change(getByLabelText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(getByLabelText('Password'), { target: { value: 'password' } });
    fireEvent.click(getByText('Sign In'));

    await waitFor(() => {
      expect(login).toHaveBeenCalledTimes(1);
      expect(login).toHaveBeenCalledWith({ email: 'test@example.com', password: 'password' });
      expect(window.location.pathname).toEqual('/');
    });
  });

  it('should display login form and show error message on failed login', async () => {
    const errorMessage = 'Invalid credentials';
    login.mockResolvedValueOnce(null);

    const { getByLabelText, getByText } = render(
      <BrowserRouter>
        <AuthProvider store={store}>
          <LoginForm />
        </AuthProvider>
      </BrowserRouter>
    );

    fireEvent.change(getByLabelText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(getByLabelText('Password'), { target: { value: 'password' } });
    fireEvent.click(getByText('Sign In'));

  });
});
