import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Table,Button,Container,Modal,ModalHeader,ModalBody,FormGroup,ModalFooter,
} from "reactstrap";
import '../styles/usuarios.css';
import { Link } from 'react-router-dom';

const data = [
  { _id: 1, nombre: "Laura", apellido: "Valencia",fecha_creacion: "10-05-2022",  fecha_actualizacion: "10-05-2022", estado:"Autorizado"},
  { _id: 1, nombre: "Agelo", apellido: "duque",fecha_creacion: "10-05-2022",  fecha_actualizacion: "10-05-2022", estado:"Autorizado"},
  
];

class App extends React.Component {
  state = {
    busqueda:'', 
    data: data,
    modalActualizar: false,
    modalInsertar: false,
    form: {
      _id: "",
      nombre: "",
      apellido: "",
      documento: "",
      estado:"",
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
      console.log("intentando listar usuarios")
      const resp = await fetch("http://localhost:3030/usuario", { method: "GET" })
      const data = await resp.json()
      this.setState({ data: data })
      console.log(data)
    } catch (err) {
      console.log(err)
    }
  }

  editar = async (dato) => {
    try {
      console.log("======================")
      console.log(this.state.form)
      console.log("======================")
      const resp = await fetch("http://localhost:3030/usuario/"+dato._id, {
        method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({
          ...this.state.form

        })
      })
      const data = await resp.text()
      console.log(data)
    } catch (err) {
      console.log(err)
    }

    this.listar()
    this.cerrarModalActualizar()
    
  };

  eliminar = async (dato) => {
    var opcion = window.confirm("Estás Seguro que deseas Eliminar el usuario con cedula: "+dato.documento);
    if (opcion == true) {

      try {
        console.log("======================")
        console.log(this.state.form)
        console.log("======================")
        const resp = await fetch("http://localhost:3030/usuario/"+dato._id, { method: "DELETE" })
        const data = await resp.text()
        console.log(data)
      } catch (err) {
        console.log(err)
      }
      this.listar()
      this.setState({ data: this.state.data, modalActualizar: false });
    }
  };

  insertar = async () => {
    try {
      console.log("========      Insertar    ==============")
      console.log(this.state.form)
      console.log("======================")
      const resp = await fetch("http://localhost:3030/usuario", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({
          ...this.state.form

        })
      })
      const data = await resp.text()
      console.log(data)
    } catch (err) {
      console.log(err)
    }

    this.listar()
    this.cerrarModalInsertar()
  }


  
  /*captura el valor del input*/
  onChange=async e=>{
    e.persist();
    await this.setState({busqueda:e.target.value});
    console.log(this.state.busqueda);
    console.log('lista filtrada',this.state.data.filter((elemento)=>{
      console.log("elemento",elemento);
      return JSON.stringify(elemento).toLowerCase().includes(this.state.busqueda.toLowerCase());
    })
    );
    
    this.filtrar();  /*Se llama a la funcion filtar cada que se escribe en el buscador*/
  }
  filtrar=()=>{
    var search=data.filter((elemento)=>{
      if(JSON.stringify(elemento).toLowerCase().includes(this.state.busqueda.toLowerCase())){
        return elemento;
      }
    });
    this.setState({data:search}); /*actualiza la tabla*/
  }

  componentDidMount(){
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
          <Button color="success" onClick={()=>this.mostrarModalInsertar()}>Crear nuevo usuario</Button>
          <input name="busqueda" value={this.state.busqueda} placeholder='buscar' className='border-gray-700 px-3 py-1'  onChange={this.onChange}/>
          <br />
        
          <br />
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Documento</th>
                <th>Fecha Creación</th>
                <th>Fecha Actualización</th>
                <th>Estado</th>
              </tr>
            </thead>

            <tbody>
              {this.state.data.map((dato) => (
                <tr key={dato._id}>
                  <td>{dato._id}</td>
                  <td>{dato.nombre}</td>
                  <td>{dato.apellido}</td>
                  <td>{dato.documento}</td>
                  <td>{dato.fecha_creacion}</td>
                  <td>{dato.fecha_actualizacion}</td>
                  <td>{dato.estado}</td>
                  <td>
                    <Button
                      color="primary"
                      onClick={() => this.mostrarModalActualizar(dato)}
                    >
                      Editar
                    </Button>{" "}
                    <Button color="secondary" onClick={()=> this.eliminar(dato)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        <Modal isOpen={this.state.modalActualizar}>
          <ModalHeader>
           <div><h3>Editar Registro</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
               ID:
              </label>
            
              <input
                className="form-control"
                readOnly
                name="_id"
                type="text"
                onChange={this.handleChange}
                value={this.state.form._id}
              />
            </FormGroup>

            <FormGroup>
              <label>
              Documento: 
              </label>
              <input
                className="form-control"
                name="documento"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.documento}
              />
            </FormGroup>
                        
            <FormGroup>
              <label>
                Nombre: 
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
                Apellido: 
              </label>
              <input
                className="form-control"
                name="apellido"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.apellido}
              />
            </FormGroup>

            <FormGroup>
              <label>
              Fecha Creación: 
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
              Fecha Actualización: 
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
              <select  className="form-control" name="estado" value={this.state.form.estado} onChange={this.handleChange}>
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
           <div><h3>Crear Usuario</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
              Documento: 
              </label>
              <input
                className="form-control"
                name="documento"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Nombre: 
              </label>
              <input
                className="form-control"
                name="nombre"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>
              Apellido: 
              </label>
              <input
                className="form-control"
                name="apellido"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Estado: 
              </label>
              <select  className="form-control" name="estado" value={this.state.form.Estado} onChange={this.handleChange}>
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
              Crear
            </Button>
            <Button
              className="btn btn-danger"
              onClick={() => this.cerrarModalInsertar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
        <Link  to='/Navegador'>
          <button type='button' className="bton">Volver</button>  
        </Link>
      </>
    );
  }
}
export default App;