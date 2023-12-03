import useQuery from "@/libs/useQuery";
import axios from "axios";

const apiClient = axios.create({
  baseURL: "/api",
  headers: {
    Authorization: "Basic abcd",
  },
});

export class MockService {
  static ApiEndpoint = {
    mock: "/mock",
  };

  static getAll() {
    return apiClient.get(this.ApiEndpoint.mock);
  }
}

export const useGetAllmock = () => {
  const { data, status, isFetching } = useQuery({
    key: ["useGetAllmock"],
    fetchAction: async () => MockService.getAll(),
    select: (data: any) => data.data.data,
  });

  return { data, status, isFetching };
};
