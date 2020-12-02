import Login from "../../paginas/login";
import api from "../api";

export default {
  async login(email, senha) {
    try {
      const resp = await api.post("auth", { email, senha });
      console.log(resp.data.dados.token);
    } catch (error) {
      console.log(error.response.data.dados.mensagem);
      return Promise.reject(error.response.data.dados.mensagem);
    }
  },
  async cadastro(nome, email, senha) {
    try {
      const resp = await api.post("usuarios", { nome, email, senha });
      console.warn(resp);
      return Promise.resolve(resp.data.dados.mensagem);
    } catch (error) {
      return Promise.reject(error.response.data.dados.mensagem);
    }
  },
  
};
