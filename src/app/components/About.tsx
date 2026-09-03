"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Palette,
  Video,
  MapPin,
  ArrowUpRight,
} from "lucide-react";

const designTabs = {
  Branding: {
    label: "BRANDING",
    number: "01",
    title: "Strong Brand Identity",
    description:
      "I develop cohesive visual identities that establish a clear and consistent brand presence across different platforms and content.",
  },
  Layout: {
    label: "LAYOUT",
    number: "02",
    title: "Clear Visual Structure",
    description:
      "I use hierarchy, spacing, alignment, and balance to create layouts that feel organized, intentional, and easy to understand.",
  },
  Typography: {
    label: "TYPOGRAPHY",
    number: "03",
    title: "Readable & Modern Type",
    description:
      "I select and combine typefaces that complement the visual direction while maintaining clarity, hierarchy, and consistency.",
  },
  Editing: {
    label: "EDITING",
    number: "04",
    title: "Engaging Visual Content",
    description:
      "I shape video content through precise pacing, transitions, and visual refinement to create a smooth and engaging experience.",
  },
};

const contentTabs = {
  Overview: {
    number: "01",
    title: "What I do",
    text: "I specialize in graphic design and video editing, with a focus on branding, visual communication, and digital content. I create visuals that combine strong aesthetics with clear communication and a consistent visual direction.",
  },
  Approach: {
    number: "02",
    title: "How I work",
    text: "I begin by understanding the purpose, audience, and direction of each project. From there, I develop the visual approach, refine the details, and ensure every element works together with clarity and intention.",
  },
  Goal: {
    number: "03",
    title: "What I Value",
    text: "I value clarity, consistency, and attention to detail. My focus is on creating thoughtful visual solutions that communicate effectively, strengthen a brand's presence, and deliver a polished final result.",
  },
};

export default function About() {
  const [designTab, setDesignTab] =
    useState<keyof typeof designTabs>("Branding");

  const [contentTab, setContentTab] =
    useState<keyof typeof contentTabs>("Overview");

  return (
    <section
      id="about"
      className="flex min-h-screen w-full items-center py-20 lg:ml-55 lg:w-[calc(100%-220px)]"
    >
      <div className="mx-auto w-[calc(100%-3rem)] max-w-5xl">
        {/* SECTION HEADER */}
        <div className="mb-16">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-medium tracking-[0.2em] text-gray-400 dark:text-gray-500">
              01
            </span>

            <div className="h-px w-6 bg-gray-400/40 dark:bg-gray-500/40" />
          </div>

          <h2 className="mt-5 text-2xl font-semibold tracking-tight text-black dark:text-white sm:text-3xl">
            About
          </h2>

          <motion.p
            initial={{ y: 12, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-3 max-w-lg text-xs font-light leading-6 text-gray-500 dark:text-gray-400 sm:text-sm"
          >
            A closer look at how I approach design and visual communication.
          </motion.p>
        </div>

        {/* MAIN CONTENT */}
        <div className="grid min-w-0 grid-cols-1 gap-14 min-[850px]:grid-cols-[0.72fr_1.28fr] min-[850px]:gap-0">
          {/* LEFT COLUMN */}
          <motion.div
            initial={{ y: 18, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.5,
              delay: 0.04,
              ease: "easeOut",
            }}
            className="min-w-0 min-[850px]:border-r min-[850px]:border-gray-500/15 min-[850px]:pr-12 dark:min-[850px]:border-gray-400/15"
          >
            {/* PROFILE */}
            <div className="mx-auto w-full min-[850px]:mx-0">
              <div className="relative">
                {/* IMAGE */}
                <div className="relative mx-auto aspect-square w-full max-w-[360px] overflow-hidden bg-gray-100 dark:bg-neutral-900 min-[850px]:max-w-none">
                  <Image
                    src="/images/profile.webp"
                    alt="Yuan Lazarte"
                    width={600}
                    height={600}
                    priority
                    className="block h-full w-full object-cover grayscale-15 transition-all duration-700 hover:scale-[1.02] hover:grayscale-0"
                  />

                  {/* IMAGE CORNER DETAIL */}
                  <div className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center border border-white/40 bg-black/20 text-white backdrop-blur-sm">
                    <ArrowUpRight
                      size={14}
                      strokeWidth={1.3}
                    />
                  </div>
                </div>
              </div>

              {/* PROFILE INFO */}
              <div className="mt-6 space-y-3 text-center">
                <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[11px] font-light text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-1.5">
                    <Palette
                      size={13}
                      strokeWidth={1.3}
                    />

                    <span>Graphic Designer</span>
                  </div>

                  <span className="text-gray-300 dark:text-gray-600">
                    /
                  </span>

                  <div className="flex items-center gap-1.5">
                    <Video
                      size={13}
                      strokeWidth={1.3}
                    />

                    <span>Video Editor</span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-1.5 text-[11px] font-light text-gray-400 dark:text-gray-500">
                  <MapPin
                    size={13}
                    strokeWidth={1.3}
                    className="shrink-0"
                  />

                  <span>
                    Puerto Princesa, Palawan, Philippines
                  </span>
                </div>
              </div>
            </div>

            {/* DESIGN FOCUS */}
            <motion.div
              initial={{ y: 18, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.5,
                delay: 0.08,
                ease: "easeOut",
              }}
              className="mt-14"
            >
              {/* HEADER */}
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">
                    Design Focus
                  </p>

                  <p className="mt-1.5 text-[10px] font-light text-gray-400 dark:text-gray-600">
                    Areas I pay attention to
                  </p>
                </div>

                <span className="text-[10px] font-light tabular-nums text-gray-400 dark:text-gray-500">
                  {designTabs[designTab].number}
                  <span className="mx-1 text-gray-300 dark:text-gray-700">
                    /
                  </span>
                  04
                </span>
              </div>

              {/* ACTIVE FEATURE */}
              <div className="relative mt-6 overflow-hidden rounded-xl border border-gray-500/15 bg-gray-50/50 p-5 dark:border-gray-400/15 dark:bg-white/[0.025]">
                {/* ACTIVE NUMBER */}
                <div className="absolute right-4 top-3 select-none text-5xl font-medium tracking-[-0.06em] text-black/[0.035] dark:text-white/[0.045]">
                  {designTabs[designTab].number}
                </div>

                <div className="relative">
                  <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">
                    {designTabs[designTab].label}
                  </p>

                  <h3 className="mt-2 max-w-xs text-base font-medium tracking-tight text-black dark:text-white">
                    {designTabs[designTab].title}
                  </h3>

                  <p className="mt-3 max-w-sm text-[11px] font-light leading-6 text-gray-500 dark:text-gray-400">
                    {designTabs[designTab].description}
                  </p>
                </div>
              </div>

              {/* DESIGN LIST */}
              <div className="mt-3">
                {(Object.keys(designTabs) as Array<
                  keyof typeof designTabs
                >).map((tab) => {
                  const isActive = designTab === tab;

                  return (
                    <button
                      type="button"
                      key={tab}
                      onMouseEnter={() => setDesignTab(tab)}
                      onClick={() => setDesignTab(tab)}
                      className={`group relative flex w-full cursor-pointer items-center justify-between border-b border-gray-500/10 py-3 text-left transition-all duration-300 last:border-b-0 dark:border-gray-400/10 ${
                        isActive
                          ? "pl-2"
                          : "hover:pl-2"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`text-[9px] font-light tabular-nums transition-colors duration-300 ${
                            isActive
                              ? "text-black dark:text-white"
                              : "text-gray-300 dark:text-gray-600"
                          }`}
                        >
                          {designTabs[tab].number}
                        </span>

                        <span
                          className={`text-[10px] uppercase tracking-[0.12em] transition-colors duration-300 ${
                            isActive
                              ? "font-medium text-black dark:text-white"
                              : "text-gray-400 group-hover:text-gray-700 dark:text-gray-500 dark:group-hover:text-gray-300"
                          }`}
                        >
                          {tab}
                        </span>
                      </div>

                      <ArrowUpRight
                        size={12}
                        strokeWidth={1.2}
                        className={`transition-all duration-300 ${
                          isActive
                            ? "translate-x-0 -translate-y-0 opacity-100 text-black dark:text-white"
                            : "translate-y-1 -translate-x-1 opacity-0 text-gray-400 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
                        }`}
                      />

                      {isActive && (
                        <span className="absolute left-0 top-1/2 h-1 w-1 -translate-y-1/2 rounded-full bg-black dark:bg-white" />
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN */}
          <motion.div
            initial={{ y: 18, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.5,
              delay: 0.08,
              ease: "easeOut",
            }}
            className="min-w-0 min-[850px]:pl-12"
          >
            {/* INTRO */}
            <div>
              <div className="flex flex-nowrap items-end justify-between gap-4">
                <h1 className="min-w-0 whitespace-nowrap text-4xl font-medium tracking-[-0.045em] text-black dark:text-white sm:text-5xl lg:text-[56px] lg:leading-[1.05]">
                  Yuan Lazarte
                </h1>

                <div className="shrink-0 pb-1">
                  <p className="text-right text-[9px] font-medium uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">
                    Yuan Visuals
                  </p>

                  <p className="mt-1 whitespace-nowrap text-right text-[9px] font-light text-gray-400 dark:text-gray-600">
                    Professional · Precise · Purposeful
                  </p>
                </div>
              </div>

              <div className="mt-7 max-w-2xl space-y-5 text-sm font-light leading-7 text-gray-500 dark:text-gray-400">
                <p>
                  I’m a graphic designer and video editor focused on creating clear,
                  engaging visuals for brands and digital content.
                  My work combines strong visual direction with thoughtful execution,
                  with an emphasis on clarity, consistency, and purpose.
                </p>

                <p>
                  I approach each project with attention to detail,
                  from developing the initial concept to refining the final result.
                  I enjoy finding the right balance between creativity and clarity,
                  creating work that communicates well while giving each project its own visual identity.
                </p>
              </div>
            </div>

            {/* MORE ABOUT ME */}
            <motion.div
              initial={{ y: 18, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.5,
                delay: 0.12,
                ease: "easeOut",
              }}
              className="mt-16"
            >
              {/* HEADER */}
              <div className="flex items-end justify-between border-b border-gray-500/15 pb-5 dark:border-gray-400/15">
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">
                    More About Me
                  </p>

                  <p className="mt-1.5 text-[10px] font-light text-gray-400 dark:text-gray-600">
                    A little more behind the work
                  </p>
                </div>

                <span className="text-[10px] font-light tabular-nums text-gray-400 dark:text-gray-500">
                  {contentTabs[contentTab].number}
                  <span className="mx-1 text-gray-300 dark:text-gray-700">
                    /
                  </span>
                  03
                </span>
              </div>

              {/* CONTENT */}
              <div className="grid min-h-[330px] grid-cols-1 min-[600px]:grid-cols-[90px_1fr]">
                {/* VERTICAL NAVIGATION */}
                <div className="relative flex gap-1 border-b border-gray-500/10 py-6 min-[600px]:flex-col min-[600px]:border-b-0 min-[600px]:border-r min-[600px]:py-8 dark:border-gray-400/10">
                  {(Object.keys(contentTabs) as Array<
                    keyof typeof contentTabs
                  >).map((tab) => {
                    const isActive = contentTab === tab;

                    return (
                      <button
                        type="button"
                        key={tab}
                        onMouseEnter={() => setContentTab(tab)}
                        onClick={() => setContentTab(tab)}
                        className={`group relative flex cursor-pointer items-center gap-2 px-3 py-2.5 text-left transition-all duration-300 min-[600px]:px-0 ${
                          isActive
                            ? "text-black dark:text-white"
                            : "text-gray-400 dark:text-gray-600"
                        }`}
                      >
                        <span
                          className={`text-[9px] font-light tabular-nums transition-colors duration-300 ${
                            isActive
                              ? "text-black dark:text-white"
                              : "text-gray-300 dark:text-gray-600"
                          }`}
                        >
                          {contentTabs[tab].number}
                        </span>

                        <span
                          className={`text-[9px] uppercase tracking-[0.12em] transition-all duration-300 ${
                            isActive
                              ? "font-medium"
                              : "group-hover:text-gray-700 dark:group-hover:text-gray-300"
                          }`}
                        >
                          {tab}
                        </span>

                        {isActive && (
                          <span className="absolute bottom-0 left-0 h-px w-full bg-black dark:bg-white min-[600px]:bottom-auto min-[600px]:left-auto min-[600px]:right-[-1px] min-[600px]:top-0 min-[600px]:h-full min-[600px]:w-px" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* ACTIVE CONTENT */}
                <div
                  key={contentTab}
                  className="relative overflow-hidden px-0 py-10 min-[600px]:px-8 min-[600px]:py-12 animate-[fadeIn_0.4s_ease-out]"
                >
                  <div className="relative">
                    {/* LABEL */}
                    <div className="flex items-center gap-3">
                      <span className="h-px w-7 bg-black/20 dark:bg-white/20" />

                      <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">
                        {contentTab}
                      </span>
                    </div>

                    {/* TITLE */}
                    <h3 className="mt-7 max-w-lg text-3xl font-medium tracking-[-0.05em] text-black dark:text-white sm:text-4xl">
                      {contentTabs[contentTab].title}
                    </h3>

                    {/* TEXT */}
                    <p className="mt-6 max-w-xl text-sm font-light leading-7 text-gray-500 dark:text-gray-400">
                      {contentTabs[contentTab].text}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* BOTTOM STATEMENT */}
            <motion.div
              initial={{ y: 18, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.5,
                delay: 0.16,
                ease: "easeOut",
              }}
              className="mt-8 flex items-center gap-4"
            >
              <div className="h-px flex-1 bg-gray-500/15 dark:bg-gray-400/15" />

              <span className="text-[9px] font-light uppercase tracking-[0.22em] text-gray-300 dark:text-gray-600">
                Visual / Design / Direction
              </span>

              <div className="h-px flex-1 bg-gray-500/15 dark:bg-gray-400/15" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
