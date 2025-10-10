"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ShieldAlert, Brain, Search, BarChart3 } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex flex-col gap-10">
      <section className="flex flex-col items-center text-center gap-6">
        <motion.h1
          className="text-pretty text-4xl font-semibold tracking-tight md:text-5xl"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          Detect, Verify, and Educate — Stay Ahead of Misinformation.
        </motion.h1>
        <motion.p
          className="text-pretty text-muted-foreground md:text-lg"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          An AI-powered agent to help you monitor crises, assess claims, and learn how to spot false narratives.
        </motion.p>
        <motion.div
          className="flex flex-wrap items-center justify-center gap-3"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
        >
          <Button asChild>
            <Link href="/dashboard" aria-label="Analyze Live Data">
              Analyze Live Data
            </Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/dashboard" aria-label="View Recent Misinformation Trends">
              View Recent Trends
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/about" aria-label="About Project">
              About Project
            </Link>
          </Button>
        </motion.div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {FEATURES.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.35 }}
          >
            <Card className="h-full">
              <CardContent className="p-5 flex flex-col gap-3">
                <f.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                <h3 className="text-lg font-medium">{f.title}</h3>
                <p className="text-muted-foreground">{f.desc}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </section>
    </div>
  )
}

const FEATURES = [
  {
    title: "Live Monitoring",
    desc: "Track misinformation volume across platforms and time windows.",
    icon: Search,
  },
  {
    title: "AI Detection",
    desc: "Get instant likelihood scores and interpretability hints.",
    icon: Brain,
  },
  {
    title: "Safer Decisions",
    desc: "Learn best practices to evaluate sources and claims.",
    icon: ShieldAlert,
  },
  {
    title: "Trends & Stats",
    desc: "Visualize spikes and detect coordinated campaigns.",
    icon: BarChart3,
  },
]
