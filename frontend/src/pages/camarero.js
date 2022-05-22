import * as React from 'react';
import {
  useEffect,
  useState,
} from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import BoyIcon from '@mui/icons-material/Boy';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import {
  createTheme,
  ThemeProvider,
} from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import Component from '../components/mesa';

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
              www.grupoInnova6d.com
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
      </Typography>
  );
}

const theme = createTheme();

export default function Album() {
    const camarero = sessionStorage.getItem('usuario');
    const [cardMesas, setCard]=useState([]);

    var url = `http://localhost:3053/${camarero}/mesas`;

    var mesas;
    const navigate = useNavigate();

    useEffect(() => {
        cargarMesas(); 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const tipoUsuario = "camarero";
    function cargarMesas(){
        axios.post(`${url}`, {
            tipo: tipoUsuario
        }).then((response) => {
            mesas = response.data;
            setCard(mesas);
        });
    }

    function comanda(nMesa, accion){
        if(accion===1){
            tomarComanda(nMesa);
        }else{
            verComanda(nMesa);
        }
    }

    function tomarComanda(nMesa){
        sessionStorage.setItem("mesa", nMesa);
        navigate('/'+camarero+'/comanda/'+nMesa);
    }

    function verComanda(nMesa){
        sessionStorage.setItem("mesa", nMesa);
        navigate('/'+camarero+'/verComanda/'+nMesa);
    }

    function color(nMesa){
        if(cardMesas[nMesa].libre===true){
            return "green";
        }else{
            return "darkred";
        }
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

                <Button variant="contained" sx={{left: 80}}>Salir</Button>
              </Toolbar>
          </AppBar>
          <main>
              {/* Hero unit */}
              <Box
                  sx={{
                      bgcolor: 'background.paper',
                      pt: 8,
                      pb: 6,
                  }}
              >
                  <Container maxWidth="sm">
                      <Typography
                          component="h1"
                          variant="h2"
                          align="center"
                          color="text.primary"
                          gutterBottom
                      >
                          COMEDOR 1
                      </Typography>

                      <Stack
                          sx={{ pt: 4 }}
                          direction="colum"
                          spacing={2}
                          justifyContent="center"
                      >
                      </Stack>
                  </Container>
            </Box>
            <Container sx={{ py: 8, bgcolor: 'cyan' }} maxWidth="md">
                <Grid container spacing={4}>
                    {cardMesas.map((card, index) => (
                        <Grid item key={index} xs={12} sm={6} md={4}>
                            <Component
                                mesa={card.numero}
                                comensales={card.comensales}
                                index={index}
                                comanda={comanda}
                                color ={color(index)}

                            />
                        </Grid>
                    ))}
                </Grid>
            </Container>
          </main>
              {/* Footer */}
              <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
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
              {/* End footer */}
        </ThemeProvider>
    );
}