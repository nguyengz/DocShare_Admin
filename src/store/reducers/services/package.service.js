import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080';

const fetchPackageList = () => {
  return axios.get(API_URL + '/packages/admin', { headers: authHeader() });
};

const putPackageActive = (updatedPackage) => {
  return axios.put(`${API_URL}/package/active`, updatedPackage, { headers: authHeader() });
};
const updatePackage = (updatedPackage) => {
  return axios.put(`${API_URL}/package/update`, updatedPackage, { headers: authHeader() });
};
const addPackage = (packageData) => {
  return axios.post(API_URL + '/package/add', packageData, { headers: authHeader() });
};
const packageService = {
  fetchPackageList,
  putPackageActive,
  updatePackage,
  addPackage
};

export default packageService;
