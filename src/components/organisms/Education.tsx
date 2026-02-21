"use client";

import { motion } from "framer-motion";
import { Education as EducationType } from "@/domain/entities";
import { Typography } from "@/components/atoms/Typography";
import { Icon } from "@/components/atoms/Icon";

interface EducationProps {
    educations: EducationType[];
}

export const Education = ({ educations }: EducationProps) => {
    return (
        <section className="pt-0 pb-24 px-6 bg-transparent">
            <div className="max-w-4xl mx-auto">
                {/* Section Header (Sub-style) */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <Typography variant="h3" className="text-xl sm:text-2xl font-bold mb-4 text-slate-800">
                        <span className="bg-black bg-clip-text text-transparent uppercase tracking-widest text-lg">Education</span>
                    </Typography>
                </motion.div>

                {/* Education Cards (Centered Flex) */}
                <div className="flex flex-wrap justify-center gap-8">
                    {educations.map((edu, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group relative bg-white/40 backdrop-blur-md rounded-[2rem] p-8 border border-slate-200/60 shadow-xl shadow-slate-200/50 transition-all duration-300 hover:shadow-emerald-500/10 hover:border-emerald-200/50"
                        >
                            {/* Terminal Top Bar for Card */}
                            <div className="absolute top-0 left-0 right-0 h-10 px-6 flex items-center justify-between border-b border-slate-200/30">
                                <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                                </div>
                                <div className="text-[10px] font-mono text-slate-300 font-bold uppercase tracking-widest flex items-center gap-1.5">
                                    <Icon icon="School" size={10} />
                                    Education
                                </div>
                            </div>

                            <div className="mt-8 flex flex-col gap-6">
                                <div className="flex items-start gap-4">
                                    <div className="p-4 bg-emerald-500/10 rounded-2xl border border-emerald-100/50 text-emerald-500">
                                        <Icon icon="GraduationCap" size={24} />
                                    </div>
                                    <div className="flex-1">
                                        <Typography variant="h4" className="text-xl font-bold text-slate-900 mb-1">
                                            {edu.degree}
                                        </Typography>
                                        <div className="flex items-center gap-2 text-emerald-600 font-mono text-xs font-bold mb-3">
                                            <Icon icon="MapPin" size={12} />
                                            {edu.school}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-6 border-t border-slate-100 gap-4">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">Period</span>
                                        <div className="flex items-center gap-2 text-slate-600 font-mono text-sm leading-none bg-slate-50 px-2 py-1 rounded border border-slate-100 whitespace-nowrap">
                                            <Icon icon="Calendar" size={12} className="text-slate-300" />
                                            {edu.period}
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end gap-1">
                                        <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">GPAX</span>
                                        <div className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent font-mono">
                                            {edu.gpax}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
