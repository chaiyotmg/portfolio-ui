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
        <div className="relative min-h-screen bg-white text-slate-900 selection:bg-blue-100 selection:text-blue-900">
            {navbar}

            <main className="pt-20">
                {children}
            </main>

            {footer}
        </div>
    );
};
