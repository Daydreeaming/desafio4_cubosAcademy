import NavMenuHome from "./../../components/menuNavegacao";
import SaldoNaConta from "./../../components/saldoNaConta";
import ListaDeCobrancas from "./../../components/listarCobrancas";

function ListarCobrancas() {
  return (
    <div className="box_home">
      <div className="box_home_left">
        <NavMenuHome></NavMenuHome>
      </div>

      <div className="box_home_right">
        <SaldoNaConta />
        <ListaDeCobrancas />
      </div>
    </div>
  );
}

export default ListarCobrancas;
