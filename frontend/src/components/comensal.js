import * as React from 'react';
import {
  useEffect,
  useState,
} from 'react';

import axios from 'axios';

import Autocomplete from '@mui/material/Autocomplete';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CheckBox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';

import m from '../fotos/EsperandoMini.png';

export default function Mesa(argumentos) {
    const [primeros, setPrimeros]=useState([]);
    const [primerosCompletos, setPrimerosCompletos]=useState([]);
    const [seleccionPrimero, setSeleccionPrimero]=useState();

    const [segundos, setSegundos]=useState([]);
    const [seleccionSegundo, setSeleccionSegundo]=useState();

    const [postres, setPostres]=useState([]);
    const [seleccionPostre, setSeleccionPostre]=useState();

    const [bebidas, setBebidas]=useState([]);
    const [seleccionBebida, setSeleccionBebida]=useState();

    useEffect(() => {
        cargarPlatos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function cargarPlatos(){
        axios.get(`http://localhost:3053/platos/primeros`, {}).then((response) => {
            var lista = [];
            var listaCompleta = [];
            response.data.forEach(element => {
                lista.push(element.nombre);
                listaCompleta.push(element);
            });
            setPrimeros(lista);
            setPrimerosCompletos(listaCompleta);
        });

        axios.get(`http://localhost:3053/platos/segundos`, {}).then((response) => {
            var lista = [];
            response.data.forEach(element => {
                lista.push(element.nombre);
            });
            setSegundos(lista);
        });

        axios.get(`http://localhost:3053/platos/postres`, {}).then((response) => {
            var lista = [];
            response.data.forEach(element => {
                lista.push(element.nombre);
            });
            setPostres(lista);
        });

        axios.get(`http://localhost:3053/platos/bebidas`, {}).then((response) => {
            var lista = [];
            response.data.forEach(element => {
                lista.push(element.nombre);
            });
            setBebidas(lista);
        });
    }

    const primerPlato = (plato) => {
        primerosCompletos.forEach(element => {
            if(element.nombre === plato){
                argumentos.primero(argumentos.posicion, element._id);
            }
        })
    }

    const segundoPlato = (plato) => {
        primerosCompletos.forEach(element => {
            if(element.nombre === plato){
                argumentos.segundo(argumentos.posicion, element._id);
            }
        })
    }

    const postrePlato = (plato) => {
        primerosCompletos.forEach(element => {
            if(element.nombre === plato){
                argumentos.postre(argumentos.posicion, element._id);
            }
        })
    }

    const bebidaElegida = (plato) => {
        primerosCompletos.forEach(element => {
            if(element.nombre === plato){
                argumentos.bebida(argumentos.posicion, element._id);
            }
        })
    }

    

    return (        
    <Card
        sx={{height: '100%', display: 'flex', flexDirection: 'column'}}
    >
        <CardContent sx={{ flexGrow: 1 }} > 
            <Container
                direction="column"
                alignItems="center"
                justifyContent="center"
            >
            {<img src={m} alt="Mesa"  />}
            <Autocomplete
                fullWidth
                options={primeros}
                autoHighlight
                value={seleccionPrimero}
                inputValue={seleccionPrimero}
                onChange={(event, primero) => {
                    setSeleccionPrimero(primero);
                    primerPlato(primero);
                }}
                renderInput={(params) => <TextField {...params} label="Primero"/>}
            />

            <Autocomplete
                fullWidth
                options={segundos}
                value={seleccionSegundo}
                inputValue={seleccionSegundo}
                onChange={(event, segundo) => {
                    setSeleccionSegundo(segundo);
                    segundoPlato(segundo);
                }}
                renderInput={(params) => <TextField {...params} label="Segundo"/>}
            />

            <Autocomplete
                fullWidth
                options={postres}
                value={seleccionPostre}
                inputValue={seleccionPostre}
                onChange={(event, postre) => {
                    setSeleccionPostre(postre);
                    postrePlato(postre);
                }}
                renderInput={(params) => <TextField {...params} label="Postre"/>}
            />

            <FormControlLabel control={<CheckBox />} label="Pan"/>

            <Autocomplete
                fullWidth
                options={bebidas}
                value={seleccionBebida}
                inputValue={seleccionBebida}
                onChange={(event, bebida) => {
                    setSeleccionBebida(bebida);
                    bebidaElegida(bebida);
                }}
                renderInput={(params) => <TextField {...params} label="Bebida"/>}
            />

            <TextField
                name="intolerancias"
                label="intolerancias"
                type="text"
                id="intolerancias"
            />

            <TextField
              fullWidth
              name="aclaraciones"
              label="Aclaraciones"
              type="text"
              id="aclaraciones"
            />

            </Container>

            
        </CardContent>
    </Card>


    );
  }