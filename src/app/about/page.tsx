'use client'

import { motion } from 'framer-motion'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Award, FlaskConical, ShieldCheck, Users } from 'lucide-react'

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4 block font-sans">
              About Us
            </span>
            <h1 className="font-serif text-4xl md:text-5xl font-medium mb-4">
              Our Commitment to Excellence
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              EnhancedChem is dedicated to providing the highest quality research peptides with rigorous testing standards and full transparency.
            </p>
          </motion.div>

          {/* Story Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-3xl mx-auto mb-20"
          >
            <div className="prose prose-lg mx-auto text-center">
              <p className="text-muted-foreground leading-relaxed text-lg">
                Founded with a mission to advance scientific research, EnhancedChem is a US-based company providing premium-grade peptides 
                to researchers, laboratories, and institutions. Our commitment to quality is unwavering—every 
                product undergoes rigorous third-party testing to ensure 99.9%+ purity.
              </p>
              <p className="text-muted-foreground leading-relaxed text-lg mt-6">
                We believe that groundbreaking discoveries require exceptional materials. That&apos;s why we partner with 
                GMP-compliant manufacturing facilities and maintain strict quality control protocols throughout our 
                supply chain.
              </p>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
          >
            {[
              { value: '99.9%+', label: 'Purity Standard' },
              { value: '10K+', label: 'Orders Shipped' },
              { value: 'US Only', label: 'Shipping Available' },
              { value: '24/7', label: 'Support Available' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-serif text-3xl md:text-4xl font-medium mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Values */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="font-serif text-2xl md:text-3xl font-medium text-center mb-12">
              Our Core Values
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: FlaskConical,
                  title: 'Scientific Excellence',
                  description: 'Every product meets the highest standards for laboratory research applications.',
                },
                {
                  icon: ShieldCheck,
                  title: 'Quality Assurance',
                  description: 'Third-party testing and certificates of analysis for complete transparency.',
                },
                {
                  icon: Award,
                  title: 'Integrity',
                  description: 'Honest labeling, accurate concentrations, and reliable consistency.',
                },
                {
                  icon: Users,
                  title: 'Customer Focus',
                  description: 'Dedicated support team to assist researchers with their needs.',
                },
              ].map((value) => (
                <div
                  key={value.title}
                  className="bg-card rounded-lg p-6 border border-border/60 shadow-[var(--shadow-card)] text-center"
                >
                  <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-6 h-6 text-foreground" />
                  </div>
                  <h3 className="font-serif text-lg font-medium mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
