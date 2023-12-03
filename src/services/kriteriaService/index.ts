import useQuery from "@/libs/useQuery";
import axios from "axios";

const apiClient = axios.create({
  baseURL: "/api",
  headers: {
    Authorization: "Basic abcd",
  },
});

export class KriteriaService {
  static ApiEndpoint = {
    kriteria: "/kriteria",
  };

  static getAll() {
    return apiClient.get(this.ApiEndpoint.kriteria);
  }
}

export const useGetAllKriteria = () => {
  const { data, status, isFetching } = useQuery({
    key: ["useGetAllKriteria"],
    fetchAction: async () => KriteriaService.getAll(),
    select: (data: any) => data.data.data,
  });

  return { data, status, isFetching };
};
