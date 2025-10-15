export const MOCK_TRENDS = {
  items: [
    {
      id: "1",
      platform: "twitter" as const,
      author: "@user1",
      text: "Breaking: New 'miracle cure' claims to reverse climate change overnight.",
      score: 78,
      link: "https://example.com/post/1",
      timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    },
    {
      id: "2",
      platform: "reddit" as const,
      author: "r/worldnews",
      text: "Video suggests old footage used in a new incident—context missing.",
      score: 52,
      link: "https://example.com/post/2",
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    },
    {
      id: "3",
      platform: "news" as const,
      author: "Local Outlet",
      text: "Authorities confirm updated guidance on evacuation zones.",
      score: 12,
      link: "https://example.com/post/3",
      timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    },
    {
      id: "4",
      platform: "twitter" as const,
      author: "@healthtalk",
      text: "Claim: vaccine microchips track users in real time (no evidence provided).",
      score: 88,
      link: "https://example.com/post/4",
      timestamp: new Date(Date.now() - 1000 * 60 * 80).toISOString(),
    },
    {
      id: "5",
      platform: "reddit" as const,
      author: "u/science_mod",
      text: "Study misinterpreted; sample size too small to support headline.",
      score: 47,
      link: "https://example.com/post/5",
      timestamp: new Date(Date.now() - 1000 * 60 * 140).toISOString(),
    },
  ],
}

export const MOCK_STATS = {
  sources: 126,
  flaggedToday: 34,
  totalReviewed: 8129,
  timeline: buildTimeline(),
}

function buildTimeline() {
  const arr: Array<{ ts: string; volume: number }> = []
  for (let i = 10; i >= 0; i--) {
    const ts = new Date(Date.now() - i * 60 * 60 * 1000)
    arr.push({
      ts: ts.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      volume: 20 + Math.round(Math.random() * 45),
    })
  }
  return arr
}

export function mockVerify(payload: { text?: string; url?: string }) {
  const verdicts = ["True", "False", "Uncertain"] as const
  const verdict = verdicts[Math.floor(Math.random() * verdicts.length)]
  const confidence = Math.round(40 + Math.random() * 60)
  return {
    verdict,
    confidence,
    explanation:
      verdict === "True"
        ? "The claim aligns with multiple independent sources and evidence."
        : verdict === "False"
          ? "The claim conflicts with established facts and credible reporting."
          : "Insufficient evidence to render a definitive judgement at this time.",
    sources: [
      { title: "FactCheck.org", url: "https://www.factcheck.org/" },
      { title: "PolitiFact", url: "https://www.politifact.com/" },
      { title: "Reuters Fact Check", url: "https://www.reuters.com/fact-check/" },
    ],
  }
}
