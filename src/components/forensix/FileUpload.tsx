import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, X, Scan } from "lucide-react";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  isAnalyzing: boolean;
}

const FileUpload = ({ onFileSelect, isAnalyzing }: FileUploadProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragActive(false);
      const file = e.dataTransfer.files[0];
      if (file) {
        setSelectedFile(file);
        onFileSelect(file);
      }
    },
    [onFileSelect]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setSelectedFile(file);
        onFileSelect(file);
      }
    },
    [onFileSelect]
  );

  const clearFile = () => setSelectedFile(null);

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1048576).toFixed(1)} MB`;
  };

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {isAnalyzing ? (
          <motion.div
            key="scanning"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="glass-panel relative overflow-hidden p-12 flex flex-col items-center justify-center min-h-[280px]"
          >
            <div className="scan-line" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              className="mb-4"
            >
              <Scan className="h-12 w-12 text-primary" />
            </motion.div>
            <p className="text-lg font-semibold text-foreground mb-2">Forensic Analysis in Progress</p>
            <p className="text-sm text-muted-foreground">Running multi-layer document intelligence...</p>
            <div className="mt-6 flex gap-2">
              {["Metadata", "Linguistic", "Signature", "Handwriting"].map((mod, i) => (
                <motion.span
                  key={mod}
                  initial={{ opacity: 0.3 }}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.3 }}
                  className="px-3 py-1 rounded-full text-xs font-mono bg-primary/10 text-primary border border-primary/20"
                >
                  {mod}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ) : selectedFile ? (
          <motion.div
            key="file"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="glass-panel p-8 flex items-center gap-6"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary flex-shrink-0">
              <FileText className="h-7 w-7" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">{selectedFile.name}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {formatSize(selectedFile.size)} • {selectedFile.type || "Unknown type"}
              </p>
            </div>
            <button
              onClick={clearFile}
              className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-lg hover:bg-muted"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="upload"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <label
              onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
              onDragLeave={() => setDragActive(false)}
              onDrop={handleDrop}
              className={`glass-panel cursor-pointer flex flex-col items-center justify-center min-h-[280px] p-12 transition-all duration-300 ${
                dragActive ? "neon-border bg-primary/5" : "hover:border-primary/30"
              }`}
            >
              <input
                type="file"
                onChange={handleChange}
                className="hidden"
                accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.tiff,.bmp"
              />
              <motion.div
                animate={dragActive ? { scale: 1.1, y: -5 } : { scale: 1, y: 0 }}
                className="mb-4"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Upload className="h-8 w-8" />
                </div>
              </motion.div>
              <p className="text-base font-semibold text-foreground mb-1">
                Drop your document here
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                or click to browse files
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {["PDF", "DOC", "DOCX", "PNG", "JPG", "TIFF"].map((fmt) => (
                  <span
                    key={fmt}
                    className="px-2.5 py-1 rounded-md text-xs font-mono bg-muted text-muted-foreground"
                  >
                    .{fmt.toLowerCase()}
                  </span>
                ))}
              </div>
            </label>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FileUpload;
