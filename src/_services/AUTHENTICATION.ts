import { useState } from "react";
import { useForm } from "react-hook-form";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

const schema = z.object({
  email: z.string().email("Email inválido").nonempty("Email é obrigatório"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

type FormData = z.infer<typeof schema>;

export function authenticationServiceWithCredentials() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const searchParams = useSearchParams();
  const router = useRouter();

  const [error, setError] = useState(searchParams.get("error"));

  const onSubmit = async (data: FormData) => {
    try {
      const response = await signIn("credentials", {
        redirect: false,
        ...data,
      });

      if (response?.error) {
        setError(response.error);
        router.replace("/auth/signIn?referrer=unauthorized-user");
      } else {
        setError(null);
        router.replace("/home/");
      }

      console.log("[LOGIN_RESPONSE]: ", response);
    } catch (error) {
      console.log("[LOGIN_ERROR]: ", error);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    error,
    onSubmit,
    signInWithGoogle: () => signIn("google"),
  };
}
