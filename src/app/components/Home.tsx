"use client";

import { ArrowRight } from "lucide-react";
import localFont from "next/font/local";
import { useEffect, useRef } from "react";

const gasdrifo = localFont({
  src: "../fonts/gasdrifo.ttf",
  variable: "--font-gasdrifo",
});

type Dot = {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  opacity: number;
};

export default function Home() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);

    if (!element) return;

    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;

    if (!section || !canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    let animationFrame = 0;
    let width = 0;
    let height = 0;

    /*
     * ============================================================
     * DOT SETTINGS
     * ============================================================
     */

    // Smaller spacing = more dots.
    const spacing = 16;

    // Magnetic interaction radius.
    const magnetRadius = 115;

    // Maximum magnetic movement.
    const magnetStrength = 18;

    // Smoothness of magnetic movement.
    const smoothing = 0.12;

    const dots: Dot[] = [];

    /*
     * ============================================================
     * MOUSE
     * ============================================================
     */

    const mouse = {
      x: -1000,
      y: -1000,
      active: false,
    };

    /*
     * ============================================================
     * THEME
     * ============================================================
     */

    const isDarkMode = () => {
      return document.documentElement.classList.contains("dark");
    };

    /*
     * ============================================================
     * RESIZE
     * ============================================================
     */

    const resize = () => {
      const rect = section.getBoundingClientRect();

      width = rect.width;
      height = rect.height;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      dots.length = 0;

      const columns = Math.ceil(width / spacing) + 2;
      const rows = Math.ceil(height / spacing) + 2;

      for (let row = -1; row < rows; row++) {
        for (let column = -1; column < columns; column++) {
          const x = column * spacing;
          const y = row * spacing;

          dots.push({
            x,
            y,
            baseX: x,
            baseY: y,
            opacity: 0.18 + Math.random() * 0.22,
          });
        }
      }
    };

    /*
     * ============================================================
     * MOUSE MOVE
     * ============================================================
     */

    const handleMouseMove = (event: MouseEvent) => {
      const rect = section.getBoundingClientRect();

      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;

      mouse.active =
        mouse.x >= 0 &&
        mouse.x <= width &&
        mouse.y >= 0 &&
        mouse.y <= height;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    /*
     * ============================================================
     * DRAW
     * ============================================================
     */

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const dark = isDarkMode();

      /*
       * ==========================================================
       * DOT FIELD
       * ==========================================================
       */

      for (const dot of dots) {
        let targetX = dot.baseX;
        let targetY = dot.baseY;

        let proximity = 0;

        /*
         * --------------------------------------------------------
         * MAGNETIC EFFECT
         * --------------------------------------------------------
         */

        if (mouse.active) {
          const dx = mouse.x - dot.baseX;
          const dy = mouse.y - dot.baseY;

          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < magnetRadius) {
            proximity = 1 - distance / magnetRadius;

            const force =
              Math.pow(proximity, 2.2) * magnetStrength;

            if (distance > 0) {
              targetX += (dx / distance) * force;
              targetY += (dy / distance) * force;
            }
          }
        }

        /*
         * --------------------------------------------------------
         * SMOOTH MOVEMENT
         * --------------------------------------------------------
         */

        dot.x += (targetX - dot.x) * smoothing;
        dot.y += (targetY - dot.y) * smoothing;

        /*
         * --------------------------------------------------------
         * DOT SIZE
         * --------------------------------------------------------
         */

        const radius = 0.65 + proximity * 0.55;

        /*
         * --------------------------------------------------------
         * DOT OPACITY
         * --------------------------------------------------------
         */

        const opacity = Math.min(
          dot.opacity + proximity * 0.35,
          0.8
        );

        /*
         * --------------------------------------------------------
         * DOT COLOR
         *
         * Light mode = black
         * Dark mode = gray
         * --------------------------------------------------------
         */

        if (dark) {
          ctx.fillStyle = `rgba(150, 150, 150, ${opacity})`;
        } else {
          ctx.fillStyle = `rgba(0, 0, 0, ${opacity})`;
        }

        /*
         * --------------------------------------------------------
         * DRAW DOT
         * --------------------------------------------------------
         */

        ctx.beginPath();

        ctx.arc(
          dot.x,
          dot.y,
          radius,
          0,
          Math.PI * 2
        );

        ctx.fill();
      }

      /*
       * ==========================================================
       * MAGNETIC CURSOR GLOW
       * ==========================================================
       */

      if (mouse.active) {
        const glowRadius = 90;

        const gradient = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          glowRadius
        );

        if (dark) {
          gradient.addColorStop(
            0,
            "rgba(180, 180, 180, 0.035)"
          );

          gradient.addColorStop(
            0.4,
            "rgba(180, 180, 180, 0.012)"
          );

          gradient.addColorStop(
            1,
            "rgba(180, 180, 180, 0)"
          );
        } else {
          gradient.addColorStop(
            0,
            "rgba(0, 0, 0, 0.02)"
          );

          gradient.addColorStop(
            0.5,
            "rgba(0, 0, 0, 0.006)"
          );

          gradient.addColorStop(
            1,
            "rgba(0, 0, 0, 0)"
          );
        }

        ctx.beginPath();

        ctx.arc(
          mouse.x,
          mouse.y,
          glowRadius,
          0,
          Math.PI * 2
        );

        ctx.fillStyle = gradient;
        ctx.fill();
      }

      animationFrame = requestAnimationFrame(draw);
    };

    /*
     * ============================================================
     * INITIALIZE
     * ============================================================
     */

    resize();
    draw();

    /*
     * ============================================================
     * RESIZE OBSERVER
     * ============================================================
     */

    const resizeObserver = new ResizeObserver(() => {
      resize();
    });

    resizeObserver.observe(section);

    /*
     * ============================================================
     * EVENTS
     * ============================================================
     */

    window.addEventListener(
      "mousemove",
      handleMouseMove,
      { passive: true }
    );

    window.addEventListener(
      "mouseleave",
      handleMouseLeave
    );

    /*
     * ============================================================
     * CLEANUP
     * ============================================================
     */

    return () => {
      cancelAnimationFrame(animationFrame);

      resizeObserver.disconnect();

      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      window.removeEventListener(
        "mouseleave",
        handleMouseLeave
      );
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative isolate min-h-screen overflow-hidden flex items-center justify-center pt-28 pb-20 lg:ml-55 bg-white dark:bg-black transition-colors duration-500"
    >
      {/* Dot field */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 h-full w-full"
      />

      {/* Subtle vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_55%,rgba(255,255,255,0.12)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_55%,rgba(0,0,0,0.2)_100%)]"
      />

      {/* Hero content */}
      <div className="relative z-10 mx-auto w-[calc(100%-3rem)] max-w-4xl text-center">
        {/* Main heading */}
        <h1 className="text-5xl sm:text-5xl md:text-6xl lg:text-6xl font-medium tracking-tight leading-[0.95] text-black dark:text-white">
          Turning ideas
          <br />
          into{" "}
          <span
            className={`${gasdrifo.className} font-bold tracking-wider`}
          >
            visuals
          </span>
        </h1>

        {/* Description */}
        <p className="mx-auto mt-8 max-w-2xl text-xs sm:text-sm md:text-base leading-relaxed font-light text-gray-500 dark:text-gray-400">
          I create impactful graphic designs and engaging video content that turn ideas into clear, compelling visual experiences.
        </p>

        {/* Buttons */}
        <div className="mt-9 flex flex-row items-center justify-center gap-3">
          {/* Explore Work */}
          <button
            type="button"
            onClick={() => scrollToSection("projects")}
            className="group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-black bg-black px-5 py-2.5 text-xs font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/10 dark:border-white dark:bg-white dark:text-black dark:hover:shadow-white/10"
          >
            <span>Explore Work</span>

            <ArrowRight
              size={14}
              strokeWidth={1.8}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>

          {/* Get Started */}
          <button
            type="button"
            onClick={() => scrollToSection("contact")}
            className="group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-black/15 bg-transparent px-5 py-2.5 text-xs font-medium text-black transition-all duration-300 hover:-translate-y-0.5 hover:border-black/30 hover:bg-black/[0.035] dark:border-white/15 dark:text-white dark:hover:border-white/30 dark:hover:bg-white/6"
          >
            <span>Get Started</span>

            <ArrowRight
              size={14}
              strokeWidth={1.8}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>
        </div>
      </div>
    </section>
  );
}
