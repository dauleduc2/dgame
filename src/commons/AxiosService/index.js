import Axios from "axios";
import { Component } from "react";

class AxiosService extends Component {
  constructor(props) {
    super(props);
    const instance = Axios.create();
    Axios.interceptors.request.use(this.handleSuccess, this.handleError);
    this.instance = instance;
  }
  handleSuccess = (response) => {
    return response;
  };
  handleError = (error) => {
    return Promise.reject(error);
  };
  get = (url) => {
    return this.instance.get(url);
  };
  post = (url, body) => {
    return this.instance.post(url, body);
  };
  put = (url, body) => {
    return this.instance.put(url, body);
  };
  delete = (url) => {
    return this.instance.delete(url);
  };
}
export default new AxiosService();
