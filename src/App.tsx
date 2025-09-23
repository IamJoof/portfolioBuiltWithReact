// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'
import About from './components/About'
import Education from './components/Education'
import Projects from './components/Projects'
import TechStack from './components/TechStack'
import Contact from './components/Contact'

function App() {

  return (
    <>
            <Header firstName="John Fred" lastName="Macapaz" />
            <About />
            <Education />
            <Projects />
            <TechStack />
            <Contact />
    </>
  )
}

export default App
