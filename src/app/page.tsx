"use client";

import Home from "@/app/components/Home";
import About from "@/app/components/About";
import Skills from "@/app/components/Skills";
import Projects from "@/app/components/Projects";
import Blog from "@/app/components/Blog";
import Contact from "@/app/components/Contact";

export default function Page() {
  return (
    <main className="min-h-screen">
      <Home />
      <About />
      <Skills />
      <Projects />
      <Blog />
      <Contact />
    </main>
  );
}