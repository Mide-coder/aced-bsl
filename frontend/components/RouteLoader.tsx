"use client";
// ACED — RouteLoader
// Top progress bar that shows during route navigation

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export function RouteLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [prevPath, setPrevPath] = useState(pathname);

  useEffect(() => {
    if (pathname !== prevPath) {
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
        setPrevPath(pathname);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [pathname, prevPath]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ scaleX: 0, opacity: 1 }}
          animate={{ scaleX: 0.8, opacity: 1 }}
          exit={{ scaleX: 1, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed top-0 left-0 right-0 z-[100] h-[3px] origin-left"
          style={{
            background: "linear-gradient(90deg, #1a3bcc, #2563eb, #16a34a)",
          }}
        />
      )}
    </AnimatePresence>
  );
}
