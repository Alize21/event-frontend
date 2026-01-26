import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IActivation, ILogin, Iregister } from "@/types/Auth";

const authService = {
  register: (payload: Iregister) =>
    instance.post(`${endpoint.AUTH}/register`, payload),
  activation: (payload: IActivation) =>
    instance.post(`${endpoint.AUTH}/activate`, payload),
  login: (payload: ILogin) => instance.post(`${endpoint.AUTH}/login`, payload),
  getProfileWithToken: (token: string) =>
    instance.get(`${endpoint.AUTH}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  getProfile: () => instance.get(`${endpoint.AUTH}/me`),
};
export default authService;
