import { motion } from 'framer-motion';

interface OwlIconProps {
  size?: number;
  animated?: boolean;
}

export default function OwlIcon({ size = 40, animated = false }: OwlIconProps) {
  const svg = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Ear tufts */}
      <polygon points="22,22 11,6 25,17" fill="white" />
      <polygon points="58,22 69,6 55,17" fill="white" />
      {/* Head */}
      <polygon points="40,9 58,20 58,40 40,48 22,40 22,20" fill="white" />
      {/* Body */}
      <polygon points="16,52 64,52 68,90 12,90" fill="rgba(255,255,255,0.92)" />
      {/* Wings */}
      <polygon points="16,56 2,74 17,82" fill="rgba(255,255,255,0.65)" />
      <polygon points="64,56 78,74 63,82" fill="rgba(255,255,255,0.65)" />
      {/* Eye glow rings */}
      <circle cx="30" cy="29" r="10" fill="rgba(192,57,43,0.2)" />
      <circle cx="50" cy="29" r="10" fill="rgba(192,57,43,0.2)" />
      {/* Eyes */}
      <circle cx="30" cy="29" r="7.5" fill="#C0392B" />
      <circle cx="50" cy="29" r="7.5" fill="#C0392B" />
      {/* Pupils */}
      <circle cx="30" cy="29" r="4" fill="#080808" />
      <circle cx="50" cy="29" r="4" fill="#080808" />
      {/* Eye shine */}
      <circle cx="32" cy="27" r="1.8" fill="white" opacity="0.55" />
      <circle cx="52" cy="27" r="1.8" fill="white" opacity="0.55" />
      {/* Beak */}
      <polygon points="36,38 44,38 40,44" fill="#bbbbbb" />
      {/* Belly lines */}
      <path d="M28,64 Q40,58 52,64" stroke="rgba(0,0,0,0.12)" strokeWidth="1.5" fill="none" />
      <path d="M26,74 Q40,68 54,74" stroke="rgba(0,0,0,0.12)" strokeWidth="1.5" fill="none" />
    </svg>
  );

  if (animated) {
    return (
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        {svg}
      </motion.div>
    );
  }
  return svg;
}
