import axios from 'axios';

axios.interceptors.request.use(config => {
  const token = localStorage.getItem('accessToken');
  config.headers['Authorization'] = `Bearer ${token}`;
  return config;
}, error => {
  console.log(error);
});

export default axios;
