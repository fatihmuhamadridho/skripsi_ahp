import useQuery from "@/libs/useQuery";
import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL + "/spkahp",
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

  static getOne(kriteria_id: number) {
    if (kriteria_id === undefined) return undefined;
    return apiClient.get(this.ApiEndpoint.kriteria + `/${kriteria_id}`);
  }

  static postKriteria(payload: any) {
    return apiClient.post(this.ApiEndpoint.kriteria, payload);
  }

  static putKriteria(payload: any, kriteria_id: number) {
    if (kriteria_id === undefined) return undefined;
    return apiClient.put(
      this.ApiEndpoint.kriteria + `/${kriteria_id}`,
      payload
    );
  }

  static deleteKriteria(kriteria_id: number) {
    if (kriteria_id === undefined) return undefined;
    return apiClient.delete(this.ApiEndpoint.kriteria + `/${kriteria_id}`);
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

export const useGetOneKriteria = (kriteria_id: number) => {
  const { data, status, isFetching } = useQuery({
    key: ["useGetOneKriteria", kriteria_id],
    fetchAction: async () => KriteriaService.getOne(kriteria_id),
    select: (data: any) => data.data.data,
  });

  return { data, status, isFetching };
};
