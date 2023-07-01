import axios from 'axios';

const API_URL = 'http://localhost:8080';

const fetchPackageList = () => {
  return axios.get(API_URL + '/packages');
};

const putPackageActive = (updatedPackage) => {
  return axios.put(`${API_URL}/package/active`, updatedPackage);
};
const updatePackage = (updatedPackage) => {
  return axios.put(`${API_URL}/package/update`, updatedPackage);
};
const addPackage = (packageData) => {
  return axios.post(API_URL + '/package/add', packageData);
};
const packageService = {
  fetchPackageList,
  putPackageActive,
  updatePackage,
  addPackage
};

export default packageService;
