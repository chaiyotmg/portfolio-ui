"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@/components/atoms/Icon";
import * as Icons from "lucide-react";

interface NavLink {
    label: string;
    href: string;
    icon: keyof typeof Icons;
}

const navLinks: NavLink[] = [
    { label: "About", href: "about", icon: "User" },
    { label: "Skills", href: "skills", icon: "Code2" },
    { label: "Experience", href: "experience", icon: "Briefcase" },
    { label: "Projects", href: "projects-highlight", icon: "FolderOpen" },
    { label: "Contact", href: "contact", icon: "Mail" },
];

export const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("about");

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        const sections = navLinks.map(link => link.href);
        const observerOptions = {
            root: null,
            rootMargin: "-40% 0px -40% 0px",
            threshold: 0,
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const id = (entry.target.id === "projects" || entry.target.id === "projects-highlight") ? "projects-highlight" : entry.target.id;
                    setActiveSection(id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        sections.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        // Add "projects" ID explicitly to be observed since it's not in navLinks.href anymore
        const projectsEl = document.getElementById("projects");
        if (projectsEl) observer.observe(projectsEl);

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            observer.disconnect();
        };
    }, []);

    const scrollToSection = (id: string) => {
        setMobileOpen(false);

        // Small timeout to allow the mobile menu animation to start closing
        // which helps with smoother scrolling on some devices
        setTimeout(() => {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        }, 100);
    };

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-300 ${mobileOpen
                ? "bg-white py-3 shadow-md border-b border-slate-200"
                : "bg-transparent py-5 border-b border-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    {/* Brand */}
                    <motion.button
                        type="button"
                        onClick={() => scrollToSection("about")}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center group cursor-pointer bg-transparent border-none p-0"
                    >
                        <div className="w-10 h-10 flex items-center justify-center">
                            <Icon icon="Terminal" className="text-black" size={18} />
                        </div>
                        <span className="font-bold text-base xs:text-lg sm:text-xl tracking-tight text-slate-900">
                            chaiyot.dev
                        </span>
                    </motion.button>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => {
                            const isActive = activeSection === link.href;
                            return (
                                <motion.button
                                    key={link.href}
                                    type="button"
                                    onClick={() => scrollToSection(link.href)}
                                    whileHover={{ y: -2, scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`text-sm relative flex items-center gap-2 transition-colors cursor-pointer bg-transparent border-none p-0 ${isActive ? "text-emerald-500" : "text-slate-600 hover:text-emerald-500"}`}
                                >
                                    <Icon icon={link.icon} size={18} />
                                    <span className="hidden lg:inline">{link.label}</span>

                                </motion.button>
                            );
                        })}
                    </div>


                    {/* Mobile Toggle */}
                    <motion.button
                        type="button"
                        whileTap={{ scale: 0.9 }}
                        className="md:hidden p-3 -mr-3 text-slate-700 cursor-pointer bg-transparent border-none flex items-center justify-center min-w-[44px] min-h-[44px]"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle Menu"
                    >
                        <Icon icon={mobileOpen ? "X" : "Menu"} size={20} />
                    </motion.button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-100 overflow-hidden shadow-2xl z-[70]"
                    >
                        <div className="p-6 space-y-2">
                            {navLinks.map((link) => {
                                const isActive = activeSection === link.href;
                                return (
                                    <motion.button
                                        key={link.href}
                                        type="button"
                                        onClick={() => scrollToSection(link.href)}
                                        whileTap={{ scale: 0.98, x: 5 }}
                                        className={`text-sm flex items-center gap-4 w-full text-left py-4 px-2 font-medium cursor-pointer bg-transparent border-none transition-colors rounded-xl ${isActive ? "text-emerald-600 bg-emerald-50" : "text-slate-600 active:bg-slate-50"}`}
                                    >
                                        <Icon icon={link.icon} size={18} className={`${isActive ? "text-emerald-600" : "text-slate-400"}`} />
                                        {link.label}
                                    </motion.button>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};
