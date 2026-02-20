import React from "react";
import { Typography } from "@/components/atoms/Typography";
import { Chip } from "@/components/atoms/Chip";

interface SkillCardProps {
    category: string;
    items: { name: string; icon?: string | React.ReactNode; color?: string }[];
}

export const SkillCard = ({ category, items }: SkillCardProps) => {
    return (
        <div className="p-6 bg-white rounded-2xl border border-slate-100 hover:border-blue-100 transition-all duration-300 shadow-sm hover:shadow-md">
            <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <Typography variant="span" className="text-slate-900 font-mono font-bold uppercase tracking-widest text-sm">
                    {category}
                </Typography>
            </div>
            <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                    <Chip key={item.name} variant="minimal">
                        {item.name}
                    </Chip>
                ))}
            </div>
        </div>
    );
};

