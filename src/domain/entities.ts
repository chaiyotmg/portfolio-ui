import React from "react";

export interface Profile {
  name: string;
  nickname: string;
  role: string;
  bio: string;
  avatar: string;
  contact: {
    phone: string;
    email: string;
    linkedin: string;
    github: string;
    whatsapp?: string;
    resume?: string;
    location?: string;
  };
}

export interface Skill {
  category: string;
  items: {
    name: string;
    icon?: string | React.ReactNode;
    color?: string;
    iconWidth?: number;
    iconHeight?: number;
  }[];
  icon?: string | React.ReactNode;
  bgIcon?: string | React.ReactNode;
}

export interface Experience {
  company: string;
  position: string;
  period: string;
  description: string[];
  isCurrent?: boolean;
  icon?: string | React.ReactNode;
}
export interface Project {
  title: string;
  description: string;
  image: string;
  link: string;
  tags?: {
    name: string;
    icon?: string | React.ReactNode;
    iconWidth?: number;
    iconHeight?: number;
  }[];
  icon?: string | React.ReactNode;
}

export interface Education {
  degree: string;
  school: string;
  period: string;
  gpax: string;
  icon?: string | React.ReactNode;
}
