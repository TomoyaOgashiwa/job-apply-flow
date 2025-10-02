import { cn } from "@/libs/utils";
import { createElement, ElementType } from "react";

export default function Heading({
  level,
  children,
  className,
}: {
  level: Extract<ElementType, "h1" | "h2" | "h3" | "h4" | "h5" | "h6">;
  children: React.ReactNode;
  className?: string;
}) {
  return createElement(
    level,
    {
      className: cn(
        level === "h1" &&
          "text-3xl sm:text-4xl font-bold tracking-tight text-balance",
        level === "h2" &&
          "text-2xl sm:text-3xl font-bold tracking-tight text-balance",
        level === "h3" &&
          "text-xl sm:text-2xl font-bold tracking-tight text-balance",
        level === "h4" &&
          "text-lg sm:text-xl font-bold tracking-tight text-balance",
        level === "h5" &&
          "text-base sm:text-lg font-bold tracking-tight text-balance",
        level === "h6" &&
          "text-sm sm:text-base font-bold tracking-tight text-balance",
        className,
      ),
    },
    children,
  );
}
