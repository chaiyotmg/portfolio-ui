import React from "react";
import Image from "next/image";
import { Typography } from "@/components/atoms/Typography";
import { Chip } from "@/components/atoms/Chip";
import { Icon } from "@/components/atoms/Icon";

interface ProjectCardProps {
    title: string;
    description: string;
    image: string;
    link: string;
    tags?: string[];
    externalIcon?: React.ReactNode;
    arrowIcon?: React.ReactNode;
}

export const ProjectCard = ({ title, description, image, link, tags, externalIcon, arrowIcon }: ProjectCardProps) => {
    return (
        <div className="group bg-white rounded-3xl border border-slate-100 overflow-hidden hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 flex flex-col h-full">
            {/* Image Section */}
            <div className="relative h-56 overflow-hidden">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                    <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-white font-bold text-sm bg-blue-600 px-4 py-2 rounded-full hover:bg-blue-700 transition-colors"
                    >
                        View Project <Icon icon={externalIcon || "ExternalLink"} size={14} />
                    </a>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-8 flex flex-col flex-grow">
                <div className="flex flex-wrap gap-2 mb-4">
                    {tags?.map((tag) => (
                        <Chip key={tag} variant="primary">{tag}</Chip>
                    ))}
                </div>

                <Typography variant="h3" className="mb-3 text-slate-800 group-hover:text-blue-600 transition-colors">
                    {title}
                </Typography>

                <Typography variant="p" className="text-sm text-slate-500 line-clamp-3 mb-6">
                    {description}
                </Typography>

                <div className="mt-auto pt-4 border-t border-slate-50">
                    <a
                        href={link}
                        className="text-blue-600 font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all"
                    >
                        Learn More <Icon icon={arrowIcon || "ArrowRight"} size={14} />
                    </a>
                </div>
            </div>
        </div>
    );
};
