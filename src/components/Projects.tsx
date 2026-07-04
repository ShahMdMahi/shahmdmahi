"use client";

import { useRef, useEffect } from "react";
import { PROJECTS } from "@/lib/constants";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const cards = containerRef.current.querySelectorAll("[data-project-card]");

    cards.forEach((card, index) => {
      gsap.to(card, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        delay: index * 0.1,
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          end: "top 20%",
          toggleActions: "play none none reverse",
        },
      });
    });
  }, []);

  const featured = PROJECTS.filter((p) => p.featured);
  const others = PROJECTS.filter((p) => !p.featured);

  return (
    <section
      id="projects"
      className="relative w-full py-20 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute top-1/2 -left-32 w-72 h-72 bg-accent-cyan/20 rounded-full blur-3xl opacity-40 -z-10 animate-pulse" />
      <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-accent-purple/20 rounded-full blur-3xl opacity-40 -z-10 animate-pulse" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
          className="text-center mb-16 md:mb-24"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Featured Projects</span>
          </h2>
          <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
            Showcase of my recent work and contributions to innovative web
            applications and systems.
          </p>
        </motion.div>

        {/* Featured Projects */}
        <div ref={containerRef} className="space-y-8 mb-16">
          {featured.map((project) => (
            <motion.div
              key={project.id}
              data-project-card
              initial={{ opacity: 0, y: 50 }}
              className="group"
            >
              <div className="glass-effect rounded-lg border border-border/50 overflow-hidden group-hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/20">
                <div className="grid md:grid-cols-2 gap-0">
                  {/* Image */}
                  <div className="relative h-64 md:h-80 overflow-hidden bg-card">
                    <div className="w-full h-full bg-gradient-to-br from-accent-blue/30 to-accent-cyan/30 flex items-center justify-center">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-8 flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold mb-3 group-hover:gradient-text transition-all">
                        {project.title}
                      </h3>
                      <p className="text-foreground/70 mb-6 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 text-xs rounded-full bg-accent/10 border border-accent/30 text-foreground/80"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Links */}
                    <div className="flex gap-4">
                      <motion.a
                        href={project.github}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border/50 hover:border-accent/50 hover:bg-accent/10 transition-colors"
                      >
                        <FaGithub size={18} />
                        <span className="text-sm">Code</span>
                      </motion.a>
                      <motion.a
                        href={project.live}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-accent-blue to-accent-cyan text-background hover:shadow-lg hover:shadow-accent/50 transition-shadow"
                      >
                        <ExternalLink size={18} />
                        <span className="text-sm">Live Demo</span>
                      </motion.a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Other Projects */}
        {others.length > 0 && (
          <div className="mt-24">
            <h3 className="text-2xl font-bold mb-8">Other Projects</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {others.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: false }}
                  className="group"
                >
                  <div className="glass-effect rounded-lg border border-border/50 p-6 h-full group-hover:border-accent/50 transition-all duration-300">
                    <h4 className="text-xl font-bold mb-3">{project.title}</h4>
                    <p className="text-foreground/60 text-sm mb-4">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs rounded bg-accent/10 text-foreground/70"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-3">
                      <a
                        href={project.github}
                        className="inline-flex items-center gap-1 text-sm text-accent hover:text-accent-cyan transition-colors"
                      >
                        <FaGithub size={16} /> Code
                      </a>
                      <a
                        href={project.live}
                        className="inline-flex items-center gap-1 text-sm text-accent hover:text-accent-cyan transition-colors"
                      >
                        <ExternalLink size={16} /> Live
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
