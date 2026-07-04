"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Send } from "lucide-react";
import { SOCIAL_LINKS } from "@/lib/constants";
import { sendEmail } from "@/lib/send-email";
import { toast } from "sonner";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await sendEmail(new FormData(e.currentTarget));
    if (result.success) {
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      toast.success("Message sent successfully!");
    } else {
      toast.error("Failed to send message. Please try again.");
    }

    setTimeout(() => setSubmitted(false), 3000);
  };

  const socialLinks = SOCIAL_LINKS;

  return (
    <section
      id="contact"
      className="relative w-full py-20 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute top-0 left-1/2 w-96 h-96 bg-accent-purple/20 rounded-full blur-3xl opacity-40 -z-10 animate-pulse -translate-x-1/2" />
      <div className="absolute bottom-0 left-10 w-72 h-72 bg-accent-cyan/20 rounded-full blur-3xl opacity-40 -z-10 animate-pulse" />

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
            <span className="gradient-text">Let&apos;s Connect</span>
          </h2>
          <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
            Have a project in mind or just want to chat? I&apos;d love to hear
            from you. Reach out and let&apos;s create something amazing
            together.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false }}
            className="glass-effect rounded-lg border border-border/50 p-8"
          >
            <h3 className="text-2xl font-bold mb-6">Send me a Message</h3>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center h-64 text-center"
              >
                <div className="text-5xl mb-4">✨</div>
                <h4 className="text-2xl font-bold mb-2">Message Sent!</h4>
                <p className="text-foreground/60">
                  Thank you for reaching out. I&apos;ll get back to you soon.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg bg-card/50 border border-border/50 focus:border-accent/50 focus:outline-none transition-colors text-foreground placeholder-foreground/40"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg bg-card/50 border border-border/50 focus:border-accent/50 focus:outline-none transition-colors text-foreground placeholder-foreground/40"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2 rounded-lg bg-card/50 border border-border/50 focus:border-accent/50 focus:outline-none transition-colors text-foreground placeholder-foreground/40 resize-none"
                    placeholder="Your message..."
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-accent-blue to-accent-cyan text-background font-semibold hover:shadow-lg hover:shadow-accent/50 transition-shadow flex items-center justify-center gap-2"
                >
                  <Send size={20} />
                  Send Message
                </motion.button>
              </form>
            )}
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
              <p className="text-foreground/60 leading-relaxed mb-8">
                I&apos;m always interested in hearing about new projects and
                opportunities. Whether you have a question or just want to say
                hello, feel free to reach out. I&apos;ll do my best to get back
                to you within 24 hours.
              </p>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect With Me</h4>
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((link, index) => {
                  const IconComponent = link.icon;
                  return (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: false }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg glass-effect border border-border/50 hover:border-accent/50 transition-all group"
                    >
                      {IconComponent && (
                        <IconComponent className="w-5 h-5 group-hover:text-accent transition-colors" />
                      )}
                      <span className="text-sm font-medium">{link.name}</span>
                    </motion.a>
                  );
                })}
              </div>
            </div>

            {/* Quick Info */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: false }}
              className="p-4 rounded-lg bg-accent/10 border border-accent/30"
            >
              <p className="text-sm text-foreground/70">
                <span className="font-semibold text-accent">
                  Response Time:
                </span>{" "}
                Within 24 hours
              </p>
              <p className="text-sm text-foreground/70 mt-2">
                <span className="font-semibold text-accent">
                  Available for:
                </span>{" "}
                Freelance projects, part-time roles, consultations
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
