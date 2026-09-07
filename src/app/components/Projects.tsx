"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Play } from "lucide-react";
import { motion } from "framer-motion";
import { memo } from "react";

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

const BACK_CARD_CLASSES = [
  "right-0 top-0 rotate-[7deg] opacity-75",
  "-right-2 top-5 rotate-[-6deg] opacity-55",
  "right-4 top-10 rotate-[11deg] opacity-35",
  "right-1 top-14 rotate-[-12deg] opacity-25",
];

const ProjectMedia = memo(function ProjectMedia({
  project,
  category,
  priority = false,
  className = "",
}: {
  project: ProjectItem;
  category: Category;
  priority?: boolean;
  className?: string;
}) {
  if (project.image) {
    return (
      <Image
        src={project.image}
        alt={`${category.label} project`}
        fill
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "low"}
        decoding="async"
        sizes="(max-width: 767px) 85vw, (max-width: 1100px) 28vw, 320px"
        className={`object-cover ${className}`}
      />
    );
  }

  if (project.video) {
    return (
      <video
        src={project.video}
        autoPlay
        muted
        loop
        playsInline
        preload={priority ? "metadata" : "none"}
        className={`h-full w-full object-cover ${className}`}
      />
    );
  }

  return (
    <div className="flex h-full w-full items-center justify-center bg-neutral-100 text-neutral-400 dark:bg-neutral-900 dark:text-neutral-600">
      <span className="text-[10px] uppercase tracking-[0.2em]">
        No preview
      </span>
    </div>
  );
});

const ProjectCard = memo(function ProjectCard({
  project,
  category,
  isFront = false,
  isPriority = false,
}: {
  project: ProjectItem;
  category: Category;
  isFront?: boolean;
  isPriority?: boolean;
}) {
  if (isFront) {
    return (
      <Link
        href={`/projects/${category.id}`}
        aria-label={`View ${category.label} projects`}
        className="group relative block h-full w-full overflow-hidden rounded-[1.35rem] border border-black/10 bg-neutral-100 shadow-[0_24px_80px_rgba(0,0,0,0.16)] transition-transform duration-500 hover:-translate-y-2 dark:border-white/10 dark:bg-neutral-900 dark:shadow-[0_24px_80px_rgba(0,0,0,0.38)]"
      >
        <ProjectMedia
          project={project}
          category={category}
          priority={isPriority}
          className="transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/75" />

        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4 sm:p-5">
          <span className="rounded-full border border-white/30 bg-black/20 px-3 py-1.5 text-[8px] font-medium uppercase tracking-[0.18em] text-white backdrop-blur-md">
            Featured
          </span>

          {project.video && (
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-black/20 text-white backdrop-blur-md">
              <Play size={12} fill="currentColor" strokeWidth={1.2} />
            </span>
          )}
        </div>

        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-[9px] uppercase tracking-[0.22em] text-white/60">
                Selected work
              </p>

              <h4 className="text-xl font-medium tracking-[-0.04em] text-white sm:text-2xl">
                {category.label}
              </h4>
            </div>

            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-black transition-transform duration-300 group-hover:rotate-45">
              <ArrowUpRight size={17} strokeWidth={1.5} />
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <div className="relative h-full w-full overflow-hidden rounded-[1.1rem] border border-black/10 bg-neutral-100 shadow-[0_14px_35px_rgba(0,0,0,0.12)] dark:border-white/10 dark:bg-neutral-900 dark:shadow-[0_14px_35px_rgba(0,0,0,0.3)]">
      <ProjectMedia project={project} category={category} />

      <div className="absolute inset-0 bg-black/[0.08] dark:bg-black/[0.2]" />
    </div>
  );
});

const ProjectStack = memo(function ProjectStack({
  category,
  categoryIndex,
}: {
  category: Category;
  categoryIndex: number;
}) {
  const items = projects[category.id] ?? [];
  const featuredProject = items[0];
  const backgroundProjects = items.slice(1, 5);

  return (
    <motion.article
      initial={{ y: 24, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.65,
        delay: categoryIndex * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group min-w-0"
    >
      <div className="flex items-start justify-between gap-4 border-t border-black/15 pt-4 dark:border-white/15">
        <div className="flex min-w-0 items-start gap-3">
          <span className="pt-1 text-[10px] font-medium tracking-[0.2em] text-neutral-400 dark:text-neutral-500">
            0{categoryIndex + 1}
          </span>

          <div className="min-w-0">
            <h3 className="text-base font-medium tracking-[-0.03em] text-black dark:text-white">
              {category.label}
            </h3>

            <p className="mt-1.5 max-w-[210px] text-[10px] font-light leading-4 text-neutral-500 dark:text-neutral-400">
              {category.description}
            </p>
          </div>
        </div>

        <span className="shrink-0 pt-1 text-[9px] uppercase tracking-[0.16em] text-neutral-400 dark:text-neutral-500">
          {String(items.length).padStart(2, "0")} works
        </span>
      </div>

      <div className="relative mt-8 h-[390px] sm:h-[430px]">
        {backgroundProjects.map((project, index) => (
          <div
            key={project.image ?? project.video ?? `${category.id}-${index}`}
            className={`absolute h-[76%] w-[64%] transition-all duration-700 ease-out group-hover:translate-x-2 ${BACK_CARD_CLASSES[index]}`}
          >
            <ProjectCard project={project} category={category} />
          </div>
        ))}

        <div className="absolute bottom-0 left-0 top-8 w-[88%]">
          {featuredProject && (
            <ProjectCard
              project={featuredProject}
              category={category}
              isFront
              isPriority={categoryIndex === 0}
            />
          )}
        </div>

        <div className="pointer-events-none absolute bottom-5 right-0 z-30 flex flex-col items-end gap-1">
          <span className="text-[8px] uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500">
            Scroll to explore
          </span>

          <div className="h-8 w-px bg-black/20 dark:bg-white/20" />
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between border-b border-black/15 pb-4 dark:border-white/15">
        <Link
          href={`/projects/${category.id}`}
          className="group/link flex items-center gap-2 text-[9px] font-medium uppercase tracking-[0.18em] text-black transition-colors hover:text-neutral-500 dark:text-white dark:hover:text-neutral-400"
        >
          View collection
          <ArrowUpRight
            size={13}
            strokeWidth={1.4}
            className="transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
          />
        </Link>

        <div className="flex items-center gap-1.5">
          {items.map((project, index) => (
            <span
              key={`${category.id}-dot-${index}`}
              className={`h-1.5 w-1.5 rounded-full transition-all ${
                index === 0
                  ? "w-5 bg-black dark:bg-white"
                  : "bg-neutral-300 dark:bg-neutral-700"
              }`}
            />
          ))}
        </div>
      </div>
    </motion.article>
  );
});

export default function Projects() {
  return (
    <section
      id="projects"
      className="flex min-h-screen w-full items-center py-20 lg:ml-55 lg:w-[calc(100%-220px)]"
    >
      <div className="mx-auto w-[calc(100%-3rem)] max-w-5xl">
        <div className="mb-16">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-medium tracking-[0.2em] text-gray-400 dark:text-gray-500">
              03
            </span>

            <div className="h-px w-8 bg-black/30 dark:bg-white/30" />
          </div>

          <div className="mt-6 flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-4xl font-semibold tracking-[-0.06em] text-black dark:text-white sm:text-6xl">
                Projects
              </h2>

              <motion.p
                initial={{ y: 12, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mt-4 max-w-lg text-xs font-light leading-6 text-gray-500 dark:text-gray-400 sm:text-sm"
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

        <div className="mb-14 flex items-center gap-4">
          <span className="text-[9px] uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500">
            Archive
          </span>

          <div className="h-px flex-1 bg-black/10 dark:bg-white/10" />

          <span className="text-[9px] uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500">
            03 categories
          </span>
        </div>

        <div className="grid min-w-0 grid-cols-1 gap-16 md:grid-cols-3 md:gap-8 lg:gap-12">
          {categories.map((category, index) => (
            <ProjectStack
              key={category.id}
              category={category}
              categoryIndex={index}
            />
          ))}
        </div>

        <div className="mt-24 flex items-center gap-4">
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