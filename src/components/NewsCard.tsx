import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface NewsCardProps {
  title: string;
  source: string;
  date: string;
  summary: string;
  url: string;
  index: number;
}

const NewsCard = ({ title, source, date, summary, url, index }: NewsCardProps) => {
  return (
    <motion.article
      className="news-card"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* Header with source and date */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-muted-foreground">{source}</span>
        <span className="text-sm text-muted-foreground/70">{date}</span>
      </div>

      {/* Title */}
      <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-3 leading-tight">
        {title}
      </h2>

      {/* Summary */}
      <p className="text-muted-foreground leading-relaxed mb-5 line-clamp-3">
        {summary}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="read-link group"
        >
          Read original
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </a>
        <span className="ai-badge">Summarized by AI</span>
      </div>
    </motion.article>
  );
};

export default NewsCard;