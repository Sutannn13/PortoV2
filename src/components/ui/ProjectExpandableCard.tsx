import * as React from "react"
import { createPortal } from "react-dom"
import { AnimatePresence, motion } from "motion/react"
import { Github, ArrowUpRight, Trophy, X } from 'lucide-react'
import { cn } from "@/lib/utils"
import type { Project } from "@/types"

export function ProjectExpandableCard({
  project,
  children,
  className,
}: {
  project: Project
  children?: React.ReactNode
  className?: string
}) {
  const [active, setActive] = React.useState(false)
  const cardRef = React.useRef<HTMLDivElement>(null)
  const id = React.useId()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(false)
    }

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setActive(false)
      }
    }

    if (active) {
      window.addEventListener("keydown", onKeyDown)
      document.addEventListener("mousedown", handleClickOutside)
      document.addEventListener("touchstart", handleClickOutside)
    }

    return () => {
      window.removeEventListener("keydown", onKeyDown)
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("touchstart", handleClickOutside)
    }
  }, [active])

  // Prevent background scrolling when active
  React.useEffect(() => {
    if (active) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    }
  }, [active])

  const renderModalContent = () => (
    <>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] h-full w-full bg-black/60 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && (
          <div
            className={cn(
              "fixed inset-0 z-[1001] flex items-center justify-center sm:p-4 md:p-10 pointer-events-none"
            )}
          >
            <motion.div
              layoutId={`card-${project.id}-${id}`}
              ref={cardRef}
              className={cn(
                "relative flex h-[100dvh] sm:h-auto max-h-[100dvh] sm:max-h-[90vh] w-full max-w-[900px] flex-col overflow-hidden bg-bg-card border border-border/50 shadow-2xl shadow-black/50 sm:rounded-2xl pointer-events-auto"
              )}
            >
              {/* Image Section in Modal */}
              <motion.div layoutId={`image-${project.id}-${id}`} className="relative isolate flex-shrink-0">
                {project.imageUrl && (
                  <>
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="h-64 sm:h-[400px] w-full object-cover object-top"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-bg-card to-transparent pointer-events-none" />
                  </>
                )}
                <motion.button
                  aria-label="Close card"
                  className="absolute right-4 top-4 sm:right-6 sm:top-6 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white/70 hover:bg-black/80 hover:text-white transition-all z-50"
                  onClick={() => setActive(false)}
                >
                  <X size={20} />
                </motion.button>
              </motion.div>

              {/* Content Section in Modal */}
              <div className="flex flex-col flex-1 overflow-y-auto bg-bg-card p-6 sm:p-10 overscroll-contain">
                <div className="flex flex-col mb-8">
                  <motion.span
                    layoutId={`category-${project.id}-${id}`}
                    className="mb-2 block font-mono text-xs tracking-wide text-accent"
                  >
                    {project.category}
                  </motion.span>
                  <motion.h3
                    layoutId={`title-${project.id}-${id}`}
                    className="text-2xl sm:text-4xl font-display font-bold text-text-primary"
                  >
                    {project.title}
                  </motion.h3>
                  <motion.p
                    layoutId={`description-${project.id}-${id}`}
                    className="mt-4 text-base sm:text-lg text-text-secondary leading-relaxed max-w-3xl"
                  >
                    {project.description}
                  </motion.p>
                </div>

                <div className="relative">
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ delay: 0.1, duration: 0.4 }}
                    className="prose prose-invert max-w-none text-text-secondary pb-8"
                  >
                    {children}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )

  return (
    <>
      {mounted && createPortal(renderModalContent(), document.body)}

      <motion.div
        role="button"
        tabIndex={0}
        aria-labelledby={`card-title-${id}`}
        aria-modal="true"
        layoutId={`card-${project.id}-${id}`}
        onClick={() => setActive(true)}
        className={cn(
          "cursor-target group relative overflow-hidden rounded-2xl border border-border bg-bg-card transition-all duration-500 hover:border-accent/30 hover:bg-bg-card-hover flex flex-col text-left focus:outline-none focus:ring-2 focus:ring-accent",
          className
        )}
        style={{ cursor: 'none' }}
      >
        {/* Project Image */}
        {project.imageUrl && (
          <motion.div layoutId={`image-${project.id}-${id}`} className="relative h-48 w-full overflow-hidden shrink-0">
            <img
              src={project.imageUrl}
              alt={project.title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-bg-card/20 to-transparent pointer-events-none" />

            {/* Award badge on image */}
            {project.award && (
              <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1.5 rounded-full bg-yellow-500/20 border border-yellow-400/40 backdrop-blur-sm px-3 py-1">
                <Trophy size={11} className="text-yellow-400" />
                <span className="font-mono text-[10px] font-semibold tracking-wide text-yellow-300">
                  {project.award}
                </span>
              </div>
            )}

            {/* Featured Badge */}
            {project.featured && (
              <div className="absolute right-3 top-3 z-10 rounded-full bg-accent/20 border border-accent/30 backdrop-blur-sm px-3 py-1 font-mono text-[10px] tracking-wider text-accent">
                FEATURED
              </div>
            )}
          </motion.div>
        )}

        {/* If no image, show featured badge in corner */}
        {!project.imageUrl && project.featured && (
          <div className="absolute right-4 top-4 z-10 rounded-full bg-accent/10 px-3 py-1 font-mono text-[10px] tracking-wider text-accent">
            FEATURED
          </div>
        )}

        {/* Content */}
        <div className="flex flex-1 flex-col p-6 sm:p-7">
          <motion.span
            layoutId={`category-${project.id}-${id}`}
            className="mb-2 block font-mono text-xs tracking-wide text-text-muted"
          >
            {project.category}
          </motion.span>

          <motion.h3
            layoutId={`title-${project.id}-${id}`}
            className="mb-3 font-display text-lg font-bold leading-snug text-text-primary transition-colors duration-300 group-hover:text-accent"
          >
            {project.title}
          </motion.h3>

          <motion.p
            layoutId={`description-${project.id}-${id}`}
            className="mb-5 flex-1 text-sm leading-relaxed text-text-secondary line-clamp-3"
          >
            {project.description}
          </motion.p>

          {/* Tech Stack */}
          <div className="mb-5 flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-md bg-bg-primary px-2.5 py-1 font-mono text-[11px] text-text-muted border border-border/50 shadow-sm"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between gap-4 mt-auto">
             {project.repoUrl && (
                <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-text-secondary transition-colors hover:text-accent relative z-10"
                    style={{ cursor: 'none' }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <Github size={14} />
                    Source
                </a>
             )}
             {/* Open Label aligned Right */}
             <span className="ml-auto flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-text-muted transition-colors group-hover:text-accent">
               Read More
               <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
             </span>
          </div>
        </div>
      </motion.div>
    </>
  )
}
