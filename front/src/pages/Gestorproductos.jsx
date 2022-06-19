import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import '../styles/usuarios.css';
import { Link } from 'react-router-dom';

import {
  Table,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";


const stateToAvailable = { Disponible: true, "No Disponible": false }
class App extends React.Component {
  state = {
    data: [],
    modalActualizar: false,
    modalInsertar: false,
    form: {
      //Actuzalizar está parte con los campos que son
      _id: "",
      nombre: "",
      estado: "",
      fecha_creacion: "",
      fecha_actualizacion: ""
    },
  };

  mostrarModalActualizar = (dato) => {
    this.setState({
      form: dato,
      modalActualizar: true,
    });
  };

  cerrarModalActualizar = () => {
    this.setState({ modalActualizar: false });
  };

  mostrarModalInsertar = () => {
    this.setState({
      modalInsertar: true,
    });
  };

  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };

  listar = async () => {
    try {
      const resp = await fetch("http://localhost:3030/marca", { method: "GET" })
      const data = await resp.json()
      this.setState({ data: data })
      console.log(data)
    } catch (err) {
      console.log(err)
    }
  }

  editar = async (dato) => {

    try {
      const resp = await fetch(`http://localhost:3030/marca/${dato._id}`, {
        method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({
          ...this.state.form

        })
      })
      const data = await resp.text()

      console.log(data)
    } catch (err) {
      console.log(err)
    }
    const lista = this.state.data;
    lista[dato.index] = { ...lista[dato.index], ...dato }
    this.setState({ modalActualizar: false, data: lista });
    this.listar()
  };

  eliminar = async (id, index) => {
    var opcion = window.confirm("Estás Seguro que deseas Eliminar la marca");
    if (opcion == true) {
      try {
        const resp = await fetch(`http://localhost:3030/marca/${id}`, {
          method: "DELETE",
        })
        const data = await resp.text()

        console.log(data)
      } catch (err) {
        console.log(err)
      }
      const lista = this.state.data;
      lista.splice(index, 1)
      this.setState({ modalActualizar: false, data: lista });
      this.listar()

    }
  };

  insertar = async () => {
    try {
      const resp = await fetch("http://localhost:3030/marca", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({
          ...this.state.form,
          disponible: stateToAvailable[this.state.form.disponible]

        })
      })
      const data = await resp.text()
      console.log(data)
    } catch (err) {
      console.log(err)
    }

    const lista = this.state.data;
    lista.push(this.state.form);
    this.setState({ modalInsertar: false, data: lista });
    this.listar()
  }

  onChange = async e => {
    e.persist();
    await this.setState({ busqueda: e.target.value });
    /*console.log(this.state.busqueda);
    console.log('lista filtrada',this.state.data.filter((elemento)=>{
      console.log("elemento",elemento);
      return JSON.stringify(elemento).toLowerCase().includes(this.state.busqueda.toLowerCase());
    })
    );
    esto era para vefiricar salida por consola*/

    this.filtrar();  /*Se llama a la funcion filtar cada que se escribe en el buscador*/
  }
  filtrar = () => {
    var search = this.data.filter((elemento) => {
      if (JSON.stringify(elemento).toLowerCase().includes(this.state.busqueda.toLowerCase())) {
        return elemento;
      }
    });
    this.setState({ data: search }); /*actualiza la tabla*/
  }

  componentDidMount() {
    this.listar()
  }

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  render() {

    return (
      <>
        <Container >
          <br />

          <Button color="success" onClick={() => this.mostrarModalInsertar()}>Crear un nueva Marca</Button>
          <input name="busqueda" value={this.state.busqueda} placeholder='buscar' className='border-gray-700 px-2 py-1  ' onChange={this.onChange} />

          <br />
          <br />
          <br />
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Fecha Creación</th>
                <th>Fecha Actualización</th>
                <th>Estado</th>
              </tr>
            </thead>

            <tbody>
              {this.state.data.map((dato, index) => (
                <tr key={dato._id}>
                  <td>{dato._id}</td>
                  <td>{dato.nombre}</td>
                  <td>{dato.fecha_creacion}</td>
                  <td>{dato.fecha_actualizacion}</td>
                  <td>{dato.estado}</td>
                  <td>
                    <Button
                      color="primary"
                      onClick={() => this.mostrarModalActualizar({ ...dato, index })}
                    >
                      Editar
                    </Button>{" "}
                    <Button color="secondary" onClick={() => this.eliminar(dato._id, index)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        <Modal isOpen={this.state.modalActualizar}>
          <ModalHeader>
            <div><h3>Editar Marca</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
                Nombre
              </label>

              <input
                className="form-control"
                name="nombre"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.nombre}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Fecha Creación
              </label>

              <input
                className="form-control"
                readOnly
                name="fecha_creacion"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.fecha_creacion}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Fecha Actualización
              </label>

              <input
                className="form-control"
                readOnly
                name="fecha_actualizacion"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.fecha_actualizacion}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Estado:
              </label>
              <select className="form-control" name="estado" value={this.state.form.estado} onChange={this.handleChange}>
                <option selected value="0">Elige una opcion</option>
                <option>Activo</option>
                <option>Inactivo</option>

              </select>
            </FormGroup>

          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.editar(this.state.form)}
            >
              Editar
            </Button>
            <Button
              color="danger"
              onClick={() => this.cerrarModalActualizar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>



        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
            <div><h3>Registrar Marca </h3></div>
          </ModalHeader>

          <ModalBody>

            <FormGroup>
              <label>
                Nombre
              </label>

              <input
                className="form-control"
                name="nombre"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.nombre}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Estado:
              </label>
              <select className="form-control" name="estado" value={this.state.form.estado} onChange={this.handleChange}>
                <option selected value="0">Elige una opcion</option>
                <option>Activo</option>
                <option>Inactivo</option>

              </select>
            </FormGroup>

          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.insertar()}
            >
              Insertar
            </Button>
            <Button
              className="btn btn-danger"
              onClick={() => this.cerrarModalInsertar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
        <Link to='/Navegador'>
          <button type='button' className="bton">Volver</button>
        </Link>
      </>
    );
  }
}
export default App;