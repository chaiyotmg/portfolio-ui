import React from "react";
import { motion } from "framer-motion";
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
        <div className="relative pl-14 pb-16 last:pb-8 group/exp">
            {/* Timeline Line */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-slate-100 group-last/exp:bottom-auto group-last/exp:h-1" />

            {/* Timeline Node (Terminal Style) */}
            <motion.div
                whileHover={{ scale: 1.25 }}
                className={`absolute left-[-18px] top-1 z-10 w-9 h-9 rounded-xl border border-slate-200 bg-white flex items-center justify-center transition-all shadow-sm group-hover/exp:border-emerald-200 group-hover/exp:shadow-md group-hover/exp:shadow-emerald-500/5 ${isCurrent ? "ring-4 ring-emerald-50" : ""}`}
            >
                {icon ? (
                    <Icon icon={icon} size={18} className={isCurrent ? "text-emerald-500" : "text-slate-400"} />
                ) : (
                    <div className={`w-2.5 h-2.5 rounded-sm rotate-45 ${isCurrent ? "bg-emerald-500" : "bg-slate-300"}`} />
                )}
            </motion.div>

            <motion.div
                whileHover={{ x: 6 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="cursor-default"
            >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
                    <div className="flex flex-col">
                        <Typography variant="h4" className="text-slate-900 font-bold group-hover/exp:text-emerald-600 transition-colors tracking-tight">
                            {position}
                        </Typography>
                        <Typography variant="span" className="text-sm font-mono text-slate-500 mt-0.5">
                            {company}
                        </Typography>
                    </div>
                    <div className="flex items-center gap-2 bg-slate-100/50 px-3 py-1 rounded-md border border-slate-200/50">
                        <Icon icon="Calendar" size={12} className="text-slate-400" />
                        <span className="text-xs font-mono font-bold text-emerald-600 whitespace-nowrap">
                            {period}
                        </span>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-4 md:p-6 border border-slate-100 group-hover/exp:bg-white group-hover/exp:border-emerald-100 group-hover/exp:shadow-xl group-hover/exp:shadow-emerald-500/5 transition-all duration-300">
                    <ul className="space-y-4">
                        {description.map((item, index) => (
                            <li key={index} className="flex gap-4 text-slate-600 text-sm md:text-[15px] leading-relaxed">
                                <span className="mt-2 w-1.5 h-1.5 bg-slate-200 rounded-full shrink-0 group-hover/exp:bg-emerald-500 transition-all duration-300" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </motion.div>
        </div>
    );
};
