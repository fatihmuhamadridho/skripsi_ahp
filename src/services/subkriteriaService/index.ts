import useQuery from "@/libs/useQuery";
import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL + "/spkahp",
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

  static getOne(subkriteria_id: number) {
    if (subkriteria_id === undefined) return undefined;
    return apiClient.get(this.ApiEndpoint.subkriteria + `/${subkriteria_id}`);
  }

  static postSubkriteria(payload: any) {
    return apiClient.post(this.ApiEndpoint.subkriteria, payload);
  }

  static putSubkriteria(payload: any, subkriteria_id: number) {
    if (subkriteria_id === undefined) return undefined;
    return apiClient.put(
      this.ApiEndpoint.subkriteria + `/${subkriteria_id}`,
      payload
    );
  }

  static deleteSubkriteria(subkriteria_id: number) {
    if (subkriteria_id === undefined) return undefined;
    return apiClient.delete(
      this.ApiEndpoint.subkriteria + `/${subkriteria_id}`
    );
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

export const useGetOneSubkriteria = (subkriteria_id: number) => {
  const { data, status, isFetching } = useQuery({
    key: ["useGetOneSubkriteria", subkriteria_id],
    fetchAction: async () => SubkriteriaService.getOne(subkriteria_id),
    select: (data: any) => data.data.data,
  });

  return { data, status, isFetching };
};
