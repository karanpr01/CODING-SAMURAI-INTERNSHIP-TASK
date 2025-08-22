import { motion } from "motion/react"
import { Badge } from "./ui/badge"

const skills = [
    "React",
    "TypeScript",
    "HTML5",
    "CSS",
    "TailwinCSS",
    "Shadcn",
    "BootStrap",
    "Git",
    "GitHub"
]
const About = () => {
    return (
        <section
            id="about"
            className="py-20 container"
        >
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <h2
                    className="text-3xl font-bold text-center"
                >About Me</h2>

                <p
                    className="mt-6 text-center text-muted-foreground max-w-2xl mx-auto"
                >
                    I’m a passionate FrontEnd Developer specializing in React, TypeScript, and
                    modern UI libraries. I love building scalable web apps and solving
                    real-world problems through code
                </p>

                <div
                className="mt-8 flex flex-wrap justify-center gap-3"
                >
                    {skills.map((skill) => (
                        <Badge
                        key={skill}
                        variant="secondary"
                        className="text-base px-4 py-2">
                            {skill}
                        </Badge>
                    ))}
                </div>

            </motion.div>

        </section>
    )
}

export default About