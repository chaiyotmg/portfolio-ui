"use client";

import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Typography } from "@/components/atoms/Typography";
import { Button } from "@/components/atoms/Button";
import { Icon } from "@/components/atoms/Icon";
import { Chip } from "@/components/atoms/Chip";

interface AboutProps {
    name: string;
    nickname: string;
    role: string;
    bio: string;
    github: string;
    linkedin: string;
    email: string;
    resume?: string;
    socialIcons?: {
        github?: React.ReactNode;
        linkedin?: React.ReactNode;
        email?: React.ReactNode;
    };
}

export const About = ({ name, bio, github, linkedin, resume }: AboutProps) => {
    const handleDownload = async () => {
        if (!resume) {
            toast.error("Resume is currently unavailable");
            return;
        }

        const downloadToast = toast.loading("Preparing download...");

        try {
            const response = await fetch(resume);
            if (!response.ok) throw new Error("Network response was not ok");
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            const resumeName: string = "cv_chaiyot_mali-ngam.pdf"
            link.download = resumeName;
            document.body.appendChild(link);
            link.click();

            // Cleanup
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

            toast.success("Download started!", { id: downloadToast });
        } catch (error) {
            toast.error("Failed to download resume. Please try again later.", { id: downloadToast });

            // Fallback: try opening in new tab if blob fetch fails (e.g. CORS)
            window.open(resume, "_blank");
        }
    };

    return (
        <section id="about" className="relative z-0 flex flex-col items-center justify-center min-h-[90vh] text-center px-6 overflow-hidden bg-transparent">
            {/* Background elements are now handled globally in PortfolioTemplate.tsx */}

            <div className="relative z-10 w-full max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Typography variant="h2" className="text-2xl sm:text-5xl md:text-6xl lg:text-7xl pb-8 bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                        {name}
                    </Typography>

                    <Typography variant="p" className="max-w-2xl mx-auto mb-8 text-slate-500 text-sm md:text-base leading-relaxed">
                        {bio}
                    </Typography>

                    {/* Professional Role Chips */}
                    <div className="flex flex-wrap justify-center gap-3 mb-12">
                        <Chip className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 text-emerald-700 border-emerald-200/50 px-4 py-2 sm:px-5 shadow-sm hover:shadow-emerald-500/10">
                            Back-End Developer
                        </Chip>
                        <Chip className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 text-blue-700 border-blue-200/50 px-4 py-2 sm:px-5 shadow-sm hover:shadow-blue-500/10">
                            Full Stack Developer
                        </Chip>
                        <Chip className="bg-gradient-to-r from-purple-500/10 to-violet-500/10 text-purple-700 border-purple-200/50 px-4 py-2 sm:px-5 shadow-sm hover:shadow-purple-500/10">
                            DevOps Engineer
                        </Chip>
                    </div>

                    <div className="flex justify-center w-full mb-12">
                        <motion.div
                            animate={{
                                y: [0, -8, 0],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="w-auto"
                        >
                            <Button
                                variant="gradient"
                                className="w-auto sm:w-auto px-10 py-5 sm:px-12 sm:py-4 text-lg font-bold flex items-center justify-center gap-3 cursor-pointer shadow-xl shadow-emerald-500/20"
                                onClick={handleDownload}
                            >
                                <Icon icon="Download" size={20} />
                                Resume
                            </Button>
                        </motion.div>
                    </div>

                    <div className="flex justify-center gap-6">
                        <motion.a
                            href={github}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-3 bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200/60 text-slate-600 hover:text-emerald-500 hover:border-emerald-200/50 transition-all shadow-sm hover:shadow-emerald-500/5"
                        >
                            <Icon icon="Github" size={24} />
                        </motion.a>
                        <motion.a
                            href={linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-3 bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200/60 text-slate-600 hover:text-blue-500 hover:border-blue-200/50 transition-all shadow-sm hover:shadow-blue-500/5"
                        >
                            <Icon icon="Linkedin" size={24} />
                        </motion.a>
                    </div>

                    {/* Mouse Scroll Indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                        className="mt-16 flex flex-col items-center gap-2"
                    >
                        <motion.div
                            animate={{
                                y: [0, 8, 0],
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="w-6 h-10 border-2 border-slate-300 rounded-full flex justify-center p-1.5"
                        >
                            <motion.div
                                animate={{
                                    y: [0, 12, 0],
                                    opacity: [1, 0, 1],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                className="w-1 h-2 bg-emerald-500 rounded-full"
                            />
                        </motion.div>
                        <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-[0.2em]">Scroll</span>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};
