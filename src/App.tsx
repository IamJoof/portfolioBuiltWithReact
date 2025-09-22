// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'
import About from './components/About'
import Education from './components/Education'

function App() {

  return (
    <>
            <Header firstName="John Fred" lastName="Macapaz" />
            <About />
            <Education />
    </>
  )
}

export default App
