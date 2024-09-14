import { useMutation, useQueryClient } from "react-query";
import { useSession } from "next-auth/react";
import api from "./API";

const deleteWebsite = async (id: string, token: string) => {
  const response = await api.delete(`/website/my-website/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const _DeleteWebsiteAction = () => {
  const { data: session } = useSession();
  const token = session?.authorization;
  const queryClient = useQueryClient();

  return useMutation((id: string) => deleteWebsite(id, token as string), {
    onSuccess: () => {
      queryClient.invalidateQueries("get-all-websites");
    },
  });
};
