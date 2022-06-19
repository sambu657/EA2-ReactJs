import React from "react";
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

import {
  Table,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
  Input,
} from "reactstrap";



const data = [
  { ID_Producto: 1, des_Producto: "Producto1", Cantidad: 1, Precio_Unitario:100, Precio_Total:100},
  { ID_Producto: 2, des_Producto: "Producto2", Cantidad: 2, Precio_Unitario:200, Precio_Total:400},
  { ID_Producto: 3, des_Producto: "Producto3", Cantidad: 4, Precio_Unitario:300, Precio_Total:1200},
  { ID_Producto: 4, des_Producto: "Producto4", Cantidad: 3, Precio_Unitario:250, Precio_Total:750},
  { ID_Producto: 5, des_Producto: "Producto5", Cantidad: 1, Precio_Unitario:500, Precio_Total:500},

];



const data2 = [
  { ID_Venta: 1, Total_Venta: 15000, Fecha_Venta: "11/10/2021", ID_Cliente: 1, Nombre_Cliente: "Julian Carvajal", Vendedor: "Dario Gutierrez", productos: [data]},
  
];

const data3 = [
  { ID_Venta: 1, Total_Venta: 15000, Fecha_Venta: "11/10/2021", ID_Cliente: 1, Nombre_Cliente: "Julian Carvajal", Vendedor: "Dario Gutierrez", productos: [data]},
  
];
  


class GestorVentas extends React.Component {
  state = {
    data: [],
    data2: data2,
    data3: data3,
    modalActualizar: false,
    modalInsertar: false,
    modalInsertar2:false,
    productList:[],
    productVentaList:[],
    modalSelecionarProductos:false,
    productoForm: {
      //Actuzalizar está parte con los campos que son
      _id: "",
      serial: "",
      modelo: "",
      descripcion: "",
      color: "",
      foto: "",
      precio: "",
      usuario: "",
      marca: "",
      tipoEquipo: "",
      estadoEquipo: "",
      fechaCreacion: "",
      tipoEquipo: "",
    },
    form: {
      ID_Producto: "",
      des_Producto: "",
      Cantidad: "",
      Precio_Unitario:"",
      Precio_Total: "",
    },
  
    form2: {
      ID_Venta: "",
      Fecha_Venta: "",
      Total_Venta: "",
      ID_Cliente:"",
      Nombre_Cliente:"",
      Vendedor: "",
    },

  };

  mostrarModalActualizar = (dato) => {
    this.setState({
      form: dato,
      modalActualizar: true,
    });
  };

  selecionarProducto = (dato) => {
    var des=dato.title;
    console.log("esto tiene el des:"+des);
    this.setState({
      productoForm: dato,
      modalSelecionarProductos: false,
      form: {

        ...this.state.form,
        ID_Producto: dato._id,
        des_Producto: dato.title,
        Precio_Unitario: dato.price,

      },       
    });

    
  };

  agregarProducto = (dato) => {
    this.setState({
      productoForm: dato,
      modalSelecionarProductos: false,
    });
  };


  cerrarModalActualizar = () => {
    this.setState({ modalActualizar: false });
  };

  mostrarModalInsertar = () => {
    console.log("vamos bien")
    this.listarProductos()
    this.setState({
      modalInsertar: true,
    });
  };

  mostrarModalInsertar2 = () => {
    this.setState({
      modalInsertar2: true,
    });
  };

  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };

  cerrarModalInsertar2 = () => {
    this.setState({ modalInsertar2: false });
  };

  listarProductos = async () => {
    try {
      const resp = await fetch("http://localhost:3030/inventario", { method: "GET" })
      const data = await resp.json()
      this.setState({ productList: data })
      console.log(data)
    } catch (err) {
      console.log(err)
    }
  }

  editar = (dato) => {
    var opcion = window.confirm("Está seguro que desea actualizar el Resgistro de venta número  "+dato.ID_Producto);
    if(opcion == true){
    var contador = 0;
    var arreglo = this.state.data;
    arreglo.map((registro) => {
      if (dato.ID_Producto == registro.ID_Producto) {
        arreglo[contador].ID_Producto = dato.ID_Producto;
        arreglo[contador].des_Producto = dato.des_Producto;
        arreglo[contador].Cantidad = dato.Cantidad;
        arreglo[contador].Precio_Unitario = dato.Precio_Unitario;
        arreglo[contador].Precio_Total = dato.Precio_Unitario * dato.Cantidad;
      }
      contador++;
    });
    this.setState({ data: arreglo, modalActualizar: false });
    }
  };

  guardar= ()=>{

    var valorNuevo= {...this.state.form2};
       
    var lista3= this.state.data3;
    lista3.push(valorNuevo);

    this.setState({ modalInsertar: false, data3: lista3 });

  }



  eliminar = (dato) => {
    var opcion = window.confirm("Estás Seguro que deseas Eliminar el resgistro de venta número "+dato.ID_Producto);
    if (opcion == true) {
      var contador = 0;
      var arreglo = this.state.data;
      arreglo.map((registro) => {
        if (dato.ID_Producto == registro.ID_Producto) {
          arreglo.splice(contador, 1);
        }
        contador++;
      });
      this.setState({ data: arreglo, modalActualizar: false });
    }
  };




  insertar= (input)=>{
    console.log("insertar metodo")
    console.log(input)

    var total =this.state.form.Cantidad*this.state.form.Precio_Unitario
    console.log("total"+total)

   var nuevoProducto= {
      ID_Producto: this.state.form.ID_Producto,
      des_Producto: this.state.form.des_Producto,
      Cantidad: this.state.form.Cantidad,
      Precio_Unitario:this.state.form.Precio_Unitario,
      Precio_Total: total,
    }

    
    console.log("form"+this.state.form)
       
       
    var lista= this.state.data;
    lista.push(nuevoProducto);
    this.setState({ modalInsertar: false, data: lista });
    this.clearProductoForm(); 
  }

  clearProductoForm= ()=>{

    this.setState({
      productoForm: {
        ...this.state.productoForm,
        _id: "",
        title: "",
        price: "",
        url: "",
        categoria: "",
        disponible: "",
        description: "",  
      },       
    });

  }

  insertar2= ()=>{

    var valorNuevo2 ={...this.state.form2};

    var lista2=this.state.data2;
    lista2.fill(valorNuevo2);
    this.setState({ modalInsertar2: false, data2: lista2 });

  }


  handleChange = (e) => {

  console.log("verificar e")
  console.log(e)
    this.setState({
      form: {

        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });




    this.setState({

      form2: {
        ...this.state.form2,
        [e.target.name]: e.target.value,
      },

    });

  };





  render() {
    
    return (
      <>
        <Container >
        <br />
        <ul>
          <Button color="success" onClick={()=>this.mostrarModalInsertar()}>Ingresar Producto</Button>
          <> </>
          <Button color="success" onClick={()=>this.mostrarModalInsertar2()}>Información Producto</Button>
          <> </>
          <Link to='/TotalVentas'><Button color = "success" type='button' onClick={()=>this.guardar()} >Guardar Producto</Button></Link>
          <> </>
          <Link to='/TotalVentas'><Button color = "success" type='button' >Inventario</Button></Link>

          </ul>
          <br />

          <br />

            <Table className="table table-bordered table-striped">

            
            
            <thead>
              <tr className="bg-success">
                <th>ID Venta</th>
                <th>Fecha Venta</th>
                <th>Total Venta</th>
                <th>ID Cliente</th>
                <th>Nombre Cliente</th>
                <th>Vendedor</th>
              </tr>
            </thead>

            <tfoot>

            </tfoot>

            <br />

            <tbody>

            {this.state.data2.map((dato) => (
                <tr key={dato.ID_Venta}>
                  <td>{dato.ID_Venta}</td>
                  <td>{dato.Fecha_Venta}</td>
                  <td>{dato.Total_Venta}</td>
                  <td>{dato.ID_Cliente}</td>
                  <td>{dato.Nombre_Cliente}</td>
                  <td>{dato.Vendedor}</td>
                  <td>
                    
                  </td>
                </tr>
              ))}
              
            </tbody>

            <br />



            </Table>



           <Table className="table table-striped">

            <thead>
              <tr>
                <th>ID Producto</th>
                <th>Descripción</th>
                <th>Cantidad</th>
                <th>Precio unidad</th>
                <th>Total</th>
                <th>Acción</th>
              </tr>
            </thead>

            <tfoot>

            </tfoot>

            <br />

            <tbody>
              {this.state.data.map((dato) => (
                <tr key={dato.ID_Producto}>
                  <td>{dato.ID_Producto}</td>
                  <td>{dato.des_Producto}</td>
                  <td>{dato.Cantidad}</td>
                  <td>{dato.Precio_Unitario}</td>
                  <td>{dato.Precio_Total}</td>
                  <td>
                    <Button
                      color="primary"
                      onClick={() => this.mostrarModalActualizar(dato)}
                    >
                      Cambiar
                    </Button>{" "}
                    <Button color="danger" onClick={()=> this.eliminar(dato)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>

            <br />



          </Table>



        </Container>

        <Modal isOpen={this.state.modalActualizar}>
          <ModalHeader>
           <div><h3>Editar Registro</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
               ID Producto:
              </label>
            
              <input
                className="form-control"
                readOnly
                name="ID_Producto"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.ID_Producto}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Descripción del Producto: 
              </label>
              <input
                className="form-control"
                name="des_Producto"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.des_Producto}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Cantidad: 
              </label>
              <input
                id = "cant"
                className="form-control"
                name="Cantidad"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.Cantidad}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Precio Unitario: 
              </label>
              <input
                id = "p_unit"
                className="form-control"
                name="Precio_Unitario"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.Precio_Unitario}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Precio Total: 
              </label>
              <input
                id = "ptotal"
                className="form-control"
                name="Precio_Total"
                type="text"
                onChange={this.handleChange}
                value = {this.state.form.Precio_Unitario  * this.state.form.Cantidad}
              />
            </FormGroup>
            
          </ModalBody>

          <ModalFooter>

            <Button 
              color="primary"
              onClick={() => this.editar(this.state.form)}
    
            >
              Guardar
            </Button>
            <Button
              color="danger"
              onClick={() => this.cerrarModalActualizar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.modalSelecionarProductos} >
        <ModalHeader>
           <div><h3>Seleccione Producto</h3></div>
          </ModalHeader>
          <ModalBody>
          <Table>
            <thead>
              <tr>                
                <th>Tille</th>
                <th>Price</th>
                <th>Disponible</th>
              </tr>
            </thead>

            <tbody>
              {this.state.productList.map((producto,index) => (
                <tr key={producto._id}>
                  <td>{producto.title}</td>
                  <td>{producto.price}</td>
                  <td>{producto.disponible ? "Disponible" : "No disponible"}</td>
                  <td>
                    <Button
                      color="primary"
                      onClick={() => this.selecionarProducto({ ...producto })}
                    >
                      Agregar
                    </Button>{" "}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          </ModalBody>

        </Modal>
        
        <Modal isOpen={this.state.modalInsertar} >
          <ModalHeader>
           <div><h3>Ingreso nuevo producto</h3></div>
           <Button
                      color="primary"
                      onClick={() => this.setState({modalSelecionarProductos: true })}
                    >
                      Agregar producto
                    </Button>{" "}
          </ModalHeader>

          <ModalBody>

          
              <FormGroup>
              <label>
              Producto: 
              </label>
              
              <input
                className="form-control"
                name="ID_Producto"
                type="text"
                onChange={this.handleChange}
                value={this.state.productoForm.title}
              />
            </FormGroup>
             
          
            
            <FormGroup>
              <label>
                Descripción del Producto: 
              </label>
              <input
                className="form-control"
                name="des_Producto"
                type="text"
                onChange={this.handleChange}
                value={this.state.productoForm.description}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Cantidad: 
              </label>
              <input
                id="2"
                className="form-control"
                name="Cantidad"
                type="number"
                
                onChange={this.handleChange}
              />
            </FormGroup>


            <FormGroup>
              <label>
                Valor unitario: 
              </label>
              <input
                id="1"
                className="form-control"
                name="Precio_Unitario"
                type="number"
                value={this.state.productoForm.price}
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Precio Total: 
              </label>
              <input
                className="form-control"
                name="Precio_Total"
                type="number"
                value = {this.state.productoForm.price * this.state.form.Cantidad}
                

                onChange={this.handleChange}
              />
            </FormGroup>

          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.insertar(this.state.form)}
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


        <Modal isOpen={this.state.modalInsertar2}>
          <ModalHeader>
           <div><h3>Datos Venta</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
                ID Venta: 
              </label>
              
              <input
                className="form-control"
                form="form2"
                name="ID_Venta"
                type="number"
                value={this.state.form2.ID_Venta}
                onChange={this.handleChange}
                
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Fecha de la venta: 
              </label>
              <input
                className="form-control"
                form="form2"
                name="Fecha_Venta"
                type="text"
                value={this.state.form2.Fecha_Venta}
                onChange={this.handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Identificación del Cliente: 
              </label>
              <input
                className="form-control"
                form="form2"
                name="ID_Cliente"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Nombre del Cliente: 
              </label>
              <input
                className="form-control"
                form="form2"
                name="Nombre_Cliente"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Vendedor: 
              </label>
              <input
                className="form-control"
                form="form2"
                name="Vendedor"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Valor Total Venta: 
              </label>
              <input
                className="form-control"
                form="form2"
                name="Total_Venta"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>



          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.insertar2()}
            >
              Guardar
            </Button>
            <Button
              className="btn btn-danger"
              onClick={() => this.cerrarModalInsertar2()}
            >
              Cerrar
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






export default GestorVentas;