import * as React from 'react';

import { useState, useEffect } from 'react';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
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
import Component from '../components/Tarjeta'
import Button from '@mui/material/Button';


const theme = createTheme();

export default function Notes() {
    const correo = sessionStorage.getItem('correo');
    const [card, setCard] = useState([
        {
            title: "Nota 1",
            description: "Este es el texto de la nota"
        }
    ]);
    var signa;
    var tura;
    var lista;
    var axios=require('axios');
    var url = `/api/${correo}/notes`;
    useEffect(() =>{
      cargarOriginales();
    }, [correo]);

    function cargarOriginales(){
      axios.get(`${url}`, {}).then((response)=>{
        lista=response.data;
        setCard(lista);
      });
    }

    function borrar(index){
      var lista = getLista();
      axios.delete(`${url}/${lista[index].title}`, {}).then(response =>{
        lista=response.data;
        setCard(lista);
      });
    }

    function nueva(){
        signa = getPrompt('Título de la nota', 'Nota ejemplo');
        tura = getPrompt('Cuerpo del texto', 'Lo que necesite escribir');
        lista = getLista();
        if(signa==='Nota ejemplo' || tura==='Lo que necesite escribir'){
            alert('Falta una parte de la nota');
        }else{
            axios.post(url, {
              title: signa,
              description: tura
            }).then(response =>{
                lista=response.data;
                setCard(lista);
            });
        }
    }


    function getLista(){
        var auxiliar = card.filter((tarjeta, indice) => {
            return tarjeta;
        });
        return auxiliar;
    }


    function getPrompt(enunciado, dato){
        return prompt(enunciado, dato);
    }


    signa = 'hola';
    tura = 'esto es una prueba';
    function edit(index){
        signa = getPrompt('Título de la nota', card[index].title);
        tura = getPrompt('Cuerpo del texto', card[index].description);
        lista = getLista();
        axios.put(`${url}/${lista[index].title}`, {
          title: signa,
          description: tura
        }).then(response =>{
          lista=response.data;
          setCard(lista);
        });
    }
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Notas de {correo}
           </Typography>
        </Toolbar>
      </AppBar>
      <main>
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
              NOTAS
              <br/>
            <Button
                size="large"
                align='center'
                onClick={nueva}
                >
                Añadir Nota
            </Button>
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            {card.map((card, index) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Component
                    title={card.title}
                    description={card.description}
                    index={index}
                    borrar={borrar}
                    edit={edit}
                  />

              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}