"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"

const ARTICLES = [
  {
    title: "How to Identify Fake News",
    simple: "Check who wrote it, look for sources, and compare with trusted sites.",
    full: "Examine the source credibility, author expertise, and publication date. Cross-verify claims with reputable outlets and look for consensus.",
  },
  {
    title: "Common Misinformation Patterns",
    simple: "Watch for shocking headlines, low evidence, and emotional tricks.",
    full: "Look for clickbait framing, cherry-picked data, and emotionally manipulative narratives designed to bypass critical thinking.",
  },
  {
    title: "Crisis-Specific Myths",
    simple: "During crises, rumors spread fast—verify before sharing.",
    full: "In fast-moving crises, rumors often outpace facts. Prioritize verified sources and delay sharing until evidence emerges.",
  },
]

export default function LearnPage() {
  const [simpleMode, setSimpleMode] = useState(true)

  return (
    <div className="flex flex-col gap-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Educational Hub</h1>
          <p className="text-muted-foreground">Resources to build resilient information habits.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Simple Language</span>
          <Switch checked={simpleMode} onCheckedChange={setSimpleMode} aria-label="Toggle simple language" />
        </div>
      </header>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {ARTICLES.map((a, i) => (
          <motion.div
            key={a.title}
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle>{a.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{simpleMode ? a.simple : a.full}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </section>
    </div>
  )
}
