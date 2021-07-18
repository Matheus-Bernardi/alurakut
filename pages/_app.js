import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { AlurakutStyles } from '../src/components/lib/AlurakutCommons';

const GlobalStyle = createGlobalStyle`
  /* Reset CSS */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    box-sizing: border-box;
    font-family: sans-serif;
    background-color: #B0E0E6;
    background-image: url("https://i.pinimg.com/originals/b4/63/8a/b4638aa66c9882cbb725d1adf0fed6b0.jpg");
    background-repeat: repeat;
    background-position: center top;
    background-size: cover;
    box-sizing: border-box;
  }

  #__next{
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }

  img{
    max-width: 100%;
    height: auto;
    display: block;
  }

  ${AlurakutStyles}
`

const theme = {
  colors: {
    primary: '#0070f3',
  },
}

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
