import { motion } from "framer-motion";

interface SkeletonCardProps {
  index: number;
}

const SkeletonCard = ({ index }: SkeletonCardProps) => {
  return (
    <motion.div
      className="bg-card rounded-xl border border-border p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* Header skeleton */}
      <div className="flex items-center justify-between mb-4">
        <div className="skeleton h-4 w-24" />
        <div className="skeleton h-4 w-20" />
      </div>

      {/* Title skeleton */}
      <div className="skeleton h-7 w-full mb-2" />
      <div className="skeleton h-7 w-3/4 mb-4" />

      {/* Summary skeleton */}
      <div className="space-y-2 mb-5">
        <div className="skeleton h-4 w-full" />
        <div className="skeleton h-4 w-full" />
        <div className="skeleton h-4 w-2/3" />
      </div>

      {/* Footer skeleton */}
      <div className="flex items-center justify-between">
        <div className="skeleton h-4 w-28" />
        <div className="skeleton h-6 w-32 rounded-full" />
      </div>
    </motion.div>
  );
};

export default SkeletonCard;