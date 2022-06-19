import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Table,Button,Container,Modal,ModalHeader,ModalBody,FormGroup,ModalFooter,
} from "reactstrap";

const data = [
    { ID: 1, Nombre: "Angelica", Rol: "Administrador", Estado:"Autorizado"},
    { ID: 2, Nombre: "Julian", Rol: "Vendedor", Estado:"Pendiente"},
    { ID: 3, Nombre: "Larry", Rol: "Vendedor",Estado:"Autorizado" },
    { ID: 4, Nombre: "Alejandro", Rol: "Vendedor",Estado:"Autorizado" },
    { ID: 5, Nombre: "Daniela", Rol: "Vendedor",Estado:"Pendiente"},
    
  ];

class App extends React.Component{
    state={
        busqueda:'',
        usuarios:[]
    }
    onChage=async e=>{
        e.persist();
        await this.setState({busqueda: e.target.value});
        this.filtrarDatos();
    }
    /* filtra los elementos por ID*/
    filtrarDatos=()=>{
        var search=data.filter(item=>{
            if(item.ID.toString().includes(this.state.busqueda)){
                return item;
            }
        });
        this.setState({data: search})

    
    }

    componentDidMount(){
    this.setState({usuarios:data})    

    }

    render(){
        return(
            <Container>
                <input type="text" placeholder="Buscar" name="busqueda" onChage={this.onChage}/>
                <Button type="button" color="primary">Buscar</Button>
            </Container>            

        )
    }

}
export default App;