import React from "react";
import { Typography } from "../atoms/Typography";
import { Icon } from "../atoms/Icon";

interface ContactCardProps {
    icon: React.ReactNode;
    label: string;
    value: string;
    href?: string;
    isExternal?: boolean;
    onClick?: () => void;
}

export const ContactCard = ({ icon, label, value, href, isExternal = true, onClick }: ContactCardProps) => {
    const Component = onClick ? "button" : "a";
    const commonProps = {
        className: "flex items-center w-full text-left gap-4 p-6 bg-white rounded-2xl border border-slate-100 hover:border-blue-100 transition-all duration-300 shadow-sm hover:shadow-md group cursor-pointer",
        onClick: onClick,
    };

    const linkProps = !onClick ? {
        href: href,
        target: isExternal ? "_blank" : undefined,
        rel: isExternal ? "noopener noreferrer" : undefined,
    } : {};

    return (
        <Component {...commonProps} {...linkProps}>
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shrink-0">
                <Icon icon={icon} size={24} />
            </div>
            <div className="flex flex-col text-left overflow-hidden flex-1">
                <Typography variant="span" className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between gap-2">
                    {label}
                    {onClick && <Icon icon="Copy" size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />}
                </Typography>
                <Typography variant="small" className="text-slate-500 truncate">
                    {value}
                </Typography>
            </div>
        </Component>
    );
};
