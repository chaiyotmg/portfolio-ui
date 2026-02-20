"use client";

import React from "react";
import { motion } from "framer-motion";
import { Experience as ExperienceType } from "@/domain/entities";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import { ExperienceItem } from "@/components/molecules/ExperienceItem";

interface ExperienceProps {
    experiences: ExperienceType[];
}

export const Experience = ({ experiences }: ExperienceProps) => {
    return (
        <section id="experience" className="py-24 px-6 bg-transparent">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <SectionHeader
                        title="Experience"
                        subtitle="Professional experience and career highlights."
                    />
                </motion.div>

                <div className="mt-12">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={`${exp.company}-${index}`}
                            initial={{ opacity: 0, x: -30 }}
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
        </section>
    );
};
