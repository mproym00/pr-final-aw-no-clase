import * as React from 'react';

import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import { createTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

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
export default function Login() {
var navigate = useNavigate();

return(
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
           ADMINISTRADOR
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
             Nuevo Usuario
            </Button>
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={()=>navigate("/")}
            >
              Nuevo Plato
            </Button>
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={()=>navigate("/")}
            >
              Nuevo Ingrediente
            </Button>


</main>

)}