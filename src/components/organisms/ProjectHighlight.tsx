import React from "react";
import { Project } from "@/domain/entities";
import { ZoomableImage } from "@/components/molecules/ZoomableImage";
import { Typography } from "@/components/atoms/Typography";
import { Link } from "@/components/atoms/Link";
import { Icon } from "@/components/atoms/Icon";
import { motion } from "framer-motion";

export const ProjectHighlight = ({ project }: { project: Project }) => {
    return (
        <section id="projects-highlight" className="py-24 relative overflow-hidden bg-white">
            {/* Background subtle gradients */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[140px] -mr-64 -mt-32" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-sky-500/5 rounded-full blur-[140px] -ml-64 -mb-32" />
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
                <div className="flex flex-col lg:flex-row gap-16 items-center">
                    {/* Content Section */}
                    <div className="w-full lg:w-1/2 space-y-8 lg:order-1">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="space-y-6 flex flex-col items-center lg:items-start text-center lg:text-left"
                        >
                            <div>
                                <span className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-bold tracking-[0.2em] uppercase mb-6 border border-emerald-100">
                                    <div className="w-1 h-1 rounded-full bg-emerald-600 animate-pulse" />
                                    Technical Highlight
                                </span>
                                <Typography variant="h2" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tight leading-[1.1]">
                                    Cloud-Native <br />
                                    <span className="text-emerald-500 underline decoration-emerald-200 underline-offset-8">Infrastructure.</span>
                                </Typography>
                                <Typography variant="p" className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0 font-medium">
                                    A <span className="text-slate-900 font-bold">OCI Kubernetes Engine (OKE)</span> cluster for production applications and technical labs.
                                </Typography>
                            </div>

                            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                                {project.tags?.slice(0, 4).map((tag, idx) => (
                                    <div 
                                        key={idx} 
                                        className="flex items-center gap-2.5 px-5 py-3 bg-white rounded-2xl border border-slate-100 shadow-sm hover:border-emerald-200 transition-colors group"
                                    >
                                        {typeof tag.icon === 'string' && tag.icon.startsWith('/') ? (
                                            <div className="w-5 h-5 flex items-center justify-center grayscale group-hover:grayscale-0 transition-all opacity-60 group-hover:opacity-100">
                                                <img src={tag.icon} className="w-full h-full object-contain" alt={tag.name} />
                                            </div>
                                        ) : (
                                            <Icon icon={(tag.icon as any) || "Layout"} size={18} className="text-slate-400 group-hover:text-emerald-500 transition-colors" />
                                        )}
                                        <span className="text-sm font-bold text-slate-700 tracking-tight">{tag.name}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-4">
                                <Link 
                                    href={project.link}
                                    className="inline-flex items-center gap-3 px-6 py-3.5 sm:px-8 sm:py-4.5 bg-slate-900 text-white rounded-2xl font-bold hover:bg-emerald-600 transition-all hover:scale-[1.02] shadow-2xl shadow-slate-200 text-sm sm:text-base group"
                                >
                                    View Full Case Study
                                    <Icon icon="ArrowRight" size={20} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </motion.div>
                    </div>

                    {/* Visual Section */}
                    <div className="w-full lg:w-1/2 lg:order-2">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="relative"
                        >
                            {/* Visual Glow */}
                            <div className="absolute -inset-4 bg-emerald-500/10 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            
                            <ZoomableImage 
                                image={project.image} 
                                svg={project.svg} 
                                alt={project.title} 
                            />

                            {/* Interaction Hint */}
                            <div className="absolute top-4 right-4 flex items-center gap-2 bg-slate-900/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 opacity-0 lg:opacity-100">
                                <Icon icon="Maximize2" size={12} className="text-white" />
                                <span className="text-[9px] font-bold text-white uppercase tracking-widest">Click to Zoom Architecture</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};
