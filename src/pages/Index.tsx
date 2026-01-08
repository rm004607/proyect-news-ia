import { useState, useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import NewsFeed from "@/components/NewsFeed";
import Footer from "@/components/Footer";

interface NewsItem {
  id: string;
  title: string;
  source: string;
  date: string;
  summary: string;
  url: string;
}

const Index = () => {
  const [isHeroCompact, setIsHeroCompact] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [summary, setSummary] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  // Handle scroll to compact hero
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsHeroCompact(scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch news from backend
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:3001/api/news-summary");
        const data = await response.json();
        console.log("Data received from backend:", data);

        if (data.success) {
          setNews(data.articles);
          setSummary(data.summary);
          setError(null);
        } else {
          setError(data.error || "An error occurred while loading news");
        }
      } catch (error) {
        console.error("Connection error:", error);
        setError("Could not connect to the server. Make sure the backend is running on port 3001.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <HeroSection isCompact={isHeroCompact} />
      <div className="container mx-auto px-4 py-8">
        {error && (
          <div className="mb-8 p-4 bg-destructive/10 border border-destructive/20 text-destructive rounded-lg text-center">
            {error}
          </div>
        )}
        {summary && (
          <div className="mb-12 p-6 bg-secondary/30 rounded-2xl border border-border animate-fade-in">
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Artificial Intelligence Summary
            </h2>
            <div className="prose prose-invert max-w-none text-muted-foreground whitespace-pre-wrap">
              {summary}
            </div>
          </div>
        )}
      </div>
      <NewsFeed isLoading={isLoading} news={news} error={error} />
      <Footer />
    </main>
  );
};

export default Index;