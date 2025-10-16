export const MOCK_TRENDS = {
  items: [
    {
      id: "1",
      platform: "twitter" as const,
      author: "@user1",
      text: "Breaking: New 'miracle cure' claims to reverse climate change overnight.",
      score: 78,
      keywords: ["climate change", "miracle cure", "environmental", "hoax"],
      link: "https://example.com/post/1",
      timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    },
    {
      id: "2",
      platform: "reddit" as const,
      author: "r/worldnews",
      text: "Video suggests old footage used in a new incident—context missing.",
      score: 52,
      keywords: ["video manipulation", "context", "misinformation", "footage"],
      link: "https://example.com/post/2",
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    },
    {
      id: "3",
      platform: "news" as const,
      author: "Local Outlet",
      text: "Authorities confirm updated guidance on evacuation zones.",
      score: 12,
      keywords: ["evacuation", "emergency", "authorities", "official"],
      link: "https://example.com/post/3",
      timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    },
    {
      id: "4",
      platform: "twitter" as const,
      author: "@healthtalk",
      text: "Claim: vaccine microchips track users in real time (no evidence provided).",
      score: 88,
      keywords: ["vaccine", "microchip", "tracking", "conspiracy", "health"],
      link: "https://example.com/post/4",
      timestamp: new Date(Date.now() - 1000 * 60 * 80).toISOString(),
    },
    {
      id: "5",
      platform: "reddit" as const,
      author: "u/science_mod",
      text: "Study misinterpreted; sample size too small to support headline.",
      score: 47,
      keywords: ["study", "research", "sample size", "misinterpretation", "science"],
      link: "https://example.com/post/5",
      timestamp: new Date(Date.now() - 1000 * 60 * 140).toISOString(),
    },
    {
      id: "6",
      platform: "twitter" as const,
      author: "@electionwatch",
      text: "Unverified claim: voting machines were hacked in multiple districts.",
      score: 92,
      keywords: ["election", "voting machines", "hacking", "fraud", "democracy"],
      link: "https://example.com/post/6",
      timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    },
    {
      id: "7",
      platform: "news" as const,
      author: "Tech Daily",
      text: "Report: AI-generated deepfakes surge 300% in political ads.",
      score: 71,
      keywords: ["AI", "deepfake", "political", "technology", "manipulation"],
      link: "https://example.com/post/7",
      timestamp: new Date(Date.now() - 1000 * 60 * 220).toISOString(),
    },
    {
      id: "8",
      platform: "reddit" as const,
      author: "r/conspiracy",
      text: "Alleged leaked document reveals 'government weather control' program.",
      score: 85,
      keywords: ["weather control", "conspiracy", "government", "leak", "hoax"],
      link: "https://example.com/post/8",
      timestamp: new Date(Date.now() - 1000 * 60 * 260).toISOString(),
    },
    {
      id: "9",
      platform: "twitter" as const,
      author: "@financeguru",
      text: "Investment scheme promises 500% returns—regulators warn of scam.",
      score: 66,
      keywords: ["investment", "scam", "financial fraud", "pyramid scheme", "warning"],
      link: "https://example.com/post/9",
      timestamp: new Date(Date.now() - 1000 * 60 * 310).toISOString(),
    },
    {
      id: "10",
      platform: "news" as const,
      author: "Health News Network",
      text: "Debunked: No, 5G towers do not cause health issues.",
      score: 38,
      keywords: ["5G", "health", "radiation", "debunked", "technology"],
      link: "https://example.com/post/10",
      timestamp: new Date(Date.now() - 1000 * 60 * 350).toISOString(),
    },
    {
      id: "11",
      platform: "twitter" as const,
      author: "@cryptotrader",
      text: "Rumor: Major bank collapse imminent—no official confirmation.",
      score: 79,
      keywords: ["banking", "collapse", "financial crisis", "rumor", "panic"],
      link: "https://example.com/post/11",
      timestamp: new Date(Date.now() - 1000 * 60 * 400).toISOString(),
    },
    {
      id: "12",
      platform: "reddit" as const,
      author: "r/news",
      text: "Viral photo from disaster zone confirmed as edited composite image.",
      score: 54,
      keywords: ["photo manipulation", "disaster", "viral", "fake", "composite"],
      link: "https://example.com/post/12",
      timestamp: new Date(Date.now() - 1000 * 60 * 450).toISOString(),
    },
    {
      id: "13",
      platform: "news" as const,
      author: "Science Today",
      text: "Misleading headline: Cancer cure breakthrough requires years of trials.",
      score: 43,
      keywords: ["cancer", "cure", "breakthrough", "misleading", "research"],
      link: "https://example.com/post/13",
      timestamp: new Date(Date.now() - 1000 * 60 * 500).toISOString(),
    },
    {
      id: "14",
      platform: "twitter" as const,
      author: "@celebritynews",
      text: "Celebrity death hoax spreads rapidly—family confirms it's false.",
      score: 95,
      keywords: ["celebrity", "death hoax", "viral", "false", "rumor"],
      link: "https://example.com/post/14",
      timestamp: new Date(Date.now() - 1000 * 60 * 550).toISOString(),
    },
    {
      id: "15",
      platform: "reddit" as const,
      author: "u/foodsafety",
      text: "False claim: Common food additive linked to serious illness (study retracted).",
      score: 61,
      keywords: ["food safety", "additive", "health", "retracted", "misinformation"],
      link: "https://example.com/post/15",
      timestamp: new Date(Date.now() - 1000 * 60 * 600).toISOString(),
    },
    {
      id: "16",
      platform: "twitter" as const,
      author: "@disasteralert",
      text: "Earthquake prediction for next week lacks scientific backing.",
      score: 72,
      keywords: ["earthquake", "prediction", "disaster", "pseudoscience", "panic"],
      link: "https://example.com/post/16",
      timestamp: new Date(Date.now() - 1000 * 60 * 650).toISOString(),
    },
    {
      id: "17",
      platform: "news" as const,
      author: "Education Weekly",
      text: "School policy change misrepresented in viral social media posts.",
      score: 29,
      keywords: ["education", "policy", "school", "misrepresentation", "viral"],
      link: "https://example.com/post/17",
      timestamp: new Date(Date.now() - 1000 * 60 * 700).toISOString(),
    },
    {
      id: "18",
      platform: "reddit" as const,
      author: "r/technology",
      text: "Data breach claims exaggerated—actual impact limited to test accounts.",
      score: 56,
      keywords: ["data breach", "security", "exaggeration", "hacking", "privacy"],
      link: "https://example.com/post/18",
      timestamp: new Date(Date.now() - 1000 * 60 * 750).toISOString(),
    },
    {
      id: "19",
      platform: "twitter" as const,
      author: "@envirowatch",
      text: "Ocean cleanup project statistics inflated by 400% in promotional material.",
      score: 48,
      keywords: ["environment", "ocean", "cleanup", "statistics", "inflated"],
      link: "https://example.com/post/19",
      timestamp: new Date(Date.now() - 1000 * 60 * 800).toISOString(),
    },
    {
      id: "20",
      platform: "news" as const,
      author: "Global Affairs",
      text: "Treaty terms misquoted by multiple outlets—original text clarifies position.",
      score: 35,
      keywords: ["treaty", "international", "misquote", "diplomacy", "politics"],
      link: "https://example.com/post/20",
      timestamp: new Date(Date.now() - 1000 * 60 * 850).toISOString(),
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
