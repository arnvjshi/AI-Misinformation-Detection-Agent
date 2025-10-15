"use client"

import { Progress } from "@/components/ui/progress"

export function DetectionMeter({ score }: { score: number }) {
  const pct = Math.max(0, Math.min(score, 100))
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Avg Likelihood</span>
        <span>{pct}%</span>
      </div>
      <Progress value={pct} aria-label="Average misinformation likelihood" />
    </div>
  )
}
