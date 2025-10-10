import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IActivation, Iregister } from "@/types/Auth";

const authService = {
  register: (payload: Iregister) =>
    instance.post(`${endpoint.AUTH}/register`, payload),
  activation: (payload: IActivation) =>
    instance.post(`${endpoint.AUTH}/activate`, payload),
};

export default authService;
