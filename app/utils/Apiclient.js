import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
import { useSelector } from "react-redux";
import environment from "~/envirnment.ts";

const loader = (p) => {
    if (p) {
        document.getElementById('loader')?.classList?.remove('d-none');
    } else {
        document.getElementById('loader')?.classList?.add('d-none');
    }
}

const setAuthorizationToken = (axios,token) => {
    if (token) {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common.Authorization;
    }
};


const ApiClientB = (controllerRef={current:null}) => {
  const user = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const baseUrl = environment.api;

  let controller;

  const config = {
    headers: { "Content-Type": "application/json" },
  };

  const buildUrl = (url, base = "") => {
    if (url.includes("https")) return url;
    return (base || baseUrl) + url;
  };

  const handleError = (errorData, hideError) => {
    let message = "Server Error";

    if (errorData) {
      if (errorData.error?.code === 401) {
        hideError = true;
        document.getElementById("logoutBtn")?.click();
      }
      message = errorData.error?.message || errorData.message || "Server Error";
      if (errorData.error?.details) {
        message = errorData.error.details[0]?.issue || message;
      }
    }

    if (!hideError) toast.error(message);
  };

  const handleRequest = async (method, url, data = {}, params = {}, base = "", hideError = false, isFormData = false) => {
    const requestUrl = buildUrl(url, base);
    const auth = params?.Authorization || user?.access_token || "";
    setAuthorizationToken(axios, auth);

    const headers = isFormData
      ? { "Content-Type": "multipart/form-data" }
      : { "Content-Type": "application/json" };


    controller = new AbortController();
    controllerRef.current=controller
    const requestConfig = {
      ...config,
      headers,
      params,
      signal: controllerRef.current.signal
    };

    setIsLoading(true);
    try {
      const response = await axios[method](requestUrl, data?(isFormData ? data : JSON.stringify(data)):requestConfig,requestConfig);
      if(response.data?.message!='Request canceled'){
        setIsLoading(false);
      }
      loader(false);
      return response.data;
    } 
    
    catch (error) {
      if (axios.isCancel(error)) {
        // setIsLoading(false);
        loader(false);
        return {
          message:'Request canceled',
          success: false
        }
      } else {
        setIsLoading(false);
        loader(false);
        if (error.response) {
          handleError(error.response.data, hideError);
          return { ...error.response.data, success: false };
        } else {
          // toast.error("Network Error");
          throw error;
        }
      }
       
    }
  };

  const get = (url, params = {}, base = "", hideError = false) =>
    handleRequest("get", url, null, params, base, hideError);

  const post = (url, payload={}, params = {}, base = "", hideError = false) =>
    handleRequest("post", url, payload, params, base, hideError);

  const put = (url, payload={}, base = "", hideError = false) =>
    handleRequest("put", url, payload, {}, base, hideError);

  const deleteApi = (url, params = {}, base = "", hideError = false) =>
    handleRequest("delete", url, null, params, base, hideError);

  const multiImageUpload = (url, files, params = {}, key = "file") => {
    const formData = new FormData();
    Array.from(files).forEach((file) => formData.append(key, file));
    return handleRequest("post", url, formData, params, "", false, true);
  };

  const postFormData = (url, params) => {
    const formData = new FormData();
    Object.entries(params).forEach(([key, value]) => formData.append(key, value));
    return handleRequest("post", url, formData, {}, "", false, true);
  };

  const allApi = (url, params, method = "get") => {
    const methods = { get, post, put, delete: deleteApi };
    return methods[method](url, params);
  };



  return {
    get,
    post,
    put,
    deleteApi,
    allApi,
    multiImageUpload,
    postFormData,
    isLoading,
    controller:controllerRef.current,
  };
};

export default ApiClientB;
