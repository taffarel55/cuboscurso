import useAuth from "./useAuth";

export default function useAPI() {
  const auth = useAuth();
  const baseURL = "https://cubos-api-contacts.herokuapp.com";

  function options(method, authentication, body) {
    this.method = method;
    this.headers = {
      "Content-Type": "application/json",
      Authorization: authentication ? `Bearer ${auth.token}` : "",
    };
    this.body = JSON.stringify(body);
  }

  const login = async (body) =>
    fetch(`${baseURL}/login`, new options("POST", false, body));

  const usuarios = async (body) =>
    fetch(`${baseURL}/usuarios`, new options("POST", false, body));

  const contatos = async (method, authentication, id, body) => {
    fetch(
      `${baseURL}/contatos/${id ?? ""}`,
      new options(method, authentication, body)
    );
  };

  return {
    login,
    usuarios,
    contatos,
  };
}
