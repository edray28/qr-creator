import './App.css';
import React from "react";
import { Box, Typography, CssBaseline, Button, Input } from '@mui/material';
import { Container } from '@mui/system';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import QrCodeIcon from '@mui/icons-material/QrCode';
import QrCode2Icon from '@mui/icons-material/QrCode2';

export default function App() {
  const generateQR = () => {
    const QRimg = {
      "data": "dev.to"
    }
    const input = document.querySelector("Input")
    if (input.value) {
      const img = document.querySelector("img");
      QRimg.data = input.value || "dev.to";
      let parameters = `size=400x400&data=${QRimg.data}`;
      img.src = `https://api.qrserver.com/v1/create-qr-code/?${parameters}`
    } else {
      alert("Please Enter a Text")
    }
  }

  const uploadQR = (e) => {
    const form = document.querySelector("form");
    const QRtext = form.querySelector("p")

    function fetchRequest(formData) {
      QRtext.innerText = "Scanning QR...";
      fetch("http://api.qrserver.com/v1/read-qr-code/",{
        method: "POST", body: formData
      }).then(res => res.json()).then(result => {
        result = result[0].symbol[0].data;
        QRtext.innerText = result;
      }) 
    }
    let file = e.target.files[0];
    let formData = new FormData();
    formData.append("file",file);
    fetchRequest(formData);
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
          <QrCode2Icon/> 
          <Typography variant='h3'>QR Code Generator </ Typography >
          <QrCode2Icon/> 
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
          justifyContent: "space-between",
          marginTop: 2
        }}>
          <Button variant="contained" color="primary" size='large' startIcon={<QrCodeIcon />} onClick={generateQR}>Create QR</Button>
          <Box sx={{
            width: 300
          }}>
          <form action='#'>
            <label htmlFor="contained-button-file">
              <Input accept="image/*" id="uploadQR" type="file" onChange={uploadQR}  />
            </label>
            <Typography component="p">Upload QR Code to Scan</Typography>
          </form>
          </Box>
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


