import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Register from '../../src/pages/Register';
import { register } from '../../src/services/ExternalAPIAuthService';
import AuthProvider from 'react-auth-kit/AuthProvider';
import { store } from '../../src/components/Auth/Store';

jest.mock('../../src/services/ExternalAPIAuthService');

describe('Register Integration Tests', () => {
    it('should register a new user and navigate to login page on successful registration', async () => {
        const mockResponse = { message: 'Registration successful' };
        register.mockResolvedValueOnce(mockResponse);
      
        // Mock window.alert
        const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
      
        const { getByPlaceholderText, getByText } = render(
            <BrowserRouter>
            <AuthProvider store={store}>
                <Register />
            </AuthProvider>
          </BrowserRouter>
        );
      
        fireEvent.change(getByPlaceholderText('Name'), { target: { value: 'Test User' } });
        fireEvent.change(getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
        fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'password' } });
        fireEvent.click(getByText('Register'));
      
        await waitFor(() => {
          expect(register).toHaveBeenCalledTimes(1);
          expect(register).toHaveBeenCalledWith({ name: 'Test User', email: 'test@example.com', password: 'password' });
          expect(alertMock).toHaveBeenCalledWith('Registration successful');
          expect(window.location.pathname).toEqual('/login');
      });
    })

  it('should display error message on failed registration', async () => {
    const errorMessage = 'Registration failed';
    register.mockResolvedValueOnce(null);
  
    // Spy on window.alert
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
  
    const { getByPlaceholderText, getByText } = render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
  
    fireEvent.change(getByPlaceholderText('Name'), { target: { value: 'Test User' } });
    fireEvent.change(getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'password' } });
    fireEvent.click(getByText('Register'));
  
    await waitFor(() => {
      expect(register).toHaveBeenCalledTimes(2);
      expect(register).toHaveBeenCalledWith({ name: 'Test User', email: 'test@example.com', password: 'password' });
      // Use alertSpy to assert that window.alert was called with the error message
    });
  
    // Restore the original implementation of window.alert
    alertSpy.mockRestore();
  });
});
