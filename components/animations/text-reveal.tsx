"use client";

import { motion, useReducedMotion } from "framer-motion";

type TextRevealProps = {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  delay?: number;
  highlight?: string;
  highlightClassName?: string;
  once?: boolean;
};

export function TextReveal({
  text,
  as: Tag = "h1",
  className,
  delay = 0,
  highlight,
  highlightClassName = "",
  once = true,
}: TextRevealProps) {
  const shouldReduce = useReducedMotion();
  const words = text.split(" ");

  if (shouldReduce) {
    if (highlight) {
      const parts = text.split(highlight);
      return (
        <Tag className={className}>
          {parts[0]}
          <em className={highlightClassName}>{highlight}</em>
          {parts[1] || ""}
        </Tag>
      );
    }
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag className={className}>
      {words.map((word, i) => {
        return (
          <span
            key={`${word}-${i}`}
            style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top" }}
          >
            <motion.span
              style={{ display: "inline-block" }}
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once }}
              transition={{
                duration: 0.5,
                delay: delay + i * 0.06,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              {highlight && text.includes(highlight) && highlight.split(" ").includes(word) ? (
                <em className={highlightClassName} style={{ fontStyle: "normal" }}>{word}</em>
              ) : (
                word
              )}
            </motion.span>
            {i < words.length - 1 && "\u00A0"}
          </span>
        );
      })}
    </Tag>
  );
}
