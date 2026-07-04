"use client";

import { useEffect, useRef } from "react";
import { SKILLS } from "@/lib/constants";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const cards = containerRef.current.querySelectorAll("[data-skill-card]");

    cards.forEach((card, index) => {
      gsap.from(card, {
        opacity: 0,
        y: 50,
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

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      id="skills"
      className="relative w-full py-20 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background gradient elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-accent-blue/20 rounded-full blur-3xl opacity-40 -z-10 animate-pulse" />
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-accent-purple/20 rounded-full blur-3xl opacity-40 -z-10 animate-pulse" />

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
            <span className="gradient-text">Technical Skills</span>
          </h2>
          <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
            A comprehensive toolkit of modern technologies and frameworks I use
            to build scalable applications.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div ref={containerRef} className="space-y-16">
          {SKILLS.map((skillGroup, groupIndex) => (
            <motion.div
              key={skillGroup.category}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: groupIndex * 0.1 }}
              viewport={{ once: false }}
              className="space-y-4"
            >
              <h3 className="text-2xl font-bold text-foreground/80 mb-6">
                {skillGroup.category}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {skillGroup.skills.map((skill) => {
                  const IconComponent = skill.icon;
                  return (
                    <div
                      key={skill.name}
                      data-skill-card
                      className="group relative"
                    >
                      <motion.div
                        whileHover={{ y: -8 }}
                        className="h-full p-4 rounded-lg glass-effect border border-border/50 flex flex-col items-center justify-center gap-3 cursor-pointer group-hover:border-accent/50 transition-all duration-300"
                      >
                        {/* Icon */}
                        {IconComponent && (
                          <IconComponent
                            size={40}
                            style={{ color: skill.color }}
                            className="group-hover:scale-110 transition-transform duration-300"
                          />
                        )}
                        {!IconComponent && (
                          <div
                            className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm"
                            style={{
                              backgroundColor: `${skill.color}20`,
                              color: skill.color,
                            }}
                          >
                            {skill.name.charAt(0)}
                          </div>
                        )}

                        {/* Name */}
                        <p className="text-sm font-semibold text-center">
                          {skill.name}
                        </p>

                        {/* Hover effect */}
                        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-accent-blue/10 to-accent-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                      </motion.div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: false }}
          className="mt-20 pt-16 border-t border-border/50 text-center"
        >
          <p className="text-foreground/60 text-lg">
            Beyond these core technologies, I continuously explore emerging
            tools and best practices to stay at the forefront of web
            development.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
