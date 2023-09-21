import logo from './logo.svg'
import './App.css'
import Nav from './Components/ResponsiveBar'
import { ChakraProvider, ColorModeScript, extendTheme } from '@chakra-ui/react'
import Footer from './Components/Footer'
import ShowList from './Components/ShowList'
const theme = extendTheme({
  config: {
    initialColorMode: 'light' // or 'dark'
  }
})
function App () {
  return (
    <ChakraProvider>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Nav />
      <ShowList />
      <Footer />
    </ChakraProvider>
  )
}

export default App
