import { useQuery } from "react-query";
import api from "./API";
import { useSession } from "next-auth/react";

const GetAllDomains = async (token: string) => {
  const response = await api.get("/website/domain", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.domains;
};

export const _GET_ALL_DOMAINS = () => {
  const { data: session } = useSession();
  const token = session?.authorization;

  return useQuery("get-all-domains", () => GetAllDomains(token as string), {
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    enabled: !!token,
  });
};
