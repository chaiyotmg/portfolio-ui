"use client";

import { motion } from "framer-motion";
import { Skill } from "@/domain/entities";
import { SkillCard } from "@/components/molecules/SkillCard";
import { Typography } from "@/components/atoms/Typography";
import { Icon } from "@/components/atoms/Icon";

interface SkillsProps {
    skills: Skill[];
}

export const Skills = ({ skills }: SkillsProps) => {
    return (
        <section id="skills" className="py-15 px-3 bg-transparent overflow-hidden">
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
                        The <span className="bg-gradient-to-r from-emerald-500 to-blue-500 bg-clip-text text-transparent">Tech</span> Stack
                    </Typography>
                </motion.div>

                {/* Terminal Window */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="bg-slate-50/40 backdrop-blur-sm border border-slate-200/60 rounded-[2rem] shadow-2xl shadow-slate-200/50 overflow-hidden"
                >
                    {/* Terminal Top Bar */}
                    <div className="bg-white/80 border-b border-slate-200/60 px-8 py-5 flex items-center justify-between">
                        <div className="flex gap-2.5">
                            <div className="w-3.5 h-3.5 rounded-full bg-red-400 shadow-inner" />
                            <div className="w-3.5 h-3.5 rounded-full bg-yellow-400 shadow-inner" />
                            <div className="w-3.5 h-3.5 rounded-full bg-green-400 shadow-inner" />
                        </div>
                        <div className="flex items-center gap-2 text-slate-400 font-mono text-xs font-bold bg-slate-100/50 px-4 py-1.5 rounded-lg border border-slate-200/50">
                            <Icon icon="Folder" size={12} />
                            ~/portfolio/skills
                        </div>
                        <div className="w-12" /> {/* Spacer */}
                    </div>

                    {/* Terminal Content Grid */}
                    <div className="p-8 md:p-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {skills.map((skillGroup, index) => (
                                <motion.div
                                    key={skillGroup.category}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <SkillCard
                                        category={skillGroup.category}
                                        items={skillGroup.items}
                                        icon={skillGroup.icon}
                                        bgIcon={skillGroup.bgIcon}
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Terminal Footer / Success Message */}
                    <div className="bg-white/80 border-t border-slate-200/60 px-8 py-5 flex items-center gap-3">
                        <div className="text-emerald-500 font-bold">→</div>
                        <div className="text-slate-400 font-mono text-xs md:text-sm">
                            <span className="text-emerald-600">~</span> echo <span className="text-slate-600">&quot;Stack Initialized Successfully.&quot;</span>
                        </div>
                        <motion.div
                            animate={{ opacity: [1, 0] }}
                            transition={{ duration: 0.8, repeat: Infinity }}
                            className="w-2 h-4 bg-emerald-500 rounded-sm"
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
