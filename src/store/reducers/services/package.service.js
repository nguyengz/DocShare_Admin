import axios from 'axios';

const API_URL = 'http://localhost:8080';

const fetchPackageList = () => {
  return axios.get(API_URL + '/packages');
};

const putPackageActive = (id, active) => {
  return axios.put(`${API_URL}/package/active/${id}`, { active });
};
const addPackage = (packageData) => {
  return axios.post(API_URL + '/package/add', packageData);
};
const packageService = {
  fetchPackageList,
  putPackageActive,
  addPackage
};

export default packageService;
