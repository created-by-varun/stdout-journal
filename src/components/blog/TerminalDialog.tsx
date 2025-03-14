import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface TerminalDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  content?: React.ReactNode;
}

const TerminalDialog = ({
  isOpen = false,
  onClose,
  title = "Terminal",
  content,
}: TerminalDialogProps) => {
  const [visible, setVisible] = useState(false);
  const [typedTitle, setTypedTitle] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const [showScanlines, setShowScanlines] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      setTypedTitle("");
      // Show scanlines effect after a short delay
      setTimeout(() => setShowScanlines(true), 400);
    } else {
      setShowScanlines(false);
      setTimeout(() => setVisible(false), 300);
    }
  }, [isOpen]);

  // Typing effect for the title
  useEffect(() => {
    if (isOpen && typedTitle.length < title.length) {
      const timeout = setTimeout(() => {
        setTypedTitle(title.substring(0, typedTitle.length + 1));
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [typedTitle, title, isOpen]);

  // Blinking cursor effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.8, y: 50, opacity: 0 }}
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 300,
              duration: 0.4,
            }}
            className={`bg-black border-2 border-green-500 rounded-md w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col relative ${showScanlines ? "after:content-[''] after:absolute after:inset-0 after:bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.1)_50%)] after:bg-size-[100%_4px] after:pointer-events-none after:opacity-20" : ""}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Terminal header */}
            <motion.div
              initial={{ backgroundColor: "#000" }}
              animate={{ backgroundColor: "#22c55e" }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="flex items-center justify-between bg-green-500 px-4 py-2 text-black"
            >
              <div className="flex items-center">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                  className="font-mono font-bold"
                >
                  {typedTitle}
                  {cursorVisible && <span className="ml-1">_</span>}
                </motion.span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 rounded-full bg-black/10 hover:bg-black/20 text-black"
                onClick={onClose}
              >
                <X className="h-4 w-4" />
              </Button>
            </motion.div>

            {/* Terminal content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.3 }}
              className="flex-1 p-4 font-mono text-green-500 overflow-y-auto"
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.3 }}
                className="mb-2"
              >
                <span className="text-green-500">user@stdout</span>:~$ cat
                {title.toLowerCase()}.txt
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="pl-4 border-l-2 border-green-500/30"
              >
                {content}
              </motion.div>
            </motion.div>

            {/* Terminal footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.3 }}
              className="border-t border-green-500/30 p-2 text-green-500/70 text-sm"
            >
              <span className="text-green-500">user@stdout</span>:~$ |
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TerminalDialog;
