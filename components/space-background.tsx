"use client";

import React, { useEffect, useState } from "react";

const randomValue = (min: number, max: number) =>
  Math.random() * (max - min) + min;

const getStarColor = () => {
  const colors = ["#ffffff", "#ffcc00", "#66ccff", "#ccff66"];
  return colors[Math.floor(Math.random() * colors.length)];
};

const SpaceBackground = () => {
  const [stars, setStars] = useState<
    Array<{ id: number; top: string; left: string; size: string; animationDelay: string; color: string; opacity: number }>
  >([]);
  const [shootingStars, setShootingStars] = useState<
    Array<{ id: number; top: string; left: string; size: string; animationDuration: string; tailLength: string; angle: string }>
  >([]);

  useEffect(() => {
    // Generate twinkling stars
    const generatedStars = Array.from({ length: 150 }).map((_, i) => ({
      id: i,
      top: `${randomValue(0, 100)}%`,
      left: `${randomValue(0, 100)}%`,
      size: `${randomValue(1, 2)}px`, // Smaller stars for subtle effect
      animationDelay: `${randomValue(0, 5)}s`,
      color: getStarColor(),
      opacity: randomValue(0.3, 0.7), // Pre-computed opacity
    }));

    // Generate shooting stars
    const generatedShootingStars = Array.from({ length: 5 }).map((_, i) => ({
      id: i,
      top: `${randomValue(10, 90)}%`,
      left: `${randomValue(0, 10)}%`,
      size: `${randomValue(2, 3)}px`, // Smaller meteors
      animationDuration: `${randomValue(2, 3)}s`, // Smooth duration
      tailLength: `${randomValue(50, 100)}px`, // Longer, visible tails
      angle: `${randomValue(-10, 10)}deg`, // Slight trajectory variation
    }));

    setStars(generatedStars);
    setShootingStars(generatedShootingStars);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none bg-black" aria-hidden="true">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black to-blue-900 opacity-80" />

      {/* Twinkling stars */}
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
            opacity: star.opacity, // Use pre-computed opacity
            animation: `twinkle 3s infinite ease-in-out`,
            animationDelay: star.animationDelay,
          }}
        />
      ))}

      {/* Shooting stars */}
      {shootingStars.map((shootingStar) => (
        <div
          key={shootingStar.id}
          className="absolute"
          style={{
            top: shootingStar.top,
            left: shootingStar.left,
            width: shootingStar.size,
            height: shootingStar.size,
            backgroundColor: "#ffffff",
            animation: `shoot ${shootingStar.animationDuration} linear infinite`,
            transform: `rotate(${shootingStar.angle})`,
          }}
        >
          <div
            className="absolute"
            style={{
              width: shootingStar.tailLength,
              height: "2px", // Slightly thicker tail for visibility
              background: "linear-gradient(to right, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0))",
              top: "50%",
              left: "100%",
              transform: "translateY(-50%)",
              animation: `tailFade ${shootingStar.animationDuration} linear infinite`,
            }}
          />
        </div>
      ))}

      {/* Animation styles */}
      <style jsx>{`
        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 1;
          }
        }
        @keyframes shoot {
          0% {
            transform: translate(0, 0);
            opacity: 1;
          }
          100% {
            transform: translate(100vw, -100vh); // Move diagonally across the screen
            opacity: 0;
          }
        }
        @keyframes tailFade {
          0% {
            opacity: 1;
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
