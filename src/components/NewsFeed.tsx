import { motion } from "framer-motion";
import NewsCard from "./NewsCard";
import SkeletonCard from "./SkeletonCard";

interface NewsItem {
  id: string;
  title: string;
  source: string;
  date: string;
  summary: string;
  url: string;
}

interface NewsFeedProps {
  isLoading: boolean;
  news: NewsItem[];
  error?: string | null;
}

const NewsFeed = ({ isLoading, news, error }: NewsFeedProps) => {
  if (error) {
    return (
      <motion.div
        className="flex flex-col items-center justify-center py-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
          <span className="text-destructive text-2xl">!</span>
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          Unable to load news
        </h3>
        <p className="text-muted-foreground text-center max-w-md">
          We're experiencing technical difficulties. Please try again later.
        </p>
      </motion.div>
    );
  }

  return (
    <section className="w-full max-w-[720px] mx-auto px-4 md:px-6 py-12 md:py-20">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Latest Headlines
          </span>
        </div>

        <div className="space-y-6">
          {isLoading
            ? Array.from({ length: 5 }).map((_, i) => (
                <SkeletonCard key={i} index={i} />
              ))
            : news.map((item, index) => (
                <NewsCard
                  key={item.id}
                  title={item.title}
                  source={item.source}
                  date={item.date}
                  summary={item.summary}
                  url={item.url}
                  index={index}
                />
              ))}
        </div>
      </motion.div>
    </section>
  );
};

export default NewsFeed;