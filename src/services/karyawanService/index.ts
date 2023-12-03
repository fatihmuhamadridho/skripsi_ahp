import useQuery from "@/libs/useQuery";
import axios from "axios";

const apiClient = axios.create({
  baseURL: "/api",
  headers: {
    Authorization: "Basic abcd",
  },
});

export class KaryawanService {
  static ApiEndpoint = {
    karyawan: "/karyawan",
  };

  static getAll() {
    return apiClient.get(this.ApiEndpoint.karyawan);
  }
}

export const useGetAllKaryawan = () => {
  const { data, status, isFetching } = useQuery({
    key: ["useGetAllKaryawan"],
    fetchAction: async () => KaryawanService.getAll(),
    select: (data: any) => data.data.data,
  });

  return { data, status, isFetching };
};
