import { signOut } from "@/auth";

export const logout = async () => {
  await signOut({ redirect: true, redirectTo: "/" });
};
