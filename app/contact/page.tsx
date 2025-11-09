import ContactForm from "@/components/contact-form-debug"

export default function ContactPage() {
  return (
    <section id="contact" className="py-20 bg-muted/30 min-h-screen flex items-center">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Contact <span className="text-primary">Me</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Have a project in mind or want to collaborate? I'd love to hear from you!
            </p>
          </div>
          
          <ContactForm />
        </div>
      </div>
    </section>
  )
}
