import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/file';
// const API_URL_upload = "/Files";

const fetchFileDetail = (data) => {
  return axios.get(API_URL + '/getFile/id/admin?file_id=' + data, { headers: authHeader() });
};
const deletedFile = (dataDelete) => {
  // datas = { data: dataDelete };
  return axios.delete(API_URL + '/delete', { headers: authHeader(), data: dataDelete });
};

const fileService = {
  fetchFileDetail,
  deletedFile
};

export default fileService;
