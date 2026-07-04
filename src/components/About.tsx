"use client";

import { motion } from "framer-motion";
import { Download } from "lucide-react";
import Image from "next/image";

export function About() {
  return (
    <section
      id="about"
      className="relative w-full py-20 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-accent-blue/20 rounded-full blur-3xl opacity-30 -z-10 animate-pulse" />
      <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-accent-cyan/20 rounded-full blur-3xl opacity-30 -z-10 animate-pulse" />

      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">About Me</span>
          </h2>
          <p className="text-foreground/60 text-lg">Get to know me better</p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left - Image/Visual */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false }}
            className="relative"
          >
            <div className="relative w-full aspect-square rounded-lg overflow-hidden glass-effect border border-border/50">
              <div className="w-full h-full bg-gradient-to-br from-accent-blue/40 to-accent-cyan/40 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <Image
                    src="/shahmdmahi.png"
                    alt="Profile Image"
                    className="rounded-md"
                    height={300}
                    width={300}
                  />
                  <p className="text-foreground/70">Full Stack Developer</p>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-4 -right-4 w-24 h-24 rounded-lg glass-effect border border-border/50 flex items-center justify-center text-3xl"
            >
              ⚡
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -bottom-4 -left-4 w-20 h-20 rounded-lg glass-effect border border-border/50 flex items-center justify-center text-2xl"
            >
              🚀
            </motion.div>
          </motion.div>

          {/* Right - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-2xl font-bold mb-3">Passionate Developer</h3>
              <p className="text-foreground/70 leading-relaxed">
                I&apos;m a full-stack developer with a deep passion for building
                high-performance, scalable web applications. With expertise in
                modern JavaScript frameworks and cloud technologies, I create
                solutions that not only work but excel.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-3">Technical Excellence</h3>
              <p className="text-foreground/70 leading-relaxed">
                Specializing in TypeScript, Next.js, and Node.js, I focus on
                writing clean, maintainable code that follows industry best
                practices. I&apos;m proficient in building microservices,
                real-time applications, and complex backend systems.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-3">Continuous Learning</h3>
              <p className="text-foreground/70 leading-relaxed">
                Technology evolves rapidly, and I stay ahead by constantly
                exploring new tools and methodologies. From cutting-edge
                frameworks to emerging architectural patterns, I embrace
                innovation while maintaining proven engineering principles.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-4 pt-4">
              <motion.a
                href="#"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-accent-blue to-accent-cyan text-background font-semibold hover:shadow-lg hover:shadow-accent/50 transition-shadow"
              >
                <Download size={20} />
                Download CV
              </motion.a>

              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-3 rounded-lg border border-border/50 hover:border-accent/50 hover:bg-accent/10 font-semibold transition-colors"
              >
                Get in Touch
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: false }}
          className="grid grid-cols-3 gap-4 md:gap-8 mt-20 pt-16 border-t border-border/50"
        >
          {[
            { label: "Years Experience", value: "5+" },
            { label: "Projects Completed", value: "50+" },
            { label: "Happy Clients", value: "30+" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                {stat.value}
              </div>
              <p className="text-sm md:text-base text-foreground/60">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
