import { useState } from "react";
import API from "../utils/api";

import { useDispatch } from "react-redux";
import { fetchProducts } from "../slices/productSlice";

const useApi = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const deleteById = async (url, id) => {
    try {
      setLoading(true);
      const { data } = await API.delete(`${url}/${id}`, {
        data: { isArchived: true },
      });
      if (data.msg === "success") {
        dispatch(fetchProducts({}));
        setMsg("Data deleted Successfully");
      }
    } catch (e) {
      const errMsg = e.message || "Something went wrong";
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const updateById = async (url, id, payload) => {
    try {
      setLoading(true);
      const { data } = await API.put(`${url}/${id}`, payload);
      if (data.msg === "success") {
        setData(data.data);
        setMsg("Data Updated Successfully");
      }
    } catch (e) {
      const errMsg = e.message || "Something went wrong";
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return { data, msg, loading, error, deleteById, updateById };
};

export default useApi;
