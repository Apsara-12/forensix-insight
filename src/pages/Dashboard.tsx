import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText, Brain, Fingerprint, PenTool, Database,
  Download, ArrowLeft, Shield, AlertTriangle, CheckCircle2
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import Navbar from "@/components/forensix/Navbar";
import FileUpload from "@/components/forensix/FileUpload";
import ConfidenceMeter from "@/components/forensix/ConfidenceMeter";
import ScoreCard from "@/components/forensix/ScoreCard";
import ParticleBackground from "@/components/forensix/ParticleBackground";
import { runAnalysis, type AnalysisResult } from "@/lib/analysisEngine";
import { generateReport } from "@/lib/reportGenerator";

const Dashboard = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleFileSelect = useCallback((file: File) => {
    setIsAnalyzing(true);
    setResult(null);
    // Simulate analysis time for visual effect
    setTimeout(() => {
      const analysisResult = runAnalysis(file);
      setResult(analysisResult);
      setIsAnalyzing(false);
    }, 3000);
  }, []);

  const handleReset = () => {
    setResult(null);
    setIsAnalyzing(false);
  };

  const chartData = result?.scoreBreakdown.map((b) => ({
    name: b.module.split(" ")[0],
    score: parseFloat((b.score * 100).toFixed(1)),
    weighted: parseFloat((b.weighted * 100).toFixed(2)),
  }));

  const getBarColor = (score: number) => {
    if (score > 60) return "hsl(0, 75%, 55%)";
    if (score > 35) return "hsl(38, 90%, 55%)";
    return "hsl(145, 70%, 45%)";
  };

  return (
    <div className="min-h-screen bg-background relative">
      <ParticleBackground />
      <Navbar />

      <div className="relative z-10 pt-24 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            {result && (
              <button
                onClick={handleReset}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
              >
                <ArrowLeft className="h-4 w-4" />
                New Analysis
              </button>
            )}
            <h1 className="text-3xl font-bold text-foreground">
              {result ? "Analysis Results" : "Document Analysis"}
            </h1>
            <p className="text-muted-foreground mt-1">
              {result
                ? `Case ${result.caseId} • Analyzed ${new Date(result.analyzedAt).toLocaleString()}`
                : "Upload a document to begin forensic analysis"}
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            {!result ? (
              <motion.div
                key="upload"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <FileUpload onFileSelect={handleFileSelect} isAnalyzing={isAnalyzing} />

                {/* Analysis modules info */}
                {!isAnalyzing && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8"
                  >
                    {[
                      { icon: <Database className="h-5 w-5" />, title: "Metadata", weight: "25%" },
                      { icon: <Brain className="h-5 w-5" />, title: "Linguistic", weight: "30%" },
                      { icon: <Fingerprint className="h-5 w-5" />, title: "Signature", weight: "25%" },
                      { icon: <PenTool className="h-5 w-5" />, title: "Handwriting", weight: "20%" },
                    ].map((m, i) => (
                      <motion.div
                        key={m.title}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + i * 0.1 }}
                        className="glass-panel p-4 flex items-center gap-3"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          {m.icon}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">{m.title}</p>
                          <p className="text-xs text-muted-foreground">Weight: {m.weight}</p>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                {/* Top: Verdict + Confidence */}
                <div className="grid lg:grid-cols-3 gap-6">
                  {/* Verdict Card */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="glass-panel p-8 flex flex-col items-center justify-center lg:col-span-1"
                  >
                    <ConfidenceMeter
                      confidence={result.confidence}
                      verdict={result.verdict}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.5 }}
                      className="mt-6 text-center"
                    >
                      <div className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold ${
                        result.verdict === "FORGED"
                          ? "bg-destructive/10 text-destructive border border-destructive/20"
                          : "bg-success/10 text-success border border-success/20"
                      }`}>
                        {result.verdict === "FORGED"
                          ? <AlertTriangle className="h-4 w-4" />
                          : <CheckCircle2 className="h-4 w-4" />
                        }
                        {result.verdict}
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Info + Explanation */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="glass-panel p-6 lg:col-span-2 flex flex-col"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <Shield className="h-5 w-5 text-primary" />
                      <h2 className="text-base font-semibold text-foreground">AI Explanation</h2>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                      {result.explanation}
                    </p>

                    <div className="grid sm:grid-cols-2 gap-4 mb-6">
                      <div className="rounded-lg bg-muted/50 p-3">
                        <p className="text-xs text-muted-foreground mb-1">Document</p>
                        <p className="text-sm font-medium text-foreground truncate">{result.fileName}</p>
                      </div>
                      <div className="rounded-lg bg-muted/50 p-3">
                        <p className="text-xs text-muted-foreground mb-1">Highest Risk Module</p>
                        <p className="text-sm font-medium text-foreground">{result.highestContributor}</p>
                      </div>
                      <div className="rounded-lg bg-muted/50 p-3">
                        <p className="text-xs text-muted-foreground mb-1">Final Score</p>
                        <p className="text-sm font-mono font-bold text-foreground">{(result.finalScore * 100).toFixed(2)}%</p>
                      </div>
                      <div className="rounded-lg bg-muted/50 p-3">
                        <p className="text-xs text-muted-foreground mb-1">Case ID</p>
                        <p className="text-sm font-mono font-medium text-primary">{result.caseId}</p>
                      </div>
                    </div>

                    <div className="mt-auto flex gap-3">
                      <button
                        onClick={() => generateReport(result)}
                        className="btn-primary-glow rounded-lg px-5 py-2.5 text-sm inline-flex items-center gap-2"
                      >
                        <Download className="h-4 w-4" />
                        Download PDF Report
                      </button>
                    </div>
                  </motion.div>
                </div>

                {/* Score Cards */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <ScoreCard
                    title="Metadata Forensics"
                    score={result.metadata.metadata_score}
                    weight={0.25}
                    weighted={result.scoreBreakdown[0].weighted}
                    icon={<Database className="h-5 w-5" />}
                    delay={0.5}
                    details={result.metadata.metadata_evidence}
                  />
                  <ScoreCard
                    title="Linguistic Analysis"
                    score={result.linguistic.linguistic_score}
                    weight={0.30}
                    weighted={result.scoreBreakdown[1].weighted}
                    icon={<Brain className="h-5 w-5" />}
                    delay={0.6}
                    details={[result.linguistic.explanation]}
                  />
                  <ScoreCard
                    title="Signature Authenticity"
                    score={result.signature.signature_score}
                    weight={0.25}
                    weighted={result.scoreBreakdown[2].weighted}
                    icon={<Fingerprint className="h-5 w-5" />}
                    delay={0.7}
                    details={[`Similarity index: ${(result.signature.similarity_index * 100).toFixed(1)}%`]}
                  />
                  <ScoreCard
                    title="Handwriting Consistency"
                    score={result.handwriting.handwriting_score}
                    weight={0.20}
                    weighted={result.scoreBreakdown[3].weighted}
                    icon={<PenTool className="h-5 w-5" />}
                    delay={0.8}
                    details={[`${result.handwriting.anomaly_map.length} anomaly point(s) detected`]}
                  />
                </div>

                {/* Chart */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="glass-panel p-6"
                >
                  <h2 className="text-base font-semibold text-foreground mb-6">Risk Score Distribution</h2>
                  <div className="h-[280px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData} barSize={40}>
                        <XAxis
                          dataKey="name"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 12 }}
                        />
                        <YAxis
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 12 }}
                          domain={[0, 100]}
                        />
                        <Tooltip
                          contentStyle={{
                            background: "hsl(220, 20%, 7%)",
                            border: "1px solid hsl(220, 15%, 16%)",
                            borderRadius: "8px",
                            color: "hsl(210, 40%, 95%)",
                            fontSize: 12,
                          }}
                        />
                        <Bar dataKey="score" radius={[6, 6, 0, 0]} name="Risk Score (%)">
                          {chartData?.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={getBarColor(entry.score)} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>

                {/* Mathematical Breakdown */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                  className="glass-panel p-6"
                >
                  <h2 className="text-base font-semibold text-foreground mb-4">Score Calculation</h2>
                  <div className="font-mono text-sm space-y-2 text-muted-foreground">
                    {result.scoreBreakdown.map((b) => (
                      <div key={b.module} className="flex flex-wrap items-center gap-x-2">
                        <span className="text-foreground">{b.module}:</span>
                        <span>{(b.score * 100).toFixed(1)}%</span>
                        <span className="text-primary">×</span>
                        <span>{(b.weight * 100).toFixed(0)}%</span>
                        <span className="text-primary">=</span>
                        <span className="text-foreground font-bold">{(b.weighted * 100).toFixed(2)}%</span>
                      </div>
                    ))}
                    <div className="border-t border-border/50 pt-2 mt-3">
                      <span className="text-foreground font-bold">Final Score = {(result.finalScore * 100).toFixed(2)}%</span>
                      <span className="ml-4">
                        {result.finalScore > 0.6
                          ? "( > 60% → FORGED )"
                          : "( ≤ 60% → GENUINE )"
                        }
                      </span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
