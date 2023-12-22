import useQuery from "@/libs/useQuery";
import { instance } from "@/libs/api/client";

const apiClient = instance({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL + "/spkahp",
});

export class AnalisaKriteriaService {
  static ApiEndpoint = {
    analisaKriteria: "/analisa_kriteria",
    nilaiPreferensi: "/analisa_kriteria/nilai_preferensi",
    checkConsistent: "/analisa_kriteria/check_consistent",
  };

  static getAll() {
    return apiClient.get(this.ApiEndpoint.analisaKriteria);
  }

  static getOne(kategori_id: number) {
    if (kategori_id === undefined) return undefined;
    return apiClient.get(this.ApiEndpoint.analisaKriteria + `/${kategori_id}`);
  }

  static postAnalisaKriteria(payload: any) {
    return apiClient.post(this.ApiEndpoint.analisaKriteria, payload);
  }

  static putAnalisaKriteria(payload: any, kategori_id: number) {
    if (kategori_id === undefined) return undefined;
    return apiClient.put(
      this.ApiEndpoint.analisaKriteria + `/${kategori_id}`,
      payload
    );
  }

  static deleteAnalisaKriteria(kategori_id: number) {
    if (kategori_id === undefined) return undefined;
    return apiClient.delete(
      this.ApiEndpoint.analisaKriteria + `/${kategori_id}`
    );
  }

  static getAllNilaiPreferensi() {
    return apiClient.get(this.ApiEndpoint.nilaiPreferensi);
  }

  static checkConsistent(payload: any) {
    return apiClient.post(this.ApiEndpoint.checkConsistent, payload);
  }
}

export const useGetAllAnalisaKriteria = () => {
  const { data, status, isFetching } = useQuery({
    key: ["useGetAllAnalisaKriteria"],
    fetchAction: async () => AnalisaKriteriaService.getAll(),
    select: (data: any) => data.data.data,
  });

  return { data, status, isFetching };
};

export const useGetOneAnalisaKriteria = (kategori_id: number) => {
  const { data, status, isFetching } = useQuery({
    key: ["useGetOneAnalisaKriteria", kategori_id],
    fetchAction: async () => AnalisaKriteriaService.getOne(kategori_id),
    select: (data: any) => data.data.data,
  });

  return { data, status, isFetching };
};

export const useGetAllNilaiPreferensi = () => {
  const { data, status, isFetching } = useQuery({
    key: ["useGetAllNilaiPreferensi"],
    fetchAction: async () => AnalisaKriteriaService.getAllNilaiPreferensi(),
    select: (data: any) => data.data.data,
  });

  return { data, status, isFetching };
};
