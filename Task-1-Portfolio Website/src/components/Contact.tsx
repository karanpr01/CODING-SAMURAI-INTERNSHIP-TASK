import { useForm, ValidationError } from "@formspree/react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Github, Linkedin } from "lucide-react"

const Contact = () => {
  const [state, handleSubmit] = useForm("mqalrpvj") 

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Contact Me</h2>
        <p className="text-muted-foreground mb-10">
          Have a question, want to collaborate, or just say hi? Fill the form below or reach me via socials.
        </p>

        
        {state.succeeded ? (
          <p className="text-green-500 font-medium mb-6">
            🎉 Thanks for your message! I’ll get back to you soon.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4">
            <div>
              <Input id="email" type="email" name="email" placeholder="Your Email" required />
              <ValidationError prefix="Email" field="email" errors={state.errors} />
            </div>

            <div>
              <Textarea id="message" name="message" placeholder="Your Message" rows={4} required />
              <ValidationError prefix="Message" field="message" errors={state.errors} />
            </div>

            <Button type="submit" disabled={state.submitting} className="w-full">
              {state.submitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        )}

       
        <div className="flex justify-center gap-6 mt-10">
        

          <a
            href="https://www.linkedin.com/in/prem-karn-a8707b36a/"
            target="_blank"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <Linkedin size={20} /> LinkedIn
          </a>

          <a
            href="https://github.com/karanpr01"
            target="_blank"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <Github size={20} /> GitHub
          </a>
        </div>
      </div>
    </section>
  )
}

export default Contact
