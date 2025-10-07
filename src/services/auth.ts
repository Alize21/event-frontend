import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { Iregister } from "@/types/Auth";

const authService = {
  register: (payload: Iregister) =>
    instance.post(`${endpoint.AUTH}/register`, payload),
};

export default authService;
