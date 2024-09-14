import { Session } from "next-auth";

export interface AppProviderProps {
  children: React.ReactNode;
  session: Session | null;
}
