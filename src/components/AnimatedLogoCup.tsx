import React, { useEffect, useRef } from 'react';
import { motion, useAnimationControls } from 'framer-motion';

interface AnimatedLogoCupProps {
  isHovered?: boolean;
}

export const AnimatedLogoCup: React.FC<AnimatedLogoCupProps> = ({ isHovered = false }) => {
  const liquidControls = useAnimationControls();
  const steamControls = useAnimationControls();
  const isPouringRef = useRef(false);
  const prevHoveredRef = useRef(false);
  const hasMountedRef = useRef(false);

  // 1. Initial page load auto-fill animation (triggers smoothly on first appearance / mobile)
  useEffect(() => {
    hasMountedRef.current = true;

    // Start in empty state
    liquidControls.set({ y: 15 });
    steamControls.set({ opacity: 0, y: 1 });

    // Smooth initial pour on page entry
    const timer = setTimeout(() => {
      liquidControls
        .start({
          y: 0,
          transition: {
            duration: 1.15,
            ease: [0.22, 1, 0.36, 1],
          },
        })
        .then(() => {
          // Continuous gentle steam rise once filled
          steamControls.start({
            opacity: [0, 0.7, 0.7, 0],
            y: [1, -2, -5, -8],
            transition: {
              duration: 2.6,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          });
        });
    }, 200);

    return () => clearTimeout(timer);
  }, [liquidControls, steamControls]);

  // Performs a silky smooth pour with zero hesitation, frame drops, or DOM recreations
  const triggerPour = async () => {
    if (isPouringRef.current) return;
    isPouringRef.current = true;

    // 1. Smooth, gentle liquid dip (natural fluid draining without instant 0ms snap)
    await liquidControls.start({
      y: 15,
      transition: {
        duration: 0.22,
        ease: 'easeInOut',
      },
    });

    // 2. Rising fresh pour with rich coffee & golden crema
    await liquidControls.start({
      y: 0,
      transition: {
        duration: 0.95,
        ease: [0.22, 1, 0.36, 1],
      },
    });

    // 3. Gentle steam resumption
    steamControls.start({
      opacity: [0, 0.7, 0.7, 0],
      y: [1, -2, -5, -8],
      transition: {
        duration: 2.6,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    });

    isPouringRef.current = false;
  };

  // 2. Pointing cursor at the logo triggers filling animation cleanly without tremor
  useEffect(() => {
    if (!hasMountedRef.current) return;

    // Only fire on distinct hover entry, preventing mouse jitter re-triggers
    if (isHovered && !prevHoveredRef.current) {
      triggerPour();
    }
    prevHoveredRef.current = isHovered;
  }, [isHovered]);

  const handleTap = () => {
    triggerPour();
  };

  return (
    <div
      onClick={handleTap}
      className="relative flex items-center justify-center w-full h-full cursor-pointer select-none"
    >
      <svg
        viewBox="0 0 32 32"
        className="w-7 h-7 sm:w-8 sm:h-8 pointer-events-none select-none drop-shadow-[0_2px_8px_rgba(217,142,58,0.25)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Clip path matching inside of the cup interior */}
          <clipPath id="aura-cup-liquid-clip">
            <path d="M7.5 12 L9.6 22.8 C10 24.5 11.6 25.5 14.5 25.5 L16.5 25.5 C19.4 25.5 21 24.5 21.4 22.8 L23.5 12 Z" />
          </clipPath>

          {/* Rich coffee roast gradient */}
          <linearGradient id="aura-coffee-liquid-grad" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#381D0C" />
            <stop offset="40%" stopColor="#5E3114" />
            <stop offset="85%" stopColor="#874C23" />
            <stop offset="100%" stopColor="#A6612F" />
          </linearGradient>

          {/* Ceramic cup glaze gradient */}
          <linearGradient id="aura-cup-ceramic-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F9F6F0" />
            <stop offset="50%" stopColor="#E5A85C" />
            <stop offset="100%" stopColor="#C87A2E" />
          </linearGradient>
        </defs>

        {/* Delicate steam wisps above the cup */}
        <motion.g
          animate={steamControls}
          initial={{ opacity: 0, y: 1 }}
        >
          <path
            d="M12 9 C11.2 7.5 12.8 6 12 4"
            stroke="#E5A85C"
            strokeWidth="1.1"
            strokeLinecap="round"
          />
          <path
            d="M15.5 8.5 C14.7 6.8 16.5 5.2 15.5 3.5"
            stroke="#F5C082"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <path
            d="M19 9 C18.2 7.5 19.8 6 19 4"
            stroke="#E5A85C"
            strokeWidth="1.1"
            strokeLinecap="round"
          />
        </motion.g>

        {/* Cup Saucer Base */}
        <path
          d="M7 27.5 C11 29 20 29 24 27.5"
          stroke="url(#aura-cup-ceramic-grad)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Cup Handle on the right */}
        <path
          d="M22.5 14.5 C26.2 14.5 27.5 19.5 21.6 21"
          stroke="url(#aura-cup-ceramic-grad)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />

        {/* Empty Cup Interior Background */}
        <path
          d="M7.5 12 L9.6 22.8 C10 24.5 11.6 25.5 14.5 25.5 L16.5 25.5 C19.4 25.5 21 24.5 21.4 22.8 L23.5 12 Z"
          fill="#140E0A"
        />

        {/* Liquid filling animation inside the cup clip path */}
        <g clipPath="url(#aura-cup-liquid-clip)">
          <motion.g
            animate={liquidControls}
            initial={{ y: 15 }}
          >
            {/* Deep Coffee Body */}
            <rect
              x="6"
              y="11.5"
              width="19"
              height="15"
              fill="url(#aura-coffee-liquid-grad)"
            />

            {/* Golden Crema Top Band */}
            <rect x="6" y="11.5" width="19" height="2.2" fill="#E5A85C" />

            {/* Microfoam Highlight Reflection */}
            <line
              x1="9"
              y1="12.2"
              x2="22"
              y2="12.2"
              stroke="#FFF5EA"
              strokeWidth="0.7"
              strokeLinecap="round"
              opacity="0.8"
            />
          </motion.g>
        </g>

        {/* Cup Outer Ceramic Body Outline */}
        <path
          d="M7 12 L9.5 23 C10 25 11.8 26 14.5 26 L16.5 26 C19.2 26 21 25 21.5 23 L24 12 Z"
          stroke="url(#aura-cup-ceramic-grad)"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />

        {/* Cup Rim Ellipse for 3D depth */}
        <ellipse
          cx="15.5"
          cy="12"
          rx="8.5"
          ry="1.6"
          stroke="url(#aura-cup-ceramic-grad)"
          strokeWidth="1.3"
        />
      </svg>
    </div>
  );
};
