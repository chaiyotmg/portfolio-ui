import React from "react";
import { Typography } from "@/components/atoms/Typography";
import { Chip } from "@/components/atoms/Chip";
import { Icon } from "@/components/atoms/Icon";
import * as Icons from "lucide-react";
import { Image } from "@/components/atoms/Image";

interface SkillCardProps {
    category: string;
    items: {
        name: string;
        icon?: string | React.ReactNode;
        color?: string;
        iconWidth?: number;
        iconHeight?: number;
    }[];
    icon?: string | React.ReactNode;
    bgIcon?: string | React.ReactNode;
}

export const SkillCard = ({ category, items, icon, bgIcon }: SkillCardProps) => {
    const renderIcon = (iconToRender: string | React.ReactNode, size: number, className?: string) => {
        if (!iconToRender) return null;
        if (typeof iconToRender === "string") {
            const isPath = iconToRender.startsWith("/") || iconToRender.endsWith(".svg") || iconToRender.endsWith(".png");
            if (isPath) {
                return <Image 
                        src={iconToRender} alt="skill image" 
                        style={{ width: size, height: size }} 
                        className="object-contain" 
                        loading="lazy"
                        />;
            }
            return <Icon icon={iconToRender as keyof typeof Icons} size={size} className={className} />;
        }
        return iconToRender;
    };

    return (
        <div className="relative p-7 bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 overflow-hidden group h-full flex flex-col">
            {/* Watermark Background Icon */}
            {bgIcon && (
                <div className="absolute top-10 right-4 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-700 pointer-events-none transform group-hover:scale-110">
                    {renderIcon(bgIcon, 140)}
                </div>
            )}

            {/* Header */}
            <div className="flex items-center gap-3 mb-8 relative z-10">
                <div className="text-emerald-500">
                    {renderIcon(icon || "Box", 22)}
                </div>
                <Typography variant="span" className="text-slate-900 font-bold text-base">
                    {category}
                </Typography>
            </div>

            {/* Skills Grid */}
            <div className="flex flex-wrap gap-2.5 relative z-10">
                {items.map((item, index) => (
                    <Chip
                        key={`${item.name}-${index}`}
                        variant="minimal"
                        icon={item.icon}
                        iconWidth={item.iconWidth}
                        iconHeight={item.iconHeight}
                        className="transition-all hover:border-emerald-200 hover:bg-emerald-50/30"
                    >
                        {item.name}
                    </Chip>
                ))}
            </div>
        </div>
    );
};

