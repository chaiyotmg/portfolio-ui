import React from "react";
import * as Icons from "lucide-react";
import { Icon } from "./Icon";

interface ChipProps {
    children: React.ReactNode;
    variant?: "default" | "primary" | "secondary" | "success" | "warning" | "minimal";
    icon?: keyof typeof Icons | React.ReactNode;
    iconColor?: string;
}

export const Chip = ({ children, variant = "default", icon, iconColor }: ChipProps) => {
    const variants = {
        default: "bg-slate-100/50 text-slate-600 border-slate-200/50",
        primary: "bg-blue-50/50 text-blue-600 border-blue-100/50",
        secondary: "bg-purple-50/50 text-purple-600 border-purple-100/50",
        success: "bg-emerald-50/50 text-emerald-600 border-emerald-100/50",
        warning: "bg-amber-50/50 text-amber-600 border-amber-100/50",
        minimal: "bg-white text-slate-900 border-slate-200 shadow-sm font-mono",
    };

    const renderIcon = () => {
        if (!icon) return null;

        if (typeof icon === "string") {
            return <Icon icon={icon as keyof typeof Icons} size={12} className={iconColor || "opacity-80"} />;
        }

        return <span className={iconColor || "opacity-80"}>{icon}</span>;
    };

    return (
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold border ${variants[variant]} transition-all hover:scale-105 select-none`}>
            {renderIcon()}
            {children}
        </span>
    );
};
