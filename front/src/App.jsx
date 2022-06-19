

import Inicio from './pages/Inicio';
import GestorProductos from './pages/Gestorproductos';
import GestorUsuarios from './pages/GestorUsuarios';
import GestorVentas from './pages/GestorVentas';
import TipoEquipo from './pages/TipoEquipo';
import EstadoEquipo from './pages/EstadoEquipo';
import Navegador from './pages/Navegador';
import Inventario from './pages/Inventario';

import Login from './pages/Login';
import TotalVentas from './pages/TotalVentas';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
       <Switch>

       <Route path ='/Navegador'> 
           <Navegador/>
        </Route>

       <Route path ='/GestorUsuarios'> 
           <GestorUsuarios/>
        </Route>

        <Route path ='/GestorVentas'> 
           <GestorVentas/>
        </Route>

        <Route path ='/Inventario'> 
           <Inventario/>
        </Route>

        <Route path ='/TipoEquipo'> 
           <TipoEquipo/>
        </Route>

        <Route path ='/EstadoEquipo'> 
           <EstadoEquipo/>
        </Route>


       <Route path ='/Login'> 
           <Login/>
       </Route>


         <Route path ='/GestorProductos'> 
           <GestorProductos/>
         </Route>

         <Route path ='/TotalVentas'> 
           <TotalVentas/>
         </Route>

         
         <Route path ='/'> 
           <Inicio/>
         </Route>


         
        

       </Switch>
       
      </Router>
      
    </div>  
      
  );
}

export default App;
