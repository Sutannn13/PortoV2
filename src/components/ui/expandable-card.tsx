"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"

import { cn } from "@/lib/utils"

interface ExpandableCardProps {
  title: string
  src: string
  description: string
  children?: React.ReactNode
  className?: string
  classNameExpanded?: string
  isBlurred?: boolean
  onOpenChange?: (open: boolean) => void
  [key: string]: unknown
}

export function ExpandableCard({
  title,
  src,
  description,
  children,
  className,
  classNameExpanded,
  isBlurred = false,
  onOpenChange,
  ...props
}: ExpandableCardProps) {
  const [active, setActive] = React.useState(false)
  const cardRef = React.useRef<HTMLDivElement>(null)
  const id = React.useId()

  const handleOpen = () => {
    setActive(true)
    onOpenChange?.(true)
  }

  const handleClose = React.useCallback(() => {
    setActive(false)
    onOpenChange?.(false)
  }, [onOpenChange])

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleClose()
    }
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        handleClose()
      }
    }
    window.addEventListener("keydown", onKeyDown)
    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("touchstart", handleClickOutside)
    return () => {
      window.removeEventListener("keydown", onKeyDown)
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("touchstart", handleClickOutside)
    }
  }, [handleClose])

  return (
    <>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-10 h-full w-full bg-white/50 backdrop-blur-md dark:bg-black/50"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && (
          <div
            className={cn(
              "fixed inset-0 z-[100] grid place-items-center before:pointer-events-none sm:mt-16"
            )}
          >
            <motion.div
              layoutId={`card-${title}-${id}`}
              ref={cardRef}
              className={cn(
                "relative flex h-full w-full max-w-[850px] flex-col overflow-auto bg-zinc-50 shadow-sm [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch] [scrollbar-width:none] sm:rounded-t-3xl dark:bg-zinc-950 dark:shadow-none",
                classNameExpanded
              )}
              {...props}
            >
              <motion.div layoutId={`image-${title}-${id}`}>
                <div className="relative before:absolute before:inset-x-0 before:bottom-[-1px] before:z-50 before:h-[70px] before:bg-gradient-to-t before:from-zinc-50 dark:before:from-zinc-950">
                  <img
                    src={src}
                    alt={title}
                    className="h-80 w-full object-cover object-center"
                  />
                </div>
              </motion.div>
              <div className="relative h-full before:fixed before:inset-x-0 before:bottom-0 before:z-50 before:h-[70px] before:bg-gradient-to-t before:from-zinc-50 dark:before:from-zinc-950">
                <div className="flex h-auto items-start justify-between p-8">
                  <div>
                    <motion.p
                      layoutId={`description-${description}-${id}`}
                      className="text-lg text-zinc-500 dark:text-zinc-400"
                    >
                      {description}
                    </motion.p>
                    <motion.h3
                      layoutId={`title-${title}-${id}`}
                      className="mt-0.5 text-4xl font-semibold text-black sm:text-4xl dark:text-white"
                    >
                      {title}
                    </motion.h3>
                  </div>
                  <motion.button
                    aria-label="Close card"
                    layoutId={`button-${title}-${id}`}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-200/90 bg-zinc-50 text-neutral-700 transition-colors duration-300 hover:border-gray-300/90 hover:bg-neutral-50 hover:text-black focus:outline-none dark:border-zinc-900 dark:bg-zinc-950 dark:text-white/70 dark:hover:border-zinc-800 dark:hover:bg-neutral-950 dark:hover:text-white"
                    onClick={() => handleClose()}
                  >
                    <motion.div
                      animate={{ rotate: active ? 45 : 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14" />
                        <path d="M12 5v14" />
                      </svg>
                    </motion.div>
                  </motion.button>
                </div>
                <div className="relative px-6 sm:px-8">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-start gap-4 overflow-auto pb-10 text-base text-zinc-500 dark:text-zinc-400"
                  >
                    {children}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <motion.div
        role="dialog"
        aria-labelledby={`card-title-${id}`}
        aria-modal="true"
        layoutId={`card-${title}-${id}`}
        onClick={() => handleOpen()}
        className={cn(
          "relative flex w-full cursor-pointer flex-col rounded-2xl border border-white/10 bg-zinc-950 p-3 overflow-hidden",
          className
        )}
      >
        {/* Dim overlay — no filter/opacity on the wrapper, only on this inert overlay */}
        <div
          className={cn(
            "absolute inset-0 rounded-2xl bg-black/0 pointer-events-none transition-all duration-300 z-10",
            isBlurred && "bg-black/60"
          )}
        />
        <div className="flex flex-col gap-4 w-full relative z-0">
          <motion.div layoutId={`image-${title}-${id}`} className="w-full">
            <img
              src={src}
              alt={title}
              className="h-44 w-full rounded-lg object-cover object-center"
            />
          </motion.div>
          <div className="flex items-center justify-between gap-2">
            <div className="flex flex-col min-w-0">
              <motion.p
                layoutId={`description-${description}-${id}`}
                className="text-sm font-medium text-zinc-500 md:text-left dark:text-zinc-400 truncate"
              >
                {description}
              </motion.p>
              <motion.h3
                layoutId={`title-${title}-${id}`}
                className="font-semibold text-black md:text-left dark:text-white text-sm leading-snug"
              >
                {title}
              </motion.h3>
            </div>
            <motion.button
              aria-label="Open card"
              layoutId={`button-${title}-${id}`}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 bg-zinc-900 text-white/70 transition-colors duration-300 hover:border-white/30 hover:bg-zinc-800 hover:text-white focus:outline-none"
            >
              <motion.div
                animate={{ rotate: active ? 45 : 0 }}
                transition={{ duration: 0.4 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="M12 5v14" />
                </svg>
              </motion.div>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </>
  )
}
