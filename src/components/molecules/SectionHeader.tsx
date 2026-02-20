import React from "react";
import { Typography } from "@/components/atoms/Typography";
import { Icon } from "@/components/atoms/Icon";

interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    align?: "left" | "center";
    icon?: React.ReactNode;
}

export const SectionHeader = ({ title, subtitle, align = "left", icon }: SectionHeaderProps) => {
    return (
        <div className={`mb-12 ${align === "center" ? "text-center flex flex-col items-center" : "flex flex-col items-start"}`}>
            {icon && (
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 shadow-sm">
                    <Icon icon={icon} size={24} />
                </div>
            )}
            <Typography variant="h2" className="mb-4 text-slate-900">{title}</Typography>
            {subtitle && (
                <Typography variant="p" className={`max-w-2xl ${align === "center" ? "mx-auto" : ""}`}>
                    {subtitle}
                </Typography>
            )}
        </div>
    );
};
