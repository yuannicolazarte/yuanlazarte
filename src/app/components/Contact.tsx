"use client";

import { useState, type FormEvent } from "react";
import emailjs from "@emailjs/browser";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  Clock3,
  Send,
} from "lucide-react";
import { FaFacebookF, FaInstagram, FaGoogle } from "react-icons/fa6";

type FormValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const initialForm: FormValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function Contact() {
  const [form, setForm] = useState<FormValues>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  function updateField(
    field: keyof FormValues,
    value: string
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    if (submitted) {
      setSubmitted(false);
    }
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setIsSending(true);

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      setSubmitted(true);
    } catch (error) {
      console.error("EmailJS Error:", error);
      alert(
        "Unable to send your message right now. Please try again."
      );
    } finally {
      setIsSending(false);
    }
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="flex min-h-screen w-full items-center py-20 lg:ml-55 lg:w-[calc(100%-220px)]"
    >
      <div className="mx-auto w-[calc(100%-3rem)] max-w-5xl">
        {/* ================================================================ */}
        {/* SECTION HEADER                                                    */}
        {/* ================================================================ */}

        <div className="mb-16">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-medium tracking-[0.2em] text-gray-400 dark:text-gray-500">
              05
            </span>

            <div className="h-px w-6 bg-gray-400/40 dark:bg-gray-500/40" />
          </div>

          <div className="mt-5 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-white sm:text-3xl">
                Contact
              </h2>

              <motion.p
                initial={{ y: 12, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mt-3 max-w-lg text-xs font-light leading-6 text-gray-500 dark:text-gray-400 sm:text-sm"
              >
                Have a project in mind? Share the details and
                let&apos;s discuss how I can help bring your
                ideas to life.
              </motion.p>
            </div>

            <span className="text-[9px] font-light uppercase tracking-[0.18em] text-gray-400 dark:text-gray-500">
              Available for selected projects
            </span>
          </div>
        </div>

        {/* ================================================================ */}
        {/* MAIN CONTENT                                                       */}
        {/* ================================================================ */}

        <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          {/* ============================================================ */}
          {/* LEFT SIDE                                                       */}
          {/* ============================================================ */}

          <motion.div
            initial={{ y: 18, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.5,
              delay: 0.04,
              ease: "easeOut",
            }}
            className="flex flex-col"
          >
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">
                Let&apos;s work together
              </p>

              <h1
                id="contact-heading"
                className="mt-4 max-w-md text-3xl font-semibold leading-[1.1] tracking-tight text-black dark:text-white sm:text-4xl"
              >
                Let&apos;s turn your idea into something visual.
              </h1>

              <p className="mt-5 max-w-md text-sm font-light leading-6 text-gray-500 dark:text-gray-400">
                Whether you need a visual identity, marketing
                material, or edited video content, I&apos;m open
                to discussing projects that have a clear creative
                direction and purpose.
              </p>
            </div>

            {/* PROJECT NOTE */}
            <motion.div
              initial={{ y: 18, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.5,
                delay: 0.08,
                ease: "easeOut",
              }}
              className="mt-8 border-t border-gray-500/20 pt-5 dark:border-gray-400/20"
            >
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-black dark:bg-white" />

                <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-gray-500 dark:text-gray-400">
                  Open to meaningful work
                </span>
              </div>

              <p className="mt-2 max-w-sm text-xs font-light leading-5 text-gray-400 dark:text-gray-500">
                I&apos;m interested in thoughtful design projects
                where strong ideas, clear communication, and
                purposeful visuals come together.
              </p>
            </motion.div>

            {/* BRAND MARK */}
            <motion.div
              initial={{ y: 18, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.5,
                delay: 0.12,
                ease: "easeOut",
              }}
              className="mt-10 flex justify-center border-t border-gray-500/20 pt-8 dark:border-gray-400/20 sm:justify-start lg:justify-center"
            >
              <div className="relative flex h-44 w-44 items-center justify-center">
                {/* OUTER CIRCLE */}
                <div className="absolute inset-3 rounded-full border border-gray-500/15 dark:border-gray-400/15" />

                {/* ROTATING TEXT */}
                <svg
                  viewBox="0 0 220 220"
                  className="absolute inset-0 h-full w-full animate-[spin_22s_linear_infinite]"
                  aria-hidden="true"
                >
                  <defs>
                    <path
                      id="contact-text-circle"
                      d="M 110,110 m -82,0 a 82,82 0 1,1 164,0 a 82,82 0 1,1 -164,0"
                    />
                  </defs>

                  <text className="fill-gray-400 text-[11.7px] font-medium uppercase tracking-[0.22em] dark:fill-gray-500">
                    <textPath
                      href="#contact-text-circle"
                      startOffset="0%"
                    >
                      CREATIVE VISION • VISUAL STORYTELLING • BRAND IDENTITY • 
                    </textPath>
                  </text>
                </svg>

                {/* LOGO */}
                <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full border border-gray-500/20 bg-white dark:border-gray-400/20 dark:bg-black">
                  <Image
                    src="/images/yv-black.svg"
                    alt="Yuan Visuals"
                    width={48}
                    height={48}
                    className="h-12 w-12 dark:hidden"
                  />

                  <Image
                    src="/images/yv-white.svg"
                    alt="Yuan Visuals"
                    width={48}
                    height={48}
                    className="hidden h-12 w-12 dark:block"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* ============================================================ */}
          {/* RIGHT SIDE — FORM                                               */}
          {/* ============================================================ */}

          <motion.div
            initial={{ y: 18, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.5,
              delay: 0.08,
              ease: "easeOut",
            }}
            className="min-w-0"
          >
            {submitted ? (
              /* ======================================================== */
              /* SUCCESS STATE                                               */
              /* ======================================================== */

              <div className="flex min-h-120 flex-col justify-center border-t border-gray-500/20 pt-10 dark:border-gray-400/20">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-300 dark:border-gray-700">
                  <Check
                    className="h-5 w-5 text-black dark:text-white"
                    strokeWidth={1.5}
                  />
                </div>

                <p className="mt-7 text-[10px] font-medium uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">
                  Message received
                </p>

                <h2 className="mt-3 max-w-md text-2xl font-semibold tracking-tight text-black dark:text-white sm:text-3xl">
                  Thank you,{" "}
                  {form.name.split(" ")[0] || "there"}.
                </h2>

                <p className="mt-4 max-w-md text-sm font-light leading-6 text-gray-500 dark:text-gray-400">
                  Your inquiry has been sent successfully. I&apos;ll
                  review the details and get back to you as soon as
                  possible.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setForm(initialForm);
                    setSubmitted(false);
                  }}
                  className="group mt-8 flex w-fit items-center gap-2 border-b border-black pb-1 text-xs font-medium text-black transition-opacity hover:opacity-60 dark:border-white dark:text-white"
                >
                  Send another inquiry

                  <ArrowUpRight
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={1.5}
                  />
                </button>
              </div>
            ) : (
              <>
                {/* FORM HEADER */}
                <div className="border-t border-gray-500/20 pt-8 dark:border-gray-400/20">
                  <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">
                    Project inquiry
                  </p>

                  <h2 className="mt-3 text-xl font-semibold tracking-tight text-black dark:text-white sm:text-2xl">
                    Tell me about your project.
                  </h2>

                  <p className="mt-2 max-w-md text-xs font-light leading-5 text-gray-500 dark:text-gray-400">
                    The more details you provide, the better I can
                    understand your needs and respond appropriately.
                  </p>
                </div>

                {/* FORM */}
                <form
                  onSubmit={handleSubmit}
                  className="mt-9 space-y-7"
                >
                  {/* NAME + EMAIL */}
                  <div className="grid gap-7 sm:grid-cols-2">
                    {/* NAME */}
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="mb-2 block text-[10px] font-medium uppercase tracking-[0.12em] text-gray-500 dark:text-gray-400"
                      >
                        Name
                        <span className="ml-1 text-black dark:text-white">
                          *
                        </span>
                      </label>

                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        value={form.name}
                        onChange={(event) =>
                          updateField(
                            "name",
                            event.target.value
                          )
                        }
                        placeholder="Your name"
                        className="w-full border-b border-gray-500/25 bg-transparent px-0 py-2.5 text-sm font-light text-black outline-none transition-colors placeholder:text-gray-400 focus:border-black dark:border-gray-400/25 dark:text-white dark:placeholder:text-gray-600 dark:focus:border-white"
                      />
                    </div>

                    {/* EMAIL */}
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="mb-2 block text-[10px] font-medium uppercase tracking-[0.12em] text-gray-500 dark:text-gray-400"
                      >
                        Email
                        <span className="ml-1 text-black dark:text-white">
                          *
                        </span>
                      </label>

                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={form.email}
                        onChange={(event) =>
                          updateField(
                            "email",
                            event.target.value
                          )
                        }
                        placeholder="you@example.com"
                        className="w-full border-b border-gray-500/25 bg-transparent px-0 py-2.5 text-sm font-light text-black outline-none transition-colors placeholder:text-gray-400 focus:border-black dark:border-gray-400/25 dark:text-white dark:placeholder:text-gray-600 dark:focus:border-white"
                      />
                    </div>
                  </div>

                  {/* SUBJECT */}
                  <div>
                    <label
                      htmlFor="contact-subject"
                      className="mb-2 block text-[10px] font-medium uppercase tracking-[0.12em] text-gray-500 dark:text-gray-400"
                    >
                      Subject
                      <span className="ml-1 text-black dark:text-white">
                        *
                      </span>
                    </label>

                    <input
                      id="contact-subject"
                      name="subject"
                      type="text"
                      required
                      value={form.subject}
                      onChange={(event) =>
                        updateField(
                          "subject",
                          event.target.value
                        )
                      }
                      placeholder="e.g. Brand identity project"
                      className="w-full border-b border-gray-500/25 bg-transparent px-0 py-2.5 text-sm font-light text-black outline-none transition-colors placeholder:text-gray-400 focus:border-black dark:border-gray-400/25 dark:text-white dark:placeholder:text-gray-600 dark:focus:border-white"
                    />
                  </div>

                  {/* MESSAGE */}
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="mb-2 block text-[10px] font-medium uppercase tracking-[0.12em] text-gray-500 dark:text-gray-400"
                    >
                      Project details
                      <span className="ml-1 text-black dark:text-white">
                        *
                      </span>
                    </label>

                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={(event) =>
                        updateField(
                          "message",
                          event.target.value
                        )
                      }
                      placeholder="Tell me about your project, goals, timeline, and any relevant details."
                      className="w-full resize-none border-b border-gray-500/25 bg-transparent px-0 py-2.5 text-sm font-light leading-6 text-black outline-none transition-colors placeholder:text-gray-400 focus:border-black dark:border-gray-400/25 dark:text-white dark:placeholder:text-gray-600 dark:focus:border-white"
                    />
                  </div>

                  {/* SUBMIT AREA */}
                  <div className="flex flex-col gap-5 pt-2 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2 text-[10px] font-light text-gray-400 dark:text-gray-500">
                      <Clock3
                        className="h-3.5 w-3.5 shrink-0"
                        strokeWidth={1.4}
                      />

                      <span>
                        Typical response time: within 24 hours
                      </span>
                    </div>

                    <button
                      type="submit"
                      disabled={isSending}
                      className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-black px-6 py-3.5 text-xs font-medium text-white transition-all duration-300 hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-black dark:hover:bg-gray-200 sm:w-auto"
                    >
                      {isSending ? (
                        <>
                          Sending
                          <span className="h-3.5 w-3.5 animate-spin rounded-full border border-white/30 border-t-white dark:border-black/30 dark:border-t-black" />
                        </>
                      ) : (
                        <>
                          Send message

                          <Send
                            className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            strokeWidth={1.5}
                          />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </div>

        {/* ================================================================ */}
        {/* FOOTER                                                            */}
        {/* ================================================================ */}

        <motion.div
          initial={{ y: 18, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            duration: 0.5,
            delay: 0.12,
            ease: "easeOut",
          }}
          className="mt-10 border-t border-gray-500/20 pt-5 dark:border-gray-400/20"
        >
          <div className="flex w-full items-center justify-between gap-4">
            <p className="whitespace-nowrap text-xs font-light tracking-[0.15em] text-gray-400 dark:text-gray-500">
              Created by Yuan Lazarte © 2026
            </p>

            <div className="flex shrink-0 items-center gap-5">
              <a
                href="https://www.facebook.com/yuannicolazarte"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-gray-400 transition-colors hover:text-black dark:text-gray-500 dark:hover:text-white"
              >
                <FaFacebookF className="h-3.5 w-3.5" />
              </a>

              <a
                href="https://www.instagram.com/yuanvisualss/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-gray-400 transition-colors hover:text-black dark:text-gray-500 dark:hover:text-white"
              >
                <FaInstagram className="h-3.5 w-3.5" />
              </a>

              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=yuannicolazarte30@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Email"
                className="text-gray-400 transition-colors hover:text-black dark:text-gray-500 dark:hover:text-white"
              >
                <FaGoogle className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
