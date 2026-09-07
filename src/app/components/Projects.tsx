"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Play } from "lucide-react";
import { motion } from "framer-motion";

type ProjectItem = {
  title: string;
  image?: string;
  video?: string;
};

type Category = {
  id: string;
  label: string;
  description: string;
};

const projects: Record<string, ProjectItem[]> = {
  photoshop: [
    { title: "", image: "/graphic-designs/Bar-Chow.png" },
    { title: "", image: "/graphic-designs/Hideout.png" },
    { title: "", image: "/graphic-designs/Rice-meals.png" },
    { title: "", image: "/graphic-designs/Drinks.png" },
    { title: "", image: "/graphic-designs/HOPromo-Poster.png" },
  ],

  illustrator: [
    { title: "", image: "/graphic-designs/HO.png" },
    { title: "", image: "/graphic-designs/NAVIS.png" },
    { title: "", image: "/graphic-designs/YV.png" },
    { title: "", image: "/graphic-designs/bubble-bliss.png" },
    { title: "", image: "/graphic-designs/JTL.png" },
  ],

  videos: [
    {
      title: "",
      video: "/videos/MacauHk.mov",
    },
  ],
};

const categories: Category[] = [
  {
    id: "photoshop",
    label: "Photoshop",
    description: "Digital compositions, posters, and visual explorations.",
  },
  {
    id: "illustrator",
    label: "Illustrator",
    description: "Vector artwork, branding, and structured visual design.",
  },
  {
    id: "videos",
    label: "Videos",
    description: "Motion, editing, and visual storytelling.",
  },
];

/* -------------------------------------------------------------------------- */
/* PROJECT CARD                                                               */
/* -------------------------------------------------------------------------- */

function ProjectCard({
  project,
  category,
  isFront,
}: {
  project: ProjectItem;
  category: Category;
  isFront: boolean;
}) {
  /* FRONT CARD */
  if (isFront) {
    return (
      <Link
        href={`/projects/${category.id}`}
        className="group/front relative block h-full w-full overflow-hidden rounded-xl border border-white/10 bg-gray-100 shadow-[0_12px_30px_rgba(0,0,0,0.12)] dark:border-white/10 dark:bg-neutral-900 dark:shadow-[0_12px_30px_rgba(0,0,0,0.35)]"
      >
        {/* IMAGE */}
        {project.image && (
          <Image
            src={project.image}
            alt={`${category.label} project`}
            fill
            priority
            fetchPriority="high"
            decoding="async"
            sizes="(max-width: 767px) 75vw, 270px"
            className="object-cover transition-transform duration-500 ease-out group-hover/front:scale-[1.04]"
          />
        )}

        {/* VIDEO */}
        {project.video && (
          <>
            <video
              src={project.video}
              muted
              loop
              playsInline
              preload="metadata"
              className="h-full w-full object-cover"
            />

            <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white shadow-lg backdrop-blur-sm transition-transform duration-300 group-hover/front:scale-110">
              <Play
                size={16}
                fill="currentColor"
                strokeWidth={1.4}
                className="ml-0.5"
              />
            </div>
          </>
        )}

        {/* HOVER OVERLAY */}
        <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover/front:bg-black/25" />

        {/* HOVER LABEL */}
        <div className="absolute inset-x-0 bottom-0 flex translate-y-2 items-center justify-between bg-gradient-to-t from-black/80 via-black/30 to-transparent px-4 pb-4 pt-12 opacity-0 transition-all duration-300 group-hover/front:translate-y-0 group-hover/front:opacity-100">
          <span className="text-[9px] font-medium uppercase tracking-[0.18em] text-white">
            View Collection
          </span>

          <ArrowUpRight size={14} strokeWidth={1.4} className="text-white" />
        </div>
      </Link>
    );
  }

  /* BACK CARDS */
  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl border border-white/10 bg-gray-100 shadow-[0_6px_18px_rgba(0,0,0,0.08)] dark:border-white/10 dark:bg-neutral-900 dark:shadow-[0_6px_18px_rgba(0,0,0,0.25)]">
      {project.image && (
        <Image
          src={project.image}
          alt=""
          fill
          loading="lazy"
          fetchPriority="low"
          decoding="async"
          sizes="270px"
          className="object-cover"
        />
      )}

      {project.video && (
        <video
          src={project.video}
          muted
          playsInline
          preload="none"
          className="h-full w-full object-cover"
        />
      )}

      <div className="absolute inset-0 bg-black/[0.05] dark:bg-black/[0.12]" />
    </div>
  );
}


/* -------------------------------------------------------------------------- */
/* PROJECT STACK                                                              */
/* -------------------------------------------------------------------------- */

function ProjectStack({
  category,
  categoryIndex,
}: {
  category: Category;
  categoryIndex: number;
}) {
  const items = projects[category.id];

  /*
   * Only five cards are rendered for each stack.
   * Images beyond the first five are not mounted in the DOM.
   */
  const stackItems = items.slice(0, 5);

  return (
    <motion.article
      initial={{ y: 18, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.5,
        delay: categoryIndex * 0.04,
        ease: "easeOut",
      }}
      className="flex min-w-0 flex-col"
    >
      {/* ------------------------------------------------------------------ */}
      {/* CATEGORY HEADER                                                     */}
      {/* ------------------------------------------------------------------ */}

      <div className="flex min-h-[82px] items-start justify-between border-b border-white/10 pb-4 dark:border-white/10">
        <div className="flex min-w-0 items-start gap-3">
          {/* NUMBER */}
          <span className="mt-0.5 shrink-0 text-[9px] font-medium tracking-[0.18em] text-gray-400 dark:text-gray-500">
            0{categoryIndex + 1}
          </span>

          {/* TITLE */}
          <div className="min-w-0">
            <h3 className="text-sm font-medium tracking-tight text-black dark:text-white">
              {category.label}
            </h3>

            <p className="mt-1 max-w-[220px] text-[10px] font-light leading-4 text-gray-400 dark:text-gray-500">
              {category.description}
            </p>
          </div>
        </div>

        {/* PROJECT COUNT */}
        <span className="shrink-0 whitespace-nowrap pt-0.5 text-[9px] font-light uppercase tracking-[0.12em] text-gray-400 dark:text-gray-500">
          {items.length} {items.length === 1 ? "Project" : "Projects"}
        </span>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* STACK                                                               */}
      {/* ------------------------------------------------------------------ */}

      <div className="mt-8 flex h-[300px] w-full items-start justify-center">
        <div className="group/stack relative h-[270px] w-full max-w-[270px]">
          {stackItems.map((project, index) => {
            const isFront = index === 0;

            let positionClasses = "";

            if (index === 0) {
              positionClasses =
                "translate-x-0 translate-y-0 rotate-0 scale-100 group-hover/stack:translate-x-0 group-hover/stack:translate-y-0 group-hover/stack:rotate-0 group-hover/stack:scale-100";
            }

            if (index === 1) {
              positionClasses =
                "-translate-x-1 -translate-y-1 rotate-[-3deg] scale-[0.985] group-hover/stack:-translate-x-4 group-hover/stack:-translate-y-2 group-hover/stack:rotate-[-6deg] group-hover/stack:scale-[0.97]";
            }

            if (index === 2) {
              positionClasses =
                "translate-x-1 -translate-y-2 rotate-[3deg] scale-[0.97] group-hover/stack:translate-x-4 group-hover/stack:-translate-y-3 group-hover/stack:rotate-[6deg] group-hover/stack:scale-[0.94]";
            }

            if (index === 3) {
              positionClasses =
                "-translate-x-1.5 -translate-y-2.5 rotate-[-5deg] scale-[0.955] group-hover/stack:-translate-x-7 group-hover/stack:-translate-y-4 group-hover/stack:rotate-[-9deg] group-hover/stack:scale-[0.91]";
            }

            if (index === 4) {
              positionClasses =
                "translate-x-1.5 -translate-y-3 rotate-[5deg] scale-[0.94] group-hover/stack:translate-x-7 group-hover/stack:-translate-y-5 group-hover/stack:rotate-[10deg] group-hover/stack:scale-[0.88]";
            }

            return (
              <div
                key={`${category.id}-${index}`}
                className={`absolute inset-0 transform-gpu transition-all duration-500 ease-out ${positionClasses} ${
                  isFront ? "z-20" : "pointer-events-none"
                }`}
              >
                <ProjectCard
                  project={project}
                  category={category}
                  isFront={isFront}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* FOOTER                                                              */}
      {/* ------------------------------------------------------------------ */}

      <div className="mt-1 flex min-h-[24px] items-center justify-between border-t border-white/10 pt-4 dark:border-white/10">
        <span className="text-[9px] font-light uppercase tracking-[0.18em] text-gray-400 dark:text-gray-500">
          Selected Work
        </span>

        {/* DOTS */}
        <div className="flex items-center gap-1.5">
          {stackItems.map((_, index) => (
            <span
              key={`${category.id}-dot-${index}`}
              className={`h-1 w-1 rounded-full ${
                index === 0
                  ? "bg-black dark:bg-white"
                  : "bg-gray-300 dark:bg-gray-600"
              }`}
            />
          ))}
        </div>
      </div>
    </motion.article>
  );
}

/* -------------------------------------------------------------------------- */
/* PROJECTS SECTION                                                           */
/* -------------------------------------------------------------------------- */

export default function Projects() {
  return (
    <section
      id="projects"
      className="flex min-h-screen w-full items-center py-20 lg:ml-55 lg:w-[calc(100%-220px)]"
    >
      <div className="mx-auto w-[calc(100%-3rem)] max-w-5xl">
        {/* ---------------------------------------------------------------- */}
        {/* SECTION HEADER                                                     */}
        {/* ---------------------------------------------------------------- */}

        <div className="mb-16">
          {/* SMALL SECTION NUMBER */}
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-medium tracking-[0.2em] text-gray-400 dark:text-gray-500">
              03
            </span>

            <div className="h-px w-6 bg-gray-400/40 dark:bg-gray-500/40" />
          </div>

          {/* TITLE AREA */}
          <div className="mt-5 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-white sm:text-3xl">
                Projects
              </h2>

              <motion.p
                initial={{ y: 12, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mt-3 max-w-lg text-xs font-light leading-6 text-gray-500 dark:text-gray-400 sm:text-sm"
              >
                A collection of graphic design works, branding projects, and
                creative explorations.
              </motion.p>
            </div>

            <span className="text-[9px] font-light uppercase tracking-[0.18em] text-gray-400 dark:text-gray-500">
              Selected Work / 2025 — 2026
            </span>
          </div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* PROJECT GRID                                                       */}
        {/* ---------------------------------------------------------------- */}

        <div className="grid min-w-0 grid-cols-1 gap-16 md:grid-cols-3 md:gap-8 lg:gap-12">
          {categories.map((category, index) => (
            <ProjectStack
              key={category.id}
              category={category}
              categoryIndex={index}
            />
          ))}
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* BOTTOM LINE                                                        */}
        {/* ---------------------------------------------------------------- */}

        <div className="mt-20 flex items-center gap-4">
          <div className="h-px flex-1 bg-gray-500/15 dark:bg-gray-400/15" />

          <span className="text-[9px] font-light uppercase tracking-[0.22em] text-gray-300 dark:text-gray-600">
            Selected Creative Work
          </span>

          <div className="h-px flex-1 bg-gray-500/15 dark:bg-gray-400/15" />
        </div>
      </div>
    </section>
  );
}