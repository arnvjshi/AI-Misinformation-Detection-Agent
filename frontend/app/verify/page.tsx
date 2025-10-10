"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Spinner } from "@/components/ui/spinner"
import { postVerify } from "@/services/api"

type Result = {
  verdict: "True" | "False" | "Uncertain"
  confidence: number
  sources: { title: string; url: string }[]
  explanation: string
}

export default function VerifyPage() {
  const [text, setText] = useState("")
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<Result | null>(null)

  const canSubmit = text.trim().length > 0 || url.trim().length > 0

  const onSubmit = async () => {
    setLoading(true)
    setResult(null)
    try {
      const r = await postVerify({ text, url })
      setResult(r)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="text-2xl font-semibold">Claim Verification</h1>
        <p className="text-muted-foreground">Paste a claim or link to assess its accuracy with AI-backed guidance.</p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Enter Claim or URL</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type the claim text to verify..."
            aria-label="Claim text input"
          />
          <div className="text-center text-sm text-muted-foreground">or</div>
          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/article"
            aria-label="Claim URL input"
            inputMode="url"
          />
          <div className="flex justify-end">
            <Button onClick={onSubmit} disabled={!canSubmit || loading} aria-label="Verify Claim">
              {loading ? <Spinner className="mr-2 h-4 w-4" /> : null}
              Verify Claim
            </Button>
          </div>
        </CardContent>
      </Card>

      {loading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-md border bg-card p-4 text-sm text-muted-foreground"
        >
          Running analysis… This may take a few seconds.
        </motion.div>
      ) : null}

      {result ? (
        <motion.section
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 gap-4 md:grid-cols-5"
        >
          <Card className="md:col-span-3">
            <CardHeader>
              <CardTitle>Verdict & Confidence</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Badge variant={badgeVariant(result.verdict)}>{result.verdict}</Badge>
                <span className="text-sm text-muted-foreground">Confidence: {Math.round(result.confidence)}%</span>
              </div>
              <Progress value={result.confidence} aria-label="Confidence score" />
              <p className="text-sm text-muted-foreground">{result.explanation}</p>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Supporting Sources</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              {result.sources.map((s) => (
                <a
                  key={s.url}
                  className="text-sm underline underline-offset-4 hover:text-primary"
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {s.title}
                </a>
              ))}
            </CardContent>
          </Card>
        </motion.section>
      ) : null}
    </div>
  )
}

function badgeVariant(verdict: Result["verdict"]): "secondary" | "destructive" | "outline" {
  if (verdict === "True") return "secondary"
  if (verdict === "False") return "destructive"
  return "outline"
}
