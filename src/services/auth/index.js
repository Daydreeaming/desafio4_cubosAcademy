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
  async relatorioDoUsuario(token) {
    const config = {
      headers: {
        Authorization: `bearer ${token}`,
      },
    };
    try {
      const { data } = await api.get("relatorios", config);
      return Promise.resolve(data.dados);
    } catch (error) {
      return Promise.reject(error.response.data.dados.mensagem);
    }
  },
  async cadastrarCliente(nome, email, cpf, telefone, token) {
    const config = {
      headers: {
        Authorization: `bearer ${token}`,
      },
    };
    try {
      const resp = await api.post(
        "clientes",
        { nome, email, cpf, telefone },
        config
      );
      return Promise.resolve(resp.data.dados.mensagem);
    } catch (error) {
      return Promise.reject(error.response.data.dados.mensagem);
    }
  },
  async cadastrarCobranca(idDoCliente, descricao, valor, vencimento, token) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const resp = await api.post(
        "cobrancas",
        {
          idDoCliente,
          descricao,
          valor,
          vencimento,
        },
        config
      );
      console.warn(resp);
      return Promise.resolve(resp.data.dados.mensagem);
    } catch (error) {
      console.log(error.message);
    }
  },

  async getClientes(token) {
    const config = {
      headers: {
        Authorization: `bearer ${token}`,
      },
    };
    try {
      const { data } = await api.get(
        "clientes?clientesPorPagina=10&offset=1",
        config
      );
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error.response.data.dados.mensagem);
    }
  },

  async getCobrancas(token) {
    const config = {
      headers: {
        Authorization: `bearer ${token}`,
      },
    };
    try {
      const { data } = await api.get(
        "cobrancas?cobrancasPorPagina=10&offset=1",
        config
      );
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error.response.data.dados.mensagem);
    }
  },

  async atualizarCobranca(idDaCobranca, token) {
    const config = {
      headers: {
        Authorization: `bearer ${token}`,
      },
    };
    try {
      const { data } = await api.put("cobrancas", idDaCobranca, config);
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error.response.data.dados.mensagem);
    }
  },
};
