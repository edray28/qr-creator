import './App.css';
import React from "react";
import { Box, Typography, CssBaseline, Button, Input } from '@mui/material';
import { Container } from '@mui/system';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import QrCodeIcon from '@mui/icons-material/QrCode';


export default function App() {
  const generateQR = () => {
    const QRimg = {
      "backgroundColor": "38-38-38",
      "qrColor": "255-255-255",
      "padding": 1,
      "data": "dev.to"
    }
    const input = document.querySelector("Input")
    if (input.value) {
      const img = document.querySelector("img");
      QRimg.data = input.value || "dev.to";
      let parameters = `size=400x400&data=${QRimg.data}&bgcolor=${QRimg.backgroundColor}&color=${QRimg.qrColor}&qzone=${QRimg.padding}`;
      img.src = `https://api.qrserver.com/v1/create-qr-code/?${parameters}`
    } else {
      alert("Please Enter a Text")
    }

  }
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  })
  return (
    <ThemeProvider theme={darkTheme}>
      <Container maxWidth="sm">
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 8
        }} >
          <CssBaseline />
          <Typography variant='h3'  >QR Code Generator </ Typography >
        </Box>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 2
        }}>
          <Input id='outlined-basic' placeholder="Enter Text" variant="outlined" fullWidth color='secondary' required />
        </Box>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: "space-around",
          marginTop: 2
        }}>
          <Button variant="contained" color="primary" size='large' startIcon={<QrCodeIcon />} onClick={generateQR}>Create QR</Button>
        </Box>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: "center",
          marginTop: 8
        }}>
          <img alt='' src={""} />
        </Box>
      </Container>
    </ThemeProvider>
  )
}


