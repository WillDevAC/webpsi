import { useQuery } from "react-query";
import api from "./API";
import { useSession } from "next-auth/react";

const translateStatus = (status: string): string => {
  switch (status) {
    case "DRAFT":
      return "RASCUNHO";
    case "PUBLISHED":
      return "PUBLICADO";
    case "DEPLOYING":
      return "IMPLANTANDO";
    default:
      return status; 
  }
};

const GetAllWebsites = async (authorization: string) => {
  const response = await api.get(`/website`, {
    headers: {
      Authorization: `Bearer ${authorization}`,
    },
  });

  const translatedData = response.data.data.map((site: any) => ({
    ...site,
    status: translateStatus(site.status),
  }));

  return { ...response.data, data: translatedData };
};

export const GetAllWebsitesList = () => {
  const { data: session } = useSession();

  return useQuery(
    "get-all-websites",
    () => GetAllWebsites(session?.authorization as string),
    {
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
      enabled: !!session?.authorization, 
    }
  );
};
