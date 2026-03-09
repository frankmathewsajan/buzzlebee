"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import ContactModal from "@/app/components/ContactModal";

export default function ContactCTA() {
  const [contactOpen, setContactOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.unobserve(el); } },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-16 px-8 bg-gray-900">
      <div ref={ref} className={`max-w-4xl mx-auto text-center reveal ${visible ? 'visible' : ''}`}>
        <h2 className="text-3xl font-serif font-normal text-white mb-4">Epilogue</h2>
        <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto font-serif leading-7">
          This story is still being written. Each project, each collaboration, each challenge adds
          new chapters to a narrative that continues to evolve. If you&apos;d like to be part of the
          next chapter, I&apos;d love to hear from you.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/projects">
            <button className="px-6 py-3 bg-white text-gray-900 rounded-md font-serif font-medium hover:bg-gray-100 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
              View My Work
            </button>
          </Link>
          <button
            className="px-6 py-3 border border-white text-white rounded-md font-serif font-medium hover:bg-white hover:text-gray-900 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            onClick={() => setContactOpen(true)}
          >
            Start a Conversation
          </button>
        </div>
      </div>
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} variant="contact" />
    </section>
  );
}
