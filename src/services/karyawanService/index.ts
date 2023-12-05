import useQuery from "@/libs/useQuery";
import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL + "/spkahp",
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

  static getOne(karyawan_id: number) {
    if (karyawan_id === undefined) return undefined;
    return apiClient.get(this.ApiEndpoint.karyawan + `/${karyawan_id}`);
  }

  static postKaryawan(payload: any) {
    return apiClient.post(this.ApiEndpoint.karyawan, payload);
  }

  static putKaryawan(payload: any, karyawan_id: number) {
    if (karyawan_id === undefined) return undefined;
    return apiClient.put(
      this.ApiEndpoint.karyawan + `/${karyawan_id}`,
      payload
    );
  }

  static deleteKaryawan(karyawan_id: number) {
    if (karyawan_id === undefined) return undefined;
    return apiClient.delete(this.ApiEndpoint.karyawan + `/${karyawan_id}`);
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

export const useGetOneKaryawan = (karyawan_id: number) => {
  const { data, status, isFetching } = useQuery({
    key: ["useGetOneKaryawan", karyawan_id],
    fetchAction: async () => KaryawanService.getOne(karyawan_id),
    select: (data: any) => data.data.data,
  });

  return { data, status, isFetching };
};
