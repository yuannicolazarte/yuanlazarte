"use client";

import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import localFont from "next/font/local";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const aristotelica = localFont({
  src: "../../fonts/Aristotelica.ttf",
  variable: "--font-aristotelica",
});

type BlogSection = {
  subtitle: string;
  content: string;
};

type Blog = {
  title: string;
  category: string;
  introduction: string;
  sections: BlogSection[];
};

const blogContent: Record<string, Blog> = {
  1: {
    title: "Understanding Branding Fundamentals",
    category: "Branding",
    introduction:
      "Branding is the foundation of how a business, creative project, or personal identity is perceived. It brings together visual design, communication, personality, and consistency to create an identity that people can recognize and remember.",
    sections: [
      {
        subtitle: "What is Branding?",
        content:
          "Branding is much more than creating a logo or choosing a color palette. It represents the complete experience people associate with a business or creative identity. This includes the logo, typography, colors, imagery, tone of voice, messaging, and even the way information is presented. When these elements work together intentionally, they create a recognizable personality that helps an audience understand what a brand represents.",
      },
      {
        subtitle: "Why Branding Matters",
        content:
          "A strong brand gives people a reason to remember and trust you. When an identity is clear and professionally presented, audiences can more easily understand what a business offers and what makes it different. Branding also creates familiarity over time, allowing people to recognize your work even before they read the name. This is especially important in competitive industries where many businesses may offer similar products or services.",
      },
      {
        subtitle: "Consistency Builds Recognition",
        content:
          "Consistency is one of the most important principles of effective branding. Your colors, typography, imagery, layouts, messaging, and overall visual style should feel connected across different platforms. Whether someone sees your website, social media post, business card, presentation, or advertisement, the experience should still feel like it belongs to the same brand. Repetition creates familiarity, and familiarity makes a brand easier to recognize.",
      },
      {
        subtitle: "Creating an Emotional Connection",
        content:
          "Successful brands do more than communicate information; they create feelings. A brand can make people feel confident, excited, comfortable, inspired, or connected depending on how its identity is designed and communicated. Visual decisions such as color, typography, photography, composition, and tone all contribute to this emotional response. When people connect emotionally with a brand, they are more likely to remember it and develop long-term loyalty.",
      },
      {
        subtitle: "Standing Out From the Competition",
        content:
          "Branding gives you an opportunity to establish a distinct position in a crowded market. Instead of trying to look like everyone else in your industry, a thoughtful identity can highlight what makes you unique. This does not necessarily mean using complicated or unusual visuals. Often, differentiation comes from having a clear personality, consistent presentation, and a visual direction that genuinely reflects the values and character of the brand.",
      },
    ],
  },

  2: {
    title: "Vector Art in Logo Design",
    category: "Graphic Design",
    introduction:
      "Vector graphics are one of the most important foundations of professional logo design. Understanding how vectors work helps designers create identities that remain sharp, flexible, and usable across everything from small digital icons to large physical signage.",
    sections: [
      {
        subtitle: "What is Vector Art?",
        content:
          "Vector graphics are created using mathematical paths, points, curves, and shapes rather than a fixed collection of pixels. Because the artwork is mathematically defined, it can be resized without losing its sharpness. This is different from raster images, which are made from pixels and can become blurry or pixelated when enlarged beyond their original resolution.",
      },
      {
        subtitle: "Why Vectors are Important for Logos",
        content:
          "A logo needs to work in many different environments. It may appear as a tiny social media profile image, on a website header, on printed stationery, or on a large outdoor sign. A vector logo can be scaled to each of these sizes while maintaining clean edges and accurate details. This flexibility makes vector artwork essential for creating a professional and reliable visual identity.",
      },
      {
        subtitle: "Industry-Standard Tools",
        content:
          "Programs such as Adobe Illustrator are widely used for creating vector artwork because they provide precise control over paths, shapes, typography, and colors. Designers can create custom forms, adjust anchor points, combine shapes, and build complex illustrations while keeping the artwork editable. Learning these tools also makes it easier to prepare professional files for clients and production.",
      },
      {
        subtitle: "File Compatibility",
        content:
          "Vector artwork can be exported into several formats depending on how the logo will be used. SVG is particularly useful for websites because it can remain sharp at different screen sizes. PDF and EPS files are commonly used for professional printing and production workflows. Keeping the original editable vector file is also important because it allows future changes and exports to be made without rebuilding the logo.",
      },
      {
        subtitle: "Long-Term Value",
        content:
          "A properly created vector logo is an investment that can support a brand for many years. Instead of recreating the logo every time a different size or application is needed, the original vector artwork can be adapted for new purposes. This makes the identity easier to manage and protects the quality of the brand as it grows across different platforms and media.",
      },
    ],
  },

  3: {
    title: "The Power of Simplicity in Logos",
    category: "Logo Design",
    introduction:
      "Simple logos are often more effective because they communicate an idea quickly. Good simplicity is not about removing details randomly; it is about identifying what is essential and presenting it in the clearest possible way.",
    sections: [
      {
        subtitle: "Less is More",
        content:
          "A simple logo reduces unnecessary visual information and allows the main idea to become easier to understand. When there are too many shapes, colors, effects, or decorative elements, viewers may struggle to identify what they should focus on. Simplicity creates visual clarity and gives the most important part of the identity room to breathe.",
      },
      {
        subtitle: "Versatility",
        content:
          "A strong logo should work across different sizes, backgrounds, and applications. A simple mark is generally easier to reproduce on websites, packaging, merchandise, documents, signage, and social media. It can also be adapted into different variations, such as a full logo, icon, monochrome version, or small-scale mark, without losing its core identity.",
      },
      {
        subtitle: "Memorability",
        content:
          "People are more likely to remember visual forms that are easy to process. A distinctive but uncomplicated shape can become strongly associated with a brand over time. The goal is not to make a logo extremely basic, but to create a visual idea that can be recognized quickly without requiring the audience to study it.",
      },
      {
        subtitle: "Timelessness",
        content:
          "Design trends change constantly, but a well-structured simple logo has a better chance of remaining relevant. Logos that depend heavily on temporary effects, complicated styles, or popular visual trends may eventually feel outdated. A timeless identity focuses on strong proportions, typography, composition, and a clear concept rather than relying entirely on current trends.",
      },
      {
        subtitle: "Professional Appeal",
        content:
          "Clean design often communicates confidence and intentionality. When every element has a clear purpose, the identity feels more considered and professional. Simplicity also gives a brand greater flexibility because it can be paired with different photography, layouts, colors, and marketing materials without competing for attention.",
      },
    ],
  },

  4: {
    title: "Applying Color Theory",
    category: "Color Theory",
    introduction:
      "Color is one of the fastest ways to influence how people perceive a design. Understanding color relationships allows designers to create visual systems that communicate emotion, establish hierarchy, and strengthen brand recognition.",
    sections: [
      {
        subtitle: "Color Psychology",
        content:
          "Different colors can create different emotional associations, although their meanings can also depend on culture, context, and personal experience. Warm colors may feel energetic or expressive, while cooler colors can communicate calmness, trust, or stability. Designers should therefore choose colors based on the message and personality they want to communicate rather than selecting a palette simply because it looks attractive.",
      },
      {
        subtitle: "Building Brand Recognition",
        content:
          "Consistent use of color can make a visual identity much easier to recognize. When the same colors repeatedly appear across a website, social media content, packaging, advertisements, and other materials, the audience begins to associate those colors with the brand. A strong color system should therefore include intentional primary, secondary, neutral, and accent colors.",
      },
      {
        subtitle: "Contrast and Readability",
        content:
          "Color should also support communication, not just decoration. Sufficient contrast between text and its background makes information easier to read and improves accessibility. Strong contrast can also establish hierarchy by making important information visually dominant. Before finalizing a palette, designers should test how it performs in realistic layouts rather than viewing the colors only as isolated swatches.",
      },
      {
        subtitle: "Creating Harmony",
        content:
          "Color harmony comes from relationships between colors that feel visually balanced. Complementary, analogous, monochromatic, and other color relationships can help designers create different moods. However, harmony does not mean every color needs equal visual importance. A successful palette usually has a clear dominant color supported by secondary and neutral tones.",
      },
      {
        subtitle: "Using Color Strategically",
        content:
          "Color can guide attention and influence how viewers move through a design. An accent color can highlight buttons, important information, calls to action, or key visual elements. When used consistently, color becomes part of the visual hierarchy instead of simply filling empty space. The most effective palettes are intentional, controlled, and connected to the overall purpose of the design.",
      },
    ],
  },

  5: {
    title: "Typography in Visual Identity",
    category: "Typography",
    introduction:
      "Typography is one of the most powerful elements in visual communication. The typefaces, spacing, sizes, and hierarchy used in a brand can influence how professional, modern, elegant, playful, or trustworthy the identity feels.",
    sections: [
      {
        subtitle: "The Role of Typography",
        content:
          "Typography communicates more than words. The shape and personality of a typeface can influence the emotional tone of an entire design. A refined serif may communicate tradition or sophistication, while a geometric sans-serif may feel modern and minimal. Choosing typography should therefore involve considering both readability and the personality that the brand needs to express.",
      },
      {
        subtitle: "Choosing and Pairing Fonts",
        content:
          "Using too many typefaces can make a design feel inconsistent and difficult to control. Most visual identities can work effectively with a small, intentional set of fonts. A designer might use one typeface for headings and another complementary typeface for body text, creating contrast while maintaining a cohesive visual language.",
      },
      {
        subtitle: "Creating Hierarchy",
        content:
          "Typography helps viewers understand what information is most important. Differences in size, weight, spacing, and position can establish a clear reading order. Headlines should usually receive stronger visual emphasis, while supporting information can be quieter. Good hierarchy allows users to scan content quickly without feeling overwhelmed.",
      },
      {
        subtitle: "Maintaining Consistency",
        content:
          "A typography system should remain consistent across the brand. This includes heading styles, body text, captions, buttons, navigation, and other recurring elements. Consistency reduces visual noise and helps different pieces of communication feel like they belong to the same identity.",
      },
      {
        subtitle: "Balancing Trends and Longevity",
        content:
          "Modern typography trends can provide inspiration, but following every trend is not always the best approach. A typeface should support the brand rather than make the brand dependent on a temporary style. Strong typography combines personality with usability so the identity remains effective as design trends evolve.",
      },
    ],
  },

  6: {
    title: "Layout & Visual Hierarchy",
    category: "Layout",
    introduction:
      "Good design is not only about individual elements; it is also about how those elements are organized. Layout and visual hierarchy help viewers understand where to look, what to read first, and how different pieces of information relate to one another.",
    sections: [
      {
        subtitle: "The Importance of Layout",
        content:
          "Layout determines how visual elements are positioned within a composition. A well-planned layout creates relationships between text, images, graphics, and empty space. Instead of placing elements wherever there is room, designers use structure to create balance and guide the viewer through the content in a deliberate order.",
      },
      {
        subtitle: "Guiding Attention",
        content:
          "Visual hierarchy determines which elements receive attention first. Size, contrast, color, position, typography, and whitespace can all influence priority. For example, a large headline with strong contrast will generally attract attention before a small supporting paragraph. This allows designers to control the flow of information without explicitly telling the viewer where to look.",
      },
      {
        subtitle: "The Importance of Spacing",
        content:
          "Whitespace is an active part of a composition rather than unused space. Proper spacing separates different ideas, improves readability, and gives important elements room to stand out. Crowded designs can feel stressful and difficult to navigate, while thoughtful spacing creates a cleaner and more professional visual experience.",
      },
      {
        subtitle: "Creating Balance",
        content:
          "Balance helps a composition feel stable and intentional. Symmetrical layouts can create order and formality, while asymmetrical layouts can feel more dynamic while still maintaining visual equilibrium. Balance does not necessarily mean putting identical elements on both sides; it means distributing visual weight in a way that feels controlled.",
      },
      {
        subtitle: "Building a Clear Structure",
        content:
          "A strong layout should make information easier to understand. Grids, alignment systems, consistent spacing, and clear sections help create a predictable structure. When these principles are applied consistently, viewers can navigate a design naturally and focus on the content instead of trying to understand how the page is organized.",
      },
    ],
  },

  7: {
    title: "Video Editing Fundamentals",
    category: "Video Editing",
    introduction:
      "Effective video editing is about more than combining clips together. Editing controls the story, timing, emotion, rhythm, and overall experience of the viewer. Strong fundamentals allow even simple footage to become clear and engaging.",
    sections: [
      {
        subtitle: "Clean Cuts",
        content:
          "A good edit begins with removing footage that does not contribute to the story. Clean cuts eliminate unnecessary pauses, mistakes, repetition, and distracting moments. Each cut should have a purpose, whether it is moving the story forward, changing the viewer's perspective, emphasizing an idea, or improving the overall rhythm.",
      },
      {
        subtitle: "Storytelling Through Editing",
        content:
          "Editing determines how the audience experiences a story. The same footage can feel exciting, emotional, informative, or slow depending on how it is arranged. Editors decide which moments deserve attention, when information should be revealed, and how one scene should connect to another.",
      },
      {
        subtitle: "Using Transitions Carefully",
        content:
          "Transitions can help connect scenes, but they should support the story rather than distract from it. Simple cuts are often more effective than complicated effects because they keep attention on the content. More noticeable transitions can be useful when they have a specific creative purpose, such as indicating a change in time, location, or mood.",
      },
      {
        subtitle: "Audio and Visual Sync",
        content:
          "Sound plays a major role in how professional a video feels. Dialogue, music, sound effects, and ambient audio should work together with the visuals. Matching important visual moments to audio cues can create stronger impact, while clean dialogue and controlled background sound make the video easier to understand.",
      },
      {
        subtitle: "Mastering the Timeline",
        content:
          "A well-organized timeline makes editing faster and more manageable. Naming clips, organizing tracks, using markers, and keeping assets structured can save significant time during revisions. Understanding the timeline also gives editors more control over pacing and allows them to make precise adjustments without disrupting the entire project.",
      },
    ],
  },

  8: {
    title: "Timing & Pacing in Editing",
    category: "Video Editing",
    introduction:
      "Timing and pacing determine how a video feels from one moment to the next. They influence attention, emotion, energy, and comprehension, making them essential skills for creating edits that feel natural and purposeful.",
    sections: [
      {
        subtitle: "What is Pacing?",
        content:
          "Pacing refers to the speed and rhythm at which information is presented to the viewer. A fast-paced edit can create excitement and urgency, while a slower pace can give the audience time to absorb information or connect emotionally with a moment. The right pace depends on the purpose of the video and the audience experiencing it.",
      },
      {
        subtitle: "Choosing the Right Cut Timing",
        content:
          "Cuts should happen at moments that feel natural within the story. Cutting too early can make a scene feel rushed, while cutting too late can make it feel slow or repetitive. Editors often look for changes in action, dialogue, camera movement, or visual information to determine when a cut will feel most effective.",
      },
      {
        subtitle: "Creating Rhythm",
        content:
          "Rhythm is created through patterns in cuts, movement, sound, and visual changes. Music can provide a useful structure for editing because cuts can sometimes be synchronized with beats or musical changes. However, every cut does not need to happen exactly on the beat. Variation can create more natural and interesting pacing.",
      },
      {
        subtitle: "Maintaining Engagement",
        content:
          "Viewer attention depends heavily on how information changes over time. Introducing new visuals, camera angles, ideas, sounds, or movements can prevent a video from becoming monotonous. At the same time, constantly changing visuals can become exhausting, so engagement comes from balancing variation with moments of stability.",
      },
      {
        subtitle: "Finding the Right Balance",
        content:
          "Effective pacing is not simply about making a video faster. It is about giving every moment the amount of time it needs. Important information may require a slower pace so viewers can understand it, while repetitive or less important moments can move more quickly. The best edits balance energy, clarity, emotion, and storytelling.",
      },
    ],
  },
};

export default function BlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);

  const blog = blogContent[id];

  if (!blog) {
    notFound();
  }

  const blogNumber = id.padStart(2, "0");

  return (
    <section
      className={`w-full px-6 py-20 lg:ml-55 lg:w-[calc(100%-220px)] lg:px-6 ${aristotelica.variable}`}
    >
      {/* ================================================================ */}
      {/* CENTERED PAGE CONTAINER                                           */}
      {/* ================================================================ */}

      <div className="mx-auto flex w-full justify-center">
        <div className="w-full max-w-4xl">
          {/* ============================================================ */}
          {/* BACK BUTTON                                                     */}
          {/* ============================================================ */}

          <motion.div
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <Link
              href="/#blog"
              className="group inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.18em] text-gray-400 transition-colors duration-300 hover:text-black dark:text-gray-500 dark:hover:text-white"
            >
              <ArrowLeft
                size={14}
                strokeWidth={1.5}
                className="transition-transform duration-300 group-hover:-translate-x-1"
              />

              Back to blog
            </Link>
          </motion.div>

          {/* ============================================================ */}
          {/* ARTICLE HEADER                                                  */}
          {/* ============================================================ */}

          <header className="mx-auto max-w-3xl text-center">
            <motion.div
              initial={{ y: 18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.55, delay: 0.05 }}
              className="mb-5 flex items-center justify-center gap-3"
            >
              <span className="text-[10px] font-medium tracking-[0.2em] text-gray-400 dark:text-gray-500">
                {blogNumber}
              </span>

              <span className="h-px w-6 bg-gray-300 dark:bg-gray-700" />

              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-gray-400 dark:text-gray-500">
                {blog.category}
              </span>
            </motion.div>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl font-semibold leading-[1.08] tracking-[-0.035em] text-black dark:text-white sm:text-4xl md:text-5xl lg:text-6xl"
            >
              {blog.title}
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mx-auto mt-6 max-w-2xl text-sm font-light leading-7 text-gray-500 dark:text-gray-400 sm:text-base sm:leading-7"
            >
              {blog.introduction}
            </motion.p>
          </header>

          {/* ============================================================ */}
          {/* AUTHOR / BRAND                                                  */}
          {/* ============================================================ */}

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-8 flex max-w-3xl items-center justify-between border-y border-gray-500/15 py-5 dark:border-gray-400/15"
          >
            <div className="flex items-center gap-3.5">
              <div className="relative h-9 w-9 shrink-0">
                <Image
                  src="/images/yv.png"
                  alt="Yuan Visuals"
                  fill
                  sizes="36px"
                  className="object-contain"
                />
              </div>

              <div>
                <p className="text-sm leading-tight text-black dark:text-white [font-family:var(--font-aristotelica)]">
                  yuan visuals
                </p>

                <p className="mt-1 text-[9px] uppercase tracking-[0.12em] text-gray-400 dark:text-gray-500">
                  Graphic Design · Video Editing
                </p>
              </div>
            </div>

            <span className="hidden text-[9px] uppercase tracking-[0.15em] text-gray-400 dark:text-gray-500 sm:block">
              Design Journal
            </span>
          </motion.div>

          {/* ============================================================ */}
          {/* HERO IMAGE                                                       */}
          {/* ============================================================ */}

          <motion.figure
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.65, delay: 0.25 }}
            className="mx-auto mt-10 w-full max-w-4xl"
          >
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-900">
              <Image
                src={`/blog/blog${id}.png`}
                alt={blog.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1024px"
                className="object-cover"
                priority
              />
            </div>

            <figcaption className="mt-3 text-center text-[9px] uppercase tracking-[0.15em] text-gray-400 dark:text-gray-500">
              {blog.category} · Yuan Visuals
            </figcaption>
          </motion.figure>

          {/* ============================================================ */}
          {/* ARTICLE BODY                                                    */}
          {/* ============================================================ */}

          <article className="mx-auto mt-14 max-w-2xl">
            {blog.sections.map((section, index) => (
              <motion.section
                key={section.subtitle}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{
                  once: true,
                  margin: "-60px",
                }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.03,
                }}
                className="border-t border-gray-500/15 py-9 first:border-t-0 first:pt-0 dark:border-gray-400/15"
              >
                <div className="flex gap-5 sm:gap-7">
                  <span className="hidden pt-1 text-[9px] font-medium tracking-[0.16em] text-gray-300 dark:text-gray-600 sm:block">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="w-full">
                    <h2 className="text-xl font-semibold leading-tight tracking-[-0.02em] text-black dark:text-white sm:text-2xl">
                      {section.subtitle}
                    </h2>

                    <p className="mt-4 text-sm font-light leading-7 text-gray-500 dark:text-gray-400 sm:text-[15px] sm:leading-7">
                      {section.content}
                    </p>
                  </div>
                </div>
              </motion.section>
            ))}
          </article>

          {/* ============================================================ */}
          {/* END NOTE                                                         */}
          {/* ============================================================ */}

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="mx-auto mt-6 max-w-2xl border-t border-gray-500/15 pt-8 dark:border-gray-400/15"
          >
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-gray-400 dark:text-gray-500">
                  Yuan Visuals
                </p>

                <p className="mt-2 max-w-md text-xs font-light leading-5 text-gray-500 dark:text-gray-400">
                  Thoughtful design starts with understanding the fundamentals.
                  Keep exploring, keep experimenting, and let every project
                  become an opportunity to improve your craft.
                </p>
              </div>

              <Link
                href="/#blog"
                className="group inline-flex w-fit items-center gap-2 text-[10px] font-medium uppercase tracking-[0.16em] text-black dark:text-white"
              >
                More articles

                <ArrowUpRight
                  size={13}
                  strokeWidth={1.5}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </motion.div>

          {/* ============================================================ */}
          {/* FOOTER                                                         */}
          {/* ============================================================ */}

          <div className="mt-14 border-t border-gray-500/15 pt-5 dark:border-gray-400/15">
            <div className="flex flex-col gap-2 text-[9px] uppercase tracking-[0.14em] text-gray-400 dark:text-gray-500 sm:flex-row sm:items-center sm:justify-between">
              <span>Yuan Visuals · Design Journal</span>

              <span>© 2026 Yuan Lazarte</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
