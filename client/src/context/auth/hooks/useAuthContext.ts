import { AuthContext } from "../index";
import { useContext } from "react";

export const useAuthContext = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("You must use Auth Context inside Auth Context Provider !");
  }

  return authContext;
};