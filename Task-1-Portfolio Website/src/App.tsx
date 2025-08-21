import About from './components/About'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Projects from './components/Project'

const App = () => {
  return (
     <div className="min-h-screen bg-background text-foreground">
      <Navbar/>
      <Hero/>
      <About/>
      <Projects/>
    </div>
  )
}

export default App