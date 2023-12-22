import useQuery from "@/libs/useQuery";
import { instance } from "@/libs/api/client";

const apiClient = instance({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL + "/spkahp",
});

export class AnalisaAlternatifService {
  static ApiEndpoint = {
    analisa_alternatif: "/analisa_alternatif",
  };

  static getAll() {
    return apiClient.get(this.ApiEndpoint.analisa_alternatif);
  }

  static getOne(analisa_alternatif_id: number) {
    if (analisa_alternatif_id === undefined) return undefined;
    return apiClient.get(
      this.ApiEndpoint.analisa_alternatif + `/${analisa_alternatif_id}`
    );
  }

  static postAnalisaAlternatif(payload: any) {
    return apiClient.post(this.ApiEndpoint.analisa_alternatif, payload);
  }

  static putAnalisaAlternatif(payload: any, analisa_alternatif_id: number) {
    if (analisa_alternatif_id === undefined) return undefined;
    return apiClient.put(
      this.ApiEndpoint.analisa_alternatif + `/${analisa_alternatif_id}`,
      payload
    );
  }

  static deleteAnalisaAlternatif(analisa_alternatif_id: number) {
    if (analisa_alternatif_id === undefined) return undefined;
    return apiClient.delete(
      this.ApiEndpoint.analisa_alternatif + `/${analisa_alternatif_id}`
    );
  }
}

export const useGetAllAnalisaAlternatif = () => {
  const { data, status, isFetching } = useQuery({
    key: ["useGetAllAnalisaAlternatif"],
    fetchAction: async () => AnalisaAlternatifService.getAll(),
    select: (data: any) => data.data.data,
  });

  return { data, status, isFetching };
};

export const useGetOneAnalisaAlternatif = (analisa_alternatif_id: number) => {
  const { data, status, isFetching } = useQuery({
    key: ["useGetOneAnalisaAlternatif", analisa_alternatif_id],
    fetchAction: async () =>
      AnalisaAlternatifService.getOne(analisa_alternatif_id),
    select: (data: any) => data.data.data,
  });

  return { data, status, isFetching };
};
