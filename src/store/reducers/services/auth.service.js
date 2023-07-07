import axios from 'axios';
import Swal from 'sweetalert2';

const API_URL = 'http://localhost:8080/api/auth/';

const register = (username, email, password) => {
  return axios.post(API_URL + 'signup', {
    username,
    email,
    password
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + 'signin', {
      username,
      password
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
        Swal.fire({
          icon: 'success',
          title: 'Welcome',
          timer: 2000,
          showConfirmButton: false
        });
      } else if (response.data.error) {
        Swal.fire({
          icon: 'error',
          title: 'Do you are Admin?',
          text: 'Please check infomation again!',
          timer: 3000
        });
      }
      return response.data;
    });
};

// const logout = () => {
//   localStorage.removeItem('user');
//   return axios.post(API_URL + 'signout').then((response) => {
//     return response.data;
//   });
// };
const logout = () => {
  localStorage.removeItem('user');
};
const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser
};

export default AuthService;
