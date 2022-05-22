import `./App.css`;

import {
  BrowserRouter as Router,
  Route,
  Routes,
} from `react-router-dom`;

import Admin from `./pages/Admin.js`;
import Camarero from `./pages/camarero.js`;
import Carta from `./pages/carta.js`;
import Cocinero from `./pages/cocinero.js`;
import Comanda from `./pages/comanda.js`;
import Entrada from `./pages/entrada.js`;
import Login from `./pages/login.js`;
import VerComanda from `./pages/verComanda.js`;
import NuevoIngrediente from `./pages/nuevoIngrediente`;
import NuevoPlato from `./pages/nuevoPlato`;
import NuevoUser from `./pages/nuevoUser`;

function App() {
  return (
    <Router>
      <div>
        <Routes>
            
            <Route path="/api" element={<Entrada/>}/>
            <Route path="/api/login" element={<Login/>}/>
            <Route path="/api/:user/camarero" element={<Camarero/>}/>
            <Route path="/api/:user/carta" element={<Carta/>}/>
            <Route path="/api/:user/comanda/:mesa" element={<Comanda/>}/>
            <Route path="/api/:user/verComanda/:mesa" element={<VerComanda/>}/>
            <Route path="/api/:user/cocinero" element={<Cocinero/>}/>
            <Route path="/api/:user/admin" element={<Admin/>}/>
            <Route path="/api/user/admin/nuevoIngrediente" element={<NuevoIngrediente/>}/>
            <Route path="/api/user/admin/nuevoPlato" element={<NuevoPlato/>}/>
            <Route path="/api/user/admin/nuevoUser" element={<NuevoUser/>}/>

        </Routes>
      </div>
    </Router>
  );
}          

export default App;