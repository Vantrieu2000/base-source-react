import axiosDefault from "axios";
import { AuthApi, Configuration, MeApi, OrderApi, PermissionApi } from "./api";

import { formatMsg } from "@my-app/intl";

const axios = axiosDefault.create();

axios.interceptors.request.use((reqConfig) => {
  reqConfig.headers = reqConfig.headers || {};
  reqConfig.headers["jwt"] = reqConfig.headers["jwt"] || localStorage.getItem("token") || "";
  return reqConfig;
});

axios.interceptors.response.use(
  (response) => {
    return response.data.data;
  },
  (error) => {
    const response = error?.response?.data;
    if (response?.status_code === 422) {
      response.errors = response.errors.map(({ name, errors }: { name: string; errors: string[] }) => {
        return {
          name,
          errors: errors.map((error: string) => {
            const field = formatMsg({ id: `field.${name}` });
            const defaultMsg = formatMsg({ id: error }, { field });
            return formatMsg({ id: `${error}.${name}`, defaultMessage: defaultMsg });
          }),
        };
      });
      return Promise.reject(response);
    } else if (response?.status_code === 400) {
      return Promise.reject(new Error(response.errors[0]));
    } else if (response?.status_code) {
      return Promise.reject(response);
    }
    return Promise.reject(error);
  }
);

const config = new Configuration({ basePath: process.env.NX_API_BASE_URL });

export * from "./api";
export const authApi = new AuthApi(config, undefined, axios);
export const meApi = new MeApi(config, undefined, axios);

export const permissionApi = new PermissionApi(config, undefined, axios);
export const orderApi = new OrderApi(config, undefined, axios);
