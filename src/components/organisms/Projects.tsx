"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Project } from "@/domain/entities";
import { ProjectCard } from "@/components/molecules/ProjectCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Typography } from "@/components/atoms/Typography";
import { Icon } from "@/components/atoms/Icon";

interface ProjectsProps {
    projects: Project[];
}

export const Projects = ({ projects }: ProjectsProps) => {
    const [currentIndex, setCurrentIndex] = useState(Math.floor((projects.length - 1) / 2));
    const [cardWidth, setCardWidth] = useState(400);
    const [gap, setGap] = useState(32);

    const paginate = (newDirection: number) => {
        const nextIndex = currentIndex + newDirection;
        if (nextIndex >= 0 && nextIndex < projects.length) {
            setCurrentIndex(nextIndex);
        }
    };

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 640) {
                setCardWidth(280);
                setGap(24);
            } else if (width < 768) {
                setCardWidth(350);
                setGap(24);
            } else {
                setCardWidth(400);
                setGap(32);
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <section id="projects" className="py-15 px-6 bg-transparent overflow-hidden">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <Typography variant="h2" className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4 text-slate-900">
                        The <span className="bg-gradient-to-r from-emerald-500 to-blue-500 bg-clip-text text-transparent">Project</span>
                    </Typography>
                    <div className="flex justify-center mb-4">
                        <div className="flex items-center gap-2 text-slate-400 font-mono text-xs font-bold bg-slate-100/50 px-4 py-1.5 rounded-lg border border-slate-200/50">
                            <Icon icon="Terminal" size={12} className="text-emerald-500" />
                            ls -la projects/
                        </div>
                    </div>
                </motion.div>

                <div className="relative mt-16 px-4">
                    <div className="relative overflow-visible">
                        <motion.div
                            className="flex gap-6 md:gap-8 cursor-default select-none relative"
                            style={{ left: "50%" }}
                            animate={{
                                x: -(cardWidth / 2) - (currentIndex * (cardWidth + gap))
                            }}
                            transition={{ type: "spring", stiffness: 150, damping: 20 }}
                        >
                            {projects.map((project, index) => {
                                const isActive = index === currentIndex;
                                return (
                                    <motion.div
                                        key={project.title}
                                        className="shrink-0 w-[280px] sm:w-[350px] md:w-[400px] select-none"
                                    >
                                        <ProjectCard {...project} />
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </div>

                    {/* Terminal Status Bar Navigation */}
                    {/* Terminal Status Bar Navigation (Light Theme) */}
                    <div className="mt-16 flex justify-center">
                        <div className="flex items-center bg-white/90 backdrop-blur-md rounded-lg px-2 py-1.5 border border-slate-200 shadow-xl shadow-emerald-500/5 gap-1 font-mono text-xs">
                            {/* Prev Button */}
                            <motion.button
                                whileHover={currentIndex > 0 ? { backgroundColor: "rgba(16, 185, 129, 0.05)" } : {}}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => paginate(-1)}
                                className={`px-3 py-1.5 rounded transition-all flex items-center gap-1.5 ${currentIndex === 0
                                    ? "text-slate-300 cursor-not-allowed"
                                    : "text-emerald-500 hover:text-emerald-600 cursor-pointer"
                                    }`}
                                disabled={currentIndex === 0}
                            >
                                <span className="opacity-30">[</span>
                                <ChevronLeft size={14} strokeWidth={3} />
                                <span className="hidden sm:inline font-bold">PREV</span>
                                <span className="opacity-30">]</span>
                            </motion.button>

                            {/* Status Display */}
                            <div className="px-6 py-1.5 border-x border-slate-100 flex items-center gap-3 text-slate-500">
                                <span className="text-emerald-500/40">SYS</span>
                                <div className="flex items-center gap-1">
                                    <span className="text-emerald-600 font-bold">
                                        {(currentIndex + 1).toString().padStart(2, '0')}
                                    </span>
                                    <span className="text-slate-300">/</span>
                                    <span className="text-slate-400">
                                        {projects.length.toString().padStart(2, '0')}
                                    </span>
                                </div>
                            </div>

                            {/* Next Button */}
                            <motion.button
                                whileHover={currentIndex < projects.length - 1 ? { backgroundColor: "rgba(16, 185, 129, 0.05)" } : {}}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => paginate(1)}
                                className={`px-3 py-1.5 rounded transition-all flex items-center gap-1.5 ${currentIndex === projects.length - 1
                                    ? "text-slate-300 cursor-not-allowed"
                                    : "text-emerald-500 hover:text-emerald-600 cursor-pointer"
                                    }`}
                                disabled={currentIndex === projects.length - 1}
                            >
                                <span className="opacity-30">[</span>
                                <span className="hidden sm:inline font-bold">NEXT</span>
                                <ChevronRight size={14} strokeWidth={3} />
                                <span className="opacity-30">]</span>
                            </motion.button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
