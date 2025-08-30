import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

const projects = [
  {
    title: "DevDocs",
    image: "/Projects/devdocs-pk.png",
    tags: ["HTML", "CSS","JS"],
    live: "https://devdocs-pk.netlify.app/",
    github: "https://github.com/karanpr01/DevDocs-pk",
  },

  {
    title: "Recipe Page",
    image: "/Projects/recipe-page-main-pk.png",
    tags: ["HTML", "CSS","Frontend Mentor"],
    live: "https://recipe-page-main-pk.netlify.app/",
    github: "https://github.com/karanpr01/Recipe-page",
  },

  {
    title: "Blog Perview card",
    image: "/Projects/blog-preview-card.png",
    tags: ["HTML", "CSS", "Frontend Mentor"],
    live: "https://blog-preview-card05.netlify.app/",
    github: "https://github.com/karanpr01/Blog-preview-card",
  },

  {
    title: "Product Card",
    image: "/Projects/productcard-pk.png",
    tags: ["HTML", "CSS","Frontend Mentor"],
    live: "https://productcard-pk.netlify.app/",
    github: "https://github.com/karanpr01/productcard",
  },

  {
    title: "DevFinder",
    image: "/Projects/devfinder-pk.png",
    tags: ["HTML", "CSS","JS"],
    live: "https://devfinder-pk.netlify.app/",
    github: "https://github.com/karanpr01/DevFinder",
  },

  {
    title: "Habit Pulse",
    image: "/Projects/habitpulse-pk.png",
    tags: ["HTML", "CSS","JS"],
    live: "https://habitpulse-pk.netlify.app/",
    github: "https://github.com/karanpr01/habitpluse-pk",
  },

  {
    title: "NewsNova",
    image: "/Projects/newsnova-pk.png",
    tags: ["HTML", "CSS","JS"],
    live: "https://newsnova-pk.netlify.app/",
    github: "https://github.com/karanpr01/newsnova",
  },

  {
    title: "React Quiz",
    image: "/Projects/Reactquiz.png",
    tags: ["React", "TailwindCSS"],
    live: "https://quizapp-pk.netlify.app/",
    github: "https://github.com/karanpr01/react-Quiz",
  },

  {
    title: "ToDo",
    image: "/Projects/react-todo-pk.png",
    tags: ["React", "TailwindCSS","Shadcn"],
    live: "https://react-todo-pk.netlify.app/",
    github: "https://github.com/karanpr01/React-Todo",
  }
]

const allTags = ["All", "HTML", "CSS", "JS", "React","Frontend Mentor"]

const Projects = () => {
  const [activeTag, setActiveTag] = useState("All")

  const filteredProjects =
    activeTag === "All"
      ? projects
      : projects.filter((p) => p.tags.includes(activeTag))

  return (
    <section id="projects" className="py-20 container px-20">
      <h2 className="text-3xl font-bold text-center mb-8">Projects</h2>

   
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

     
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.6 }}
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
