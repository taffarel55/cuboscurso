import { useState } from "react";

export default function useAuthProvider() {
  const [token, setToken] = useState(null);

  const logar = async (user, callback) => {
    try {
      const response = await fetch(`https://api.github.com/users/${user}`);
      if (response.status !== 200) {
        setToken(null);
        return;
      }
      setToken(user);
      callback();
    } catch (err) {
      console.log(err);
    }
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
