"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import localFont from "next/font/local";
import {
  Menu,
  X,
  Sun,
  Moon,
  Monitor,
  House,
  User,
  Wrench,
  Folder,
  BookOpen,
  Mail,
  Sparkles,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

const aristotelica = localFont({
  src: "../fonts/Aristotelica.ttf",
  variable: "--font-aristotelica",
});

const links = [
  { name: "home", icon: House },
  { name: "about", icon: User },
  { name: "skills", icon: Wrench },
  { name: "projects", icon: Folder },
  { name: "blog", icon: BookOpen },
  { name: "contact", icon: Mail },
];

type Theme = "system" | "light" | "dark";

export default function Navbar() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const [systemDark, setSystemDark] = useState(false);
  const [activeViewers, setActiveViewers] = useState(1);
  const [activeSection, setActiveSection] = useState("home");
  const pathname = usePathname();

  // Detect system theme
  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );

    const updateSystemTheme = () => {
      setSystemDark(mediaQuery.matches);
    };

    updateSystemTheme();
    mediaQuery.addEventListener("change", updateSystemTheme);

    return () => {
      mediaQuery.removeEventListener("change", updateSystemTheme);
    };
  }, []);

  // Theme initialization
  useEffect(() => {
    const saved = localStorage.getItem("theme") as Theme | null;

    if (saved === "system" || saved === "light" || saved === "dark") {
      setTheme(saved);
      applyTheme(saved);
    } else {
      setTheme("system");
      applyTheme("system");
    }
  }, []);

  // Apply theme
  const applyTheme = (
    selectedTheme: Theme,
    animate = false
  ) => {
    const root = document.documentElement;

    if (animate) {
      root.classList.add("theme-transition");

      window.requestAnimationFrame(() => {
        if (selectedTheme === "system") {
          const prefersDark = window.matchMedia(
            "(prefers-color-scheme: dark)"
          ).matches;

          root.classList.toggle("dark", prefersDark);
        } else {
          root.classList.toggle(
            "dark",
            selectedTheme === "dark"
          );
        }

        window.setTimeout(() => {
          root.classList.remove("theme-transition");
        }, 500);
      });

      return;
    }

    if (selectedTheme === "system") {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

      root.classList.toggle("dark", prefersDark);
    } else {
      root.classList.toggle(
        "dark",
        selectedTheme === "dark"
      );
    }
  };

  // Update document theme when system theme changes
  useEffect(() => {
    if (theme === "system") {
      const root = document.documentElement;

      root.classList.add("theme-transition");

      window.requestAnimationFrame(() => {
        root.classList.toggle("dark", systemDark);

        window.setTimeout(() => {
          root.classList.remove("theme-transition");
        }, 500);
      });
    }
  }, [systemDark, theme]);

  // Lock page scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Close mobile menu when switching to desktop
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const handleViewportChange = () => {
      if (mediaQuery.matches) {
        setMenuOpen(false);
        document.body.style.overflow = "";
      }
    };

    handleViewportChange();

    mediaQuery.addEventListener(
      "change",
      handleViewportChange
    );

    return () => {
      mediaQuery.removeEventListener(
        "change",
        handleViewportChange
      );
      document.body.style.overflow = "";
    };
  }, []);

  // Set theme
  const setSelectedTheme = (selectedTheme: Theme) => {
    setTheme(selectedTheme);
    applyTheme(selectedTheme, true);
    localStorage.setItem("theme", selectedTheme);
  };

  // Detect the actual active appearance for the logo
  const isEffectivelyDark =
    theme === "dark" || (theme === "system" && systemDark);

  // Determine the active navigation item directly from the URL
  const routeSection =
    pathname === "/blog" || pathname.startsWith("/blog/")
      ? "blog"
      : pathname === "/projects" ||
          pathname.startsWith("/projects/")
        ? "projects"
        : null;

  // Keep the correct navigation item active on individual pages
  useEffect(() => {
    if (
      pathname === "/blog" ||
      pathname.startsWith("/blog/")
    ) {
      setActiveSection("blog");
      sessionStorage.setItem(
        "yuan-visuals-active-section",
        "blog"
      );
      return;
    }

    if (
      pathname === "/projects" ||
      pathname.startsWith("/projects/")
    ) {
      setActiveSection("projects");
      sessionStorage.setItem(
        "yuan-visuals-active-section",
        "projects"
      );
      return;
    }

    const savedSection = sessionStorage.getItem(
      "yuan-visuals-active-section"
    );

    if (
      savedSection &&
      links.some((link) => link.name === savedSection)
    ) {
      setActiveSection(savedSection);
    }
  }, [pathname]);

  // Detect current scroll section
  useEffect(() => {
    // Never run the homepage section observer on
    // blog/project pages.
    if (pathname !== "/") {
      return;
    }

    let observer: IntersectionObserver | null = null;
    let frameId: number | null = null;

    const setupSectionObserver = () => {
      const sectionElements = links
        .map((link) => document.getElementById(link.name))
        .filter(
          (section): section is HTMLElement => section !== null
        );

      if (!sectionElements.length) {
        return;
      }

      const updateActiveSection = () => {
        const viewportPoint = window.innerHeight * 0.3;
        let closestSection: HTMLElement | null = null;
        let closestDistance = Number.POSITIVE_INFINITY;

        sectionElements.forEach((section) => {
          const rect = section.getBoundingClientRect();
          const distance = Math.abs(rect.top - viewportPoint);

          if (
            rect.top <= viewportPoint &&
            rect.bottom >= viewportPoint
          ) {
            if (distance < closestDistance) {
              closestDistance = distance;
              closestSection = section;
            }
          }
        });

        if (!closestSection) {
          sectionElements.forEach((section) => {
            const rect = section.getBoundingClientRect();

            if (rect.top <= viewportPoint) {
              const distance = Math.abs(
                rect.top - viewportPoint
              );

              if (distance < closestDistance) {
                closestDistance = distance;
                closestSection = section;
              }
            }
          });
        }

        if (!closestSection) {
          closestSection = sectionElements[0];
        }

        setActiveSection(closestSection.id);
        sessionStorage.setItem(
          "yuan-visuals-active-section",
          closestSection.id
        );
      };

      observer = new IntersectionObserver(
        (entries) => {
          const visibleSections = entries
            .filter((entry) => entry.isIntersecting)
            .sort(
              (a, b) =>
                b.intersectionRatio - a.intersectionRatio
            );

          if (visibleSections.length > 0) {
            updateActiveSection();
          }
        },
        {
          rootMargin: "-20% 0px -55% 0px",
          threshold: [0.1, 0.25, 0.5, 0.75],
        }
      );

      sectionElements.forEach((section) => {
        observer?.observe(section);
      });

      const handleScroll = () => {
        updateActiveSection();
      };

      window.addEventListener("scroll", handleScroll, {
        passive: true,
      });

      updateActiveSection();

      return () => {
        window.removeEventListener("scroll", handleScroll);
        observer?.disconnect();
        observer = null;
      };
    };

    frameId = window.requestAnimationFrame(() => {
      setupSectionObserver();
    });

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }

      observer?.disconnect();
      observer = null;
    };
  }, [pathname]);

  // Active viewer count
  useEffect(() => {
    const sessionKey = "yuan-visuals-viewer-session";
    const heartbeatInterval = 10000;
    const activeWindow = 25000;

    let sessionId = sessionStorage.getItem(sessionKey);

    if (!sessionId) {
      sessionId =
        typeof crypto !== "undefined" &&
        "randomUUID" in crypto
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

      sessionStorage.setItem(sessionKey, sessionId);
    }

    const updateViewer = async () => {
      try {
        const now = new Date().toISOString();

        const { error } = await supabase
          .from("active_viewers")
          .upsert(
            {
              session_id: sessionId,
              last_seen: now,
            },
            {
              onConflict: "session_id",
            }
          );

        if (error) {
          console.error("Failed to update viewer:", error);
          return;
        }

        const cutoff = new Date(
          Date.now() - activeWindow
        ).toISOString();

        const { count, error: countError } = await supabase
          .from("active_viewers")
          .select("*", {
            count: "exact",
            head: true,
          })
          .gte("last_seen", cutoff);

        if (countError) {
          console.error(
            "Failed to count viewers:",
            countError
          );
          return;
        }

        setActiveViewers(Math.max(1, count ?? 0));
      } catch (error) {
        console.error("Viewer tracking error:", error);
        setActiveViewers(1);
      }
    };

    updateViewer();

    const interval = window.setInterval(
      updateViewer,
      heartbeatInterval
    );

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  // Smooth scroll / route navigation
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);

    setActiveSection(id);

    sessionStorage.setItem(
      "yuan-visuals-active-section",
      id
    );

    setMenuOpen(false);

    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: "smooth" });
      }, 150);

      return;
    }

    window.location.href = `/#${id}`;
  };

  // Theme toggle UI
  const ThemeToggle = () => (
    <div
      className="grid h-7.5 w-19.5 shrink-0 grid-cols-3 items-center rounded-full border border-black/15 bg-gray-50 p-0.5 dark:border-white/15 dark:bg-black"
      aria-label="Theme selection"
    >
      <button
        type="button"
        onClick={() => setSelectedTheme("system")}
        aria-label="System theme"
        className={`flex h-6 w-6 items-center justify-center rounded-full transition-all duration-200 ${
          theme === "system"
            ? "bg-gray-500 text-gray-800 dark:bg-white/15 dark:text-white"
            : "bg-transparent text-gray-500 dark:text-gray-400 hover:bg-gray-200/70 hover:text-gray-800 dark:hover:bg-white/10 dark:hover:text-white"
        }`}
      >
        <Monitor size={12} strokeWidth={1.5} />
      </button>

      <button
        type="button"
        onClick={() => setSelectedTheme("light")}
        aria-label="Light theme"
        className={`flex h-6 w-6 items-center justify-center rounded-full transition-all duration-200 ${
          theme === "light"
            ? "bg-gray-200 text-gray-800 dark:bg-white/15 dark:text-white"
            : "bg-transparent text-gray-500 dark:text-gray-400 hover:bg-gray-200/70 hover:text-gray-800 dark:hover:bg-white/10 dark:hover:text-white"
        }`}
      >
        <Sun size={12} strokeWidth={1.5} />
      </button>

      <button
        type="button"
        onClick={() => setSelectedTheme("dark")}
        aria-label="Dark theme"
        className={`flex h-6 w-6 items-center justify-center rounded-full transition-all duration-200 ${
          theme === "dark"
            ? "bg-gray-200 text-gray-800 dark:bg-white/15 dark:text-white"
            : "bg-transparent text-gray-500 hover:bg-gray-200/70 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-white/10 dark:hover:text-white"
        }`}
      >
        <Moon size={12} strokeWidth={1.5} />
      </button>
    </div>
  );

  // Shared sidebar content
  const SidebarContent = () => {
    const visibleViewers = Math.min(activeViewers, 3);

    const viewerIcons = [
      "/viewing-icon/eren.jpg",
      "/viewing-icon/mikasa.jpg",
      "/viewing-icon/armin.jpg",
    ];

    return (
      <>
        {/* LIVE VIEWERS */}
        <div className="mx-0 min-w-0 border-b border-black/10 pb-3 dark:border-white/10">
          <div className="flex items-center">
            <div className="flex -space-x-1.5">
              {viewerIcons
                .slice(0, visibleViewers)
                .map((src, index) => (
                  <span
                    key={index}
                    className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-gray-200 dark:border-black dark:bg-gray-800"
                  >
                    <Image
                      src={src}
                      alt={`Viewer ${index + 1}`}
                      width={28}
                      height={28}
                      className="h-full w-full object-cover"
                    />
                  </span>
                ))}

              {activeViewers > 3 && (
                <span className="flex h-7 min-w-7 items-center justify-center rounded-full border-2 border-white bg-gray-100 px-1.5 text-[10px] text-gray-500 dark:border-black dark:bg-gray-900 dark:text-gray-300">
                  +{activeViewers - 3}
                </span>
              )}
            </div>
          </div>

          <div className="mt-2 flex min-w-0 items-center gap-1.5">
            <span className="shrink-0 text-[14px] font-semibold text-black dark:text-white">
              {activeViewers}
            </span>

            <span className="min-w-0 whitespace-normal wrap-break-word text-[12px] text-gray-500 dark:text-gray-400">
              {activeViewers === 1
                ? "person viewing now"
                : "people viewing now"}
            </span>
          </div>
        </div>

        {/* AVAILABILITY */}
        <div className="mx-0 min-w-0 border-b border-black/10 pb-3 pt-3 dark:border-white/10">
          <div className="flex min-w-0 items-center justify-between gap-2">
            <div className="flex min-w-0 items-center gap-2">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>

              <span className="min-w-0 text-[12px] font-medium text-gray-800 dark:text-gray-200">
                Available for projects
              </span>
            </div>
          </div>

          <div className="mt-2 flex items-center gap-2 text-[11px] text-gray-500 dark:text-gray-400">
            <span>Open to Freelance & Full-Time Opportunities</span>
          </div>
        </div>

        {/* SERVICES */}
        <div className="mx-0 min-w-0">
          <div className="flex min-w-0 items-center gap-1.5">
            <Sparkles
              size={12}
              strokeWidth={1.5}
              className="shrink-0 text-gray-500 dark:text-gray-400"
            />

            <span className="min-w-0 text-[12px] font-medium text-gray-700 dark:text-gray-300">
              Services
            </span>
          </div>

          <div className="mt-2 flex flex-wrap gap-1.5">
            <span className="rounded-md border border-black/10 bg-gray-50 px-2 py-1 text-[10px] text-gray-500 dark:border-white/10 dark:bg-white/5 dark:text-gray-400">
              Graphic & Poster Design
            </span>

            <span className="rounded-md border border-black/10 bg-gray-50 px-2 py-1 text-[10px] text-gray-500 dark:border-white/10 dark:bg-white/5 dark:text-gray-400">
              Brand Identity
            </span>

            <span className="rounded-md border border-black/10 bg-gray-50 px-2 py-1 text-[10px] text-gray-500 dark:border-white/10 dark:bg-white/5 dark:text-gray-400">
              Video Editing
            </span>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <aside className="fixed left-0 top-0 z-50 hidden h-screen w-55 border-r border-black/10 bg-white dark:border-white/10 dark:bg-black lg:flex lg:flex-col">
        {/* BRAND */}
        <div className="flex h-16 shrink-0 items-center px-6">
          <button
            type="button"
            onClick={() => scrollToSection("home")}
            className="flex min-w-0 items-center gap-2 outline-none"
          >
            <Image
              src={
                isEffectivelyDark
                  ? "/images/yv-white.svg"
                  : "/images/yv-black.svg"
              }
              alt="logo"
              width={18}
              height={18}
              className="shrink-0"
            />

            <span className={`min-w-0 whitespace-normal wrap-break-word text-[18px] text-black dark:text-white ${aristotelica.className}`}>
              yuan visuals
            </span>
          </button>
        </div>

        {/* NAVIGATION */}
        <nav
          className="flex min-w-0 flex-1 flex-col px-6 py-4"
          aria-label="Primary"
        >
          <div className="flex min-w-0 flex-col gap-0.5">
            {links.map((link) => {
              const Icon = link.icon;

              const isActive =
                routeSection !== null
                  ? routeSection === link.name
                  : activeSection === link.name;

              return (
                <button
                  key={link.name}
                  type="button"
                  onClick={() => scrollToSection(link.name)}
                  className={`group relative flex min-w-0 w-full items-start gap-2.5 rounded-lg px-0 py-1.5 text-left text-[13px] capitalize outline-none transition-colors duration-200 ${
                    isActive
                      ? "text-black dark:text-white before:absolute before:-inset-x-2 before:inset-y-0 before:z-0 before:rounded-lg before:bg-gray-200 dark:before:bg-white/10"
                      : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
                  }`}
                >
                  <Icon
                    size={14}
                    strokeWidth={1.5}
                    className="relative z-10 mt-0.5 shrink-0"
                  />

                  <span className="relative z-10 min-w-0 whitespace-normal wrap-break-word leading-5">
                    {link.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* LINE BELOW CONTACT */}
          <div className="mt-3 border-b border-black/10 dark:border-white/10" />

          {/* SIDEBAR CONTENT */}
          <div className="mt-3 min-w-0 space-y-3 pb-2">
            <SidebarContent />
          </div>

          {/* THEME TOGGLE BELOW SIDEBAR CONTENT */}
          <div className="mt-3 border-t border-black/10 pt-2 dark:border-white/10">
            <ThemeToggle />
          </div>
        </nav>
      </aside>

      {/* MOBILE / TABLET TOP BAR */}
      <div className="fixed left-0 top-0 z-50 flex h-15 w-full items-center justify-between border border-black/10 bg-white px-3.5 dark:border-white/10 dark:bg-black lg:hidden">
        {/* BRAND */}
        <button
          type="button"
          onClick={() => scrollToSection("home")}
          className="flex items-center gap-2 outline-none"
        >
          <Image
            src={
              isEffectivelyDark
                ? "/images/yv-white.svg"
                : "/images/yv-black.svg"
            }
            alt="logo"
            width={18}
            height={18}
            className="shrink-0"
          />

          <span className={`shrink-0 text-[16px] text-black dark:text-white ${aristotelica.className}`}>
            yuan visuals
          </span>
        </button>

        {/* BURGER */}
        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-gray-600 transition-colors duration-200 hover:bg-transparent hover:text-black focus-visible:ring-2 focus-visible:ring-black/40 dark:bg-transparent dark:text-gray-400 dark:hover:bg-transparent dark:hover:text-white dark:focus-visible:ring-white/40"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <Menu
            size={17}
            strokeWidth={1.5}
            className={`absolute transition-all duration-300 ease-in-out ${
              menuOpen
                ? "rotate-90 scale-75 opacity-0"
                : "rotate-0 scale-100 opacity-100"
            }`}
          />

          <X
            size={17}
            strokeWidth={1.5}
            className={`absolute transition-all duration-300 ease-in-out ${
              menuOpen
                ? "rotate-0 scale-100 opacity-100"
                : "-rotate-90 scale-75 opacity-0"
            }`}
          />
        </button>
      </div>

      {/* FULL-SCREEN MOBILE MENU */}
      <div
        className={`fixed inset-0 z-40 h-screen w-full overflow-hidden border border-black/10 bg-white transition-all duration-300 ease-out dark:border-white/10 dark:bg-black lg:hidden ${
          menuOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible translate-y-2 opacity-0"
        }`}
      >
        {/* MENU HEADER */}
        <div className="flex h-15 shrink-0 items-center justify-between border-b border-black/10 bg-white px-3.5 dark:border-white/10 dark:bg-black">
          <button
            type="button"
            onClick={() => scrollToSection("home")}
            className="flex items-center gap-2 outline-none"
          >
            <Image
              src={
                isEffectivelyDark
                  ? "/images/yv-white.svg"
                  : "/images/yv-black.svg"
              }
              alt="logo"
              width={18}
              height={18}
              className="shrink-0"
            />

            <span className={`shrink-0 text-[16px] text-black dark:text-white ${aristotelica.className}`}>
              yuan visuals
            </span>
          </button>

          {/* CLOSE */}
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-gray-600 transition-colors duration-200 hover:bg-transparent hover:text-black focus-visible:ring-2 focus-visible:ring-black/40 dark:bg-transparent dark:text-gray-400 dark:hover:bg-transparent dark:hover:text-white dark:focus-visible:ring-white/40"
            aria-label="Close menu"
          >
            <X size={17} strokeWidth={1.5} />
          </button>
        </div>

        {/* MENU CONTENT */}
        <nav
          className="flex h-[calc(100vh-60px)] w-full flex-col overflow-hidden px-6 py-6"
          aria-label="Mobile"
        >
          <div className="flex flex-col gap-0.5">
            {links.map((link, index) => {
              const Icon = link.icon;

              const isActive =
                routeSection !== null
                  ? routeSection === link.name
                  : activeSection === link.name;

              return (
                <button
                  key={link.name}
                  type="button"
                  onClick={() => scrollToSection(link.name)}
                  style={{
                    transitionDelay: menuOpen
                      ? `${index * 40 + 60}ms`
                      : "0ms",
                  }}
                  className={`group relative flex w-full items-center gap-3 rounded-lg px-0 py-2.5 text-left text-[15px] capitalize outline-none transition-all duration-300 ${
                    isActive
                      ? "text-black dark:text-white before:absolute before:-inset-x-2 before:inset-y-0 before:z-0 before:rounded-lg before:bg-gray-200 dark:before:bg-white/10"
                      : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
                  } ${
                    menuOpen
                      ? "translate-x-0 opacity-100"
                      : "translate-x-3 opacity-0"
                  }`}
                >
                  <Icon
                    size={16}
                    strokeWidth={1.5}
                    className="relative z-10 shrink-0"
                  />

                  <span className="relative z-10">
                    {link.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* LINE BELOW CONTACT */}
          <div
            className={`mt-3 border-b border-black/20 transition-all duration-300 dark:border-white/20 ${
              menuOpen
                ? "translate-y-0 opacity-100"
                : "translate-y-2 opacity-0"
            }`}
            style={{
              transitionDelay: menuOpen
                ? `${links.length * 40 + 60}ms`
                : "0ms",
            }}
          />

          {/* SAME CONTENT AS DESKTOP SIDEBAR */}
          <div
            className={`mt-3 space-y-3 transition-all duration-300 ${
              menuOpen
                ? "translate-y-0 opacity-100"
                : "translate-y-2 opacity-0"
            }`}
            style={{
              transitionDelay: menuOpen
                ? `${links.length * 40 + 120}ms`
                : "0ms",
            }}
          >
            <SidebarContent />
          </div>

          {/* THEME TOGGLE BELOW SIDEBAR CONTENT */}
          <div
            className={`mx-0 mt-3 border-t border-black/10 pt-2 transition-all duration-300 dark:border-white/10 ${
              menuOpen
                ? "translate-x-0 opacity-100"
                : "translate-x-3 opacity-0"
            }`}
            style={{
              transitionDelay: menuOpen
                ? `${links.length * 40 + 180}ms`
                : "0ms",
            }}
          >
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </>
  );
}
