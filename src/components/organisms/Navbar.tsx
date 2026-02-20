"use client";

import React, { useState, useEffect } from "react";
import { Button } from "../atoms/Button";
import { Icon } from "../atoms/Icon";
import * as Icons from "lucide-react";

const navLinks: { label: string, href: string, icon: keyof typeof Icons | React.ReactNode }[] = [
    { label: "About", href: "home", icon: "User" as const },
    { label: "Skills", href: "skills", icon: "Code2" as const },
    { label: "Experience", href: "experience", icon: "Briefcase" as const },
    { label: "Projects", href: "projects", icon: "FolderOpen" as const },
    { label: "Contact", href: "contact", icon: "Mail" as const },
];

export const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("home");

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        const sections = navLinks.map(link => link.href);
        const observerOptions = {
            root: null,
            rootMargin: "-40% 0px -40% 0px", // Trigger when section is in middle of viewport
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
        if (id.startsWith("http")) {
            window.open(id, "_blank", "noopener,noreferrer");
            return;
        }

        const element = document.getElementById(id);
        if (element) {
            const offset = 80; // Navbar height
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
                    <button
                        onClick={() => scrollToSection("home")}
                        className="flex items-center gap-2 group cursor-pointer bg-transparent border-none p-0"
                    >
                        <div className="w-10 h-10 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Icon icon="Terminal" className="text-black" size={20} />
                        </div>
                        <span className="font-bold text-xl tracking-tight text-slate-900">
                            chaiyot.dev
                        </span>
                    </button>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <button
                                key={link.href}
                                onClick={() => scrollToSection(link.href)}
                                className={`flex items-center gap-2 font-medium transition-colors cursor-pointer bg-transparent border-none p-0 ${activeSection === link.href ? "text-blue-600" : "text-slate-600 hover:text-blue-600"}`}
                            >
                                <Icon icon={link.icon} size={18} />
                                <span className="hidden lg:inline">{link.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden p-2 text-slate-600 cursor-pointer bg-transparent border-none"
                        onClick={() => setMobileOpen(!mobileOpen)}
                    >
                        <Icon icon={mobileOpen ? "X" : "Menu"} />
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-100 p-6 space-y-4 shadow-xl">
                    {navLinks.map((link) => (
                        <button
                            key={link.href}
                            onClick={() => scrollToSection(link.href)}
                            className={`flex items-center gap-3 w-full text-left text-lg font-medium cursor-pointer bg-transparent border-none p-0 ${activeSection === link.href ? "text-blue-600" : "text-slate-600"}`}
                        >
                            <Icon icon={link.icon} size={20} />
                            {link.label}
                        </button>
                    ))}
                </div>
            )}
        </nav>
    );
};
