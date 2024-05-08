import { useSession } from "next-auth/react";
//redeploy

export const useCurrentRole = () => {
  const session = useSession();

  return session.data?.user?.role;
};
