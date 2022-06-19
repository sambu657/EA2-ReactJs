import { Link } from 'react-router-dom';
import '../styles/Navegador.css';


function navegador(){
    return(
        <body className="cuer">
            <h1 className="titu">Navegador</h1>
            <Link to='/Inicio'>
                <button type='button' className="bot">Inicio</button>
            </Link>
            <Link to='/Gestorproductos'>
                <button type='button' className="bot1">Marcas</button>
            </Link>
            <Link to='/TipoEquipo'>
                <button type='button' className="bot1">Tipo Equipo</button>
            </Link>
            <Link to='/EstadoEquipo'>
                <button type='button' className="bot1">Estado Equipo</button>
           
            </Link>
            <Link to='/GestorUsuarios'>
                <button type='button' className="bot3">Usuarios</button>
            </Link>
        </body>
    );
}
export default navegador;