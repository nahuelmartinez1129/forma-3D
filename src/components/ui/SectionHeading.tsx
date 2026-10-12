import type { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  id?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
}

export function SectionHeading({ eyebrow, title, description, id, align = "left", tone = "dark" }: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <div className={`max-w-2xl ${centered ? "mx-auto text-center" : ""}`}>
      <p className={`eyebrow ${tone === "light" ? "!text-mint" : ""}`}>{eyebrow}</p>
      <h2
        id={id}
        className={`mt-4 font-display text-3xl font-semibold leading-[1.08] tracking-[-0.03em] text-balance sm:text-4xl lg:text-[2.75rem] ${tone === "light" ? "text-paper" : "text-graphite"}`}
      >
        {title}
      </h2>
      {description ? (
        <p className={`mt-4 text-base leading-relaxed sm:text-lg ${tone === "light" ? "text-paper/75" : "text-ink-muted"}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
