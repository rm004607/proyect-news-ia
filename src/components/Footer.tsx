import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      className="w-full py-12 border-t border-border"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <div className="max-w-[720px] mx-auto px-4 md:px-6">
        <p className="text-center text-sm text-muted-foreground/70">
          Built with modern web technologies and AI-assisted summaries.
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;