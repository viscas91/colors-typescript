import { createTheme } from '@mui/material'

const color1 = '#1F2041';
const color2 = '#417B5A';

export default createTheme({
  palette: {
    primary: {
      main: color1,
    },
    secondary: {
      main: color2,
    },
  },
  typography: {
    h2: {
      fontFamily: 'Raleway',
      fontWeight: 700,
      fontSize: '2.5rem',
      color: color1,
      lineHeight: 1.5,
    },
    h3: {
      fontFamily: 'Pacifico',
      fontSize: '2.5rem',
      color: color1,
    },
    h4: {
      fontFamily: 'Raleway',
      fontSize: '1.75rem',
      color: color1,
      fontWeight: 700,
    },
    
    caption: {
      fontSize: '1rem',
      fontWeight: 300,
      color: color1,
    }
  },
})
