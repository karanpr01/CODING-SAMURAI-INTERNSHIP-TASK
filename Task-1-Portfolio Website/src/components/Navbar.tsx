import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from "@/Hooks/useTheme"


const Navbar = () => {

 const { theme, toggleTheme } = useTheme()

    const [mounted, setMounted] = useState(false)

    useEffect(() => setMounted(true),[])

    if(!mounted) return null


  return (
    <header className='sticky top-0 z-50 w-full border-b bg-bacground/80 backdrop-blur'>
        <div className='container flex h-14 items-center justify-between'>
            <div className='text-xl font-bold mx-10'>
                Prem Karn
            </div>

            {/* <nav className='hidden md:flex space-x-6 text-sm font-medium'>
                <a 
                href="#about"
                className='hover:text-blue-500 transition'
                >About</a>
                <a href="#projects"
                 className='hover:text-blue-500 transition'
                >Porjects</a>
                <a href="#contact"
                 className='hover:text-blue-500 transition'
                >Contact</a>
            </nav> */}

            <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            >
                {theme === "light" ? <Moon className='h-5 w-5'/> : <Sun className='h-5 w-5'/>}
            </Button>
        </div>
    </header>
  )
}

export default Navbar