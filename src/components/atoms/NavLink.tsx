import React from "react";
import { Link } from "./Link";

interface NavLinkProps {
    href: string;
    children: React.ReactNode;
    className?: string;
}

export const NavLink = ({ href, children, className = "" }: NavLinkProps) => {
    return (
        <Link
            href={href}
            className={`text-slate-600 hover:text-blue-600 font-medium transition-colors ${className}`}
        >
            {children}
        </Link>
    );
};
