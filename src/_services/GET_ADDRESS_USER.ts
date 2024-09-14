import { Address } from "@/types/address";

import { useState } from "react";

export function GetUserAddress() {
  const [cep, setCep] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [address, setAddress] = useState<Address>({
    rua: "",
    numero: "",
    bairro: "",
    cidade: "",
    estado: "",
  });

  const handleCepChange = (event: any) => {
    let { value } = event.target;
    value = value.replace(/\D/g, ""); 
    if (value.length > 8) {
      value = value.slice(0, 8);
    }
    if (value.length > 5) {
      value = `${value.slice(0, 5)}-${value.slice(5)}`;
    }
    setCep(value);
  };

  const fetchAddress = async () => {
    if (cep.length < 9) return;
    setLoading(true);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      setAddress({
        rua: data.logradouro || "",
        numero: "",
        bairro: data.bairro || "",
        cidade: data.localidade || "",
        estado: data.uf || "",
      });
    } catch (error) {
      console.error("Erro ao buscar endereço:", error);
    } finally {
      setLoading(false);
    }
  };

  return { cep, address, loading, handleCepChange, fetchAddress, setAddress };
}
