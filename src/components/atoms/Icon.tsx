import React from "react";
import * as Icons from "lucide-react";

interface IconProps {
    icon: keyof typeof Icons | React.ReactNode;
    size?: number;
    className?: string;
}

export const Icon = ({ icon, size = 24, className = "" }: IconProps) => {
    if (!icon) return null;

    // If it's a string, it's a Lucide icon name
    if (typeof icon === "string") {
        const LucideIcon = Icons[icon as keyof typeof Icons] as React.ElementType;
        if (!LucideIcon) {
            console.warn(`Icon ${icon} not found in lucide-react`);
            return null;
        }
        return <LucideIcon size={size} className={className} />;
    }

    // If it's an object/node (SVG or other React component)
    return (
        <span
            className={`inline-flex items-center justify-center ${className}`}
            style={{ width: size, height: size }}
        >
            {icon}
        </span>
    );
};
