export interface NewsItem {
  id: string;
  title: string;
  source: string;
  date: string;
  summary: string;
  url: string;
}

export const mockNews: NewsItem[] = [
  {
    id: "1",
    title: "Apple Unveils Vision Pro 2 with Enhanced Spatial Computing Capabilities",
    source: "The Verge",
    date: "Jan 8, 2026",
    summary: "Apple has announced the second generation of its Vision Pro headset, featuring improved display technology, longer battery life, and a more comfortable design. The new model promises breakthrough advancements in spatial computing for both consumers and enterprise users.",
    url: "https://theverge.com",
  },
  {
    id: "2",
    title: "OpenAI Reaches $150 Billion Valuation After Latest Funding Round",
    source: "TechCrunch",
    date: "Jan 7, 2026",
    summary: "The AI research company has closed its largest funding round to date, cementing its position as the most valuable private tech company. The investment will fuel expansion of its infrastructure and development of next-generation AI models.",
    url: "https://techcrunch.com",
  },
  {
    id: "3",
    title: "European Union Implements Landmark AI Regulation Act",
    source: "Reuters",
    date: "Jan 7, 2026",
    summary: "The EU's comprehensive AI Act has officially come into force, establishing the world's first major regulatory framework for artificial intelligence. Tech companies now face strict requirements for transparency, safety testing, and human oversight.",
    url: "https://reuters.com",
  },
  {
    id: "4",
    title: "Quantum Computing Breakthrough: Google Achieves 1000-Qubit Milestone",
    source: "Wired",
    date: "Jan 6, 2026",
    summary: "Google's quantum computing division has successfully demonstrated a 1000-qubit processor, marking a significant leap toward practical quantum computing. The breakthrough could accelerate drug discovery, cryptography, and complex simulations.",
    url: "https://wired.com",
  },
  {
    id: "5",
    title: "Tesla's Optimus Robots Begin Deployment in Manufacturing Facilities",
    source: "Bloomberg",
    date: "Jan 6, 2026",
    summary: "Tesla has started deploying its humanoid robots in select manufacturing plants, marking the beginning of a new era in industrial automation. The Optimus Gen 3 units are handling complex assembly tasks previously reserved for human workers.",
    url: "https://bloomberg.com",
  },
  {
    id: "6",
    title: "Microsoft and Meta Partner on Next-Generation Mixed Reality Platform",
    source: "Ars Technica",
    date: "Jan 5, 2026",
    summary: "The tech giants have announced a strategic partnership to develop interoperable mixed reality experiences. The collaboration aims to create unified standards for spatial computing, potentially reshaping the XR landscape.",
    url: "https://arstechnica.com",
  },
  {
    id: "7",
    title: "Global Chip Shortage Finally Easing as New Fabs Come Online",
    source: "Financial Times",
    date: "Jan 5, 2026",
    summary: "After years of supply chain disruptions, the semiconductor industry is seeing relief as major fabrication plants in the US, Europe, and Asia begin full-scale production. Analysts predict stable chip supplies by Q2 2026.",
    url: "https://ft.com",
  },
];