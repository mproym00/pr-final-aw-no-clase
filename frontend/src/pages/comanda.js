import * as React from `react`;
import { useState } from `react`;

import axios from `axios`;
import { useNavigate } from `react-router-dom`;

import BoyIcon from `@mui/icons-material/Boy`;
import AppBar from `@mui/material/AppBar`;
import Autocomplete from `@mui/material/Autocomplete`;
import Box from `@mui/material/Box`;
import Button from `@mui/material/Button`;
import Container from `@mui/material/Container`;
import CssBaseline from `@mui/material/CssBaseline`;
import Grid from `@mui/material/Grid`;
import Link from `@mui/material/Link`;
import {
  createTheme,
  ThemeProvider,
} from `@mui/material/styles`;
import TextField from `@mui/material/TextField`;
import Toolbar from `@mui/material/Toolbar`;
import Typography from `@mui/material/Typography`;

import Component from `../components/comensal`;

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {`Copyright © `}
            <Link color="inherit" href="https://mui.com/">
                www.grupoInnova6d.com
            </Link>{` `}
            {new Date().getFullYear()}
            {`.`}
        </Typography>
    );
}

const theme = createTheme();

export default function Comanda() {

    const navigate = useNavigate();
    const camarero = sessionStorage.getItem(`usuario`);

    const mesa = sessionStorage.getItem("mesa");

    const personas = ["1", "2", "3", "4", "5", "6"];

    const [numeroPersonas, setNumeroPersonas]=useState();
    const [cardComensales, setCardComensales]=useState([]);
    const [primeros, setPrimero]=useState([]);
    const [segundos, setSegundo]=useState([]);
    const [postres, setPostres]=useState([]);
    const [bebidas, setBebida]=useState([]);

    async function subeComanda(){
        //tipo de mesa
        var mesaOcupada;
        
        await axios.put(`/api/${camarero}/mesas/${mesa}`, {
        }).then(response => {
            if(response.status===200){
                mesaOcupada = response.data[0];
            }else{
                alert("Mesa no encontrada");
            }
        })

        await axios.put(`/api/${camarero}/comandas/nueva`, {
            primeros: primeros,
            segundos: segundos,
            postres: postres,
            bebidas: bebidas,
            mesa: mesaOcupada
        }).then((response) => {
            sessionStorage.removeItem("mesa");
            navigate(`/api/${camarero}/camarero/`);
        });
    }   

    function comensales(numero){
        var gente  = [];
        for(var i=0; i<numero; i++){
          gente.push(i+1);
          primeros.push(null);
        }
        setCardComensales(gente);
    }

    function primero(index, plato){
        var primerosPlatos = primeros;
        primerosPlatos[index] = plato;
        setPrimero(primerosPlatos);
    }

    function segundo(index, plato){
        var segundosPlatos = segundos;
        segundosPlatos[index] = plato;
        setSegundo(segundosPlatos);
    }

    function postre(index, plato){
        var postresPlatos = postres;
        postresPlatos[index] = plato;
        setPostres(postresPlatos);
    }

    function bebida(index, plato){
        var bebidasElegidas = bebidas;
        bebidasElegidas[index] = plato;
        setBebida(bebidasElegidas);
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar position="relative">
                <Toolbar>
                    <BoyIcon sx={{ mr: 2 }} />
                    <Typography variant="h6" color="inherit" noWrap>
                        Camarero que le atiende: {camarero}
                    </Typography>
                </Toolbar>
            </AppBar>
          <main>
              <Box sx={{bgcolor: `background.paper`, pt: 8, pb: 6}}>
                  <Container maxWidth="md">
                      <Typography
                          component="h1"
                          variant="h2"
                          align="center"
                          color="text.primary"
                          gutterBottom
                      >
                          COMANDA MESA {mesa}
                      </Typography>
                      <Box component="form" /*onSubmit={handleSubmit}*/ noValidate sx={{ mt: 1 }}>
                          <Autocomplete
                              options={personas}
                              autoHighlight
                              style={{ width: 300 }}
                              value={numeroPersonas}
                              inputValue={numeroPersonas}
                              onChange={(event, newInputValue) => {
                                  setNumeroPersonas(newInputValue);
                                  comensales(newInputValue);
                              }}
                              renderInput={(params) => <TextField {...params} label="Comensales"/>}
                          />
                    
                          <Container sx={{ py: 8, bgcolor: `cyan` }} maxWidth="md">
                              <Grid container spacing={4}>
                                    {cardComensales.map((card, index) => (
                                        <Grid item key={index} xs={12} sm={6} md={6}>
                                                
                                            <Component
                                                primero={primero}
                                                segundo={segundo}
                                                postre={postre}
                                                bebida={bebida}
                                                posicion={index}
                                            />
                                        </Grid>
                                ))}
                              </Grid>
                          </Container>

                
                          <Button
                              type="button"
                              fullWidth
                              variant="contained"
                              sx={{ mt: 3, mb: 2 }}
                              onClick={() => {
                                subeComanda();
                            }} 
                          >
                              Terminar Comanda
                          </Button>
                      </Box>
                  </Container>
              </Box>
            
          </main>
          <Box sx={{ bgcolor: `background.paper`, p: 6 }} component="footer">
              <Typography variant="h6" align="center" gutterBottom>
              </Typography>
              <Typography
                  variant="subtitle1"
                  align="center"
                  color="text.secondary"
                  component="p"
              >
                  Todos los derechos reservados
              </Typography>
              <Copyright />
          </Box>

        </ThemeProvider>
    );
}
