"use client"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Props = {
  onPlatformChange?: (p: string) => void
  onConfidenceChange?: (v: number) => void
}

export function FiltersBar({ onPlatformChange, onConfidenceChange }: Props) {
  const [platform, setPlatform] = useState<string>("all")
  const [confidence, setConfidence] = useState<number>(0)

  return (
    <div className="rounded-md border bg-card p-4">
      <div className="grid grid-cols-1 items-end gap-4 md:grid-cols-3">
        <div className="flex flex-col gap-2">
          <Label htmlFor="platform">Platform</Label>
          <Select
            value={platform}
            onValueChange={(v) => {
              setPlatform(v)
              onPlatformChange?.(v)
            }}
          >
            <SelectTrigger id="platform" aria-label="Select platform">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="twitter">Twitter</SelectItem>
              <SelectItem value="reddit">Reddit</SelectItem>
              <SelectItem value="news">News</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2 md:col-span-2">
          <Label htmlFor="confidence">Min Confidence: {confidence}%</Label>
          <Slider
            id="confidence"
            value={[confidence]}
            onValueChange={(v) => {
              const next = v?.[0] ?? 0
              setConfidence(next)
              onConfidenceChange?.(next)
            }}
            min={0}
            max={100}
            step={5}
            aria-label="Minimum confidence slider"
          />
        </div>
      </div>
    </div>
  )
}
