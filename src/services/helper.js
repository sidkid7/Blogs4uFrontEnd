import axios from "axios";
import { getToken } from "../auth";

// dev
export const BASE_URL = "http://localhost:9091/api/v1";

// prod
//export const BASE_URL = "http://webbasedblogapp-env.eba-3isy8t6t.us-west-1.elasticbeanstalk.com/api/v1";


export const myAxios = axios.create({
  baseURL: BASE_URL,   //key:value
});

export const privateAxios = axios.create({
  baseURL: BASE_URL,
 
});

privateAxios.interceptors.request.use(
  (config) => {
    const token = getToken();

    if (token) {
      config.headers.common.Authorization = `Bearer ${token}`;
      // console.log(config);
    }

    return config;
  },
  (error) => Promise.reject(error)
);
