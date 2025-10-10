"use client"

import { useState, useMemo } from "react"
import useSWR from "swr"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { TrendChart } from "@/components/trend-chart"
import { ContentItem } from "@/components/content-item"
import { DetectionMeter } from "@/components/detection-meter"
import { FiltersBar } from "@/components/filter-bar"
import { ListSkeleton, ChartSkeleton } from "@/components/loading-skeletons"
import { getStats, getTrends } from "@/services/api"
import { Search } from "lucide-react"

export default function DashboardPage() {
  const [query, setQuery] = useState("")
  const [platform, setPlatform] = useState<string>("all")
  const [confidence, setConfidence] = useState<number>(0)

  const { data: stats, isLoading: statsLoading } = useSWR(["stats"], () => getStats())
  const { data: trends, isLoading: trendsLoading } = useSWR(["trends", platform, confidence, query], () =>
    getTrends({ platform, minConfidence: confidence, query }),
  )

  const items = trends?.items || []

  const summary = useMemo(() => {
    if (!stats) return null
    return [
      { label: "Monitored Sources", value: stats.sources },
      { label: "Flagged Today", value: stats.flaggedToday },
      { label: "Total Reviews", value: stats.totalReviewed },
    ]
  }, [stats])

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-semibold">Live Monitoring Dashboard</h1>
        <div className="flex w-full max-w-xl items-center gap-2">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search topics, hashtags, or keywords (e.g., 'climate change')"
            aria-label="Search topics or hashtags"
          />
          <Button onClick={() => {}} aria-label="Search">
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <FiltersBar onPlatformChange={setPlatform} onConfidenceChange={setConfidence} />

      <section className="grid grid-cols-1 gap-4 md:grid-cols-5">
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Trend Visualization</CardTitle>
          </CardHeader>
          <CardContent>{statsLoading ? <ChartSkeleton /> : <TrendChart data={stats?.timeline ?? []} />}</CardContent>
        </Card>
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Detection Results</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <p className="text-sm text-muted-foreground">
              Real-time AI estimates per item. Higher scores indicate higher likelihood of misinformation.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Platform: {platform}</Badge>
              <Badge variant="secondary">Min Confidence: {confidence}%</Badge>
              {query ? <Badge variant="outline">Query: {query}</Badge> : null}
            </div>
            <DetectionMeter score={averageScore(items)} />
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Content Stream</CardTitle>
        </CardHeader>
        <CardContent>
          {trendsLoading ? (
            <ListSkeleton />
          ) : (
            <div className="flex flex-col gap-3">
              {items.map((it) => (
                <ContentItem key={it.id} item={it} />
              ))}
              {items.length === 0 ? (
                <p className="text-sm text-muted-foreground">No items match your filters yet.</p>
              ) : null}
            </div>
          )}
        </CardContent>
      </Card>

      <Tabs defaultValue="notes">
        <TabsList>
          <TabsTrigger value="notes">Notes</TabsTrigger>
          <TabsTrigger value="sources">Top Sources</TabsTrigger>
        </TabsList>
        <TabsContent value="notes" className="text-sm text-muted-foreground">
          Tip: Use filters to spot coordinated spikes across platforms.
        </TabsContent>
        <TabsContent value="sources" className="text-sm text-muted-foreground">
          Source analytics will appear here.
        </TabsContent>
      </Tabs>
    </div>
  )
}

function averageScore(items: Array<{ score: number }>) {
  if (!items?.length) return 0
  const s = items.reduce((acc, it) => acc + it.score, 0)
  return Math.round((s / items.length) * 100) / 100
}
