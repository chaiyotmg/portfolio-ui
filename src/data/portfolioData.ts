import { Profile, Skill, Experience, Project } from "@/domain/entities";


export const projects: Project[] = [
    {
        title: "API Gateway Microservices",
        description: "A robust API Gateway built with Spring Cloud Gateway and Eureka for service discovery, featuring rate limiting and JWT authentication.",
        image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?q=80&w=800&auto=format&fit=crop",
        link: "https://github.com/chaiyotmg",
        tags: ["Spring Boot", "Microservices", "Docker"],
    },
    {
        title: "K8s Deployment Dashboard",
        description: "A monitoring dashboard for Kubernetes clusters that visualizes pod health, resource usage, and deployment status in real-time.",
        image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?q=80&w=800&auto=format&fit=crop",
        link: "https://github.com/chaiyotmg",
        tags: ["Kubernetes", "React", "Node.js"],
    },
    {
        title: "Automated CI/CD Engine",
        description: "A custom automation engine that streamlines the build and deployment process for multi-language microservices into OpenShift environments.",
        image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?q=80&w=800&auto=format&fit=crop",
        link: "https://github.com/chaiyotmg",
        tags: ["Jenkins", "Shell Script", "OpenShift"],
    },
];

export const profile: Profile = {
    name: "Chaiyot Mali-ngam",
    nickname: "Pac",
    role: "Back-End Developer and DevOps Engineer",
    bio: "Back-End Developer and DevOps Engineer with 2+ years combined experience from project work and internships.",
    avatar: "/avatar.png",
    contact: {
        phone: "094-2647104",
        email: "chaiyot.mg@gmail.com",
        linkedin: "https://www.linkedin.com/in/chaiyot-mali-ngam",
        github: "https://github.com/chaiyotmg",
        whatsapp: "094-2647104",
        resume: process.env.NEXT_PUBLIC_RESUME_URL || "",
        location: "Bangkok, Thailand",
    },
    education: [
        {
            degree: "Bachelor of Science in Information Technology",
            school: "Khon Kaen University",
            period: "2020 - 2024",
            gpax: "3.22/4.00",
        },
    ],
};

export const skills: Skill[] = [
    {
        category: "Languages",
        items: [
            { name: "Java" },
            { name: "JavaScript" },
            { name: "TypeScript" },
            { name: "Node.js" },
            { name: "Shell Script" },
        ],
    },
    {
        category: "Frameworks & Libraries",
        items: [
            { name: "Spring Boot" },
            { name: "Nest.js" },
            { name: "React.js" },
            { name: "Vue.js" },
            { name: "TailwindCSS" },
        ],
    },
    {
        category: "Databases",
        items: [
            { name: "PostgreSQL" },
            { name: "MS SQL" },
            { name: "MongoDB" },
            { name: "Redis" },
        ],
    },
    {
        category: "DevOps & Tools",
        items: [
            { name: "Docker" },
            { name: "Kubernetes" },
            { name: "OpenShift" },
            { name: "Helm" },
            { name: "GitHub Actions" },
            { name: "Azure DevOps" },
            { name: "Istio" },
        ],
    },
];

export const experiences: Experience[] = [
    {
        company: "Advanced Info Service Public Company Limited",
        position: "Programmer",
        period: "Oct 2024 - Present",
        isCurrent: true,
        description: [
            "Developed REST API endpoints using Spring Boot.",
            "Developed advanced search with dynamic SQL generation.",
            "Managed resource configurations and SQL statements.",
            "Performed database migrations on MS SQL Server for DEV, SIT, UAT.",
            "Optimized queries using execution plans and indexing.",
            "Developed deployment pipelines for Redis Cluster and OpenShift.",
        ],
    },
    {
        company: "Sirisoft Public Company Limited",
        position: "Software Developer",
        period: "May - Sep 2024",
        description: [
            "Refactored batch jobs to reduce lock contention and deadlocks.",
            "Developed CI/CD pipelines for Spring Boot, .NET, Node.js, and PHP.",
            "Implemented PM2-based deployment for Node.js services.",
        ],
    },
    {
        company: "Primo World Company Limited",
        position: "Software Developer (Cooperative Education)",
        period: "Dec 2023 - April 2024",
        description: [
            "Developed a Config Generator Library using TypeScript.",
            "Built Azure DevOps CI pipelines for Docker images to AWS ECR.",
            "Developed UI components using Vue.js, SCSS, and TailwindCSS.",
        ],
    },
    {
        company: "TMBThanachart Bank Public Company Limited",
        position: "Software Engineer (Internship)",
        period: "June - Sep 2023",
        description: [
            "POC for Liquibase database version control.",
            "Developed a release dashboard using React.js and Spring Boot.",
        ],
    },
];
