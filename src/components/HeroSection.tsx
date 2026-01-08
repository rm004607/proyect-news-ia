import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const newsTranslations = [
  { word: "NEWS", lang: "English" },
  { word: "NOTICIAS", lang: "Spanish" },
  { word: "新闻", lang: "Chinese" },
  { word: "ニュース", lang: "Japanese" },
  { word: "أخبار", lang: "Arabic" },
  { word: "NOTÍCIAS", lang: "Portuguese" },
  { word: "НОВОСТИ", lang: "Russian" },
  { word: "समाचार", lang: "Hindi" },
  { word: "NACHRICHTEN", lang: "German" },
  { word: "ACTUALITÉS", lang: "French" },
];

interface HeroSectionProps {
  isCompact: boolean;
}

const HeroSection = ({ isCompact }: HeroSectionProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % newsTranslations.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.section
      className="relative flex flex-col items-center justify-center overflow-hidden"
      initial={{ height: "100vh" }}
      animate={{
        height: isCompact ? "30vh" : "100vh",
        minHeight: isCompact ? "200px" : "100vh",
      }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{ background: "hsl(var(--hero-bg))" }}
    >
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--foreground)) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--foreground)) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20 blur-[120px]"
        style={{ background: "hsl(var(--primary))" }}
      />

      <div className="relative z-10 text-center px-4">
        {/* Animated news word */}
        <div className="relative h-[140px] md:h-[220px] lg:h-[280px] flex items-center justify-center overflow-visible">
          <AnimatePresence mode="wait">
            <motion.h1
              key={currentIndex}
              className="hero-text absolute whitespace-nowrap"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {newsTranslations[currentIndex].word}
            </motion.h1>
          </AnimatePresence>
        </div>

        {/* Subtitle */}
        <motion.p
          className="text-muted-foreground text-lg md:text-xl lg:text-2xl font-light tracking-wide max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isCompact ? 0 : 1, y: isCompact ? -10 : 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          The world's tech headlines, distilled by AI.
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: isCompact ? 0 : 0.5, y: isCompact ? 20 : 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <motion.div
            className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2"
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <div className="w-1 h-2 rounded-full bg-muted-foreground/50" />
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HeroSection;