"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { projects, profile } from "@/data/portfolioData";
import { Icon } from "@/components/atoms/Icon";
import { Typography } from "@/components/atoms/Typography";
import { Chip } from "@/components/atoms/Chip";
import { Image } from "@/components/atoms/Image";
import { PortfolioTemplate } from "@/components/templates/PortfolioTemplate";
import { ProjectNavbar } from "@/components/organisms/ProjectNavbar";
import { Link } from "@/components/atoms/Link";
import { ZoomableImage } from "@/components/molecules/ZoomableImage";
import { ProjectCard } from "@/components/molecules/ProjectCard";

export default function ProjectShowcasePage() {
    const params = useParams();
    const slug = params.slug as string;

    // Find project by matching the slug in the link path (e.g., /projects/portfolio-ui)
    const project = projects.find((p) => p.link.split('/').pop() === slug);

    if (!project) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50 font-mono">
                <Icon icon="AlertCircle" size={48} className="text-red-500 mb-4" />
                <Typography variant="h3" className="text-slate-900 mb-2">Project Not Found</Typography>
                <Link href="/" className="text-emerald-500 hover:underline">
                    Back to Main
                </Link>
            </div>
        );
    }

    return (
        <PortfolioTemplate
            navbar={<ProjectNavbar />}
            footer={
                <footer className="py-12 text-center text-slate-400 text-sm border-t border-slate-100 bg-transparent">
                    <p>Copyright © {new Date().getFullYear()}. Designed and Developed by {profile.name}.</p>
                </footer>
            }
        >
            <div className="max-w-4xl mx-auto py-8 sm:py-12 px-4 sm:px-6">
                {/* Case Study Terminal Window */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white border border-slate-200 rounded-[2rem] shadow-2xl shadow-slate-200/50 overflow-hidden"
                >
                    {/* Terminal Top Bar */}
                    <div className="bg-slate-50/80 border-b border-slate-100 px-5 sm:px-8 py-4 sm:py-5 flex items-center justify-between">
                        <div className="flex gap-2">
                            <div className="w-3.5 h-3.5 rounded-full bg-red-400/80 shadow-sm" />
                            <div className="w-3.5 h-3.5 rounded-full bg-yellow-400/80 shadow-sm" />
                            <div className="w-3.5 h-3.5 rounded-full bg-green-400/80 shadow-sm" />
                        </div>
                        <div className="flex items-center gap-2 text-slate-400 font-mono text-xs font-bold">
                            <Icon icon="FileText" size={14} className="text-blue-500/60" />
                            ~/projects/{slug}/README.md
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 sm:p-8 md:p-12">
                        {/* Header Section */}
                        <div className="mb-12">
                            <Typography variant="h3" className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-6 tracking-tight">
                                {project.title}
                            </Typography>

                            <Typography variant="p" className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed max-w-2xl border-l-4 border-emerald-500 pl-6">
                                {project.fullDescription || project.description}
                            </Typography>
                        </div>

                        {/* Project Brand Image / Zoomable SVG */}
                        <ZoomableImage
                            image={project.image}
                            svg={project.svg}
                            alt={project.title}
                            imageOrientation={project.imageOrientation}
                            imageObjectFit={project.imageObjectFit}
                        />

                        {/* Case Study Details */}
                        {project.caseStudy && (
                            <div className="grid gap-12 font-mono">
                                {/* Architecture */}
                                {project.caseStudy.architecture && (
                                <div className="p-8 bg-slate-50/50 rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700 pointer-events-none">
                                        <Icon icon="Cloud" size={120} />
                                    </div>
                                    <div className="flex items-center gap-3 mb-6 text-emerald-600 relative z-10">
                                        <div className="p-2 bg-emerald-50 rounded-lg">
                                            <Icon icon="Server" size={20} />
                                        </div>
                                        <span className="font-bold text-sm tracking-widest">Deployment & Architecture</span>
                                    </div>
                                    <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed relative z-10">
                                        {project.caseStudy.architecture}
                                    </p>
                                </div>
                                )}
                                {/* Technologies Used */}
                                <div className="p-8 border border-slate-100 rounded-[2rem] bg-slate-50/30">
                                    <div className="flex items-center gap-3 mb-8">
                                        <div className="p-2 bg-blue-50 rounded-lg shadow-sm border border-blue-100/50">
                                            <Icon icon="Cpu" size={20} className="text-blue-500" />
                                        </div>
                                        <h3 className="font-bold text-slate-800 tracking-widest text-[9px] sm:text-[10px] md:text-sm">Technologies used</h3>
                                    </div>

                                    <div className="flex flex-wrap gap-2.5 mb-10">
                                        {project.caseStudy.techStack.map((tech) => (
                                            <Chip
                                                key={tech.name}
                                                variant="minimal"
                                                icon={tech.icon}
                                                className="font-mono text-[10px] bg-white border-slate-100 shadow-sm hover:border-blue-200 transition-colors py-1.5"
                                            >
                                                {tech.name}
                                            </Chip>
                                        ))}
                                    </div>

                                    {/* Features List */}
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        {project.caseStudy.features.map((feature, idx) => (
                                            <div key={idx} className="flex items-center gap-3 p-3 bg-white/60 rounded-xl border border-slate-100/50 text-slate-500 text-[9px] sm:text-[10px] md:text-xs">
                                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                                {feature}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                            {/* Action Buttons */}
                            <div className="mt-10 sm:mt-16 pt-8 border-t border-slate-100 flex flex-wrap gap-4">
                                {project.github && (
                                    <motion.a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ y: -2 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="flex items-center gap-2 px-4 py-2.5 sm:px-6 sm:py-3 bg-slate-900 text-white rounded-xl font-bold text-xs sm:text-sm group"
                                    >
                                        <Icon icon="Github" size={18} className="group-hover:rotate-12 transition-transform" />
                                        Source Code
                                    </motion.a>
                                )}

                                {project.npm && (
                                    <motion.a
                                        href={project.npm}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ y: -2 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="flex items-center gap-2 px-4 py-2.5 sm:px-6 sm:py-3 bg-white text-black rounded-xl font-bold text-xs sm:text-sm group shadow-md"
                                    >             
                                    
                                        <Image
                                        src={"/icons/npm.svg"}
                                        alt={"icon"}
                                        width={18}
                                        height={18}
                                        className="sm:w-[22px] sm:h-[22px] group-hover:rotate-12 transition-transform"
                                        loading="lazy"
                                        />
                                        NPM Package
                                    </motion.a>
                                )}
                            </div>
                   
                    </div>

                    {/* Terminal Footer */}
                    <div className="bg-slate-50/80 border-t border-slate-100 px-8 py-5 flex items-center justify-between">
                        <div className="flex items-start md:items-center gap-3">
                            <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-slate-400 font-mono text-[10px] sm:text-xs">
                                <div className="flex items-center gap-1.5">
                                    <span className="text-emerald-500 font-bold">chaiyot@linux</span>
                                    <span className="text-slate-400">:</span>
                                    <span className="text-emerald-400">~/projects/{slug}</span>
                                    <span className="text-slate-400">$</span>
                                </div>
                                <span className="text-slate-600 break-all">cat case-study.log</span>
                                <motion.div
                                    animate={{ opacity: [1, 0] }}
                                    transition={{ duration: 0.8, repeat: Infinity }}
                                    className="w-1.5 h-3.5 sm:h-4 bg-emerald-500 rounded-full"
                                />
                            </div>
                        </div>
                        <div className="hidden md:flex items-center gap-4 text-slate-300 font-mono text-[10px]">
                            <span>STATUS: STABLE</span>
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        </div>
                    </div>
                </motion.div>

                {/* Recommended Projects Section */}
                <div className="mt-24 mb-12">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-emerald-50 rounded-lg">
                                <Icon icon="Layers" size={20} className="text-emerald-500" />
                            </div>
                            <Typography variant="h3" className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                                More Projects
                            </Typography>
                        </div>
                        <Link
                            href="/"
                            scrollToSection="projects"
                            className="text-sm font-bold text-emerald-500 hover:text-emerald-600 flex items-center gap-2 group transition-colors"
                        >
                            See All Projects
                            <Icon icon="ArrowRight" size={16} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {projects
                            .filter(p => p.link.split('/').pop() !== slug)
                            .slice(0, 4)
                            .map((otherProject, idx) => (
                                <motion.div
                                    key={otherProject.title}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                                >
                                    <ProjectCard {...otherProject} />
                                </motion.div>
                            ))}
                    </div>
                </div>
            </div>
        </PortfolioTemplate>
    );
}
