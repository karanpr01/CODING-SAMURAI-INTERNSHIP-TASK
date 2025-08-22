import { Github, Linkedin, Mail } from "lucide-react"

const Footer = () => {
    return (

        <div
            className="flex justify-center gap-6 mt-10"
        >
            <a
                href="mailto:karanprem01@gamil.com"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
                <Mail size={20} /> Email
            </a>

            <a
                href="https://www.linkedin.com/in/prem-karn-a8707b36a/"
                target="_blank"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
                <Linkedin size={20} /> LinkedIn
            </a>
            <a
                href="https://github.com/karanpr01?tab=overview&from=2024-11-01&to=2024-11-21"
                target="_blank"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
                <Github size={20} /> GitHub
            </a>
        </div>
    )
}

export default Footer