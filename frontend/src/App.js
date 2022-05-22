import './App.css';

import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';

import Camarero from './pages/camarero.js';
import Carta from './pages/carta.js';
import Comanda from './pages/comanda.js';
import Entrada from './pages/entrada.js';
import Login from './pages/login.js';
import VerComanda from './pages/verComanda.js';

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
        </Routes>
      </div>
    </Router>
  );
}          

export default App;