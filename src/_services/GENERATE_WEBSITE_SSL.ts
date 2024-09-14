import { useMutation, useQueryClient } from "react-query";
import { useSession } from "next-auth/react";
import api from "./API";

const requestSSLForDomain = async (domain: string, token: string) => {
  const response = await api.post(
    `/website/domain-ssl`,
    { domain },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const _GENERATE_SSL = () => {
  const { data: session } = useSession();
  const token = session?.authorization;
  const queryClient = useQueryClient();

  return useMutation(
    (domain: string) => requestSSLForDomain(domain, token as string),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("get-all-websites");
      },
    }
  );
};
