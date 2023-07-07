import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/auth';
// const user = JSON.parse(localStorage.getItem('user'));
const fetchUser = () => {
  return axios.get(API_URL + '/users', {
    headers: authHeader()
    // headers: {
    //   Authorization: `Bearer ${user.token}`
    // }
  });
};
const fetchUserAbout = (id) => {
  return axios.get(API_URL + '/user/about?user_id=' + id);
};
const putUserActive = (data) => {
  return axios.put(`${API_URL}/active`, data, { headers: authHeader() });
};
const userService = {
  fetchUser,
  fetchUserAbout,
  putUserActive
};

export default userService;
