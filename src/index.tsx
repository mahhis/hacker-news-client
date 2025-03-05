import 'index.css'
import { ThemeProvider, createTheme } from '@mui/material'
import { render } from 'preact'
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
})

render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById('root') as Element
)