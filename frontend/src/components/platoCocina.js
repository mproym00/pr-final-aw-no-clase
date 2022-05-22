import * as React from 'react';
import { useState } from 'react';

import { Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import styles from './card.module.css';
import Component from './platoComanda';

export default function Mesa(argumentos) {
    const [primeros, setPrimeros] = useState([]);
    const [segundos, setSegundos] = useState([]);
    const [postres, setPostres] = useState([]);

    function verComanda(color){


    }

    return (        
        <Card
            sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: argumentos.color}}
        >
            <CardContent sx={{ flexGrow: 1 }}> 
                <Typography className={styles.NMesa}>PRIMEROS {argumentos.mesa} </Typography>
                    <Component/>
                <Typography className={styles.NMesa}>SEGUNDOS: {argumentos.comensales} </Typography>
                <Typography className={styles.NMesa}>POSTRES: {argumentos.comensales} </Typography>
            </CardContent>
            <CardActions className={styles.botones}>


            </CardActions>
        </Card>
    );
  }