import React from "react";
import { Typography } from "@/components/atoms/Typography";
import { Icon } from "@/components/atoms/Icon";

interface ExperienceItemProps {
    company: string;
    position: string;
    period: string;
    description: string[];
    isCurrent?: boolean;
    icon?: React.ReactNode;
}

export const ExperienceItem = ({
    company,
    position,
    period,
    description,
    isCurrent,
    icon
}: ExperienceItemProps) => {
    return (
        <div className="relative pl-8 pb-12 last:pb-0">
            {/* Timeline Line */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-slate-200" />

            {/* Timeline Dot / Icon */}
            <div className={`absolute left-[-16px] top-1 w-8 h-8 rounded-full border-2 border-white ring-4 flex items-center justify-center transition-all ${isCurrent ? "bg-blue-600 ring-blue-100 shadow-lg shadow-blue-500/20" : "bg-slate-100 ring-slate-50"}`}>
                {icon ? (
                    <Icon icon={icon} size={16} className={isCurrent ? "text-white" : "text-slate-400"} />
                ) : (
                    <div className={`w-2 h-2 rounded-full ${isCurrent ? "bg-white" : "bg-slate-400"}`} />
                )}
            </div>

            <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-2">
                <Typography variant="h4" className="text-slate-900">{position}</Typography>
                <Typography variant="small" className="font-medium text-blue-600">{period}</Typography>
            </div>

            <Typography variant="span" className="block text-slate-700 font-semibold mb-4">{company}</Typography>

            <ul className="space-y-2">
                {description.map((item, index) => (
                    <li key={index} className="flex gap-2 text-slate-500 text-sm md:text-base leading-relaxed">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0" />
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
};
