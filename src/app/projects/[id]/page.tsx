"use client";

import {
  memo,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  X,
  Play,
  ArrowUpRight,
} from "lucide-react";

type ImageProject = {
  title: string;
  image: string;
};

type VideoProject = {
  title: string;
  video: string;
};

const projects = {
  photoshop: [
    { title: "", image: "/graphic-designs/Bar-Chow.png" },
    { title: "", image: "/graphic-designs/Hideout.png" },
    { title: "", image: "/graphic-designs/Rice-meals.png" },
    { title: "", image: "/graphic-designs/Drinks.png" },
    { title: "", image: "/graphic-designs/HOPromo-Poster.png" },
    { title: "", image: "/graphic-designs/Slaughter.png" },
    { title: "", image: "/graphic-designs/DJGIANC.png" },
    { title: "", image: "/graphic-designs/SGA.png" },
    { title: "", image: "/graphic-designs/Lalisa.png" },
    { title: "", image: "/graphic-designs/MedusaxLilith.png" },
    { title: "", image: "/graphic-designs/Insecurity.png" },
    { title: "", image: "/graphic-designs/Edwards.png" },
    { title: "", image: "/graphic-designs/RentConnect.jpg" },
  ],

  illustrator: [
    { title: "", image: "/graphic-designs/HO.png" },
    { title: "", image: "/graphic-designs/NAVIS.png" },
    { title: "", image: "/graphic-designs/YV.png" },
    { title: "", image: "/graphic-designs/bubble-bliss.png" },
    { title: "", image: "/graphic-designs/JTL.png" },
    { title: "", image: "/graphic-designs/Luffy.png" },
    { title: "", image: "/graphic-designs/Santa.png" },
    { title: "", image: "/graphic-designs/HO-signage.png" },
  ],

  videos: [
    { title: "", video: "/videos/MacauHk.mov" },
  ],
};

const categoryNames: Record<string, string> = {
  photoshop: "Photoshop",
  illustrator: "Illustrator",
  videos: "Videos",
};

export default function ProjectPage() {
  const params = useParams();
  const id = params.id as string;

  const [selectedImage, setSelectedImage] =
    useState<ImageProject | null>(null);

  const [selectedVideo, setSelectedVideo] =
    useState<VideoProject | null>(null);

  const [pageLoaded, setPageLoaded] = useState(false);

  const categoryName = categoryNames[id];

  const currentProjects =
    id === "videos"
      ? projects.videos
      : id === "photoshop"
        ? projects.photoshop
        : id === "illustrator"
          ? projects.illustrator
          : null;

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setPageLoaded(true);
    });

    return () => {
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const modalOpen = Boolean(
      selectedImage || selectedVideo
    );

    document.body.style.overflow = modalOpen
      ? "hidden"
      : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedImage, selectedVideo]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") {
        return;
      }

      setSelectedImage(null);
      setSelectedVideo(null);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, []);

  const handleImageSelect = useCallback(
    (project: ImageProject) => {
      setSelectedVideo(null);
      setSelectedImage(project);
    },
    []
  );

  const handleVideoSelect = useCallback(
    (project: VideoProject) => {
      setSelectedImage(null);
      setSelectedVideo(project);
    },
    []
  );

  const closeModal = useCallback(() => {
    setSelectedImage(null);
    setSelectedVideo(null);
  }, []);

  if (!categoryName || !currentProjects) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white text-black dark:bg-[#080808] dark:text-white">
        <div className="px-6 text-center">
          <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-neutral-400">
            404
          </p>

          <h1 className="text-xl font-medium">
            Project not found
          </h1>

          <Link
            href="/#projects"
            className="mt-6 inline-flex items-center gap-2 text-xs text-neutral-500 transition-colors hover:text-black dark:hover:text-white"
          >
            <ArrowLeft size={14} />
            Back to Projects
          </Link>
        </div>
      </main>
    );
  }

  const isVideoPage = id === "videos";

  return (
    <main
      className={`
        relative
        flex
        min-h-screen
        w-full
        overflow-hidden
        bg-[#f8f8f6]
        text-black
        dark:bg-[#080808]
        dark:text-white
        py-20
        transition-opacity
        duration-1000
        ease-out
        ${pageLoaded ? "opacity-100" : "opacity-0"}
        lg:ml-55
        lg:w-[calc(100%-220px)]
      `}
    >
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          overflow-hidden
        "
      >
        <div
          className="
            absolute
            -right-40
            -top-40
            h-[500px]
            w-[500px]
            rounded-full
            bg-black/[0.025]
            blur-3xl
            dark:bg-white/[0.025]
          "
        />

        <div
          className="
            absolute
            -bottom-60
            -left-40
            h-[500px]
            w-[500px]
            rounded-full
            bg-black/[0.02]
            blur-3xl
            dark:bg-white/[0.02]
          "
        />

        <div
          className="
            absolute
            inset-0
            opacity-[0.025]
            [background-image:radial-gradient(#000_0.6px,transparent_0.6px)]
            [background-size:6px_6px]
            dark:opacity-[0.035]
            dark:[background-image:radial-gradient(#fff_0.6px,transparent_0.6px)]
          "
        />
      </div>

      <div className="relative z-10 mx-auto w-[calc(100%-3rem)] max-w-5xl">
        <div
          className={`
            mb-16
            flex
            items-center
            justify-between
            transition-all
            duration-1000
            ease-[cubic-bezier(0.22,1,0.36,1)]
            ${
              pageLoaded
                ? "translate-y-0 opacity-100"
                : "-translate-y-5 opacity-0"
            }
          `}
        >
          <Link
            href="/#projects"
            className="
              group
              inline-flex
              items-center
              gap-2
              text-[10px]
              uppercase
              tracking-[0.25em]
              text-neutral-500
              transition-colors
              duration-300
              hover:text-black
              dark:text-neutral-500
              dark:hover:text-white
            "
          >
            <ArrowLeft
              size={14}
              strokeWidth={1.5}
              className="
                transition-transform
                duration-500
                group-hover:-translate-x-1
              "
            />

            Back
          </Link>

          <div
            className="
              hidden
              items-center
              gap-2
              text-[9px]
              uppercase
              tracking-[0.25em]
              text-neutral-400
              sm:flex
            "
          >
            <span
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-black
                dark:bg-white
              "
            />

            Selected Works
          </div>
        </div>

        <header className="mb-16 sm:mb-20 lg:mb-24">
          <div className="overflow-hidden">
            <p
              className={`
                mb-4
                text-[9px]
                uppercase
                tracking-[0.4em]
                text-neutral-400
                transition-all
                duration-1000
                delay-100
                ease-[cubic-bezier(0.22,1,0.36,1)]
                ${
                  pageLoaded
                    ? "translate-y-0 opacity-100"
                    : "translate-y-full opacity-0"
                }
              `}
            >
              Portfolio / {categoryName}
            </p>
          </div>

          <div className="overflow-hidden">
            <h1
              className={`
                text-[clamp(3rem,9vw,8rem)]
                font-light
                leading-[0.85]
                tracking-[-0.07em]
                transition-all
                duration-[1200ms]
                delay-200
                ease-[cubic-bezier(0.22,1,0.36,1)]
                ${
                  pageLoaded
                    ? "translate-y-0 opacity-100"
                    : "translate-y-full opacity-0"
                }
              `}
            >
              {categoryName}
              <span className="text-neutral-300 dark:text-neutral-700">
                .
              </span>
            </h1>
          </div>

          <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <p
              className={`
                max-w-md
                text-xs
                font-light
                leading-relaxed
                text-neutral-500
                dark:text-neutral-400
                transition-all
                duration-1000
                delay-500
                ${
                  pageLoaded
                    ? "translate-y-0 opacity-100"
                    : "translate-y-5 opacity-0"
                }
              `}
            >
              A collection of {categoryName.toLowerCase()} works,
              visual experiments, commissioned projects, and
              creative explorations.
            </p>

            <div
              className={`
                flex
                items-center
                gap-3
                text-[9px]
                uppercase
                tracking-[0.25em]
                text-neutral-400
                transition-all
                duration-1000
                delay-500
                ${
                  pageLoaded
                    ? "translate-y-0 opacity-100"
                    : "translate-y-5 opacity-0"
                }
              `}
            >
              <span className="h-px w-8 bg-neutral-300 dark:bg-neutral-700" />

              {currentProjects.length}{" "}
              {currentProjects.length === 1
                ? "Project"
                : "Projects"}
            </div>
          </div>
        </header>

        {isVideoPage ? (
          <div
            className="
              grid
              grid-cols-1
              gap-3
              sm:grid-cols-2
              lg:grid-cols-3
              xl:grid-cols-4
            "
          >
            {(currentProjects as VideoProject[]).map(
              (project, index) => (
                <VideoCard
                  key={`${project.video}-${index}`}
                  project={project}
                  index={index}
                  loaded={pageLoaded}
                  onSelect={handleVideoSelect}
                />
              )
            )}
          </div>
        ) : (
          <div
            className="
              columns-3
              gap-1
              sm:columns-3
              md:columns-4
              lg:columns-5
            "
          >
            {(currentProjects as ImageProject[]).map(
              (project, index) => (
                <ImageCard
                  key={`${project.image}-${index}`}
                  project={project}
                  index={index}
                  loaded={pageLoaded}
                  categoryName={categoryName}
                  onSelect={handleImageSelect}
                />
              )
            )}
          </div>
        )}

        <footer
          className={`
            mt-20
            flex
            flex-col
            gap-3
            border-t
            border-black/10
            pt-6
            text-[9px]
            uppercase
            tracking-[0.25em]
            text-neutral-400
            dark:border-white/10
            sm:flex-row
            sm:items-center
            sm:justify-between
            transition-all
            duration-1000
            delay-700
            ${
              pageLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-5 opacity-0"
            }
          `}
        >
          <span>End of collection</span>

          <Link
            href="/#projects"
            className="
              group
              inline-flex
              items-center
              gap-2
              transition-colors
              hover:text-black
              dark:hover:text-white
            "
          >
            View all projects

            <ArrowUpRight
              size={12}
              className="
                transition-transform
                duration-300
                group-hover:translate-x-0.5
                group-hover:-translate-y-0.5
              "
            />
          </Link>
        </footer>
      </div>

      {selectedImage && (
        <ImageModal
          project={selectedImage}
          onClose={closeModal}
        />
      )}

      {selectedVideo && (
        <VideoModal
          project={selectedVideo}
          onClose={closeModal}
        />
      )}
    </main>
  );
}

/* =============================================================== */
/* IMAGE CARD */
/* =============================================================== */

type ImageCardProps = {
  project: ImageProject;
  index: number;
  loaded: boolean;
  categoryName: string;
  onSelect: (project: ImageProject) => void;
};

const ImageCard = memo(function ImageCard({
  project,
  index,
  loaded,
  categoryName,
  onSelect,
}: ImageCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(project)}
      className={`
        group
        relative
        mb-1
        block
        w-full
        cursor-pointer
        break-inside-avoid
        overflow-hidden
        rounded-lg
        text-left
        transition-all
        duration-[1000ms]
        ease-[cubic-bezier(0.22,1,0.36,1)]
        ${
          loaded
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-8 scale-[0.97] opacity-0"
        }
      `}
      style={{
        transitionDelay: `${Math.min(index * 70, 1000)}ms`,
      }}
    >
      <div
        className="
          relative
          overflow-hidden
          rounded-lg
          bg-neutral-200
          shadow-[0_8px_30px_rgba(0,0,0,0.06)]
          transition-all
          duration-700
          ease-out
          group-hover:-translate-y-1
          group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.14)]
          dark:bg-neutral-900
          dark:shadow-none
        "
      >
        <img
          src={project.image}
          alt={
            project.title ||
            `${categoryName} visual work`
          }
          loading={index === 0 ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={
            index === 0 ? "high" : undefined
          }
          draggable={false}
          className="
            block
            h-auto
            w-full
            object-contain
            transform-gpu
            transition-transform
            duration-[1200ms]
            ease-[cubic-bezier(0.22,1,0.36,1)]
            group-hover:scale-[1.045]
          "
        />

        <div
          className="
            absolute
            inset-0
            bg-black/0
            transition-colors
            duration-500
            group-hover:bg-black/35
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            flex
            items-center
            justify-center
          "
        >
          <div
            className="
              translate-y-3
              rounded-full
              border
              border-white/30
              bg-black/20
              px-4
              py-2
              text-[9px]
              uppercase
              tracking-[0.25em]
              text-white
              opacity-0
              backdrop-blur-md
              transition-all
              duration-500
              ease-out
              group-hover:translate-y-0
              group-hover:opacity-100
            "
          >
            View
          </div>
        </div>

        <div
          className="
            absolute
            right-3
            top-3
            flex
            h-7
            w-7
            items-center
            justify-center
            rounded-full
            border
            border-white/20
            bg-black/20
            text-white
            opacity-0
            backdrop-blur-md
            transition-all
            duration-500
            group-hover:opacity-100
          "
        >
          <ArrowUpRight
            size={12}
            className="
              transition-transform
              duration-500
              group-hover:rotate-45
            "
          />
        </div>
      </div>
    </button>
  );
});

/* =============================================================== */
/* VIDEO CARD */
/* =============================================================== */

type VideoCardProps = {
  project: VideoProject;
  index: number;
  loaded: boolean;
  onSelect: (project: VideoProject) => void;
};

const VideoCard = memo(function VideoCard({
  project,
  index,
  loaded,
  onSelect,
}: VideoCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(project)}
      className={`
        group
        relative
        w-full
        cursor-pointer
        overflow-hidden
        rounded-xl
        text-left
        transition-all
        duration-[1000ms]
        ease-[cubic-bezier(0.22,1,0.36,1)]
        ${
          loaded
            ? "translate-y-0 opacity-100"
            : "translate-y-8 opacity-0"
        }
      `}
      style={{
        transitionDelay: `${Math.min(index * 80, 600)}ms`,
      }}
    >
      <div
        className="
          relative
          overflow-hidden
          rounded-xl
          bg-neutral-900
          shadow-[0_15px_45px_rgba(0,0,0,0.1)]
          transition-all
          duration-700
          group-hover:-translate-y-1
          group-hover:shadow-[0_25px_70px_rgba(0,0,0,0.18)]
        "
      >
        <video
          src={project.video}
          preload="metadata"
          muted
          playsInline
          className="
            block
            h-auto
            w-full
            object-cover
            transform-gpu
            transition-transform
            duration-[1200ms]
            ease-[cubic-bezier(0.22,1,0.36,1)]
            group-hover:scale-[1.04]
          "
        />

        <div
          className="
            absolute
            inset-0
            bg-black/10
            transition-colors
            duration-500
            group-hover:bg-black/35
          "
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-full
              border
              border-white/30
              bg-white/10
              text-white
              shadow-xl
              backdrop-blur-md
              transition-all
              duration-700
              ease-[cubic-bezier(0.22,1,0.36,1)]
              group-hover:scale-110
              group-hover:bg-white
              group-hover:text-black
            "
          >
            <Play
              size={18}
              fill="currentColor"
              className="ml-0.5"
            />
          </div>
        </div>

        <div
          className="
            absolute
            bottom-4
            left-4
            right-4
            flex
            items-center
            justify-between
            text-[9px]
            uppercase
            tracking-[0.25em]
            text-white
          "
        >
          <span>Motion</span>

          <ArrowUpRight
            size={13}
            className="
              transition-transform
              duration-500
              group-hover:translate-x-1
              group-hover:-translate-y-1
            "
          />
        </div>
      </div>
    </button>
  );
});

/* =============================================================== */
/* IMAGE MODAL */
/* =============================================================== */

function ImageModal({
  project,
  onClose,
}: {
  project: ImageProject;
  onClose: () => void;
}) {
  return (
    <div
      className="
        fixed
        inset-0
        z-[100]
        flex
        items-center
        justify-center
        bg-black/90
        p-3
        backdrop-blur-xl
        animate-[modalFade_400ms_ease-out]
        sm:p-6
      "
      onClick={onClose}
    >
      <div
        className="
          relative
          flex
          max-h-[94vh]
          max-w-[96vw]
          items-center
          justify-center
          animate-[modalZoom_600ms_cubic-bezier(0.22,1,0.36,1)]
        "
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close image"
          className="
            absolute
            right-2
            top-2
            z-30
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            bg-white
            text-black
            shadow-xl
            transition-all
            duration-300
            hover:scale-110
            hover:rotate-90
            active:scale-95
          "
        >
          <X size={17} strokeWidth={1.8} />
        </button>

        <div
          className="
            max-h-[94vh]
            max-w-[96vw]
            overflow-hidden
            rounded-lg
          "
        >
          <img
            src={project.image}
            alt={project.title || "Visual work"}
            loading="eager"
            decoding="async"
            fetchPriority="high"
            draggable={false}
            className="
              block
              h-auto
              max-h-[94vh]
              max-w-[96vw]
              w-auto
              rounded-lg
              object-contain
              shadow-2xl
            "
          />
        </div>
      </div>
    </div>
  );
}

/* =============================================================== */
/* VIDEO MODAL */
/* =============================================================== */

function VideoModal({
  project,
  onClose,
}: {
  project: VideoProject;
  onClose: () => void;
}) {
  return (
    <div
      className="
        fixed
        inset-0
        z-[100]
        flex
        items-center
        justify-center
        bg-black/90
        p-3
        backdrop-blur-xl
        animate-[modalFade_400ms_ease-out]
        sm:p-6
      "
      onClick={onClose}
    >
      <div
        className="
          relative
          flex
          max-h-[94vh]
          max-w-[96vw]
          items-center
          justify-center
          overflow-hidden
          rounded-xl
          animate-[modalZoom_600ms_cubic-bezier(0.22,1,0.36,1)]
        "
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close video"
          className="
            absolute
            right-3
            top-3
            z-30
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            bg-white
            text-black
            shadow-xl
            transition-all
            duration-300
            hover:scale-110
            hover:rotate-90
            active:scale-95
          "
        >
          <X size={17} strokeWidth={1.8} />
        </button>

        <video
          src={project.video}
          controls
          autoPlay
          playsInline
          className="
            block
            h-auto
            max-h-[94vh]
            max-w-[96vw]
            w-auto
            rounded-xl
            object-contain
            shadow-2xl
          "
        />
      </div>
    </div>
  );
}