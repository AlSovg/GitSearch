import {axiosInstance} from "@/services/instance";
import {ApiRoutes} from "@/services/constants";
import {Response} from "@/models/rep";

export const getRepos = async (): Promise<Response> => {
    return  (await axiosInstance.get<Response>(ApiRoutes.repos)).data
};