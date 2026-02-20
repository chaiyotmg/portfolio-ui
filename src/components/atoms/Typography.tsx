import React from "react";

interface TypographyProps {
    variant: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "small";
    children: React.ReactNode;
    className?: string;
}

export const Typography = ({ variant, children, className = "" }: TypographyProps) => {
    const Tag = variant;

    const styles = {
        h1: "text-5xl md:text-7xl font-bold tracking-tight",
        h2: "text-3xl md:text-4xl font-bold tracking-tight",
        h3: "text-2xl md:text-3xl font-bold",
        h4: "text-xl font-bold",
        p: "text-base md:text-lg text-slate-500 leading-relaxed",
        span: "text-base",
        small: "text-sm text-slate-400",
    };

    return <Tag className={`${styles[variant]} ${className}`}>{children}</Tag>;
};
