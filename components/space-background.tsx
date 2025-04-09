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
  depth: number;
};

type ShootingStar = {
  id: number;
  top: string;
  left: string;
  size: string;
  animationDuration: string;
  tailLength: string;
  animationDelay: string;
  rotation: number;
};

const SpaceBackground = () => {
  const [stars, setStars] = useState<Star[]>([]);
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 4;
      const y = (e.clientY / window.innerHeight - 0.5) * 4;
      document.documentElement.style.setProperty("--parallax-x", `${x}px`);
      document.documentElement.style.setProperty("--parallax-y", `${y}px`);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  useEffect(() => {
    const layers = 3;
    const generatedStars: Star[] = [];
    for (let depth = 0; depth < layers; depth++) {
      const count = 30 - depth * 5;
      for (let i = 0; i < count; i++) {
        generatedStars.push({
          id: depth * 100 + i,
          top: `${randomValue(0, 100)}%`,
          left: `${randomValue(0, 100)}%`,
          size: `${randomValue(0.8, 2.5 - depth)}px`,
          animationDelay: `${randomValue(0, 5)}s`,
          color: getStarColor(),
          opacity: randomValue(0.2, 0.8),
          depth,
        });
      }
    }
    setStars(generatedStars);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const id = Date.now();
      const newStar: ShootingStar = {
        id,
        top: `${randomValue(5, 85)}%`,
        left: `${randomValue(0, 20)}%`,
        size: `2px`,
        animationDuration: `${randomValue(1.5, 3)}s`,
        tailLength: `${randomValue(50, 100)}px`,
        animationDelay: `0s`,
        rotation: randomValue(5, 15),
      };
      setShootingStars((prev) => [...prev, newStar]);
      setTimeout(() => {
        setShootingStars((prev) => prev.filter((s) => s.id !== id));
      }, 3000);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    const id = Date.now();
    const newStar: ShootingStar = {
      id,
      top: `${(e.clientY / window.innerHeight) * 100}%`,
      left: `${(e.clientX / window.innerWidth) * 100}%`,
      size: `2px`,
      animationDuration: `2s`,
      tailLength: `${randomValue(50, 100)}px`,
      animationDelay: `0s`,
      rotation: randomValue(-20, 20),
    };
    setShootingStars((prev) => [...prev, newStar]);
    setTimeout(() => {
      setShootingStars((prev) => prev.filter((s) => s.id !== id));
    }, 2000);
  };

  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none bg-black"
      aria-hidden="true"
      style={{
        transform: "translate(var(--parallax-x, 0), var(--parallax-y, 0))",
        transition: "transform 0.2s ease-out",
        zIndex: -1,
      }}
      onClick={handleClick}
    >
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1477201389073-1863f668fac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')`,
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(120deg, rgba(0, 255, 200, 0.08), rgba(0, 100, 255, 0.06), transparent)",
          backgroundSize: "200% 200%",
          animationName: "auroraMove",
          animationDuration: "40s",
          animationTimingFunction: "ease-in-out",
          animationIterationCount: "infinite",
          mixBlendMode: "screen",
          zIndex: 1,
        }}
      />

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
            animationName: "twinkle",
            animationDuration: `${randomValue(2, 4)}s`,
            animationTimingFunction: "ease-in-out",
            animationIterationCount: "infinite",
            animationDelay: star.animationDelay,
            boxShadow: `0 0 ${randomValue(1, 3)}px ${star.color}`,
            transform: `translateZ(${star.depth}px)`
          }}
        />
      ))}

      {shootingStars.map((s) => (
        <div
          key={s.id}
          className="absolute"
          style={{
            top: s.top,
            left: s.left,
            width: s.tailLength,
            height: "2px",
            animationName: "shoot",
            animationDuration: s.animationDuration,
            animationTimingFunction: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
            animationIterationCount: "infinite",
            animationDelay: s.animationDelay,
            transformOrigin: "left center",
            transform: `rotate(${s.rotation}deg)`
          }}
        >
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
              boxShadow: "0 0 4px 1px rgba(255, 255, 255, 0.8)",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: s.size,
              top: "50%",
              width: "100%",
              height: "100%",
              background: "linear-gradient(to right, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.3), transparent)",
              transform: "translateY(-50%)",
              animationName: "tailFade",
              animationDuration: s.animationDuration,
              animationTimingFunction: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
              animationIterationCount: "infinite",
              animationDelay: s.animationDelay,
              boxShadow: "0 0 6px rgba(255, 255, 255, 0.5)",
            }}
          />
        </div>
      ))}

      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.8; }
        }
        @keyframes shoot {
          0% { transform: translate(0, 0); opacity: 1; }
          50% { transform: translate(30vw, 40vh); opacity: 0.7; }
          100% { transform: translate(60vw, 80vh); opacity: 0; }
        }
        @keyframes tailFade {
          0% { opacity: 1; }
          50% { opacity: 0.7; }
          100% { opacity: 0; }
        }
        @keyframes auroraMove {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
      `}</style>
    </div>
  );
};

export default SpaceBackground;
