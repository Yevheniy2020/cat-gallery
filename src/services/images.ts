import { serviceBuilder } from "@/utils/service.builder";

export const { useGetAllEntries: useGetAllImages } = serviceBuilder<ImageDto>(
  "images/search?has_breeds=true&size=full&limit=10",
);
