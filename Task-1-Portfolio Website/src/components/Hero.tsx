import { motion } from "motion/react"
import avatar from "../assets/Avatar.jpg"
import { Button } from "./ui/button"

const Hero = () => {
  return (
    <section
    id="hero"
    className="flex flex-col md:flex-row items-center justify-evenly py-20 container"
    >
        <motion.div
        initial={{opacity: 0, x:-50}}
        animate={{opacity:1, x:0}}
        transition={{duration: 2}}
        className="w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-blue-500 shadow-lg" 
        >
            <img src={avatar} alt="prem karn avatar" className="w-full h-full object-cover" />

        </motion.div>

        <motion.div
        initial={{opacity:0 , x:50}}
        animate={{opacity:1 , x:0}}
        transition={{duration: 2}}
        className="mt-10 md:mt-0 md:ml-10 text-center md:text-left"
        >
            <h1
            className="text-4xl md:text-5xl font-bold"
            >Prem Karn</h1>

            <h2
            className="text-lg md:text-xl text-muted-foreground mt-2"
            >FrontEnd Developer | React + TypeScript Enthusiast
            </h2>

            <p
            className="mt-4 text-base md:text-lg max-w-lg text-muted-foreground"
            >
                I build Modern, User-Friendly, and Scalable Web Applications.
            </p>

            <div
            className="mt-6 flex gap-4 justify-center md:justify-start"
            >
                <Button asChild>
                    <a href="/PremKarn.pdf" download>Download Resume</a>
                </Button>

                <Button
                variant="outline"
                asChild
                >
                    <a href="#contact">Contact Me</a>
                </Button>

            </div>

        </motion.div>

    </section>
  )
}

export default Hero