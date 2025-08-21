import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

const projects = [
  {
    title: "QR Code Component",
    image: "/projects/qrcode.png",
    tags: ["HTML", "CSS"],
    live: "https://qrcodecardcompo.netlify.app/",
    github: "https://github.com/premkarn/qr-code-component",
  },
  {
    title: "Recipe Page",
    image: "/projects/recipe.png",
    tags: ["HTML", "CSS"],
    live: "https://recipe-page-main-pk.netlify.app/",
    github: "https://github.com/premkarn/recipe-page",
  },
  {
    title: "Calculator App",
    image: "/projects/calculator.png",
    tags: ["React", "JS"],
    live: "https://calculatorapp-pk.netlify.app/",
    github: "https://github.com/premkarn/calculator",
  },
  {
    title: "Tic Tac Toe",
    image: "/projects/tictactoe.png",
    tags: ["React", "JS"],
    live: "https://tictactoe-pk.netlify.app/",
    github: "https://github.com/premkarn/tic-tac-toe",
  },
]

const allTags = ["All", "HTML", "CSS", "JS", "React"]

const Projects = () => {
  const [activeTag, setActiveTag] = useState("All")

  const filteredProjects =
    activeTag === "All"
      ? projects
      : projects.filter((p) => p.tags.includes(activeTag))

  return (
    <section id="projects" className="py-20 container px-20">
      <h2 className="text-3xl font-bold text-center mb-8">Projects</h2>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        {allTags.map((tag) => (
          <Button
            key={tag}
            variant={activeTag === tag ? "default" : "outline"}
            onClick={() => setActiveTag(tag)}
          >
            {tag}
          </Button>
        ))}
      </div>

      {/* Project Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="border rounded-xl overflow-hidden shadow-md hover:shadow-lg bg-card"
          >
            <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{project.title}</h3>
              <div className="flex gap-2 mt-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-sm bg-muted px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex gap-4">
                <Button asChild>
                  <a href={project.live} target="_blank">Live Site</a>
                </Button>
                <Button variant="outline" asChild>
                  <a href={project.github} target="_blank">GitHub</a>
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Projects
