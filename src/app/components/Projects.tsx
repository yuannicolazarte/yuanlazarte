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
    description:
      "Digital compositions, posters, and visual explorations.",
  },
  {
    id: "illustrator",
    label: "Illustrator",
    description:
      "Vector artwork, branding, and structured visual design.",
  },
  {
    id: "videos",
    label: "Videos",
    description:
      "Motion, editing, and visual storytelling.",
  },
];

/* -------------------------------------------------------------------------- */
/* PROJECT MEDIA                                                              */
/* -------------------------------------------------------------------------- */

function ProjectMedia({
  project,
  category,
  index,
  isFeatured,
  priority = false,
}: {
  project: ProjectItem;
  category: Category;
  index: number;
  isFeatured: boolean;
  priority?: boolean;
}) {
  return (
    <Link
      href={`/projects/${category.id}`}
      aria-label={`View ${category.label} project ${index + 1}`}
      className="group/media block h-full w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40 dark:focus-visible:ring-white/50"
    >
      <div className="relative h-full min-h-0 w-full overflow-hidden rounded-[1.35rem] bg-gray-100 dark:bg-neutral-900">
        {project.image && (
          <Image
            src={project.image}
            alt={
              isFeatured
                ? `${category.label} project`
                : `${category.label} project ${index + 1}`
            }
            fill
            priority={priority}
            loading={priority ? undefined : "lazy"}
            sizes={
              isFeatured
                ? "(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 50vw"
                : "(max-width: 639px) 50vw, (max-width: 1023px) 25vw, 25vw"
            }
            className="object-cover transition-transform duration-300 ease-out group-hover/media:scale-[1.035]"
          />
        )}

        {project.video && (
          <video
            src={project.video}
            muted
            playsInline
            preload="metadata"
            className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover/media:scale-[1.035]"
          />
        )}

        <div className="absolute inset-0 bg-black/[0.02] transition-colors duration-300 group-hover/media:bg-black/[0.14]" />

        {project.video && (
          <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/65 text-white transition-transform duration-300 group-hover/media:scale-105">
            <Play
              size={16}
              fill="currentColor"
              strokeWidth={1.4}
              className="ml-0.5"
            />
          </span>
        )}

        <span className="absolute left-4 top-4 text-[9px] font-medium uppercase tracking-[0.18em] text-white opacity-0 transition-opacity duration-300 group-hover/media:opacity-100">
          0{index + 1}
        </span>

        <span className="absolute bottom-4 right-4 flex h-9 w-9 translate-y-1 items-center justify-center rounded-full bg-white text-black opacity-0 transition-all duration-300 group-hover/media:translate-y-0 group-hover/media:opacity-100 dark:bg-black dark:text-white">
          <ArrowUpRight size={15} strokeWidth={1.4} />
        </span>
      </div>
    </Link>
  );
}

/* -------------------------------------------------------------------------- */
/* PROJECT COLLECTION                                                         */
/* -------------------------------------------------------------------------- */

function ProjectCollection({
  category,
  categoryIndex,
}: {
  category: Category;
  categoryIndex: number;
}) {
  const items = projects[category.id];

  return (
    <article className="border-t border-black/10 py-10 first:border-t-0 dark:border-white/10 md:py-14">
      {/* COLLECTION HEADER */}
      <header className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="flex min-w-0 items-start gap-4">
          <span className="mt-1 text-[9px] font-medium tracking-[0.2em] text-gray-400 dark:text-gray-500">
            0{categoryIndex + 1}
          </span>

          <div>
            <h3 className="text-lg font-medium tracking-tight text-black dark:text-white md:text-xl">
              {category.label}
            </h3>

            <p className="mt-2 max-w-md text-[10px] font-light leading-5 text-gray-500 dark:text-gray-400 md:text-xs">
              {category.description}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-8 border-t border-black/10 pt-3 md:min-w-[210px] md:justify-end md:border-t-0 md:pt-0 dark:border-white/10">
          <span className="text-[9px] font-light uppercase tracking-[0.17em] text-gray-400 dark:text-gray-500">
            {items.length} {items.length === 1 ? "Project" : "Projects"}
          </span>

          <span className="text-[9px] font-light uppercase tracking-[0.17em] text-gray-400 dark:text-gray-500">
            2025 — 2026
          </span>
        </div>
      </header>

      {/* COLLECTION GALLERY */}
      <div className="mt-8 grid auto-rows-[30vw] grid-cols-2 gap-3 sm:auto-rows-[clamp(7rem,10vw,10rem)] sm:grid-cols-4 sm:gap-4">
        {items.map((project, index) => (
          <div
            key={`${category.id}-${index}`}
            className={index === 0 ? "col-span-2 row-span-2" : ""}
          >
            <ProjectMedia
              project={project}
              category={category}
              index={index}
              isFeatured={index === 0}
              priority={categoryIndex === 0 && index === 0}
            />
          </div>
        ))}
      </div>

      {/* COLLECTION FOOTER */}
      <div className="mt-5 flex items-center justify-between">
        <span className="text-[9px] font-light uppercase tracking-[0.18em] text-gray-400 dark:text-gray-500">
          Selected work
        </span>

        <Link
          href={`/projects/${category.id}`}
          className="group/explore flex items-center gap-2 text-[9px] font-medium uppercase tracking-[0.18em] text-black transition-colors duration-300 hover:text-gray-500 dark:text-white dark:hover:text-gray-400"
        >
          Explore collection
          <ArrowUpRight
            size={13}
            strokeWidth={1.4}
            className="transition-transform duration-300 group-hover/explore:translate-x-0.5 group-hover/explore:-translate-y-0.5"
          />
        </Link>
      </div>
    </article>
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
                A collection of graphic design works, branding projects,
                and creative explorations.
              </motion.p>
            </div>

            <span className="text-[9px] font-light uppercase tracking-[0.18em] text-gray-400 dark:text-gray-500">
              Selected Work / 2025 — 2026
            </span>
          </div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* PROJECT COLLECTIONS                                                */}
        {/* ---------------------------------------------------------------- */}

        <div className="min-w-0">
          {categories.map((category, index) => (
            <ProjectCollection
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