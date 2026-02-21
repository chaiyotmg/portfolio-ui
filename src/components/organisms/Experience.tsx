"use client";

import { motion } from "framer-motion";
import { Experience as ExperienceType } from "@/domain/entities";
import { ExperienceItem } from "@/components/molecules/ExperienceItem";
import { Typography } from "@/components/atoms/Typography";
import { Icon } from "@/components/atoms/Icon";

interface ExperienceProps {
    experiences: ExperienceType[];
}

export const Experience = ({ experiences }: ExperienceProps) => {
    return (
        <section id="experience" className="pt-24 pb-4 px-6 bg-transparent">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <Typography variant="h2" className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4 text-slate-900">
                        <span className="bg-gradient-to-r from-emerald-500 to-blue-500 bg-clip-text text-transparent">Experience</span>
                    </Typography>
                    <div className="flex justify-center mb-4">
                        <div className="flex items-center gap-2 text-slate-400 font-mono text-xs font-bold bg-slate-100/50 px-4 py-1.5 rounded-lg border border-slate-200/50">
                            <Icon icon="Terminal" size={12} className="text-emerald-500" />
                            cat experience.json
                        </div>
                    </div>
                </motion.div>

                <div className="relative mt-12 pl-4">
                    {/* Simplified Timeline Support */}
                    <div className="absolute left-4 top-0 bottom-0 w-px bg-slate-100 md:left-4" />

                    <div className="space-y-0">
                        {experiences.map((exp, index) => (
                            <motion.div
                                key={`${exp.company}-${index}`}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <ExperienceItem
                                    company={exp.company}
                                    position={exp.position}
                                    period={exp.period}
                                    description={exp.description}
                                    isCurrent={exp.isCurrent}
                                    icon={exp.icon}
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
