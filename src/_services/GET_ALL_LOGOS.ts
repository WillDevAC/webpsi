import { useQuery } from "react-query";

import api from "./API";

import { useSession } from "next-auth/react";

const translateType = (type: string) => {
  switch (type) {
    case "logo":
      return "LOGOTIPO";
    case "visit-card":
      return "CARTÃO DE VISITA";
    case "custom":
      return "PERSONALIZADO";
    default:
      return type;
  }
};

const GetAllLogos = async (token: string) => {
  const response = await api.get("/editor", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const translatedData = response.data.data.map((logo: any) => ({
    ...logo,
    type: translateType(logo.type),
  }));

  return { ...response.data, data: translatedData };
};

export const GetAllLogosList = () => {
  const { data: session } = useSession();
  const token = session?.authorization;

  return useQuery("get-all-logos", () => GetAllLogos(token as string), {
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    enabled: !!token,
  });
};
