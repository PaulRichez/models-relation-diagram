import axios from "./axiosInstance";
import { stringify } from "qs";
export const api = {
  getModels: async (queryParams) => {
    const data = await axios.get(`/models-relation-diagram/models`);
        return data;
    },
};
