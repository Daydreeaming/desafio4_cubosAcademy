import "./App.css";
import Login from "./paginas/login";
import Cadastro from "./paginas/cadastro";
import Home from "./paginas/home";
import AdicionarCliente from "./paginas/adicionarCliente";
import EditarCliente from "./paginas/editarCliente";
import CriarCobranca from "./paginas/criarCobrancas";
import ListaDeCobrancas from "./paginas/listarCobrancas";
import Clientes from "./paginas/clientes";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <main>
      <Router>
        <Route exact path="/" component={Login} />
        <Route exact path="/cadastro" component={Cadastro} />
        <Route exact path="/dashboard" component={Home} />
        <Route exact path="/dashboard/cobrancas" component={ListaDeCobrancas} />
        <Route exact path="/dashboard/clientes" component={Clientes} />
      </Router>
    </main>

    // Fluxo
    // 1 - <Login></Login>
    // 2 - <Cadastro></Cadastro>
    // 3 - <Home/>
    // 4 - <criarCobrança/>
    // 5 - <Cobranças/>
    // 6 - <criarCliente>
    // 7 - <clientes/>
    // 8 - <editarCliente/>

    /* Login > If login verdade pagina home se não Cadastro */
  );
}

export default App;
