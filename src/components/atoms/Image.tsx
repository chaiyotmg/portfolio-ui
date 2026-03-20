import React, { useState } from "react";
import NextImage, { ImageProps as NextImageProps } from "next/image";

interface ImageProps extends NextImageProps {
    rounded?: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full" | "custom";
    hoverScale?: boolean;
    className?: string;
    shadow?: boolean;
    showLoader?: boolean;
}

export const Image = ({
    rounded = "none",
    hoverScale = false,
    shadow = false,
    showLoader = true,
    className = "",
    style,
    ...props
}: ImageProps) => {
    const [isLoading, setIsLoading] = useState(true);

    const roundedStyles = {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        "2xl": "rounded-2xl",
        "3xl": "rounded-3xl",
        full: "rounded-full",
        custom: "rounded-[2.5rem]",
    };

    const containerClasses = [
        "relative",
        "overflow-hidden",
        "bg-transparent",
        roundedStyles[rounded],
        shadow ? "shadow-xl shadow-slate-200/50" : "",
        className
    ].filter(Boolean).join(" ");

    const isObjectContain = className.includes("object-contain");
    const isObjectCover = className.includes("object-cover");

    const imageClasses = [
        props.fill ? (isObjectContain ? "object-contain" : "object-cover") : "",
        hoverScale ? "transition-transform duration-700 hover:scale-105" : "",
        isLoading ? "opacity-0" : "opacity-100 transition-opacity duration-1000",
        // Pass essential image styling through
        className.split(' ').filter(c => c.startsWith('object-') || c.startsWith('pointer-events-') || c.includes('select-')).join(' ')
    ].filter(Boolean).join(" ");

    return (
        <div className={containerClasses} style={style}>
            {showLoader && isLoading && (
                <div className="absolute inset-0 z-10 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-3">
                        {/* Modern Spinner */}
                        <div className="w-8 h-8 border-2 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
                        <span className="text-[10px] font-mono font-bold text-slate-300 uppercase tracking-widest animate-pulse">
                            Loading
                        </span>
                    </div>
                </div>
            )}
            <NextImage
                {...props}
                className={imageClasses}
                onLoad={(e) => {
                    setIsLoading(false);
                    // Bubble up the onLoad event if it exists in props
                    if (typeof props.onLoad === 'function') {
                        props.onLoad(e);
                    }
                }}
            />
        </div>
    );
};
