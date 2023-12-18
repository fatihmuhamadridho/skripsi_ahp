import useQuery from "@/libs/useQuery";
import { instance } from "@/libs/api/client";

const apiClient = instance({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL + "/spkahp",
});

export class AlternatifService {
  static ApiEndpoint = {
    alternatif: "/alternatif",
  };

  static getAll() {
    return apiClient.get(this.ApiEndpoint.alternatif);
  }

  static getOne(alternatif_id: number) {
    if (alternatif_id === undefined) return undefined;
    return apiClient.get(this.ApiEndpoint.alternatif + `/${alternatif_id}`);
  }

  static postAlternatif(payload: any) {
    return apiClient.post(this.ApiEndpoint.alternatif, payload);
  }

  static putAlternatif(payload: any, alternatif_id: number) {
    if (alternatif_id === undefined) return undefined;
    return apiClient.put(
      this.ApiEndpoint.alternatif + `/${alternatif_id}`,
      payload
    );
  }

  static deleteAlternatif(alternatif_id: number) {
    if (alternatif_id === undefined) return undefined;
    return apiClient.delete(this.ApiEndpoint.alternatif + `/${alternatif_id}`);
  }
}

export const useGetAllAlternatif = () => {
  const { data, status, isFetching } = useQuery({
    key: ["useGetAllAlternatif"],
    fetchAction: async () => AlternatifService.getAll(),
    select: (data: any) => data.data.data,
  });

  return { data, status, isFetching };
};

export const useGetOneAlternatif = (alternatif_id: number) => {
  const { data, status, isFetching } = useQuery({
    key: ["useGetOneAlternatif", alternatif_id],
    fetchAction: async () => AlternatifService.getOne(alternatif_id),
    select: (data: any) => data.data.data,
  });

  return { data, status, isFetching };
};
