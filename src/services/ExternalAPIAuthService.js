import axios from "axios";

const loginUrl = process.env.REACT_APP_API_AUTH;
const registerUrl = process.env.REACT_APP_API_USER;

export const login = async (data) => {
  try {
    const { email, password } = data;
    const response = await axios.post(`${loginUrl}/login`, {
      email: email,
      password: password,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    alert(error);
    return null;
  }
};

export const register = async (data) => {
  try {
    const { name, email, password } = data;
    const response = await axios.post(`${registerUrl}/admin-registration`, {
      name: name,
      email: email,
      password: password,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    alert(error);
    return null;
  }
};
