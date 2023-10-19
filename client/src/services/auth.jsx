import API from "../utils/api";
import { URLS } from "../constants";

export const login = async (payload) => {
  return await API.post(URLS.AUTH + "/login", payload);
};
