import useQuery from "@/libs/useQuery";
import axios from "axios";

const apiClient = axios.create({
  baseURL: "/api",
  headers: {
    Authorization: "Basic abcd",
  },
});

export class SubkriteriaService {
  static ApiEndpoint = {
    subkriteria: "/subkriteria",
  };

  static getAll() {
    return apiClient.get(this.ApiEndpoint.subkriteria);
  }
}

export const useGetAllSubkriteria = () => {
  const { data, status, isFetching } = useQuery({
    key: ["useGetAllSubkriteria"],
    fetchAction: async () => SubkriteriaService.getAll(),
    select: (data: any) => data.data.data,
  });

  return { data, status, isFetching };
};
