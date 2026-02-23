import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Shield, FileSearch, Brain, Lock, ChevronRight,
  Fingerprint, Eye, BarChart3, Zap
} from "lucide-react";
import ParticleBackground from "@/components/forensix/ParticleBackground";
import Navbar from "@/components/forensix/Navbar";

const features = [
  {
    icon: <FileSearch className="h-6 w-6" />,
    title: "Metadata Forensics",
    desc: "Deep timestamp gap analysis, author mismatch detection, and editing software identification.",
  },
  {
    icon: <Brain className="h-6 w-6" />,
    title: "Linguistic Intelligence",
    desc: "NLP-powered tone shift detection, vocabulary inconsistency scoring, and semantic drift analysis.",
  },
  {
    icon: <Fingerprint className="h-6 w-6" />,
    title: "Signature Verification",
    desc: "Stroke smoothness variance, pixel edge artifact detection, and copy-paste identification.",
  },
  {
    icon: <Eye className="h-6 w-6" />,
    title: "Handwriting Analysis",
    desc: "Slant angle variation, letter spacing irregularity, and stroke thickness consistency checks.",
  },
  {
    icon: <BarChart3 className="h-6 w-6" />,
    title: "Explainable AI",
    desc: "Transparent scoring with mathematical breakdowns, evidence highlights, and confidence metrics.",
  },
  {
    icon: <Lock className="h-6 w-6" />,
    title: "Enterprise Security",
    desc: "Hash-based document verification, encrypted storage, MIME validation, and audit trails.",
  },
];

const stats = [
  { value: "99.7%", label: "Detection Rate" },
  { value: "<2s", label: "Analysis Time" },
  { value: "4", label: "AI Modules" },
  { value: "256-bit", label: "Encryption" },
];

const Landing = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <ParticleBackground />
      <Navbar />

      {/* Hero */}
      <section className="relative z-10 flex min-h-screen items-center justify-center px-6 pt-16">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[120px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-accent/5 blur-[120px] animate-float" style={{ animationDelay: "3s" }} />

        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 mb-8">
              <Zap className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-medium text-primary tracking-wide">
                AI-Powered Forensic Intelligence
              </span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] mb-6"
          >
            <span className="text-foreground">Detect Document</span>
            <br />
            <span className="gradient-text">Fraud Instantly</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            AI-powered forensic intelligence for the digital era. Multi-layer analysis
            engine with explainable AI, real-time scoring, and enterprise-grade security.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/dashboard"
              className="btn-primary-glow rounded-xl px-8 py-3.5 text-base font-semibold inline-flex items-center justify-center gap-2"
            >
              <Shield className="h-5 w-5" />
              Analyze Document
              <ChevronRight className="h-4 w-4" />
            </Link>
            <a
              href="#features"
              className="rounded-xl border border-border px-8 py-3.5 text-base font-semibold text-foreground hover:bg-muted transition-colors inline-flex items-center justify-center gap-2"
            >
              Learn More
            </a>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="glass-panel p-1 rounded-2xl">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border/50">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 text-center"
                >
                  <div className="text-2xl sm:text-3xl font-bold font-mono neon-text">{stat.value}</div>
                  <div className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="gradient-text">Multi-Layer</span> Forensic Engine
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Four specialized AI modules work in concert to deliver comprehensive document authenticity analysis.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-panel-hover p-6 group"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4 group-hover:bg-primary/20 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-base font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-panel p-12 sm:p-16 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
            <div className="relative">
              <Shield className="h-12 w-12 text-primary mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4 text-foreground">
                Start Analyzing Documents
              </h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Upload any document and get instant forensic analysis with explainable AI insights.
              </p>
              <Link
                to="/dashboard"
                className="btn-primary-glow rounded-xl px-8 py-3.5 text-base font-semibold inline-flex items-center gap-2"
              >
                Launch Analyzer
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/50 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-primary" />
            <span className="text-sm text-muted-foreground">
              ForensiX AI — Intelligent Document Fraud Detection
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            Enterprise-grade forensic analysis platform
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
