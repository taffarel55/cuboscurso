import { useLocalStorage } from "react-use";
import useAPI from "./useAPI";

export default function useAuthProvider() {
  const [token, setToken] = useLocalStorage("token", "");
  const api = useAPI();
  
  const logar = async ({ email, senha }, callback) => {
    const body = {
      email,
      senha,
    };
    const response = await api.login(body);
    const data = await response.json();
    if (!data.token) {
      console.log(data);
      return;
    }
    setToken(data.token);
    callback();
  };

  const cadastrar = async ({ nome, email, senha }, callback) => {
    const body = {
      nome,
      email,
      senha,
    };
    const response = await api.usuarios(body);
    const data = await response.json();
    if (!data.id) {
      console.log(data);
      return;
    }
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
    cadastrar,
  };
}
