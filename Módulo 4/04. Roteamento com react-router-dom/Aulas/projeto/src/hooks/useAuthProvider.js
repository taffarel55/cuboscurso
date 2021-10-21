import { useState } from "react";

export default function useAuthProvider() {
  const [token, setToken] = useState(null);

  const logar = (callback) => {
    setToken("Maurício");
    callback();
  };

  const deslogar = (callback) => {
    setToken(null);
    callback();
  };

  return {
    token,
    logar,
    deslogar,
  };
}
