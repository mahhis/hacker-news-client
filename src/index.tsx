import 'index.css'
import { ThemeProvider, createTheme } from '@mui/material'
import { render } from 'preact'
import CssBaseline from "@material-ui/core/CssBaseline";
import App from 'App'

const theme = createTheme({
    palette: {
        primary: {
          main:'#ff3d00',
        },
        secondary: {
          main: '#ff3d00',
        },  
      },
  typography: {
    // fontFamily: ['Rowdies'].join(','),
    // h1: {
    //   fontSize: '3rem',
    //   fontWeight: 900, // Increase font weight for h1
    //   color: '#000', // Black color
    // },
    // h2: {
    //   fontSize: '1.75rem',
    //   fontWeight: 900, // Increase font weight for h1
    //   color: '#000', // Black color
    // },
    // h3: {
    //   fontSize: '1.5rem',
    //   fontWeight: 900, // Increase font weight for h1
    //   color: '#000', // Black color
    // },
  },
})

render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById('root') as Element
)