import useQuery from "@/libs/useQuery";
import axios from "axios";

const apiClient = axios.create({
  baseURL: "/api",
  headers: {
    Authorization: "Basic abcd",
  },
});

export class UserSevice {
  static ApiEndpoint = {
    user: "/user",
  };

  static getAll() {
    return apiClient.get(this.ApiEndpoint.user);
  }
}

export const useGetAllUser = () => {
  const { data, status, isFetching } = useQuery({
    key: ["useGetAllUser"],
    fetchAction: async () => UserSevice.getAll(),
    select: (data: any) => data.data.data,
  });

  return { data, status, isFetching };
};
