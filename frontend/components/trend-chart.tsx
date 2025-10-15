"use client"

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts"

type Point = { ts: string; volume: number }

export function TrendChart({ data }: { data: Point[] }) {
  return (
    <div className="h-[260px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid stroke="var(--color-muted)" strokeDasharray="3 3" />
          <XAxis dataKey="ts" tick={{ fill: "var(--color-muted-foreground)" }} />
          <YAxis tick={{ fill: "var(--color-muted-foreground)" }} />
          <Tooltip
            contentStyle={{
              background: "var(--color-popover)",
              border: `1px solid var(--color-border)`,
              color: "var(--color-popover-foreground)",
            }}
          />
          <Line
            type="monotone"
            dataKey="volume"
            stroke="var(--color-chart-2)"
            strokeWidth={2}
            dot={false}
            isAnimationActive
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
