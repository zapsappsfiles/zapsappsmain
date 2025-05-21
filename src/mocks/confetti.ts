// Mock for canvas-confetti

interface ConfettiOptions {
  particleCount?: number;
  angle?: number;
  spread?: number;
  startVelocity?: number;
  decay?: number;
  gravity?: number;
  drift?: number;
  ticks?: number;
  origin?: {
    x?: number;
    y?: number;
  };
  colors?: string[];
  shapes?: string[];
  scalar?: number;
  zIndex?: number;
  disableForReducedMotion?: boolean;
}

const confetti = (options?: ConfettiOptions): Promise<null> => {
  console.log('Mock confetti called with options:', options);
  return Promise.resolve(null);
};

export default confetti;
export type { ConfettiOptions as Options }; 