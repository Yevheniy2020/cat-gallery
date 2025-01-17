import { serviceBuilder } from "@/utils/service.builder";

export const { useGetAllEntries: useGetAllImages } = serviceBuilder<ImageDto>(
  "images/search?include_breeds=1&size=full&limit=10",
);
