"use client";

import Link from "next/link";
import { motion } from "framer-motion";

type BlogItem = {
  id: number;
  title: string;
  preview: string;
};

const blogData: BlogItem[] = [
  {
    id: 1,
    title: "Understanding Branding Fundamentals",
    preview: "Branding defines how your audience perceives your work.",
  },
  {
    id: 2,
    title: "Vector Art in Logo Design",
    preview: "Vector graphics keep logos sharp at any size.",
  },
  {
    id: 3,
    title: "The Power of Simplicity in Logos",
    preview: "Simple logos are easier to recognize and remember.",
  },
  {
    id: 4,
    title: "Applying Color Theory",
    preview: "Color shapes emotion and brand perception.",
  },
  {
    id: 5,
    title: "Typography in Visual Identity",
    preview: "Typography influences readability and brand tone.",
  },
  {
    id: 6,
    title: "Layout & Visual Hierarchy",
    preview: "Structure guides viewers through your design.",
  },
  {
    id: 7,
    title: "Video Editing Fundamentals",
    preview: "Strong basics create clean and effective edits.",
  },
  {
    id: 8,
    title: "Timing & Pacing in Editing",
    preview: "Proper pacing keeps viewers engaged.",
  },
];

export default function Blog() {
  return (
    <section
      id="blog"
      className="flex min-h-screen w-full items-center py-20 lg:ml-55 lg:w-[calc(100%-220px)]"
    >
      <div className="mx-auto w-[calc(100%-3rem)] max-w-5xl">
        {/* ---------------------------------------------------------------- */}
        {/* SECTION HEADER                                                     */}
        {/* ---------------------------------------------------------------- */}

        <div className="mb-16">
          {/* SECTION NUMBER */}
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-medium tracking-[0.2em] text-gray-400 dark:text-gray-500">
              04
            </span>

            <div className="h-px w-6 bg-gray-400/40 dark:bg-gray-500/40" />
          </div>

          {/* TITLE + DESCRIPTION */}
          <div className="mt-5 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-white sm:text-3xl">
                Blog
              </h2>

              <motion.p
                initial={{ y: 12, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mt-3 max-w-lg text-xs font-light leading-6 text-gray-500 dark:text-gray-400 sm:text-sm"
              >
                Insights, principles, and practical knowledge in graphic
                design, branding, and video editing.
              </motion.p>
            </div>

            <span className="text-[9px] font-light uppercase tracking-[0.18em] text-gray-400 dark:text-gray-500">
              Design Notes / 08 Articles
            </span>
          </div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* BLOG GRID                                                          */}
        {/* ---------------------------------------------------------------- */}

        <div className="grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-6 sm:gap-y-14 lg:grid-cols-4 lg:gap-x-7 lg:gap-y-16">
          {blogData.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ y: 18, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.5,
                delay: index * 0.04,
                ease: "easeOut",
              }}
              className="group min-w-0"
            >
              <Link
                href={`/blog/${item.id}`}
                className="block"
              >
                {/* -------------------------------------------------------- */}
                {/* IMAGE                                                       */}
                {/* -------------------------------------------------------- */}

                <div className="relative aspect-4/3 w-full overflow-hidden rounded-lg border border-black/10 bg-gray-100 dark:border-white/10 dark:bg-neutral-900">
                  <img
                    src={`/blog/blog${item.id}.png`}
                    alt={item.title}
                    loading={index < 4 ? "eager" : "lazy"}
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.035]"
                  />

                  {/* SUBTLE HOVER OVERLAY */}
                  <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/6 dark:group-hover:bg-white/4" />

                  {/* ARTICLE NUMBER */}
                  <div className="absolute left-2.5 top-2.5 flex h-6 min-w-6 items-center justify-center rounded-full border border-white/20 bg-black/45 px-1.5 backdrop-blur-sm">
                    <span className="text-[8px] font-medium tracking-[0.12em] text-white">
                      {String(item.id).padStart(2, "0")}
                    </span>
                  </div>
                </div>

                {/* -------------------------------------------------------- */}
                {/* ARTICLE INFORMATION                                        */}
                {/* -------------------------------------------------------- */}

                <div className="pt-3">
                  {/* META */}
                  <div className="mb-2 flex items-center gap-2">
                    <span className="h-px w-3 bg-gray-400/60 dark:bg-gray-500/60" />

                    <span className="text-[8px] font-light uppercase tracking-[0.16em] text-gray-400 dark:text-gray-500">
                      Article
                    </span>
                  </div>

                  {/* TITLE */}
                  <h3 className="text-xs font-medium leading-5 text-black transition-colors duration-300 group-hover:text-gray-500 dark:text-white dark:group-hover:text-gray-300 sm:text-sm">
                    {item.title}
                  </h3>

                  {/* PREVIEW */}
                  <p className="mt-1.5 line-clamp-2 text-[10px] font-light leading-4 text-gray-500 dark:text-gray-400 sm:text-xs">
                    {item.preview}
                  </p>

                  {/* READ MORE */}
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-[8px] font-medium uppercase tracking-[0.16em] text-gray-400 transition-colors duration-300 group-hover:text-black dark:text-gray-500 dark:group-hover:text-white">
                      Read Article
                    </span>

                    <span className="h-px w-4 bg-gray-300 transition-all duration-300 group-hover:w-7 group-hover:bg-black dark:bg-gray-600 dark:group-hover:bg-white" />
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* BOTTOM LINE                                                        */}
        {/* ---------------------------------------------------------------- */}

        <div className="mt-20 flex items-center gap-4">
          <div className="h-px flex-1 bg-gray-500/15 dark:bg-gray-400/15" />

          <span className="text-[9px] font-light uppercase tracking-[0.22em] text-gray-300 dark:text-gray-600">
            Design · Branding · Editing
          </span>

          <div className="h-px flex-1 bg-gray-500/15 dark:bg-gray-400/15" />
        </div>
      </div>
    </section>
  );
}
