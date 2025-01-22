"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function WelcomePage() {
  return (
    <div className="relative min-h-screen">
      {/* Background Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-10" />

      {/* Content Container */}
      <div className="relative container mx-auto px-4 py-8 flex flex-col items-center min-h-screen justify-center">
        {/* Logo & Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          {/* App Icon */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center">
              <Star className="w-8 h-8 text-black" />
            </div>
          </div>

          {/* Hero Text */}
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
            Try smth new <br /> to have fun!
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
            Hey, I'm Starrd and I'll turn your life into a game.
          </p>

          {/* CTA Button */}
          <Link href="/auth">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-black border border-primary text-primary hover:bg-primary hover:text-black"
            >
              Hey! What&apos;s game? <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </motion.div>

        {/* Image Grid */}
        <div className="w-full max-w-2xl mx-auto relative">
          <div className="absolute inset-x-0 top-0 grid grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-square bg-muted rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
