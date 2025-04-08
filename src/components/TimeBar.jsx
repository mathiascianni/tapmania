import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const TimerBar = ({ duration = 60, onEnd }) => {
  const [progress, setProgress] = useState(100);
  const [secondsLeft, setSecondsLeft] = useState(duration);

  useEffect(() => {
    const interval = 100; // ms
    const totalSteps = (duration * 1000) / interval;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const newProgress = Math.max(100 - (step / totalSteps) * 100, 0);
      const timeLeft = Math.ceil(duration - (step * interval) / 1000);

      setProgress(newProgress);
      setSecondsLeft(timeLeft);

      if (step >= totalSteps) {
        clearInterval(timer);
        onEnd?.();
      }
    }, interval);

    return () => clearInterval(timer);
  }, [duration, onEnd]);

  return (
    <div className="w-full bg-gray-300 rounded h-4 overflow-hidden relative">
      <motion.div
        className={`h-full transition-all ${
          progress <= 50
            ? progress <= 25
              ? "bg-red-500"
              : "bg-yellow-500"
            : "bg-green-500"
        }`}
        initial={{ width: "100%" }}
        animate={{ width: `${progress}%` }}
        transition={{ ease: "linear", duration: 0.1 }}
      />
      <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm font-semibold text-white drop-shadow">
        {secondsLeft}s
      </p>
    </div>
  );
};

export default TimerBar;
