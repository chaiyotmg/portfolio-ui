"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { projects, profile } from "@/data/portfolioData";
import { Icon } from "@/components/atoms/Icon";
import { Typography } from "@/components/atoms/Typography";
import { Chip } from "@/components/atoms/Chip";
import { PortfolioTemplate } from "@/components/templates/PortfolioTemplate";
import { ProjectNavbar } from "@/components/organisms/ProjectNavbar";
import Link from "next/link";

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
                <Link href="/#projects" className="text-emerald-500 hover:underline">
                    Back to Portfolio
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
            <div className="max-w-4xl mx-auto py-12 px-6">
                {/* Case Study Terminal Window */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white border border-slate-200 rounded-[2rem] shadow-2xl shadow-slate-200/50 overflow-hidden"
                >
                    {/* Terminal Top Bar */}
                    <div className="bg-slate-50/80 border-b border-slate-100 px-8 py-5 flex items-center justify-between">
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
                    <div className="p-8 md:p-12">
                        {/* Header Section */}
                        <div className="mb-12">
                            <Typography variant="h1" className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
                                {project.title}
                            </Typography>

                            <div className="flex flex-wrap gap-2 mb-8">
                                {project.tags?.map((tag) => (
                                    <Chip
                                        key={tag.name}
                                        variant="minimal"
                                        icon={tag.icon}
                                        iconWidth={tag.iconWidth}
                                        iconHeight={tag.iconHeight}
                                        className="font-mono text-xs"
                                    >
                                        {tag.name}
                                    </Chip>
                                ))}
                            </div>

                            <Typography variant="p" className="text-lg text-slate-600 leading-relaxed max-w-2xl border-l-4 border-emerald-500 pl-6">
                                {project.fullDescription || project.description}
                            </Typography>
                        </div>

                        {/* Case Study Details */}
                        {project.caseStudy && (
                            <div className="grid gap-12 font-mono">
                                {/* Problem & Solution */}
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                                        <div className="flex items-center gap-2 mb-4 text-red-500">
                                            <Icon icon="AlertTriangle" size={18} />
                                            <span className="font-bold text-sm uppercase tracking-wider">The Problem</span>
                                        </div>
                                        <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
                                            {project.caseStudy.problem}
                                        </p>
                                    </div>
                                    <div className="p-6 bg-emerald-50/50 rounded-2xl border border-emerald-100">
                                        <div className="flex items-center gap-2 mb-4 text-emerald-600">
                                            <Icon icon="CheckCircle" size={18} />
                                            <span className="font-bold text-sm uppercase tracking-wider">The Solution</span>
                                        </div>
                                        <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line">
                                            {project.caseStudy.solution}
                                        </p>
                                    </div>
                                </div>

                                {/* Tech Stack Explanation */}
                                <div className="p-8 border border-slate-100 rounded-3xl bg-slate-50/30">
                                    <div className="flex items-center gap-2 mb-6">
                                        <Icon icon="Cpu" size={20} className="text-blue-500" />
                                        <h3 className="font-bold text-slate-800 uppercase tracking-widest text-sm">Tech Stack Deep Dive</h3>
                                    </div>
                                    <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-8">
                                        {project.caseStudy.techStackExplanation}
                                    </p>

                                    <div className="grid sm:grid-cols-2 gap-4">
                                        {project.caseStudy.features.map((feature, idx) => (
                                            <div key={idx} className="flex items-center gap-3 text-slate-500 text-xs">
                                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                                {feature}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="mt-16 pt-8 border-t border-slate-100 flex flex-wrap gap-4">
                            {project.github && (
                                <motion.a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm group"
                                >
                                    <Icon icon="Github" size={18} className="group-hover:rotate-12 transition-transform" />
                                    Source Code
                                </motion.a>
                            )}
                        </div>
                    </div>

                    {/* Terminal Footer */}
                    <div className="bg-slate-50/80 border-t border-slate-100 px-8 py-5 flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-slate-400 font-mono text-xs">
                            <span className="text-emerald-500 font-bold">chaiyot@linux</span>
                            <span className="text-slate-400">:</span>
                            <span className="text-emerald-400">~/projects/{slug}</span>
                            <span className="text-slate-400">$</span>
                            <span className="text-slate-600 ml-1">cat case-study.log</span>
                        </div>
                        <div className="hidden md:flex items-center gap-4 text-slate-300 font-mono text-[10px]">
                            <span>STATUS: STABLE</span>
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        </div>
                    </div>
                </motion.div>
            </div>
        </PortfolioTemplate>
    );
}
