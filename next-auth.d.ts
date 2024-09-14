import { DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    token?: string;
    user?: {
      id: string;
      name: string;
      email: string;
    };
    authorization: string;
  }

  interface Session {
    token?: string;
    user?: {
      id: string;
      name: string;
      email: string;
    };
    authorization: string;
  }
}
