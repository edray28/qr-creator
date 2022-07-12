import './App.css';
import React from "react";
import { Box, Typography, CssBaseline, Button, Input } from '@mui/material';
import { Container } from '@mui/system';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import QrCodeIcon from '@mui/icons-material/QrCode';
import QrCode2Icon from '@mui/icons-material/QrCode2';

export default function App() {

  /*QR Generator */
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

  /*QR Upload and Scan */
  const uploadQR = (e) => {
    e.preventDefault();
    const form = document.querySelector("form");
    const title = document.querySelector("h3")
    // The Reader Text
    const QRtext = form.querySelector("p")
    
    function fetchRequest(formData) {
      title.innerText = "Scanning QR...";
      fetch("https://api.qrserver.com/v1/read-qr-code/",{
        method: "POST", body: formData
      }).then(res => res.json()).then(result => {
        result = result[0].symbol[0].data;
        QRtext.textContent = result;

        //Condition to Check whether QR Scan has no text or invalid QR scan
        if (QRtext.textContent === "") {
          QRtext.textContent = "Invalid QR Code, Please Try a Valid QR"
        }

        setTimeout(() => {
          title.innerText = "QR Code Generator";
        }, 1000);
      }).catch(err => {
        title.textContent = `API ERROR! Status: ${err}`;
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
            {/*QR Image Upload and Text Decode */}
          <form action='#'>
            <label htmlFor="contained-button-file">
              <Input accept="image/*" id="uploadQR" type="file" onChange={uploadQR}  />
            </label>
            <Typography component="p" align='justify'>Upload QR Code to Scan </Typography>
          </form>
          </Box>
        </Box>

        {/*QR Image Holder */}
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: "center",
          marginTop: 8
        }}>
          <img alt='' src={""} />
        </Box>

        {/*QR Github Link Page */}
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: "center",
          marginTop: 20}}>
        <a href="https://github.com/edray28/qr-creator" 
        ><img
          src="https://icons.iconarchive.com/icons/papirus-team/papirus-apps/256/github-icon.png"
          alt="github page"
          style={{width: 50}}
      /></a>
        </Box>
      </Container>
    </ThemeProvider>
  )
}