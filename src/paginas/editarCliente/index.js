import NavMenuHome from "../../components/menuNavegacao";
import EditarCliente from "../../components/editarClientes";

function EditarClientes() {
  return (
    <div>
      <div className="box_home">
        <div className="box_home_left">
          <NavMenuHome></NavMenuHome>
        </div>

        <div className="box_home_right">
          <EditarCliente></EditarCliente>
        </div>
      </div>
    </div>
  );
}

export default EditarClientes;
