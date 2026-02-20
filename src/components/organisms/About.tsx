"use client";

import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Typography } from "@/components/atoms/Typography";
import { Button } from "@/components/atoms/Button";
import { Icon } from "@/components/atoms/Icon";

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

export const About = ({ name, bio, github, linkedin, resume, socialIcons }: AboutProps) => {
    const handleDownload = async () => {
        if (!resume) {
            toast.error("Resume is currently unavailable");
            return;
        }

        const downloadToast = toast.loading("Preparing download...");

        try {
            // Fetch the file as a blob to force download
            const response = await fetch(resume);
            if (!response.ok) throw new Error("Network response was not ok");

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = url;
            link.download = `cv_${name.toLowerCase().replace(/\s+/g, '_')}.pdf`;
            document.body.appendChild(link);
            link.click();

            // Cleanup
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

            toast.success("Download started!", { id: downloadToast });
        } catch (error) {
            console.error("Error downloading resume:", error);
            toast.error("Failed to download resume. Please try again later.", { id: downloadToast });

            // Fallback: try opening in new tab if blob fetch fails (e.g. CORS)
            window.open(resume, "_blank");
        }
    };

    return (
        <section id="about" className="bg-gray-100 relative z-0 flex flex-col items-center justify-center min-h-[90vh] text-center px-6 overflow-hidden">
            {/* Premium CSS Grid Pattern Background */}
            <div
                className="absolute inset-0 bg-dot-grid pointer-events-none -z-10"
                style={{
                    maskImage: 'radial-gradient(ellipse at center, black, transparent 90%)',
                    WebkitMaskImage: 'radial-gradient(ellipse at center, black, transparent 90%)'
                }}
            />

            {/* Subtle Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] -z-20 pointer-events-none" />

            <div className="relative z-10 w-full max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
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
            </div>
        </section>
    );
};
