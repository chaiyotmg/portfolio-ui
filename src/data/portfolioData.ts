import { Profile, Skill, Experience, Project, Education } from "@/domain/entities";


export const projects: Project[] = [
    {
        title: "Portfolio UI",
        description: "A modern, responsive portfolio website featuring a unique terminal-inspired aesthetic, smooth animations with Framer Motion, and a clean light theme.",
        fullDescription: "A high-performance portfolio website built with Next.js 14, focused on providing a developer-centric user experience with a terminal-themed UI.",
        image: "/images/portfolio-ui-bg.png",
        link: "/projects/portfolio-ui",
        github: "https://github.com/chaiyotmg/portfolio-ui",
        tags: [
            { name: "Next.js", icon: "/icons/nextjs.svg", iconWidth: 14, iconHeight: 14 },
            { name: "TypeScript", icon: "/icons/typescript.svg", iconWidth: 14, iconHeight: 14 },
            { name: "TailwindCSS", icon: "/icons/tailwindcss.svg", iconWidth: 14, iconHeight: 14 },
            { name: "Bun.js", icon: "/icons/bun.svg", iconWidth: 14, iconHeight: 14 },
        ],
        caseStudy: {
            problem: "Creating a portfolio that stands out while maintaining a formal professional look and showcasing technical DevOps/Backend skills.",
            solution: "Implemented a 'Terminal-in-Light-Mode' aesthetic using Framer Motion for interactivity and Next.js for performance.",
            techStackExplanation: "Next.js for SSR, Tailwind for rapid styling, and Framer Motion for the complex terminal animations.",
            features: ["Interactive Terminal Components", "Responsive Design", "CI/CD Integrated", "Snapshot Deployment Strategy"],
        },
    },
    {
        title: "K8s Deployment Dashboard",
        description: "A monitoring dashboard for Kubernetes clusters that visualizes pod health, resource usage, and deployment status in real-time.",
        fullDescription: "A comprehensive dashboard for DevOps engineers to manage and monitor multiple Kubernetes clusters through a single interface.",
        image: "/images/deploy-oke-atp-oci.png",
        link: "/projects/k8s-deployment-dashboard",
        github: "https://github.com/chaiyotmg",
        tags: [
            { name: "Kubernetes", icon: "/icons/kubernetes.svg", iconWidth: 14, iconHeight: 14 },
            { name: "React", icon: "/icons/react.svg", iconWidth: 14, iconHeight: 14 },
            { name: "Node.js", icon: "/icons/nestjs.svg", iconWidth: 14, iconHeight: 14 },
        ],
        caseStudy: {
            problem: "Complexity of monitoring multiple clusters across different regions without a unified UI.",
            solution: "Developed a real-time aggregator using WebSockets and Kubernetes API to stream pod status directly to the frontend.",
            techStackExplanation: "React for the fluid UI, NestJS for the robust backend proxy, and official K8s client libraries.",
            features: ["Real-time Pod Monitoring", "Resource Usage Visuals", "Cluster Health Alerts", "Deployment Management"],
        },
    }
];

export const profile: Profile = {
    name: "~/.Chaiyot Mali-ngam/",
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
    }
};

export const skills: Skill[] = [
    {
        category: "Languages",
        icon: "Code2",
        bgIcon: "Code2",
        items: [
            { name: "Java", icon: "icons/java.svg", iconWidth: 16, iconHeight: 16 },
            { name: "TypeScript", icon: "icons/typescript.svg", iconWidth: 15, iconHeight: 15 },
            { name: "JavaScript", icon: "icons/javascript.svg", iconWidth: 15, iconHeight: 15 },
            { name: "Golang", icon: "icons/go.svg", iconWidth: 16, iconHeight: 16 },
        ],
    },
    {
        category: "Frontend",
        icon: "Monitor",
        bgIcon: "Monitor",
        items: [
            { name: "React.js", icon: "icons/react.svg", iconWidth: 16, iconHeight: 16 },
            { name: "Vue.js", icon: "icons/vuejs.svg", iconWidth: 16, iconHeight: 16 },
            { name: "TailwindCSS", icon: "icons/tailwindcss.svg", iconWidth: 16, iconHeight: 16 },
            { name: "SCSS", icon: "icons/scss.svg", iconWidth: 16, iconHeight: 16 },
            { name: "HTML5", icon: "icons/html.svg", iconWidth: 16, iconHeight: 16 },
            { name: "CSS3", icon: "icons/css.svg", iconWidth: 16, iconHeight: 16 },
        ],
    },
    {
        category: "Backend",
        icon: "Server",
        bgIcon: "Server",
        items: [
            { name: "Spring Boot", icon: "icons/spring.svg", iconWidth: 16, iconHeight: 16 },
            { name: "Nest.js", icon: "icons/nestjs.svg", iconWidth: 16, iconHeight: 16 },
            { name: "Express.js", icon: "icons/express.svg", iconWidth: 16, iconHeight: 16 },
        ],
    },
    {
        category: "Databases & Tools",
        icon: "Database",
        bgIcon: "Database",
        items: [
            { name: "PostgreSQL", icon: "icons/postgressql.svg", iconWidth: 16, iconHeight: 16 },
            { name: "MS SQL Server", icon: "icons/mssql.svg", iconWidth: 17, iconHeight: 17 },
            { name: "MongoDB", icon: "icons/mongodb.svg", iconWidth: 16, iconHeight: 16 },
            { name: "Redis", icon: "icons/redis.svg", iconWidth: 16, iconHeight: 16 },
            { name: "Liquibase", icon: "icons/liquibase.svg", iconWidth: 16, iconHeight: 16 },
        ],
    },
    {
        category: "Containerization",
        icon: "Box",
        bgIcon: "Box",
        items: [
            { name: "Docker", icon: "icons/docker.svg", iconWidth: 16, iconHeight: 16 },
            { name: "Kubernetes", icon: "icons/kubernetes.svg", iconWidth: 16, iconHeight: 16 },
            { name: "OpenShift", icon: "icons/redhat.svg", iconWidth: 16, iconHeight: 16 },
            { name: "Helm", icon: "icons/helm.svg", iconWidth: 16, iconHeight: 16 },
        ],
    },
    {
        category: "Infrastructure",
        icon: "Globe",
        bgIcon: "Network",
        items: [
            { name: "Istio", icon: "icons/istioio.svg", iconWidth: 16, iconHeight: 16 },
            { name: "NGINX", icon: "icons/nginx.svg", iconWidth: 18, iconHeight: 18 },
            { name: "PM2", icon: "icons/pm2.svg", iconWidth: 20, iconHeight: 20 },
            { name: "Linux", icon: "icons/linux.svg", iconWidth: 16, iconHeight: 16 },
        ],
    },
    {
        category: "CI/CD",
        icon: "Play",
        bgIcon: "Repeat",
        items: [
            { name: "GitHub Actions", icon: "icons/githubactions.svg", iconWidth: 16, iconHeight: 16 },
            { name: "Azure DevOps", icon: "icons/azuredevops.svg", iconWidth: 16, iconHeight: 16 },
            { name: "GitLab CI", icon: "icons/gitlab.svg", iconWidth: 15, iconHeight: 15 },
        ],
    },
    {
        category: "Development Tools",
        icon: "Terminal",
        bgIcon: "Terminal",
        items: [
            { name: "Git", icon: "icons/git.svg", iconWidth: 16, iconHeight: 16 },
            { name: "Postman", icon: "icons/postman.svg", iconWidth: 16, iconHeight: 16 },
            { name: "Visual Studio Code", icon: "icons/vscode.svg", iconWidth: 16, iconHeight: 16 },
            { name: "IntelliJ IDEA", icon: "icons/intellij.svg", iconWidth: 16, iconHeight: 16 },
            { name: "Docker", icon: "icons/docker.svg", iconWidth: 16, iconHeight: 16 },
            { name: "GitHub", icon: "icons/github.svg", iconWidth: 16, iconHeight: 16 },
            { name: "GitLab", icon: "icons/gitlab.svg", iconWidth: 15, iconHeight: 15 },
            { name: "DBrever", icon: "icons/dbeaver.svg", iconWidth: 16, iconHeight: 16 },
        ],
    },
];

export const experiences: Experience[] = [
    {
        company: "Advanced Info Service Public Company Limited (AIS) Outsource by Chareon Tut Company Limited",
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

export const educations: Education[] = [
    {
        degree: "Bachelor of Science in Information Technology",
        school: "Khon Kaen University",
        period: "2020 - 2024",
        gpax: "3.22 / 4.00",
        icon: "GraduationCap",
    },
];
