import './App.css';
import Login from './paginas/login'
import Cadastro from './paginas/cadastro'
import Home from './paginas/home'
import AdicionarCliente from './paginas/adicionarCliente'
import EditarCliente from './paginas/editarCliente'
import {BrowserRouter as Router} from 'react-router-dom';


function App() {
	return (
			<main>
				<Router>
					<EditarCliente/>
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
