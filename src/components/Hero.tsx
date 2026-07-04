"use client";

import { motion } from "framer-motion";
import { HeroScene } from "./3d/HeroScene";
import { ArrowDown } from "lucide-react";

export function Hero() {
  const scrollToSkills = () => {
    const element = document.querySelector("#skills");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <HeroScene />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6"
        >
          {/* Greeting */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex justify-center"
          >
            <span className="text-accent text-sm md:text-base font-mono px-4 py-2 rounded-full bg-accent/10 border border-accent/30">
              Welcome to my portfolio
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight"
          >
            <span className="block mb-2">Full Stack Developer</span>
            <span className="gradient-text">Building the Future</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto"
          >
            Specializing in TypeScript, Next.js, Nest.js, Node.js, and modern
            cloud infrastructure. I create robust, scalable, and performant
            applications with cutting-edge technologies.
          </motion.p>

          {/* Tech Stack Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-2 pt-4"
          >
            {[
              "TypeScript",
              "Next.js",
              "Nest.js",
              "Node.js",
              "React",
              "PostgreSQL",
              "AWS",
            ].map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-sm rounded-full bg-card/50 border border-border/50 hover:border-accent/50 transition-colors"
              >
                {tech}
              </span>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="pt-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToSkills}
              className="px-8 py-3 rounded-lg bg-gradient-to-r from-accent-blue to-accent-cyan text-background font-semibold hover:shadow-lg hover:shadow-accent/50 transition-shadow"
            >
              Explore My Work
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
        onClick={scrollToSkills}
      >
        <ArrowDown className="w-6 h-6 text-accent/50 hover:text-accent transition-colors" />
      </motion.div>
    </section>
  );
}
