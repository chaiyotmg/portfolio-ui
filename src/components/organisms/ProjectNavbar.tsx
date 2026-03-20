import { motion } from "framer-motion";
import { Icon } from "@/components/atoms/Icon";
import { Link } from "@/components/atoms/Link";

export const ProjectNavbar = () => {
    return (
        <nav className="fixed top-0 left-0 right-0 z-[60] bg-white/80 backdrop-blur-md py-4 border-b border-slate-200/60 shadow-sm">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    {/* Brand / Go Back */}
                    <div className="flex items-center gap-4">
                        <Link href="/" scrollToSection="projects">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center gap-2 group cursor-pointer bg-transparent border-none p-0"
                            >
                                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                                    <Icon icon="ChevronLeft" size={18} strokeWidth={3} />
                                </div>
                                <span className="font-bold text-sm tracking-tight text-slate-800 hidden md:inline">
                                    Main
                                </span>
                            </motion.button>
                        </Link>

                        <div className="h-4 w-[1px] bg-slate-200" />

                        <Link href="/">
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="flex items-center group cursor-pointer"
                            >
                                <Icon icon="Terminal" className="text-black mr-2 p-1 rounded-md" size={24} />
                                <span className="font-bold text-base tracking-tight text-slate-900">
                                    chaiyot.dev
                                </span>
                            </motion.div>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};
