import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth';

const fetchUser = () => {
  return axios.get(API_URL + '/users');
};
const fetchUserAbout = (id) => {
  return axios.get(API_URL + '/user?user_id=' + id);
};
const putUserActive = (user) => {
  return axios.put(`${API_URL}/package/active`, user);
};
const userService = {
  fetchUser,
  fetchUserAbout,
  putUserActive
};

export default userService;
