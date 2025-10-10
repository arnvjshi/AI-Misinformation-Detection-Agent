import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-6">
      <section className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">About the Project</h1>
        <p className="text-muted-foreground">
          This project explores AI-assisted detection and explanation of misinformation during global and local crises.
          It provides live monitoring, claim verification, and an educational hub to help users evaluate information.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Purpose</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Empower users to make informed decisions by detecting and contextualizing misleading content.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Team</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Multidisciplinary contributors in data science, journalism, and design.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Tools & Datasets</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Next.js, Tailwind, shadcn/ui, Recharts, and curated fact-check sources for evaluation.
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Contact Us (Optional)</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <Input placeholder="Your name" aria-label="Your name" />
            <Input type="email" placeholder="Your email" aria-label="Your email" inputMode="email" />
          </div>
          <Textarea placeholder="Your message" aria-label="Your message" />
          <div className="flex justify-end">
            <Button type="button" aria-label="Send message (placeholder)">
              Send
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
