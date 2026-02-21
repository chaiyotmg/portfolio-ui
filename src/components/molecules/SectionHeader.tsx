import React from "react";
import { Typography } from "@/components/atoms/Typography";
import { Icon } from "@/components/atoms/Icon";

interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    align?: "left" | "center";
    icon?: React.ReactNode;
    className?: string;
}

export const SectionHeader = ({ title, subtitle, align = "left", icon, className = "" }: SectionHeaderProps) => {
    return (
        <div className={`mb-12 ${align === "center" ? "text-center flex flex-col items-center" : "flex flex-col items-start"} ${className}`}>
            {icon && (
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 shadow-sm">
                    <Icon icon={icon} size={24} />
                </div>
            )}
            <Typography variant="h2" className="mb-4">{title}</Typography>
            {subtitle && (
                <Typography variant="p" className={`max-w-2xl ${align === "center" ? "mx-auto" : ""} opacity-80`}>
                    {subtitle}
                </Typography>
            )}
        </div>
    );
};
