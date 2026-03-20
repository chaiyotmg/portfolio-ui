import React from "react";
import { Icon } from "./Icon";
import { Image } from "./Image";
import * as Icons from "lucide-react";

interface ChipProps {
    children: React.ReactNode;
    variant?: "default" | "primary" | "secondary" | "success" | "warning" | "minimal";
    icon?: string | React.ReactNode;
    iconColor?: string;
    iconWidth?: number;
    iconHeight?: number;
    className?: string;
}

export const Chip = ({
    children,
    variant = "default",
    icon,
    iconColor,
    iconWidth = 14,
    iconHeight = 14,
    className = ""
}: ChipProps) => {
    const variants = {
        default: "bg-slate-100/50 text-slate-600 border-slate-200/50",
        primary: "bg-emerald-50/50 text-emerald-600 border-emerald-100/50",
        secondary: "bg-purple-50/50 text-purple-600 border-purple-100/50",
        success: "bg-emerald-50/50 text-emerald-600 border-emerald-100/50",
        warning: "bg-amber-50/50 text-amber-600 border-amber-100/50",
        minimal: "bg-white text-slate-900 border-slate-200 shadow-sm font-mono",
    };

    const renderIcon = () => {
        if (!icon) return null;

        if (typeof icon === "string") {
            const isPath = icon.startsWith("/") || icon.endsWith(".svg") || icon.endsWith(".png") || icon.endsWith(".jpg");

            if (isPath) {
                return (
                    <Image
                        src={icon}
                        alt={typeof children === 'string' ? children : "icon"}
                        width={iconWidth}
                        height={iconHeight}
                        className="object-contain w-auto h-auto"
                        loading="lazy"
                    />
                );
            }

            return <Icon icon={icon as keyof typeof Icons} size={12} className={iconColor || "opacity-80"} />;
        }

        return <span className={iconColor || "opacity-80"}>{icon}</span>;
    };

    return (
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold border ${variants[variant]} transition-all hover:scale-105 select-none ${className}`}>
            {renderIcon()}
            {children}
        </span>
    );
};
