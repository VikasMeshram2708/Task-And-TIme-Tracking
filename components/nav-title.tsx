"use client";
import { Hourglass } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
export default function NavTitle() {
  return (
    <h2 className="flex items-center gap-2 text-lg sm:text-xl md:text-2xl lg:text-3xl">
      <motion.div
        initial={{ rotate: 0, scale: 0.95 }}
        animate={{ rotate: 360, scale: 1.05 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        <Hourglass size={26} />
      </motion.div>
      <Link href="/">Task Tracking</Link>
    </h2>
  );
}
