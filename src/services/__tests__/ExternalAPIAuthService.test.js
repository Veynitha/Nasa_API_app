import axios from 'axios';
import { login, register } from '../ExternalAPIAuthService';

jest.mock('axios');

describe('AuthService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('should make a POST request to login endpoint with provided data and return response data', async () => {
      const mockData = { email: 'test@example.com', password: 'password' };
      const mockResponseData = { token: 'mockToken' };
      axios.post.mockResolvedValueOnce({ data: mockResponseData });

      const result = await login(mockData);

      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledWith(`${process.env.REACT_APP_API_AUTH}/login`, {
        email: mockData.email,
        password: mockData.password,
      });
      expect(result).toEqual(mockResponseData);
    });

    it('should return null and alert error message if request fails', async () => {
      const mockData = { email: 'test@example.com', password: 'password' };
      const mockError = new Error('Failed to login');
      axios.post.mockRejectedValueOnce(mockError);

      window.alert = jest.fn(); // Mocking window.alert

      const result = await login(mockData);

      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledWith(`${process.env.REACT_APP_API_AUTH}/login`, {
        email: mockData.email,
        password: mockData.password,
      });
      expect(window.alert).toHaveBeenCalledWith(mockError);
      expect(result).toBeNull();
    });
  });

  describe('register', () => {
    it('should make a POST request to register endpoint with provided data and return response data', async () => {
      const mockData = { name: 'Test User', email: 'test@example.com', password: 'password' };
      const mockResponseData = { message: 'Registration successful' };
      axios.post.mockResolvedValueOnce({ data: mockResponseData });

      const result = await register(mockData);

      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledWith(`${process.env.REACT_APP_API_USER}/admin-registration`, {
        name: mockData.name,
        email: mockData.email,
        password: mockData.password,
      });
      expect(result).toEqual(mockResponseData);
    });

    it('should return null and alert error message if request fails', async () => {
      const mockData = { name: 'Test User', email: 'test@example.com', password: 'password' };
      const mockError = new Error('Failed to register');
      axios.post.mockRejectedValueOnce(mockError);

      window.alert = jest.fn(); // Mocking window.alert

      const result = await register(mockData);

      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledWith(`${process.env.REACT_APP_API_USER}/admin-registration`, {
        name: mockData.name,
        email: mockData.email,
        password: mockData.password,
      });
      expect(window.alert).toHaveBeenCalledWith(mockError);
      expect(result).toBeNull();
    });
  });
});
