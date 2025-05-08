"use client";
import { Clock4 } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";

export default function NavTitle() {
  return (
    <h2 className="flex items-center gap-2 text-lg sm:text-xl md:text-2xl lg:text-3xl">
      <motion.span
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <Clock4 color="white" size={36} />
      </motion.span>
      <Link href="/">Task Tracking</Link>
    </h2>
  );
}
