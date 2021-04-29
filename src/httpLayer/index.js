import axios from 'axios';

const baseURL = 'https://rich-kid.herokuapp.com/';
const axiosInstance = axios.create({
  baseURL,
  timeout: 30000,
  headers: {'Content-Type': 'application/json'},
});

class HttpLayer {
  static Axios = axiosInstance;

  constructor() {}

  #prepareUrl = (url) => {
    return url.includes('http') ? url : `${baseURL}${url}`;
  };

  get(url, params) {
    const uri = this.#prepareUrl(url);
    return axiosInstance.get(uri, params);
  }

  post(url, params) {
    const uri = this.#prepareUrl(url);
    return axiosInstance.post(uri, params);
  }

  put(url, params) {
    console.log('put params: ', params);
  }

  delete(url, params) {
    console.log('delete params: ', params);
  }
}

export default new HttpLayer();
