'use client'

import { motion } from 'framer-motion'
import { FlaskConical, ShieldCheck, Clock, Lock } from 'lucide-react'

const features = [
  {
    icon: FlaskConical,
    title: 'Premium Quality',
    description: 'Highest purity peptides with third-party testing and certificates of analysis for every batch.',
  },
  {
    icon: Clock,
    title: 'Fast Shipping',
    description: 'Same-day processing on most orders with secure, temperature-controlled shipping methods.',
  },
  {
    icon: ShieldCheck,
    title: 'Research Grade',
    description: 'Laboratory-grade peptides manufactured in GMP-compliant facilities for scientific research.',
  },
  {
    icon: Lock,
    title: 'Secure & Private',
    description: '256-bit SSL encryption and discreet packaging for complete privacy and security.',
  },
]

export function WhyChooseUs() {
  return (
    <section className="py-20 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4 block font-sans">
            Why EnhancedChem
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-medium mb-4">
            Quality You Can Trust
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            We are committed to providing the highest quality research peptides with rigorous testing standards.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card rounded-lg p-6 border border-border/60 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-foreground" />
              </div>
              <h3 className="font-serif text-lg font-medium mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
