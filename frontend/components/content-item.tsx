"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type Item = {
  id: string
  platform: "twitter" | "reddit" | "news"
  author: string
  text: string
  score: number
  link?: string
  timestamp: string
}

export function ContentItem({ item }: { item: Item }) {
  const colorVariant = item.score >= 66 ? "destructive" : item.score >= 33 ? "secondary" : "outline"

  return (
    <Card>
      <CardContent className="flex flex-col gap-2 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="outline" aria-label={`Platform ${item.platform}`}>
              {item.platform}
            </Badge>
            <span className="text-xs text-muted-foreground">{new Date(item.timestamp).toLocaleString()}</span>
          </div>
          <Badge variant={colorVariant as any}>{item.score}%</Badge>
        </div>
        <p className="text-sm">{item.text}</p>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>by {item.author}</span>
          {item.link ? (
            <a
              href={item.link}
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4 hover:text-primary"
            >
              View source
            </a>
          ) : null}
        </div>
      </CardContent>
    </Card>
  )
}
