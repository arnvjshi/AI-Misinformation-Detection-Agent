import axios from "axios"
import { MOCK_STATS, MOCK_TRENDS, mockVerify } from "@/data/mock-data"

const api = axios.create({
  baseURL: "/api", // <PLACEHOLDER> backend base URL
})

// Toggle mock mode on for now to avoid real network calls
const useMock = true

export async function getTrends(params?: { platform?: string; minConfidence?: number; query?: string }) {
  if (useMock) {
    const { platform = "all", minConfidence = 0, query = "" } = params || {}
    const q = query.toLowerCase()
    const items = MOCK_TRENDS.items.filter((it) => {
      const platformOk = platform === "all" || it.platform === platform
      const confOk = it.score >= minConfidence
      const queryOk = !q || it.text.toLowerCase().includes(q)
      return platformOk && confOk && queryOk
    })
    await delay(350)
    return { items }
  }
  const res = await api.get("/trends", { params })
  return res.data
}

export async function getStats() {
  if (useMock) {
    await delay(250)
    return MOCK_STATS
  }
  const res = await api.get("/stats")
  return res.data
}

export async function postAnalyze(payload: { text: string }) {
  if (useMock) {
    await delay(400)
    return { score: Math.round(Math.random() * 100), rationale: "Mock rationale." }
  }
  const res = await api.post("/analyze", payload)
  return res.data
}

export async function postVerify(payload: { text?: string; url?: string }) {
  if (useMock) {
    await delay(600)
    return mockVerify(payload)
  }
  const res = await api.post("/verify", payload)
  return res.data
}

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}
