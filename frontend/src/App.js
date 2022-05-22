import './App.css';

import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';

import Admin from './pages/Admin.js';
import Camarero from './pages/camarero.js';
import Carta from './pages/carta.js';
import Cocinero from './pages/cocinero.js';
import Comanda from './pages/comanda.js';
import Entrada from './pages/entrada.js';
import Login from './pages/login.js';
import VerComanda from './pages/verComanda.js';
import NuevoIngrediente from './pages/nuevoIngrediente';
import NuevoPlato from './pages/nuevoPlato';
import NuevoUser from './pages/nuevoUser';

function App() {
  return (
    <Router>
      <div>
        <Routes>
            
            <Route path="/" element={<Entrada/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/:user/camarero" element={<Camarero/>}/>
            <Route path="/:user/carta" element={<Carta/>}/>
            <Route path="/:user/comanda/:mesa" element={<Comanda/>}/>
            <Route path="/:user/verComanda/:mesa" element={<VerComanda/>}/>
            <Route path="/:user/cocinero" element={<Cocinero/>}/>
            <Route path="/:user/admin" element={<Admin/>}/>
            <Route path="/user/admin/nuevoIngrediente" element={<NuevoIngrediente/>}/>
            <Route path="/user/admin/nuevoPlato" element={<NuevoPlato/>}/>
            <Route path="/user/admin/nuevoUser" element={<NuevoUser/>}/>

        </Routes>
      </div>
    </Router>
  );
}          

export default App;