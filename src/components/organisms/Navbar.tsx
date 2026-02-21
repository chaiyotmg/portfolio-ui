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
    { label: "Projects", href: "projects", icon: "FolderOpen" },
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
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        sections.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            observer.disconnect();
        };
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 80;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
        setMobileOpen(false);
    };

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? "bg-white/80 backdrop-blur-md shadow-sm py-3"
                : "bg-transparent py-5"
                } border-b border-slate-200/50`}
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    {/* Brand */}
                    <motion.button
                        onClick={() => scrollToSection("about")}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center group cursor-pointer bg-transparent border-none"
                    >
                        <div className="w-10 h-10 flex items-center justify-center">
                            <Icon icon="Terminal" className="text-black" size={20} />
                        </div>
                        <span className="font-bold text-xl tracking-tight text-slate-900">
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
                                    onClick={() => scrollToSection(link.href)}
                                    whileHover={{ y: -2, scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`relative flex items-center gap-2 font-medium transition-colors cursor-pointer bg-transparent border-none p-0 ${isActive ? "text-emerald-500" : "text-slate-600 hover:text-emerald-500"}`}
                                >
                                    <Icon icon={link.icon} size={18} />
                                    <span className="hidden lg:inline">{link.label}</span>
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeNavDesktop"
                                            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-emerald-500 rounded-full"
                                        />
                                    )}
                                </motion.button>
                            );
                        })}
                    </div>


                    {/* Mobile Toggle */}
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        className="md:hidden p-2 text-slate-600 cursor-pointer bg-transparent border-none"
                        onClick={() => setMobileOpen(!mobileOpen)}
                    >
                        <Icon icon={mobileOpen ? "X" : "Menu"} />
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
                        className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-100 overflow-hidden shadow-xl"
                    >
                        <div className="p-6 space-y-4">
                            {navLinks.map((link) => {
                                const isActive = activeSection === link.href;
                                return (
                                    <motion.button
                                        key={link.href}
                                        onClick={() => scrollToSection(link.href)}
                                        whileTap={{ scale: 0.98, x: 5 }}
                                        className={`flex items-center gap-3 w-full text-left text-lg font-medium cursor-pointer bg-transparent border-none p-0 ${isActive ? "text-emerald-600" : "text-slate-600"}`}
                                    >
                                        <Icon icon={link.icon} size={20} />
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
