import React from "react";
import { Image } from "@/components/atoms/Image";
import { Link } from "@/components/atoms/Link";
import { motion } from "framer-motion";
import { Typography } from "@/components/atoms/Typography";
import { Chip } from "@/components/atoms/Chip";
import { Icon } from "@/components/atoms/Icon";
import { Project } from "@/domain/entities";

export const ProjectCard = ({ title, description, image, link, github, tags }: Project) => {
    return (
        <div className="group bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500 flex flex-col h-[480px] md:h-[560px] shadow-lg shadow-slate-200/40">
            {/* Terminal Top Bar */}
            <div className="bg-slate-50/80 border-b border-slate-100 px-6 py-4 flex items-center justify-between">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400/80 shadow-sm" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400/80 shadow-sm" />
                    <div className="w-3 h-3 rounded-full bg-green-400/80 shadow-sm" />
                </div>
                <div className="flex items-center gap-1.5 text-slate-400 font-mono text-[10px] font-bold">
                    <Icon icon="Folder" size={10} />
                    ~/projects/{title.toLowerCase().replace(/\s+/g, '-')}
                </div>
            </div>

            <Image
                src={image}
                alt={title}
                fill
                hoverScale
                className="w-full h-[160px] md:h-[200px] transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                loading="lazy"
            />

            {/* Content Section */}
            <div className="p-6 md:p-8 flex flex-col flex-grow">
                <div className="flex flex-wrap gap-2 mb-4">
                    {tags?.map((tag) => (
                        <Chip
                            key={tag.name}
                            variant="minimal"
                            icon={tag.icon}
                            iconWidth={tag.iconWidth}
                            iconHeight={tag.iconHeight}
                            className="font-mono text-[10px] md:text-xs"
                        >
                            {tag.name}
                        </Chip>
                    ))}
                </div>

                <Typography variant="h4" className="mb-3 text-slate-800 group-hover:text-emerald-500 transition-colors font-bold">
                    {title}
                </Typography>

                <Typography variant="p" className="text-sm text-slate-500 line-clamp-3 mb-4 leading-relaxed">
                    {description}
                </Typography>

                <div className="mt-auto pt-4 border-t border-slate-50 flex justify-between items-center">
                    <Link href={link}>
                        <motion.div
                            whileHover={{ x: 5 }}
                            className="text-emerald-500 font-bold text-sm flex items-center gap-1.5 transition-all cursor-pointer"
                        >
                            Explore Details <Icon icon="Terminal" size={14} />
                        </motion.div>
                    </Link>

                    <div className="flex gap-2">
                        {github && (
                            <motion.a
                                href={github}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-2 bg-slate-50 rounded-lg text-slate-400 hover:bg-emerald-50 hover:text-emerald-500 transition-colors"
                            >
                                <Icon icon="Github" size={16} />
                            </motion.a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
