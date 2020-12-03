import NavMenuHome from "../../components/menuNavegacao";
import CriarCobrancas from "../../components/criarCobrancas";

function CriarCobranca() {
  return (
    <div>
      <div className="box_home">
        <div className="box_home_left">
          <NavMenuHome></NavMenuHome>
        </div>
        <div className="box_home_right">
          <CriarCobrancas></CriarCobrancas>
        </div>
      </div>
    </div>
  );
}

export default CriarCobranca;
