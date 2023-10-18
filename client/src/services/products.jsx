import { URLS } from "../constants";
import API from "../utils/api";

export const list = async (limit, page) => {
  return API.get(`${URLS.PRODUCTS}?limit=${limit}&page=${page}`);
};

export const getProduct = async (id) => {
  return API.get(`${URLS.PRODUCTS}/${id}`);
};
