import React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost" | "gradient";
    size?: "sm" | "md" | "lg";
}

export const Button = ({
    className,
    variant = "primary",
    size = "md",
    ...props
}: ButtonProps) => {
    const variants = {
        primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20",
        secondary: "bg-slate-800 text-white hover:bg-slate-900",
        outline: "border-2 border-slate-200 bg-transparent hover:bg-slate-50 text-slate-900",
        ghost: "bg-transparent hover:bg-slate-100 text-slate-600",
        gradient: "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-xl shadow-blue-500/20 border-none",
    };

    const sizes = {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-base",
        lg: "h-13 px-8 text-lg",
    };

    return (
        <button
            className={cn(
                "inline-flex items-center justify-center rounded-full font-bold transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none",
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        />
    );
};
