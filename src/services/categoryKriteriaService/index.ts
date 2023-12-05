import useQuery from "@/libs/useQuery";
import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL + "/spkahp",
  headers: {
    Authorization: "Basic abcd",
  },
});

export class CategoryKriteriaService {
  static ApiEndpoint = {
    category_kriteria: "/category_kriteria",
  };

  static getAll() {
    return apiClient.get(this.ApiEndpoint.category_kriteria);
  }

  static getOne(mock_id: number) {
    if (mock_id === undefined) return undefined;
    return apiClient.get(this.ApiEndpoint.category_kriteria + `/${mock_id}`);
  }

  static postCategoryKriteria(payload: any) {
    return apiClient.post(this.ApiEndpoint.category_kriteria, payload);
  }

  static putCategoryKriteria(payload: any, mock_id: number) {
    if (mock_id === undefined) return undefined;
    return apiClient.put(
      this.ApiEndpoint.category_kriteria + `/${mock_id}`,
      payload
    );
  }

  static deleteCategoryKriteria(mock_id: number) {
    if (mock_id === undefined) return undefined;
    return apiClient.delete(this.ApiEndpoint.category_kriteria + `/${mock_id}`);
  }
}

export const useGetAllCategoryKriteria = () => {
  const { data, status, isFetching } = useQuery({
    key: ["useGetAllCategoryKriteria"],
    fetchAction: async () => CategoryKriteriaService.getAll(),
    select: (data: any) => data.data.data,
  });

  return { data, status, isFetching };
};

export const useGetOneCategoryKriteria = (mock_id: number) => {
  const { data, status, isFetching } = useQuery({
    key: ["useGetOneCategoryKriteria", mock_id],
    fetchAction: async () => CategoryKriteriaService.getOne(mock_id),
    select: (data: any) => data.data.data,
  });

  return { data, status, isFetching };
};
