import { motion } from "framer-motion";

interface ScoreCardProps {
  title: string;
  score: number;
  weight: number;
  weighted: number;
  icon: React.ReactNode;
  delay?: number;
  details?: string[];
}

const ScoreCard = ({ title, score, weight, weighted, icon, delay = 0, details }: ScoreCardProps) => {
  const riskColor =
    score > 0.6 ? "text-destructive" : score > 0.35 ? "text-warning" : "text-success";
  const barColor =
    score > 0.6 ? "bg-destructive" : score > 0.35 ? "bg-warning" : "bg-success";
  const riskLevel = score > 0.6 ? "HIGH" : score > 0.35 ? "MEDIUM" : "LOW";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="glass-panel-hover p-5"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            {icon}
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">{title}</h3>
            <p className="text-xs text-muted-foreground">Weight: {(weight * 100).toFixed(0)}%</p>
          </div>
        </div>
        <span className={`text-xs font-mono font-bold ${riskColor} uppercase tracking-wider`}>
          {riskLevel}
        </span>
      </div>

      {/* Score bar */}
      <div className="mb-3">
        <div className="flex justify-between text-xs mb-1.5">
          <span className="text-muted-foreground">Risk Score</span>
          <span className={`font-mono font-bold ${riskColor}`}>{(score * 100).toFixed(1)}%</span>
        </div>
        <div className="h-2 rounded-full bg-muted overflow-hidden">
          <motion.div
            className={`h-full rounded-full ${barColor}`}
            initial={{ width: 0 }}
            animate={{ width: `${score * 100}%` }}
            transition={{ delay: delay + 0.3, duration: 1, ease: "easeOut" }}
            style={{
              boxShadow: score > 0.6
                ? "0 0 10px hsl(0, 75%, 55%, 0.5)"
                : score > 0.35
                ? "0 0 10px hsl(38, 90%, 55%, 0.5)"
                : "0 0 10px hsl(145, 70%, 45%, 0.5)",
            }}
          />
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        Weighted contribution: <span className="font-mono text-foreground">{(weighted * 100).toFixed(2)}%</span>
      </p>

      {details && details.length > 0 && (
        <div className="mt-3 pt-3 border-t border-border/50 space-y-1.5">
          {details.slice(0, 3).map((d, i) => (
            <p key={i} className="text-xs text-muted-foreground flex items-start gap-2">
              <span className={`mt-1 h-1.5 w-1.5 rounded-full flex-shrink-0 ${barColor}`} />
              {d}
            </p>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default ScoreCard;
