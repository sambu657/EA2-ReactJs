import React from 'react';
import '../styles/login.css';
import { Link } from 'react-router-dom';

import {
    Button,Container,FormGroup,Form,FormLabel,FormControl,FormText,ButtonGroup
  } from "reactstrap";

class App extends React.Component{
    render(){
        return(

    <>

    <div class="center-block">
    <Form className="caja">
        <h1 color="black">Inicio de sesion</h1>

        <br/>
        <br/>
    <FormGroup className="grupo">
              <label>
                Usuario: 
              </label>
              <input
                className="contrase"
                name="Nombre"
                type="text"
                
              />
            </FormGroup>
            <br/>
            <FormGroup className="grupo">
              <label>
                Contraseña: 
              </label>
              <input
                
                className="contrase"
                name="Nombre"
                type="password" 
                
              />
            </FormGroup>
     
            {/* <ButtonGroup aria-label="Basic example">
            <Button variant="secundary">Iniciar sesion</Button> */}
            <div className="Botones">
              <Link className="linBot" to='/Navegador' className="linBot">
              <button type="button">Iniciar sesion</button>
            </Link>
            <ButtonGroup aria-label="Basic example">
             <Button variant="primary">Registrase</Button>
            </ButtonGroup>
            </div>
            </Form>
  </div>
  </>

        );
    }
}
export default App;   
