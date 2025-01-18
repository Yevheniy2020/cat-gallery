import { serviceBuilder } from "@/utils/service.builder";

export const imageService = serviceBuilder<ImageDto>({
  baseUrl: "/images/search",
});

export const { useGetAllEntriesByParams: useGetAllImages } = imageService;
