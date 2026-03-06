import { useRef, useEffect, useState, type FormEvent } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Mail, MapPin, CheckCircle } from 'lucide-react';
import SplitText from '@/components/reactbits/SplitText';
import type { PersonalInfo } from '@/types';

gsap.registerPlugin(ScrollTrigger);

interface ContactProps {
    personal: PersonalInfo;
}

const Contact: React.FC<ContactProps> = ({ personal }) => {
    const sectionRef = useRef<HTMLElement>(null);
    const formRef = useRef<HTMLDivElement>(null);
    const infoRef = useRef<HTMLDivElement>(null);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                infoRef.current,
                { opacity: 0, x: -30 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 75%',
                        once: true,
                    },
                }
            );

            gsap.fromTo(
                formRef.current,
                { opacity: 0, x: 30 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 75%',
                        once: true,
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const nameInput = document.getElementById('contact-name') as HTMLInputElement;
        const emailInput = document.getElementById('contact-email') as HTMLInputElement;
        const messageInput = document.getElementById('contact-message') as HTMLTextAreaElement;

        try {
            const response = await fetch("https://formsubmit.co/ajax/sutanarliejohan@gmail.com", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: nameInput.value,
                    email: emailInput.value,
                    message: messageInput.value,
                    _subject: `New Portfolio Contact from ${nameInput.value}`
                })
            });

            if (response.ok) {
                setSubmitted(true);
                form.reset(); // Mengosongkan text di form setelah berhasil dikirim
                setTimeout(() => setSubmitted(false), 3000);
            } else {
                throw new Error("Failed to send message");
            }
        } catch (error) {
            console.error(error);
            alert("Maaf, terjadi kesalahan saat mengirim pesan. Coba lagi nanti.");
        }
    };

    return (
        <section
            id="contact"
            ref={sectionRef}
            className="relative z-10 py-section px-6"
        >
            <div className="mx-auto max-w-6xl">
                {/* Section Header */}
                <div className="mb-16 text-center">
                    <span className="section-label mb-4 block">Get In Touch</span>
                    <SplitText
                        text="Let's Work Together"
                        className="font-display text-3xl font-bold text-text-primary sm:text-4xl md:text-5xl"
                        tag="h2"
                        delay={30}
                        duration={0.8}
                        splitType="words"
                        from={{ opacity: 0, y: 30 }}
                        to={{ opacity: 1, y: 0 }}
                    />
                </div>

                <div className="grid items-start gap-12 md:grid-cols-2">
                    {/* Info */}
                    <div ref={infoRef} className="opacity-0">
                        <p className="mb-8 text-base leading-relaxed text-text-secondary">
                            I'm always open to discussing new projects, creative ideas, or
                            opportunities to be part of something amazing. Feel free to reach
                            out!
                        </p>

                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-bg-card">
                                    <Mail size={16} className="text-accent" />
                                </div>
                                <div>
                                    <p className="text-xs text-text-muted">Email</p>
                                    <a
                                        href={`mailto:${personal.email}`}
                                        className="text-sm text-text-primary transition-colors hover:text-accent"
                                    >
                                        {personal.email}
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-bg-card">
                                    <MapPin size={16} className="text-accent" />
                                </div>
                                <div>
                                    <p className="text-xs text-text-muted">Location</p>
                                    <p className="text-sm text-text-primary">
                                        {personal.location}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div ref={formRef} className="opacity-0">
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col gap-4 rounded-2xl border border-border bg-bg-card p-6 sm:p-8"
                        >
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label
                                        htmlFor="contact-name"
                                        className="mb-1.5 block text-xs font-medium text-text-muted"
                                    >
                                        Name
                                    </label>
                                    <input
                                        id="contact-name"
                                        type="text"
                                        required
                                        className="w-full rounded-xl border border-border bg-bg-primary px-4 py-3 text-sm text-text-primary outline-none transition-colors focus:border-accent/50 focus:ring-1 focus:ring-accent/20"
                                        placeholder="Your name"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="contact-email"
                                        className="mb-1.5 block text-xs font-medium text-text-muted"
                                    >
                                        Email
                                    </label>
                                    <input
                                        id="contact-email"
                                        type="email"
                                        required
                                        className="w-full rounded-xl border border-border bg-bg-primary px-4 py-3 text-sm text-text-primary outline-none transition-colors focus:border-accent/50 focus:ring-1 focus:ring-accent/20"
                                        placeholder="you@example.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="contact-message"
                                    className="mb-1.5 block text-xs font-medium text-text-muted"
                                >
                                    Message
                                </label>
                                <textarea
                                    id="contact-message"
                                    rows={5}
                                    required
                                    className="w-full resize-none rounded-xl border border-border bg-bg-primary px-4 py-3 text-sm text-text-primary outline-none transition-colors focus:border-accent/50 focus:ring-1 focus:ring-accent/20"
                                    placeholder="Tell me about your project..."
                                />
                            </div>

                            <button
                                type="submit"
                                id="contact-submit"
                                disabled={submitted}
                                className="group mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-accent-dark hover:shadow-lg hover:shadow-accent/20 disabled:opacity-50"
                            >
                                {submitted ? (
                                    <>
                                        <CheckCircle size={16} />
                                        Message Sent!
                                    </>
                                ) : (
                                    <>
                                        Send Message
                                        <Send
                                            size={14}
                                            className="transition-transform duration-300 group-hover:translate-x-0.5"
                                        />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
