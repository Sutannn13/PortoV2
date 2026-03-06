import React, { useRef, useEffect, useState, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export interface ShuffleProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  shuffleDirection?: 'left' | 'right' | 'up' | 'down';
  duration?: number;
  maxDelay?: number;
  ease?: string | ((t: number) => number);
  threshold?: number;
  rootMargin?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  textAlign?: React.CSSProperties['textAlign'];
  onShuffleComplete?: () => void;
  shuffleTimes?: number;
  animationMode?: 'random' | 'evenodd';
  loop?: boolean;
  loopDelay?: number;
  stagger?: number;
  scrambleCharset?: string;
  colorFrom?: string;
  colorTo?: string;
  triggerOnce?: boolean;
  respectReducedMotion?: boolean;
  triggerOnHover?: boolean;
}

const Shuffle: React.FC<ShuffleProps> = ({
  text,
  className = '',
  style = {},
  shuffleDirection = 'right',
  duration = 0.35,
  maxDelay = 0,
  ease = 'power3.out',
  threshold = 0.1,
  rootMargin = '-100px',
  tag = 'p',
  textAlign = 'center',
  onShuffleComplete,
  shuffleTimes = 1,
  animationMode = 'evenodd',
  loop = false,
  loopDelay = 0,
  stagger = 0.03,
  scrambleCharset = '',
  colorFrom,
  colorTo,
  triggerOnce = true,
  respectReducedMotion = true,
  triggerOnHover = true
}) => {
  const ref = useRef<HTMLElement>(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [ready, setReady] = useState(false);

  const charsRef = useRef<HTMLSpanElement[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const playingRef = useRef(false);
  const hoverHandlerRef = useRef<((e: Event) => void) | null>(null);

  useEffect(() => {
    if ('fonts' in document) {
      if (document.fonts.status === 'loaded') setFontsLoaded(true);
      else document.fonts.ready.then(() => setFontsLoaded(true));
    } else setFontsLoaded(true);
  }, []);

  const scrollTriggerStart = useMemo(() => {
    const startPct = (1 - threshold) * 100;
    const mm = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin || '');
    const mv = mm ? parseFloat(mm[1]) : 0;
    const mu = mm ? mm[2] || 'px' : 'px';
    const sign = mv === 0 ? '' : mv < 0 ? `-=${Math.abs(mv)}${mu}` : `+=${mv}${mu}`;
    return `top ${startPct}%${sign}`;
  }, [threshold, rootMargin]);

  useGSAP(
    () => {
      if (!ref.current || !text || !fontsLoaded) return;
      if (respectReducedMotion && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        onShuffleComplete?.();
        return;
      }

      const el = ref.current as HTMLElement;
      const start = scrollTriggerStart;

      const removeHover = () => {
        if (hoverHandlerRef.current && ref.current) {
          ref.current.removeEventListener('mouseenter', hoverHandlerRef.current);
          hoverHandlerRef.current = null;
        }
      };

      const teardown = () => {
        if (tlRef.current) {
          tlRef.current.kill();
          tlRef.current = null;
        }
        charsRef.current = [];
        playingRef.current = false;
      };

      const createCharElements = () => {
        if (!el) return;

        const textContent = text;
        charsRef.current = [];

        // Clear element
        el.innerHTML = '';

        // Create character spans
        textContent.split('').forEach((char) => {
          const charSpan = document.createElement('span');
          charSpan.textContent = char === ' ' ? '\u00A0' : char; // Use non-breaking space
          charSpan.style.display = 'inline-block';
          charSpan.style.willChange = 'transform';

          // Create wrapper for animation
          const wrapper = document.createElement('span');
          wrapper.style.display = 'inline-block';
          wrapper.style.overflow = 'hidden';
          wrapper.style.position = 'relative';

          // Set initial position based on direction
          if (shuffleDirection === 'right') {
            charSpan.style.transform = 'translateX(-100%)';
          } else if (shuffleDirection === 'left') {
            charSpan.style.transform = 'translateX(100%)';
          } else if (shuffleDirection === 'down') {
            charSpan.style.transform = 'translateY(-100%)';
          } else if (shuffleDirection === 'up') {
            charSpan.style.transform = 'translateY(100%)';
          }

          wrapper.appendChild(charSpan);
          el.appendChild(wrapper);
          charsRef.current.push(charSpan);
        });
      };

      const play = () => {
        if (!charsRef.current.length || playingRef.current) return;

        playingRef.current = true;

        const chars = charsRef.current;

        const tl = gsap.timeline({
          repeat: loop ? -1 : 0,
          repeatDelay: loop ? loopDelay : 0,
          onComplete: () => {
            playingRef.current = false;
            if (!loop) {
              onShuffleComplete?.();
              armHover();
            }
          }
        });

        // Initial random characters for shuffle effect
        if (scrambleCharset) {
          chars.forEach((char, i) => {
            const originalText = text[i];
            const scrambledChars = Array.from({ length: shuffleTimes }, () =>
              scrambleCharset.charAt(Math.floor(Math.random() * scrambleCharset.length))
            );

            scrambledChars.forEach((scrambledChar, j) => {
              tl.set(char, { textContent: scrambledChar }, i * stagger + j * 0.05);
            });

            // Final character
            tl.set(char, { textContent: originalText }, i * stagger + shuffleTimes * 0.05);
          });
        }

        // Animation based on mode
        if (animationMode === 'evenodd') {
          const odd = chars.filter((_, i) => i % 2 === 1);
          const even = chars.filter((_, i) => i % 2 === 0);

          if (odd.length) {
            tl.to(odd, {
              x: 0,
              y: 0,
              duration,
              ease,
              stagger: stagger
            }, 0);
          }

          if (even.length) {
            tl.to(even, {
              x: 0,
              y: 0,
              duration,
              ease,
              stagger: stagger
            }, duration * 0.3);
          }
        } else {
          tl.to(chars, {
            x: 0,
            y: 0,
            duration,
            ease,
            stagger: stagger
          }, 0);
        }

        if (colorFrom && colorTo) {
          tl.to(chars, {
            color: colorTo,
            duration,
            ease
          }, 0);
        }

        tlRef.current = tl;
      };

      const armHover = () => {
        if (!triggerOnHover || !ref.current) return;
        removeHover();
        const handler = () => {
          if (playingRef.current) return;
          createCharElements();
          play();
        };
        hoverHandlerRef.current = handler;
        ref.current.addEventListener('mouseenter', handler);
      };

      const create = () => {
        createCharElements();
        play();
        armHover();
        setReady(true);
      };

      const st = ScrollTrigger.create({
        trigger: el,
        start,
        once: triggerOnce,
        onEnter: create
      });

      return () => {
        st.kill();
        removeHover();
        teardown();
        setReady(false);
      };
    },
    {
      dependencies: [
        text,
        duration,
        maxDelay,
        ease,
        scrollTriggerStart,
        fontsLoaded,
        shuffleDirection,
        shuffleTimes,
        animationMode,
        loop,
        loopDelay,
        stagger,
        scrambleCharset,
        colorFrom,
        colorTo,
        triggerOnce,
        respectReducedMotion,
        triggerOnHover,
        onShuffleComplete
      ],
      scope: ref
    }
  );

  const baseTw = 'inline-block whitespace-nowrap will-change-transform';
  const userHasFont = useMemo(() => className && /font[-[]/i.test(className), [className]);

  const fallbackFont = useMemo(
    () => (userHasFont ? {} : {}),
    [userHasFont]
  );

  const commonStyle = useMemo(
    () => ({
      textAlign,
      ...fallbackFont,
      ...style
    }),
    [textAlign, fallbackFont, style]
  );

  const classes = useMemo(
    () => `${baseTw} ${ready ? 'visible' : 'invisible'} ${className}`.trim(),
    [baseTw, ready, className]
  );

  const elementProps = {
    className: classes,
    style: commonStyle,
  };

  // Use conditional rendering with proper ref casting for each element type
  switch (tag) {
    case 'h1':
      return <h1 ref={ref as React.RefObject<HTMLHeadingElement>} {...elementProps}>{text}</h1>;
    case 'h2':
      return <h2 ref={ref as React.RefObject<HTMLHeadingElement>} {...elementProps}>{text}</h2>;
    case 'h3':
      return <h3 ref={ref as React.RefObject<HTMLHeadingElement>} {...elementProps}>{text}</h3>;
    case 'h4':
      return <h4 ref={ref as React.RefObject<HTMLHeadingElement>} {...elementProps}>{text}</h4>;
    case 'h5':
      return <h5 ref={ref as React.RefObject<HTMLHeadingElement>} {...elementProps}>{text}</h5>;
    case 'h6':
      return <h6 ref={ref as React.RefObject<HTMLHeadingElement>} {...elementProps}>{text}</h6>;
    case 'span':
      return <span ref={ref as React.RefObject<HTMLSpanElement>} {...elementProps}>{text}</span>;
    case 'p':
    default:
      return <p ref={ref as React.RefObject<HTMLParagraphElement>} {...elementProps}>{text}</p>;
  }
};

export default Shuffle;