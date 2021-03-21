//Importaciones
import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Button, Container, Modal,ModalHeader, ModalBody, FormGroup, ModalFooter} from "reactstrap";
import addUser from "./imgs/add.png";
import Inicio from "./imgs/inicio.png";
import Editr from "./imgs/edit.png";
import { BsFillPersonPlusFill,BsPersonPlus, BsTrash, BsPencil, BsXCircle} from "react-icons/bs";
import InputMask from "react-input-mask";
import swal from "sweetalert";

//-----------------------------INPUT BUSCAR------------------------------------
function buscarContacto(buscar) {
  return function (x) {
    console.log(x);
    return (
      !x.Nombre.toLowerCase().indexOf(buscar.toLowerCase()) ||
      !x.Apellido.toLowerCase().indexOf(buscar.toLowerCase())
    );
  };
}
//-------------------------LOCAL STORAGE-------------------------------------
const actualizar_todos = () => {
  const todoString = JSON.stringify(todos);
  localStorage.setItem("todos", todoString);
};
const todos = JSON.parse(localStorage.getItem("todos")) || [];

class App extends React.Component {
  state = {
    datos: todos,
    Actualizar: false,
    Insertar: false,
    contactos: {
      id: "",
      Nombre: "",
      Apellido: "",
      Telefono: "",
    },
    buscar: "",
  };

  //--------------------------------------ELIMINAR----------------------------------
  eliminar = (contacto) => {
    var opcion = swal({
      title: "¿Estás seguro?",
      text: "Una vez eliminado, no podrás recuperar este contacto!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
      return: false,
    }).then((willDelete) => {
      if (willDelete) {
        opcion = true;
        if (opcion === true) {
          var count = 0;
          var lista = this.state.datos;
          lista.map((registro) => {
            if (contacto.id == registro.id) {
              lista.splice(count, 1);
            }
            count++;
          });
          this.setState({ datos: lista, Actualizar: false });
          var lista2 = this.state.datos;
          var contador = 1;
          lista2.map((registro) => {
            registro.id = contador;
            contador++;
          });
          this.setState({ data: lista2 });
          actualizar_todos();
        }
        swal("Poof! Tu contacto ha sido eliminado con éxito!", {
          icon: "success",
        });
      } else {
        opcion = false;
        swal({
          icon: "error",
          text: "Has cancelado, tu contacto está seguro!",
        });
      }
    });
  };
  //---------------------------------INSERTAAAR--------------------
  ensenarInsertar = () => {
    this.setState({
      Insertar: true,
    });
  };
  esconderInsertar = () => {
    this.setState({ Insertar: false });
    swal({
      title: "Cancelado!",
      text: "Regresando al inicio!",
      icon: "error",
      button: "Continuar!",
    });
  };
  insertar = () => {
    let valorNuevo = { ...this.state.contactos };
    valorNuevo.id = this.state.datos.length + 1;
    let lista = this.state.datos;
    lista.push(valorNuevo);
    this.setState({ Insertar: false, datos: lista });
    actualizar_todos();
    swal({
      title: "Agregado!",
      text: "Pulsaste el botón agregar!",
      icon: "success",
      button: "Continuar!",
    });
  };
  //---------------------------------CAMBIOS CONTACTOS--------------------------------------------------------------
  cambioContactos = (e) => {
    this.setState({
      contactos: {
        ...this.state.contactos,
        [e.target.name]: e.target.value,
      },
    });
  };
  //-------------------------------EDITAR----------------------------------------------------------------------------
  editar = (contacto) => {
    var cont = 0;
    var lista = this.state.datos;
    lista.map((registro) => {
      if (contacto.id == registro.id) {
        lista[cont].Nombre = contacto.Nombre;
        lista[cont].Apellido = contacto.Apellido;
        lista[cont].Telefono = contacto.Telefono;
      }
      cont++;
    });
    this.setState({ datos: lista, Actualizar: false });
    actualizar_todos();
    swal({
      title: "Contacto editado!",
      text: "Su información ha sido actualizada!",
      icon: "success",
      button: "Continuar!",
    });
  };
  mostrarEditar = (dato) => {
    this.setState({
      contactos: dato,
      Actualizar: true,
    });
  };
  cerrarEditar = () => {
    this.setState({ Actualizar: false });
    swal({
      title: "Cancelado!",
      text: "Regresando al inicio!",
      icon: "error",
      button: "Continuar!",
    });
  };
  //-------------------------INPUT BUSCAR-------------------------------------
  cambioBuscar = (e) => {
    this.setState({
      buscar: e.target.value,
    });
  };
  render() {
    return (
      <>
        <Container
          className=" w-full sm:w-full sm:ml-5"
          style={{backgroundColor: "white",
            height: "50%",
            marginTop: "4%",
            borderRadius: "10px",
            padding: "10px 10px",
            boxShadow: "3px 3px 4px darkgrey",
            border: "3px 3px 0 0 solid darkgrey",
          }}
        >
          <br />
          <img src={Inicio} style={{ width: "30%", marginLeft: "30%" }} />
          <h3 style={{ marginLeft: "31.7%", fontFamily: "courier new" }}>
            LISTA DE CONTACTOS
          </h3>
          <div style={{}}>
            <Button
              color="primary"
              size="md mb-2"
              onClick={() => this.ensenarInsertar()}
              style={{
                background: "#141E30",
                background:
                  "-webkit-linear-gradient(to right, #335e8f, #141E30)",
                background: "linear-gradient(to right, #243B55, #141E30)",
              }}
            >
              {" "}
              <BsFillPersonPlusFill
                style={{ marginRight: "8px", marginBottom: "" }}
              />
              Agregar
            </Button>
            <input
              type="text"
              className="rounded border-light"
              name="buscar"
              style={{ marginLeft: "73.7%" }}
              placeholder="Buscar"
              onChange={this.cambioBuscar}
            ></input>
          </div>
          <div
            style={{
              maxHeight: "250px",
              overflowY: "auto",
            }}
          >
            <Table
              className="text-center w-full table table-bordered table-striped mb-0"
              style={{ height: "10px" }}
              striped
              bordered
              hover
            >
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Apellido</th>
                  <th scope="col">Telefono</th>
                  <th scope="col">Acción</th>
                </tr>
              </thead>
              <tbody>
                {this.state.buscar === ""
                  ? this.state.datos.map((contacto) => (
                      <tr key={contacto.id} style={{ height: "10px" }}>
                        <th scope="row">{contacto.id}</th>
                        <td scope="col">{contacto.Nombre}</td>
                        <td scope="col">{contacto.Apellido}</td>
                        <td scope="col">{contacto.Telefono}</td>
                        <td scope="col">
                          <Button
                            color="info"
                            onClick={() => this.mostrarEditar(contacto)}
                          >
                            <BsPencil
                              style={{
                                marginRight: "4px",
                                marginBottom: "4px",
                              }}
                            />
                            Editar
                          </Button>{" "}
                          <Button
                            color="secondary"
                            onClick={() => this.eliminar(contacto)}
                            >
                            <BsTrash style={{
                                marginRight: "2px",
                                marginBottom: "4px",
                              }}
                            />
                            Eliminar
                          </Button>
                        </td>
                      </tr>
                    ))
                  : this.state.datos
                      .filter(buscarContacto(this.state.buscar))
                      .map((contacto) => (
                        <tr key={contacto.id}>
                          <th scope="row">{contacto.id}</th>
                          <td scope="col">{contacto.Nombre}</td>
                          <td scope="col">{contacto.Apellido}</td>
                          <td scope="col">{contacto.Telefono}</td>
                          <td scope="col">
                            <Button
                              color="info"
                              onClick={() => this.mostrarEditar(contacto)}
                            >
                              <BsPencil
                                style={{
                                  marginRight: "4px",
                                  marginBottom: "4px",
                                }}
                              />
                              Editar
                            </Button>{" "}
                            <Button
                              color="secondary"
                              onClick={() => this.eliminar(contacto)}
                            >
                              {" "}
                              <BsTrash />
                              Eliminar
                            </Button>
                          </td>
                        </tr>
                      ))}
              </tbody>
            </Table>
          </div>
        </Container>

        {/* //------------------------------------MODAL ACTUALIZAR--------------------------------------- */}
        <Modal isOpen={this.state.Actualizar}>
          <ModalHeader>
            <div style={{ alignItems: "center", textAlign: "center" }}>
              <h3>Editar Contacto</h3>
              <img src={Editr} style={{ width: "55%", height: "2%" }} />
            </div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>Id:</label>

              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.contactos.id}
                required
              />
            </FormGroup>

            <FormGroup>
              <label>Nombre:</label>
              <input
                className="form-control"
                name="Nombre"
                type="text"
                onChange={this.cambioContactos}
                value={this.state.contactos.Nombre}
              />
            </FormGroup>

            <FormGroup>
              <label>Apellido:</label>
              <input
                className="form-control"
                name="Apellido"
                type="text"
                onChange={this.cambioContactos}
                value={this.state.contactos.Apellido}
              />
            </FormGroup>
            <FormGroup onInvalid={this.handleInvalidForm}>
              <label>Telefono:</label>
              <InputMask
                className="form-control"
                name="Telefono"
                type="text"
                mask="999-999-9999"
                onChange={this.cambioContactos}
                value={this.state.contactos.Telefono}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="info"
              onClick={() => this.editar(this.state.contactos)}
            >
              <BsPencil style={{ marginRight: "4px", marginBottom: "4px" }} />
              Editar
            </Button>
            <Button color="secondary" onClick={() => this.cerrarEditar()}>
              <BsXCircle style={{ marginRight: "4px", marginBottom: "4px" }} />
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>

        {/*---------------------------------------MODAL INSERTAR---------------------------------------------------- */}
        <Modal isOpen={this.state.Insertar}>
          <ModalHeader>
            <div style={{ alignItems: "center", textAlign: "center" }}>
              <h3>Insertar Contacto</h3>
              <img src={addUser} style={{ width: "60%", height: "10%" }} />
            </div>
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <label>Id:</label>

              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.datos.length + 1}
              />
            </FormGroup>

            <FormGroup>
              <label>Nombre:</label>
              <input
                className="form-control"
                name="Nombre"
                type="text"
                onChange={this.cambioContactos}
              />
            </FormGroup>

            <FormGroup>
              <label>Apellido:</label>
              <input
                className="form-control"
                name="Apellido"
                type="text"
                onChange={this.cambioContactos}
              />
            </FormGroup>
            <FormGroup>
              <label>Telefono:</label>
              <InputMask className="form-control" name="Telefono" type="tel" mask="999-999-9999" onChange={this.cambioContactos}/>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="info" onClick={() => this.insertar()}>
              <BsPersonPlus style={{ marginRight: "4px", marginBottom: "4px" }}/>
              Insertar
            </Button>
            <Button color="secondary" onClick={() => this.esconderInsertar()}>
              <BsXCircle style={{ marginRight: "4px", marginBottom: "4px" }} />
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}
export default App;
