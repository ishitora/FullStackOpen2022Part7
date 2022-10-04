import axios from 'axios';
const baseUrl = 'http://localhost:3005/api/users';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const getOneUser = (id) => {
  const request = axios.get(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

export default { getAll, getOneUser };
