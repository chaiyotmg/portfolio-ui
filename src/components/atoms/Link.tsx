import React from "react";
import NextLink, { LinkProps as NextLinkProps } from "next/link";

interface LinkProps extends NextLinkProps {
    children: React.ReactNode;
    className?: string;
    target?: string;
    rel?: string;
    underline?: boolean;
    scrollToSection?: string;
}

export const Link = ({ 
    children, 
    className = "", 
    underline = false,
    scrollToSection,
    ...props 
}: LinkProps) => {
    const isExternal = props.href.toString().startsWith("http");

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (scrollToSection) {
            sessionStorage.setItem("scrollToSection", scrollToSection);
        }
        if (props.onClick) props.onClick(e);
    };
    
    const combinedClassName = `
        transition-all 
        duration-300 
        ${underline ? "hover:underline" : ""} 
        ${className}
    `.replace(/\s+/g, ' ').trim();

    if (isExternal) {
        return (
            <a 
                href={props.href.toString()} 
                className={combinedClassName}
                target={props.target || "_blank"}
                rel={props.rel || "noopener noreferrer"}
                onClick={handleClick}
            >
                {children}
            </a>
        );
    }

    return (
        <NextLink
            {...props}
            className={combinedClassName}
            onClick={handleClick}
        >
            {children}
        </NextLink>
    );
};
