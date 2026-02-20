"use client";

import React from "react";
import { motion } from "framer-motion";
import { Skill } from "../../domain/entities";
import { SectionHeader } from "../molecules/SectionHeader";
import { SkillCard } from "../molecules/SkillCard";

interface SkillsProps {
    skills: Skill[];
}

export const Skills = ({ skills }: SkillsProps) => {
    return (
        <section id="skills" className="py-24 px-6 bg-slate-50">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <SectionHeader
                        title="Skills & Expertise"
                        subtitle="A comprehensive list of the technologies and tools I use to bring ideas to life."
                        align="center"
                    />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {skills.map((skillGroup, index) => (
                        <motion.div
                            key={skillGroup.category}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <SkillCard
                                category={skillGroup.category}
                                items={skillGroup.items}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
