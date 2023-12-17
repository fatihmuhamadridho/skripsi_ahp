import useQuery from "@/libs/useQuery";
import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL + "/spkahp",
  headers: {
    Authorization: "Basic abcd",
  },
});

interface queryParamsCategoryKriteriaServiceProps {
  bobot_kriteria?: boolean;
  bobot_subkriteria?: boolean;
  bobot_alternatif?: boolean;
}

export class CategoryKriteriaService {
  static ApiEndpoint = {
    category_kriteria: "/category_kriteria",
    kriteria_subkriteria: "/category_kriteria/kriteria_subkriteria",
    bobot_subkriteria: "category_kriteria/bobot_subkriteria",
  };

  static getAll(params: queryParamsCategoryKriteriaServiceProps) {
    return apiClient.get(this.ApiEndpoint.category_kriteria, {
      params,
    });
  }

  static getOne(category_kriteria_id: number) {
    if (category_kriteria_id === undefined) return undefined;
    return apiClient.get(
      this.ApiEndpoint.category_kriteria + `/${category_kriteria_id}`
    );
  }

  static postCategoryKriteria(payload: any) {
    return apiClient.post(this.ApiEndpoint.category_kriteria, payload);
  }

  static putCategoryKriteria(payload: any, category_kriteria_id: number) {
    if (category_kriteria_id === undefined) return undefined;
    return apiClient.put(
      this.ApiEndpoint.category_kriteria + `/${category_kriteria_id}`,
      payload
    );
  }

  static deleteCategoryKriteria(category_kriteria_id: number) {
    if (category_kriteria_id === undefined) return undefined;
    return apiClient.delete(
      this.ApiEndpoint.category_kriteria + `/${category_kriteria_id}`
    );
  }

  static getAllKriteriaSubkritera() {
    return apiClient.get(this.ApiEndpoint.kriteria_subkriteria);
  }

  static postBobotSubkriteria(payload: any, category_kriteria_id: number) {
    if (category_kriteria_id === undefined) return undefined;
    return apiClient.post(
      this.ApiEndpoint.bobot_subkriteria + `/${category_kriteria_id}`,
      payload
    );
  }
}

export const useGetAllCategoryKriteria = (
  params: queryParamsCategoryKriteriaServiceProps
) => {
  const { data, status, isFetching } = useQuery({
    key: ["useGetAllCategoryKriteria", params],
    fetchAction: async () => CategoryKriteriaService.getAll(params),
    select: (data: any) => data.data.data,
  });

  return { data, status, isFetching };
};

export const useGetOneCategoryKriteria = (category_kriteria_id: number) => {
  const { data, status, isFetching } = useQuery({
    key: ["useGetOneCategoryKriteria", category_kriteria_id],
    fetchAction: async () =>
      CategoryKriteriaService.getOne(category_kriteria_id),
    select: (data: any) => data.data.data,
  });

  return { data, status, isFetching };
};

export const useGetAllCategoryKriteriaSubkriteria = () => {
  const { data, status, isFetching } = useQuery({
    key: ["useGetAllCategoryKriteriaSubkriteria"],
    fetchAction: async () => CategoryKriteriaService.getAllKriteriaSubkritera(),
    select: (data: any) => data.data.data,
  });

  return { data, status, isFetching };
};
