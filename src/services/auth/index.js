import api from "../api";

export default {
  async login(email, senha) {
    try {
      const resp = await api.post("auth", { email, senha });
	  return Promise.resolve(resp.data.dados.token);
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
  async relatorioDoUsuario() {
    try {
      const resp = await api.get("relatorios", {});
      console.warn(resp);
    } catch (error) {
      return Promise.reject(error.response.data.dados.mensagem);
    }
  },
  async cadastrarCliente(nome, email, cpf, telefone) {
	try {
		console.log(nome,email, cpf, telefone)
		const resp = await api.post("clientes", { nome, email, cpf, telefone }) 
		console.warn(resp)
		return Promise.resolve(resp.data.dados.mensagem);
	} catch (error) {
		console.log(error.message)
		// return Promise.reject(error.response.data.dados.mensagem);
	}
  }
};
