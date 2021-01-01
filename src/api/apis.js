const { default: AxiosService } = require("../commons/AxiosService");
const { apiLink } = require("../constants/api");
export const getList = (url, param) => {
  if (param) {
    return AxiosService.get(`${apiLink}/${url}/${param}`);
  } else {
    return AxiosService.get(`${apiLink}/${url}`);
  }
};
export const postList = (url, body) => {
  return AxiosService.post(`${apiLink}/${url}`, body);
};
export const updateList = (url, id, body) => {
  return AxiosService.put(`${apiLink}/${url}/${id}`, body);
};
export const deleteList = (url, id) => {
  return AxiosService.delete(`${apiLink}/${url}/${id}`);
};
