import { useState, useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import NewsFeed from "@/components/NewsFeed";
import Footer from "@/components/Footer";
import { mockNews, NewsItem } from "@/data/mockNews";

const Index = () => {
  const [isHeroCompact, setIsHeroCompact] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [news, setNews] = useState<NewsItem[]>([]);

  // Handle scroll to compact hero
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsHeroCompact(scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Simulate loading news
  useEffect(() => {
    const timer = setTimeout(() => {
      setNews(mockNews);
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <HeroSection isCompact={isHeroCompact} />
      <NewsFeed isLoading={isLoading} news={news} />
      <Footer />
    </main>
  );
};

export default Index;