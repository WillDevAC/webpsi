import { useQuery } from "react-query";

import api from "./API";

import { useSession } from "next-auth/react";

const GetAllLogoTemplates = async (token: string) => {
  const response = await api.get("/image", {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "*/*",
    },
  });

  return response.data;
};

export const _GET_ALL_LOGOS_TEMPLATES = () => {
  const { data: session } = useSession();
  const token = session?.authorization;

  return useQuery("get-all-logos-templates", () => GetAllLogoTemplates(token as string), {
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    enabled: !!token,
  });
};
