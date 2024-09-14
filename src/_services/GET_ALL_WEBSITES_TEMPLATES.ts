import { useQuery } from "react-query";

import api from "./API";

import { useSession } from "next-auth/react";

const translateTemplateType = (type: string) => {
  switch (type) {
    case "blank":
      return "EM BRANCO";
    default:
      return type;
  }
};

const GetAllTemplates = async (token: string) => {
  const response = await api.get("/website-template", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const translatedData = response.data.data.map((template: any) => ({
    ...template,
    type: translateTemplateType(template.type),
  }));

  return { ...response.data, data: translatedData };
};

export const _GET_ALL_TEMPLATES = () => {
  const { data: session } = useSession();
  const token = session?.authorization;

  return useQuery("get-all-sites-templates", () => GetAllTemplates(token as string), {
    staleTime: 5 * 60 * 1000, 
    refetchOnWindowFocus: false,
    enabled: !!token, 
  });
};
