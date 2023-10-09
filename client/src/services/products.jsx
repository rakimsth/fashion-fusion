import API from "../utils/api";

export const list = async () => {
  return await API.get("/products");
};
