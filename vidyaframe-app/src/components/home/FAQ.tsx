'use client';

import { useState } from 'react';
import { faqItems } from '@/lib/data';

export function FAQ() {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleFaq = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-transparent to-[var(--muted)]/20 relative overflow-hidden">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 
            className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--foreground)] mb-4"
            style={{ fontFamily: 'var(--font-outfit)' }}
          >
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-lg text-[var(--muted-foreground)]">
            Have questions about VidyaFrame? Find answers to commonly asked questions below.
          </p>
        </div>

        <div className="space-y-4">
          {faqItems.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="rounded-2xl border border-[var(--border)] bg-[var(--card)] overflow-hidden transition-all duration-300 hover:shadow-md hover:border-[var(--primary)]/20"
              >
                <button
                  onClick={() => toggleFaq(item.id)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left outline-none"
                  aria-expanded={isOpen}
                >
                  <span 
                    className="font-medium text-[var(--foreground)] text-base sm:text-lg pr-4"
                    style={{ fontFamily: 'var(--font-outfit)' }}
                  >
                    {item.question}
                  </span>
                  <div className={`h-6 w-6 shrink-0 rounded-lg bg-[var(--muted)] flex items-center justify-center text-[var(--muted-foreground)] transition-transform duration-300 ${isOpen ? 'rotate-180 bg-[var(--primary)]/10 text-[var(--primary)]' : ''}`}>
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? 'max-h-[300px] border-t border-[var(--border)]/60' : 'max-h-0'
                  }`}
                >
                  <div className="p-5 sm:p-6 text-sm sm:text-base text-[var(--muted-foreground)] leading-relaxed bg-[var(--muted)]/5">
                    {item.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
