import axios from 'axios';

const API_URL = 'http://localhost:8080/file';
// const API_URL_upload = "/Files";

const fetchFileDetail = (data) => {
  return axios.get(API_URL + '/getFile/id?file_id=' + data);
};
const deletedFile = (data) => {
  return axios.get(API_URL + '//delete/file?file_id=' + data);
};

const fileService = {
  fetchFileDetail,
  deletedFile
};

export default fileService;
