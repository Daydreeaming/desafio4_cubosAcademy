import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AuthProvider from "./components/AuthProvider"
import PrivateRoute from "./components/privateRoute"
import Login from "./paginas/login";
import Cadastro from "./paginas/cadastro";
import Home from "./paginas/home";
import ListaDeClientes from "./paginas/clientes";
import ListaDeCobrancas from "./paginas/listarCobrancas";
import CadastroCliente from "./paginas/adicionarCliente";
import EditarCliente from "./paginas/editarCliente";
import CriarCobranca from "./paginas/criarCobrancas";

function App() {
  return (
    <main>
		<AuthProvider>
			<Router>
				<Route exact path="/" component={Login} />
				<Route exact path="/cadastro" component={Cadastro} />
				<PrivateRoute exact path="/dashboard" component={Home} />
				<PrivateRoute exact path="/dashboard/clientes" component={ListaDeClientes} />
				<PrivateRoute exact path="/dashboard/cobrancas" component={ListaDeCobrancas} />
				<PrivateRoute exact path="/dashboard/cadastrarCliente" component={CadastroCliente}/>
				<PrivateRoute exact path="/dashboard/editarCliente" component={EditarCliente}/>
				<PrivateRoute exact path="/dashboard/criarCobranca" component={CriarCobranca}/>
			</Router>
		</AuthProvider>
    </main>
  );
}

export default App;
