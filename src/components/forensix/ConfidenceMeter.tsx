import { motion } from "framer-motion";

interface ConfidenceMeterProps {
  confidence: number;
  verdict: "GENUINE" | "FORGED";
  size?: number;
}

const ConfidenceMeter = ({ confidence, verdict, size = 200 }: ConfidenceMeterProps) => {
  const strokeWidth = 8;
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (confidence / 100) * circumference;
  const isForged = verdict === "FORGED";

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      {/* Glow background */}
      <div
        className="absolute inset-0 rounded-full blur-2xl opacity-20"
        style={{
          background: isForged
            ? "radial-gradient(circle, hsl(0 75% 55%), transparent)"
            : "radial-gradient(circle, hsl(145 70% 45%), transparent)",
        }}
      />

      <svg width={size} height={size} className="rotate-[-90deg]">
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="hsl(220, 15%, 16%)"
          strokeWidth={strokeWidth}
        />
        {/* Progress arc */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={isForged ? "hsl(0, 75%, 55%)" : "hsl(145, 70%, 45%)"}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - progress }}
          transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
          style={{
            filter: isForged
              ? "drop-shadow(0 0 8px hsl(0, 75%, 55%))"
              : "drop-shadow(0 0 8px hsl(145, 70%, 45%))",
          }}
        />
      </svg>

      {/* Center text */}
      <div className="absolute flex flex-col items-center">
        <motion.span
          className="text-3xl font-bold font-mono"
          style={{ color: isForged ? "hsl(0, 75%, 55%)" : "hsl(145, 70%, 45%)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {confidence.toFixed(1)}%
        </motion.span>
        <motion.span
          className="text-xs font-medium text-muted-foreground mt-1 uppercase tracking-widest"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          Confidence
        </motion.span>
      </div>
    </div>
  );
};

export default ConfidenceMeter;
