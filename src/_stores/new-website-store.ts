import { Address } from "@/types/address";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Specialty {
  id: number;
  name: string;
  path: string;
  category: string;
  categoria: string;
}

interface NewWebsiteStore {
  selectedTemplateId: number | null;
  selectedTemplateName: string | null;
  siteName: string;
  authorName: string;
  crp: string;
  serviceType: string;
  cep: string;
  address: Address;
  bio: string;
  specialties: Specialty[];
  setFormData: (data: Partial<NewWebsiteStore>) => void;
  resetFormData: () => void;
}

const defaultAddress: Address = {
  rua: "",
  numero: "",
  bairro: "",
  cidade: "",
  estado: "",
};

const defaultFormData: NewWebsiteStore = {
  selectedTemplateId: null,
  siteName: "",
  authorName: "",
  selectedTemplateName: "",
  crp: "",
  serviceType: "online",
  cep: "",
  address: defaultAddress,
  bio: "",
  specialties: [],
  setFormData: () => {},
  resetFormData: () => {},
};

export const useTemplateStore = create<NewWebsiteStore>()(
  persist(
    (set) => ({
      formData: defaultFormData,
      ...defaultFormData,
      setFormData: (data) =>
        set((state) => ({
          ...state,
          ...data,
        })),
      resetFormData: () => set({ ...defaultFormData }),
    }),
    {
      name: "form-storage",
    }
  )
);
