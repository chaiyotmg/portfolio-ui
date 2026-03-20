"use client";

import React from "react";

interface PortfolioTemplateProps {
    navbar: React.ReactNode;
    children: React.ReactNode;
    footer: React.ReactNode;
}

export const PortfolioTemplate = ({
    navbar,
    children,
    footer,
}: PortfolioTemplateProps) => {
    return (
        <div className="relative min-h-screen bg-white text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
            {/* Premium CSS Grid Pattern Background (Global) */}
            <div
                className="fixed inset-0 bg-dot-grid pointer-events-none z-0"
                style={{
                    maskImage: 'radial-gradient(ellipse at center, black, transparent 90%)',
                    WebkitMaskImage: 'radial-gradient(ellipse at center, black, transparent 90%)'
                }}
            />

            {/* Subtle Background Glow (Global) */}
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[120px] z-0 pointer-events-none" />

            {/* Navbar */}
            {navbar}

            <main className="relative z-10 pt-20">
                {children}
            </main>

            <div className="relative z-10">
                {footer}
            </div>
        </div>
    );
};
