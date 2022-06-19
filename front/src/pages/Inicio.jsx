import tecnologia from '../media/tecnologia.jpg';
import ironman from '../media/ironman.jpg';
import monitor from '../media/monitor.jpg';
import tablet from '../media/tablet.jpg';
import laptop from '../media/laptop.jpg';
import { Link } from 'react-router-dom';
import '../styles/Inicio.css';
import { useEffect, useState } from 'react';
const googleClientId = '529039612548-f29tghvibg91buahr9dt0hlat7t6tkjo.apps.googleusercontent.com';

const loadGoogleScript = () => {

    (function () {
      const id = 'google-js';
      const src = 'https://apis.google.com/js/platform.js';
  
      const firstJs = document.getElementsByTagName('script')[0];
  
      if (document.getElementById(id)) { return; }
      const js = document.createElement('script');
      js.id = id;
      js.src = src;
      js.onload = window.onGoogleScriptLoad;
      firstJs.parentNode.insertBefore(js, firstJs);
    }());
  
  }

function Inicio(){

    const [gapi, setGapi] = useState();
    const [googleAuth, setGoogleAuth] = useState();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [imageUrl, setImageUrl] = useState();
  
    const onSuccess = (googleUser) => {
      debugger;
      console.log('result from google', googleUser);
      setIsLoggedIn(true);
      const profile = googleUser.getBasicProfile();
      setName(profile.getName());
      setEmail(profile.getEmail());
      setImageUrl(profile.getImageUrl());
    };
  
    const onFailure = () => {
      setIsLoggedIn(false);
    }
  
    const logOut = () => {
      (async () => {
        await googleAuth.signOut();
        setIsLoggedIn(false);
        renderSigninButton(gapi);
      })();
    };
  
    const renderSigninButton = (_gapi) => {
      _gapi.signin2.render('google-signin', {
        'scope': 'profile email',
        'width': 40,
        'height': 40,
        'longtitle': false,
        'theme': 'dark',
        'onsuccess': onSuccess,
        'onfailure': onFailure
      });
    }
  
  
    useEffect(() => {
      window.onGoogleScriptLoad = () => {
  
        const _gapi = window.gapi;
        setGapi(_gapi);
  
        _gapi.load('auth2', () => {
          (async () => {
            const _googleAuth = await _gapi.auth2.init({
              client_id: googleClientId
            });
            setGoogleAuth(_googleAuth);
            renderSigninButton(_gapi);
          })();
        });
      }
  
      loadGoogleScript();
  
    }, []);    

return(
    <>   
   
     <body className="body2">
        <header>
        
        <div className="nombre">Innovation</div>
        <div className="encabezado">
        <div className="google">
            {!isLoggedIn &&
                <div id="google-signin"></div>
            }
            {isLoggedIn &&
                <div>
                    {/* <div className="imgP">
                        <img src={imageUrl} />
                    </div> */}
                    <div>{name}</div>
                    {/* <div>{email}</div> */}
                    {/* <button className='btn-primary' onClick={logOut}>Salir</button> */}
                </div>
            }
        </div>
            <nav>
                <ul> 
                    
                     <Link to='/Navegador' className="lin">
                        <li><a href="#">Navegador</a></li>
                    </Link>
                
                    {/*<li><a href="#">Registrarse</a></li> */}
                    
                    <li><a href="#">Inicio</a></li>
                </ul>
            </nav>
        </div>
    </header>
   
            <div className="titulo">
                <h1>
                    Bienvenidos
                </h1>
            </div>
            <div className="slider">
                <ul>
                    <li><img src={ironman} alt=""/></li>
                    <li><img src={tecnologia} alt=""/></li>
                    <li><img src={monitor} alt=""/></li>
                    <li><img src={tablet} alt=""/></li>
                    <li><img src={laptop} alt=""/></li>
                </ul>
            </div>
            <div className="usuario">
            {isLoggedIn &&
                <div>
                    <div className="imgP">
                        <img src={imageUrl}/>
                    </div>
                    {/* <div>{name}</div> */}
                    <div className="mail">{email}</div>
                    <button type="button" onClick={logOut} className="btnSal">Salir</button>
                </div>
            }
            </div>
            
        </body></>
);

}
 
export default Inicio;