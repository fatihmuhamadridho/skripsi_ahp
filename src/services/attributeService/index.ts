import useQuery from "@/libs/useQuery";
import { instance } from "@/libs/api/client";

const apiClient = instance({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL + "/spkahp",
});

export class AttributeService {
  static ApiEndpoint = {
    attribute: "/attribute",
    types: "/attribute/types",
  };

  static getAll() {
    return apiClient.get(this.ApiEndpoint.attribute);
  }

  static getOne(attribute_id: number) {
    if (attribute_id === undefined) return undefined;
    return apiClient.get(this.ApiEndpoint.attribute + `/${attribute_id}`);
  }

  static updateAttribute(payload: any) {
    return apiClient.post(this.ApiEndpoint.attribute, payload);
  }

  static getTypes() {
    return apiClient.get(this.ApiEndpoint.types);
  }
}

export const useGetAllAttribute = () => {
  const { data, status, isFetching } = useQuery({
    key: ["useGetAllAttribute"],
    fetchAction: async () => AttributeService.getAll(),
    select: (data: any) => data.data.data,
  });

  return { data, status, isFetching };
};

export const useGetAllAttributeTypes = () => {
  const { data, status, isFetching } = useQuery({
    key: ["useGetAllAttributeTypes"],
    fetchAction: async () => AttributeService.getTypes(),
    select: (data: any) => data.data.data,
  });

  return { data, status, isFetching };
};

export const useGetOneAttribute = (attribute_id: number) => {
  const { data, status, isFetching } = useQuery({
    key: ["useGetOneAttribute", attribute_id],
    fetchAction: async () => AttributeService.getOne(attribute_id),
    select: (data: any) => data.data.data,
  });

  return { data, status, isFetching };
};
