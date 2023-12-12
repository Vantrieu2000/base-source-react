import axios from "axios";
import { Auth } from "./auth.api";
import { Category } from "./category.api";
import { Customer } from "./customer";
import { Menu } from "./menu.api";
import { Option } from "./options.api";
import { Reservation } from "./reservation.api";
import { Staff } from "./staff.api";
import { Store } from "./store.api";
import { User } from "./users.api";

////////////////////////////////////////
////////////////////////////////////////
/////         Api List
////////////////////////////////////////
////////////////////////////////////////

export const api = {
  Auth,
  User,
  Store,
  Reservation,
  Category,
  Option,
  Menu,
  Staff,
  Customer,
};

////////////////////////////////////////
////////////////////////////////////////
/////         Axios Settings
////////////////////////////////////////
////////////////////////////////////////

export const getToken = () => localStorage.getItem("token");
export const getLogin = () => localStorage.getItem("isLogin");

export const customAxios = axios.create({
  baseURL: process.env.NX_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

customAxios.interceptors.request.use(async (req) => {
  let originalRequest = req;
  const token = localStorage.getItem("token");

  if (token && originalRequest.headers) {
    originalRequest.headers.Authorization = token;
    return Promise.resolve(originalRequest);
  }

  return req;
});

export interface ResponseError {
  statusCode: number;
  message: string;
  error: string;
}

customAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const response: ResponseError = error?.response?.data;
    // if (response?.status_code === 422) {
    //   response.errors = response.errors.map(({name, errors}: {name: string, errors: string[]}) => {
    //     return {
    //       name,
    //       errors: errors.map((error: string) => {
    //         const field = formatMsg({id: `field.${name}`});
    //         const defaultMsg = formatMsg({id: error}, {field});
    //         return formatMsg({id: `${error}.${name}`, defaultMessage: defaultMsg})
    //       })
    //     }
    //   });
    //   return Promise.reject(response);
    // } else
    // if (response?.status_code === 400) {
    //   return Promise.reject(new Error(response.errors[0]));
    // } else
    return Promise.reject(response);
  }
);
