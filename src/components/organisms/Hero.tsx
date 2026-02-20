"use client";

import axios from "axios";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Typography } from "../atoms/Typography";
import { Button } from "../atoms/Button";
import { Icon } from "../atoms/Icon";

interface HeroProps {
    name: string;
    nickname: string;
    role: string;
    bio: string;
    github: string;
    linkedin: string;
    email: string;
    socialIcons?: {
        github?: React.ReactNode;
        linkedin?: React.ReactNode;
        email?: React.ReactNode;
    };
}

export const Hero = ({ name, nickname, role, bio, github, linkedin, email, socialIcons }: HeroProps) => {
    const handleDownload = async () => {
        try {
            const response = await axios.get("/api/resume/download", {
                responseType: "blob",
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const a = document.createElement("a");
            a.style.display = "none";
            a.href = url;
            a.download = "cv_chaiyot_mali-ngam.pdf";
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error("Error downloading resume:", error);
            toast.error((t) => (
                <div className="flex items-center gap-2">
                    <span>Resume is currently unavailable</span>
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="p-1 hover:bg-red-50 rounded-full transition-colors cursor-pointer"
                    >
                        <Icon icon="X" size={14} />
                    </button>
                </div>
            ));
        }
    };

    return (
        <section id="home" className="flex flex-col items-center justify-center min-h-[90vh] text-center px-6 bg-white">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-4xl"
            >

                <Typography variant="h1" className="pb-8 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    {name}
                </Typography>

                <Typography variant="p" className="max-w-2xl mx-auto mb-10 text-slate-500">
                    {bio}
                </Typography>

                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    <motion.div
                        animate={{
                            y: [0, -8, 0],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        <Button
                            variant="gradient"
                            size="lg"
                            className="flex gap-2 cursor-pointer"
                            onClick={handleDownload}
                        >
                            <Icon icon="Download" size={18} />
                            Resume
                        </Button>
                    </motion.div>
                </div>

                <div className="flex justify-center gap-6">
                    <a href={github} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-600 transition-colors">
                        <Icon icon={socialIcons?.github || "Github"} size={24} />
                    </a>
                    <a href={linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-600 transition-colors">
                        <Icon icon={socialIcons?.linkedin || "Linkedin"} size={24} />
                    </a>
                </div>
            </motion.div>
        </section>
    );
};
