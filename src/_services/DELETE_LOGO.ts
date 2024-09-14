import { useSession } from "next-auth/react";

import { useMutation, useQueryClient } from "react-query";

import api from "./API";

const deleteProject = async (id: string, token: string) => {
  const response = await api.delete(`/editor/delete-project/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const _DELETE_LOGO = () => {
  const { data: session } = useSession();

  const token = session?.authorization;

  const queryClient = useQueryClient();

  return useMutation((id: string) => deleteProject(id, token as string), {
    onSuccess: () => {
      queryClient.invalidateQueries("get-all-logos");
    },
  });
};
