"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

const tools = {
  graphicDesign: [
    {
      name: "Illustrator",
      icon: "/app-icons/illustrator.png",
    },
    {
      name: "Photoshop",
      icon: "/app-icons/photoshop.png",
    },
    {
      name: "Canva",
      icon: "/app-icons/canva.png",
    },
  ],
  videoEditing: [
    {
      name: "DaVinci Resolve",
      icon: "/app-icons/davinci_resolve.png",
    },
  ],
};

const experiences = [
  {
    date: "2025 - Present",
    type: "Freelance",
    position: "Graphic Designer",
    subtitle: "Branding, visual identity & digital content",
    description:
      "Create branding, visual identities, and digital content for a range of clients, using Illustrator and Photoshop to turn creative briefs into polished digital and print designs.",
    tools: [
      {
        name: "Illustrator",
        icon: "/app-icons/illustrator.png",
      },
      {
        name: "Photoshop",
        icon: "/app-icons/photoshop.png",
      },
    ],
  },
  {
    date: "Feb – Mar 2026",
    type: "Full-time",
    position: "MCCM Printing House",
    subtitle: "Sublimation & Layout Artist",
    description:
      "Created print-ready apparel layouts for custom uniforms and jerseys, preparing artwork specifically for sublimation production with attention to accuracy, composition, and technical requirements.",
    tools: [
      {
        name: "Illustrator",
        icon: "/app-icons/illustrator.png",
      },
      {
        name: "Photoshop",
        icon: "/app-icons/photoshop.png",
      },
    ],
  },
];

type Tool = {
  name: string;
  icon: string;
};

function ToolBadge({ tool }: { tool: Tool }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-md bg-gray-500/8 px-2.5 py-1.5 dark:bg-gray-400/8">
      <Image
        src={tool.icon}
        alt=""
        width={18}
        height={18}
        className="h-4.5 w-4.5 shrink-0 object-contain"
      />

      <span className="whitespace-nowrap text-[11px] font-light text-gray-500 dark:text-gray-400">
        {tool.name}
      </span>
    </div>
  );
}

function ToolGroup({
  title,
  items,
}: {
  title: string;
  items: Tool[];
}) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-gray-400 dark:text-gray-500">
          {title}
        </span>

        <div className="h-px flex-1 bg-gray-500/15 dark:bg-gray-400/15" />
      </div>

      <p className="mt-2 max-w-xs text-xs font-light leading-5 text-gray-400 dark:text-gray-500">
        {title === "Graphic Design"
          ? "Branding, visual identity, layouts, and digital content."
          : "Editing, pacing, transitions, and visual refinement."}
      </p>

      <div className="mt-5 flex flex-wrap gap-2.5">
        {items.map((tool) => (
          <ToolBadge
            key={tool.name}
            tool={tool}
          />
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const [activeExperience, setActiveExperience] = useState(0);

  return (
    <section
      id="skills"
      className="flex min-h-screen w-full items-center py-16 sm:py-20 lg:ml-55 lg:w-[calc(100%-220px)]"
    >
      <div className="mx-auto w-[calc(100%-3rem)] max-w-5xl">
        {/* HEADER */}
        <div className="mb-12 sm:mb-16">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-medium tracking-[0.2em] text-gray-400 dark:text-gray-500">
              02
            </span>

            <div className="h-px w-6 bg-gray-400/40 dark:bg-gray-500/40" />
          </div>

          <h2 className="mt-5 text-2xl font-semibold tracking-tight text-black dark:text-white sm:text-3xl">
            Skills
          </h2>

          <motion.p
            initial={{ y: 12, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-3 max-w-lg text-xs font-light leading-6 text-gray-500 dark:text-gray-400 sm:text-sm"
          >
            Tools I use and my experience in creating design and visual
            outputs.
          </motion.p>
        </div>

        {/* CONTENT */}
        <div className="grid min-w-0 grid-cols-1 min-[850px]:grid-cols-[0.75fr_1.25fr]">
          {/* TOOLS */}
          <motion.div
            initial={{ y: 18, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
            }}
            className="min-w-0 border-b border-gray-500/20 pb-10 min-[850px]:border-b-0 min-[850px]:border-r min-[850px]:pb-0 min-[850px]:pr-12 dark:border-gray-400/20"
          >
            <div className="mb-8 sm:mb-9">
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">
                Tools & Software
              </p>

              <p className="mt-2 max-w-xs text-xs font-light leading-5 text-gray-400 dark:text-gray-500">
                The software I rely on to turn ideas into polished visual
                work.
              </p>
            </div>

            <div className="space-y-9 sm:space-y-10">
              <ToolGroup
                title="Graphic Design"
                items={tools.graphicDesign}
              />

              <ToolGroup
                title="Video Editing"
                items={tools.videoEditing}
              />
            </div>
          </motion.div>

          {/* EXPERIENCE */}
          <motion.div
            initial={{ y: 18, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.5,
              delay: 0.04,
              ease: "easeOut",
            }}
            className="min-w-0 pt-10 min-[850px]:pl-12 min-[850px]:pt-0"
          >
            <div className="mb-8 sm:mb-9">
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">
                Experience
              </p>

              <p className="mt-2 max-w-xs text-xs font-light leading-5 text-gray-400 dark:text-gray-500">
                Selected professional and creative experience.
              </p>
            </div>

            <div className="min-w-0">
              {experiences.map((experience, index) => {
                const isActive = activeExperience === index;

                return (
                  <div
                    key={`${experience.position}-${index}`}
                    onMouseEnter={() => setActiveExperience(index)}
                    className={`relative min-w-0 transition-colors duration-300 ${
                      index !== experiences.length - 1
                        ? "border-b border-gray-500/20 dark:border-gray-400/20"
                        : ""
                    }`}
                  >
                    {/* ACTIVE INDICATOR */}
                    <motion.div
                      initial={false}
                      animate={{
                        opacity: isActive ? 1 : 0,
                        scaleY: isActive ? 1 : 0,
                      }}
                      transition={{
                        duration: 0.3,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="absolute left-0 top-0 h-full w-px origin-center bg-black dark:bg-white"
                    />

                    {/* EXPERIENCE BUTTON */}
                    <button
                      type="button"
                      onClick={() => setActiveExperience(index)}
                      aria-expanded={isActive}
                      aria-controls={`experience-${index}`}
                      className={`group block w-full touch-manipulation cursor-pointer pl-4 text-left outline-none transition-all duration-300 focus-visible:ring-1 focus-visible:ring-black/30 dark:focus-visible:ring-white/30 ${
                        isActive
                          ? "py-7"
                          : "py-6"
                      }`}
                    >
                      {/* TOP META */}
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span className="text-[10px] font-light uppercase tracking-[0.12em] text-gray-400 dark:text-gray-500">
                          {experience.date}
                        </span>

                        <span className="text-[10px] text-gray-300 dark:text-gray-600">
                          /
                        </span>

                        <span className="text-[10px] font-light uppercase tracking-[0.12em] text-gray-400 dark:text-gray-500">
                          {experience.type}
                        </span>
                      </div>

                      {/* TITLE */}
                      <div className="mt-2 flex min-w-0 items-center justify-between gap-4">
                        <h3
                          className={`min-w-0 text-base font-semibold tracking-tight transition-colors duration-300 ${
                            isActive
                              ? "text-black dark:text-white"
                              : "text-gray-600 dark:text-gray-300"
                          }`}
                        >
                          {experience.position}
                        </h3>

                        <motion.span
                          initial={false}
                          animate={{
                            x: isActive ? 0 : -4,
                            opacity: isActive ? 1 : 0,
                          }}
                          transition={{
                            duration: 0.3,
                            ease: "easeOut",
                          }}
                          aria-hidden="true"
                          className="shrink-0 text-sm text-black dark:text-white"
                        >
                          →
                        </motion.span>
                      </div>

                      {/* SUBTITLE */}
                      <p className="mt-1 pr-4 text-xs font-light leading-5 text-gray-400 dark:text-gray-500">
                        {experience.subtitle}
                      </p>

                      {/* EXPANDED CONTENT */}
                      <motion.div
                        id={`experience-${index}`}
                        initial={false}
                        animate={{
                          height: isActive ? "auto" : 0,
                          opacity: isActive ? 1 : 0,
                          marginTop: isActive ? 20 : 0,
                        }}
                        transition={{
                          height: {
                            duration: 0.45,
                            ease: [0.22, 1, 0.36, 1],
                          },
                          opacity: {
                            duration: 0.25,
                            ease: "easeOut",
                          },
                          marginTop: {
                            duration: 0.4,
                            ease: [0.22, 1, 0.36, 1],
                          },
                        }}
                        className="overflow-hidden"
                      >
                        <div>
                          <p className="max-w-2xl text-sm font-light leading-7 text-gray-500 dark:text-gray-400">
                            {experience.description}
                          </p>

                          {/* EXPERIENCE TOOLS */}
                          <motion.div
                            initial={false}
                            animate={{
                              y: isActive ? 0 : -6,
                              opacity: isActive ? 1 : 0,
                            }}
                            transition={{
                              duration: 0.35,
                              delay: isActive ? 0.08 : 0,
                              ease: "easeOut",
                            }}
                            className="mt-5 flex flex-wrap gap-2"
                          >
                            {experience.tools.map((tool) => (
                              <ToolBadge
                                key={tool.name}
                                tool={tool}
                              />
                            ))}
                          </motion.div>
                        </div>
                      </motion.div>
                    </button>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* BOTTOM LINE */}
        <motion.div
          initial={{ y: 18, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            duration: 0.5,
            delay: 0.08,
            ease: "easeOut",
          }}
          className="mt-12 flex items-center gap-3 sm:mt-16 sm:gap-4"
        >
          <div className="h-px flex-1 bg-gray-500/15 dark:bg-gray-400/15" />

          <span className="whitespace-nowrap text-[9px] font-light uppercase tracking-[0.2em] text-gray-300 dark:text-gray-600 sm:tracking-[0.25em]">
            Design / Visuals / Creative
          </span>

          <div className="h-px flex-1 bg-gray-500/15 dark:bg-gray-400/15" />
        </motion.div>
      </div>
    </section>
  );
}
