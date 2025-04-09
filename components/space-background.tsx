"use client";

import React, { useEffect, useState } from "react";

const randomValue = (min: number, max: number) =>
  Math.random() * (max - min) + min;

const getStarColor = () => {
  const colors = ["#ffffff", "#ffcc00", "#66ccff", "#ccff66"];
  return colors[Math.floor(Math.random() * colors.length)];
};

type Star = {
  id: number;
  top: string;
  left: string;
  size: string;
  animationDelay: string;
  color: string;
  opacity: number;
};

type ShootingStar = {
  id: number;
  top: string;
  left: string;
  size: string;
  animationDuration: string;
  tailLength: string;
  animationDelay: string;
  rotation: number; // New property for varied curves
};

const SpaceBackground = () => {
  const [stars, setStars] = useState<Star[]>([]);
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);

  // Parallax effect
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 4; // Increased for more noticeable effect
      const y = (e.clientY / window.innerHeight - 0.5) * 4;
      document.documentElement.style.setProperty("--parallax-x", `${x}px`);
      document.documentElement.style.setProperty("--parallax-y", `${y}px`);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  // Generate stars and shooting stars
  useEffect(() => {
    const generatedStars = Array.from({ length: 100 }).map((_, i) => ({
      id: i,
      top: `${randomValue(0, 100)}%`,
      left: `${randomValue(0, 100)}%`,
      size: `${randomValue(0.8, 2.5)}px`, // Wider size range for variety
      animationDelay: `${randomValue(0, 5)}s`,
      color: getStarColor(),
      opacity: randomValue(0.2, 0.8), // Broader opacity range
    }));

    const generatedShootingStars = Array.from({ length: 4 }).map((_, i) => ({
      id: i,
      top: `${randomValue(5, 85)}%`, // Adjusted range for better distribution
      left: `${randomValue(0, 20)}%`,
      size: `2px`,
      animationDuration: `${randomValue(1.5, 3)}s`, // Slightly faster range
      tailLength: `${randomValue(50, 100)}px`, // Longer possible tails
      animationDelay: `${randomValue(5, 20)}s`, // More frequent appearances
      rotation: randomValue(5, 15), // Random rotation for varied curves
    }));

    setStars(generatedStars);
    setShootingStars(generatedShootingStars);
  }, []);

  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none bg-black"
      aria-hidden="true"
      style={{
        transform: "translate(var(--parallax-x, 0), var(--parallax-y, 0))",
        transition: "transform 0.2s ease-out",
      }}
    >
      {/* Dim background image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1477201389073-1863f668fac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')`,
        }}
      />

      {/* Nebula overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: "radial-gradient(circle at 70% 30%, rgba(100, 150, 255, 0.3), transparent 70%)",
        }}
      />

      {/* Stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            backgroundColor: star.color,
            opacity: star.opacity,
            animation: `twinkle ${randomValue(2, 4)}s infinite ease-in-out`, // Varied twinkle speed
            animationDelay: star.animationDelay,
            boxShadow: `0 0 ${randomValue(1, 3)}px ${star.color}`, // Subtle glow
          }}
        />
      ))}

      {/* Shooting stars */}
      {shootingStars.map((s) => (
        <div
          key={s.id}
          className="absolute"
          style={{
            top: s.top,
            left: s.left,
            width: s.tailLength,
            height: "2px",
            animation: `shoot ${s.animationDuration} ${s.animationDelay} cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite`,
            transformOrigin: "left center",
          }}
        >
          {/* Star head */}
          <div
            style={{
              width: s.size,
              height: s.size,
              backgroundColor: "#fff",
              borderRadius: "50%",
              position: "absolute",
              left: 0,
              top: "50%",
              transform: "translateY(-50%)",
              boxShadow: "0 0 4px 1px rgba(255, 255, 255, 0.8)", // Glowing head
            }}
          />
          {/* Trail */}
          <div
            style={{
              position: "absolute",
              left: s.size,
              top: "50%",
              width: "100%",
              height: "100%",
              background: "linear-gradient(to right, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.3), transparent)",
              transform: "translateY(-50%)",
              animation: `tailFade ${s.animationDuration} ${s.animationDelay} cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite`,
              boxShadow: "0 0 6px rgba(255, 255, 255, 0.5)", // Glowing trail
            }}
          />
        </div>
      ))}

      {/* Animations */}
      <style jsx>{`
        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.8;
          }
        }

        @keyframes shoot {
          0% {
            transform: translate(0, 0);
            opacity: 1;
          }
          50% {
            transform: translate(30vw, 40vh) rotate(${({ rotation }) => rotation}deg); /* Dynamic rotation */
            opacity: 0.7;
          }
          100% {
            transform: translate(60vw, 80vh);
            opacity: 0;
          }
        }

        @keyframes tailFade {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
          100% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default SpaceBackground;