import { Profile, Skill, Experience, Project, Education } from "@/domain/entities";


export const projects: Project[] = [
    {
        title: "Portfolio UI",
        description: "A portfolio website showcasing my personal projects and professional achievements.",
        fullDescription: "A portfolio website showcasing my personal projects and professional achievements, capturing my evolution from university student to software developer.",
        image: "https://objectstorage.ap-singapore-1.oraclecloud.com/n/axkttai9whfx/b/bucket-portfolio-ui/o/projects/portfolio-ui-bg.png",
        link: "/projects/portfolio-ui",
        github: "https://github.com/chaiyotmg/portfolio-ui",
        tags: [
            { name: "Next.js", icon: "/icons/nextjs.svg", iconWidth: 14, iconHeight: 14 },
            { name: "TypeScript", icon: "/icons/typescript.svg", iconWidth: 14, iconHeight: 14 },
            { name: "React.js", icon: "/icons/react.svg", iconWidth: 14, iconHeight: 14 },
            { name: "TailwindCSS", icon: "/icons/tailwindcss.svg", iconWidth: 14, iconHeight: 14 },
            { name: "Bun.js", icon: "/icons/bun.svg", iconWidth: 14, iconHeight: 14 },

        ],
        caseStudy: {
            architecture: "GitLab CI/CD & Deployed on OCI Kubernetes Engine.",
            techStack: [
                { name: "Next.js", icon: "/icons/nextjs.svg" },
                { name: "TypeScript", icon: "/icons/typescript.svg" },
                { name: "TailwindCSS", icon: "/icons/tailwindcss.svg" },
                { name: "Bun.js", icon: "/icons/bun.svg" },
                { name: "OpenTelemetry", icon: "/icons/open-telemetry.svg" },
            ],
            features: [
                "Animations with Framer Motion",
                "Responsive Design",
                "CI/CD Integrated",
                "SSR"
            ],
        },
    },
    {
        title: "OCI Kubernetes Engine (OKE)",
        description: "A OCI Kubernetes Engine (OKE) cluster for production applications and technical labs.",
        fullDescription: "An OCI Kubernetes Engine (OKE) cluster used for deploying personal applications and running lab environments to explore emerging technologies and enhance my DevOps and cloud engineering skill set.",
        image: "https://objectstorage.ap-singapore-1.oraclecloud.com/n/axkttai9whfx/b/bucket-portfolio-ui/o/projects/OCI-Architecture-Diagram.png",
        svg:"https://objectstorage.ap-singapore-1.oraclecloud.com/n/axkttai9whfx/b/bucket-portfolio-ui/o/projects%2FOCI-Architecture-Diagram.svg",
        link: "/projects/oci-kubernetes-engine",
        github: "",
        tags: [
            { name: "Kubernetes", icon: "/icons/kubernetes.svg", iconWidth: 14, iconHeight: 14 },
            { name: "Helm", icon: "/icons/helm.svg", iconWidth: 14, iconHeight: 14 },
            { name: "Oracle Cloud", icon: "Cloud", iconWidth: 14, iconHeight: 14 },
            { name: "NGINX", icon: "/icons/nginx.svg", iconWidth: 14, iconHeight: 14 },
        ],
        caseStudy: {
            techStack: [
            { name: "Kubernetes", icon: "/icons/kubernetes.svg" },
            { name: "Helm", icon: "/icons/helm.svg" },
            { name: "Oracle Cloud", icon: "Cloud" },
            { name: "NGINX", icon: "/icons/nginx.svg" },
            { name: "Redis Sentinel", icon: "/icons/redis.svg"},
            { name: "PostgreSQL Cluster", icon: "/icons/postgresql.svg"},
            { name: "Grafana", icon: "/icons/grafana.svg" },  
            { name: "Grafana Alloy", icon: "/icons/grafana-alloy.svg" },  
            { name: "Grafana Loki", icon: "/icons/grafana-loki.svg" },  
            { name: "Grafana Tempo", icon: "/icons/grafana-tempo.svg" },  
            { name: "Victoria Metrics", icon: "/icons/victoriametrics.svg" },
            { name: "Node Exporter", icon: "/icons/prometheus.svg" },
            { name: "OCI Vault", icon: "/icons/oci-vault.svg" },  
            { name: "OCI Object Storage", icon: "/icons/oci-object-storage.svg" },
            { name: "OCI Block Volume", icon: "/icons/oci-block-volume.svg" },
            ],
            features: [
                "Automated CI/CD with GitLab",
                "High Availability PostgreSQL Cluster",
                "High Availability Redis Sentinel",
                "High Availability Applications",
                "Monitoring & Logging Stack",
                "Automated SSL/TLS Certificates",
                "Load Balancing"
            ],
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
        email: "chaiyot.mg@gmail.com",
        linkedin: "https://www.linkedin.com/in/chaiyot-mali-ngam",
        github: "https://github.com/chaiyotmg",
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
            { name: "Java", icon: "/icons/java.svg", iconWidth: 16, iconHeight: 16 },
            { name: "TypeScript", icon: "/icons/typescript.svg", iconWidth: 15, iconHeight: 15 },
            { name: "JavaScript", icon: "/icons/javascript.svg", iconWidth: 15, iconHeight: 15 },
            { name: "Golang", icon: "/icons/go.svg", iconWidth: 16, iconHeight: 16 },
        ],
    },
    {
        category: "Frontend",
        icon: "Monitor",
        bgIcon: "Monitor",
        items: [
            { name: "React.js", icon: "/icons/react.svg", iconWidth: 16, iconHeight: 16 },
            { name: "Vue.js", icon: "/icons/vuejs.svg", iconWidth: 16, iconHeight: 16 },
            { name: "TailwindCSS", icon: "/icons/tailwindcss.svg", iconWidth: 16, iconHeight: 16 },
            { name: "SCSS", icon: "/icons/scss.svg", iconWidth: 16, iconHeight: 16 },
            { name: "HTML5", icon: "/icons/html.svg", iconWidth: 16, iconHeight: 16 },
            { name: "CSS3", icon: "/icons/css.svg", iconWidth: 16, iconHeight: 16 },
        ],
    },
    {
        category: "Backend",
        icon: "Server",
        bgIcon: "Server",
        items: [
            { name: "Spring Boot", icon: "/icons/spring.svg", iconWidth: 16, iconHeight: 16 },
            { name: "Nest.js", icon: "/icons/nestjs.svg", iconWidth: 16, iconHeight: 16 },
            { name: "Express.js", icon: "/icons/express.svg", iconWidth: 16, iconHeight: 16 },
        ],
    },
    {
        category: "Package Managers",
        icon: "Package",
        bgIcon: "Package",
        items: [
            { name: "NPM", icon: "/icons/npm.svg", iconWidth: 20, iconHeight: 20 },
            { name: "Apache Maven", icon: "/icons/apache-maven.svg", iconWidth: 20, iconHeight: 20 },
        ],
    },
    {
        category: "Databases & Tools",
        icon: "Database",
        bgIcon: "Database",
        items: [
            { name: "PostgreSQL", icon: "/icons/postgresql.svg", iconWidth: 16, iconHeight: 16 },
            { name: "MS SQL Server", icon: "/icons/mssql.svg", iconWidth: 17, iconHeight: 17 },
            { name: "MongoDB", icon: "/icons/mongodb.svg", iconWidth: 16, iconHeight: 16 },
            { name: "Redis", icon: "/icons/redis.svg", iconWidth: 16, iconHeight: 16 },
            { name: "Liquibase", icon: "/icons/liquibase.svg", iconWidth: 16, iconHeight: 16 },
        ],
    },
    {
        category: "Containerization & Tools",
        icon: "Box",
        bgIcon: "Box",
        items: [
            { name: "Docker", icon: "/icons/docker.svg", iconWidth: 16, iconHeight: 16 },
            { name: "Kubernetes", icon: "/icons/kubernetes.svg", iconWidth: 16, iconHeight: 16 },
            { name: "OpenShift", icon: "/icons/redhat.svg", iconWidth: 16, iconHeight: 16 },
            { name: "Helm", icon: "/icons/helm.svg", iconWidth: 16, iconHeight: 16 },
        ],
    },
    {
        category: "Infrastructure",
        icon: "Globe",
        bgIcon: "Network",
        items: [
            { name: "Istio", icon: "/icons/istioio.svg", iconWidth: 16, iconHeight: 16 },
            { name: "NGINX", icon: "/icons/nginx.svg", iconWidth: 18, iconHeight: 18 },
            { name: "PM2", icon: "/icons/pm2.svg", iconWidth: 20, iconHeight: 20 },
            { name: "Linux", icon: "/icons/linux.svg", iconWidth: 16, iconHeight: 16 },
        ],
    },
    {
        category: "CI/CD",
        icon: "Play",
        bgIcon: "Repeat",
        items: [
            { name: "GitHub Actions", icon: "/icons/githubactions.svg", iconWidth: 16, iconHeight: 16 },
            { name: "Azure DevOps", icon: "/icons/azuredevops.svg", iconWidth: 16, iconHeight: 16 },
            { name: "GitLab CI/CD", icon: "/icons/gitlab.svg", iconWidth: 15, iconHeight: 15 },
        ],
    },
    {
        category: "Development Tools",
        icon: "Terminal",
        bgIcon: "Terminal",
        items: [
            { name: "Git", icon: "/icons/git.svg", iconWidth: 16, iconHeight: 16 },
            { name: "Postman", icon: "/icons/postman.svg", iconWidth: 16, iconHeight: 16 },
            { name: "Visual Studio Code", icon: "/icons/vscode.svg", iconWidth: 16, iconHeight: 16 },
            { name: "Google Antigravity", icon: "/icons/google-antigravity.svg", iconWidth: 16, iconHeight: 16 },
            { name: "IntelliJ IDEA", icon: "/icons/intellij.svg", iconWidth: 16, iconHeight: 16 },
            { name: "Docker", icon: "/icons/docker.svg", iconWidth: 16, iconHeight: 16 },
            { name: "GitHub", icon: "/icons/github.svg", iconWidth: 16, iconHeight: 16 },
            { name: "GitLab", icon: "/icons/gitlab.svg", iconWidth: 15, iconHeight: 15 },
            { name: "DBeaver", icon: "/icons/dbeaver.svg", iconWidth: 16, iconHeight: 16 },
            { name: "Bash", icon: "/icons/bash.svg", iconWidth: 16, iconHeight: 16 },
            { name: "Vim", icon: "/icons/vim.svg", iconWidth: 16, iconHeight: 16 },
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
            "Developed Spring Boot REST APIs and a dynamic search engine that converts custom formats into SQL statements.",
            "Designed resource configurations to dynamically control business logic and SQL execution for core services.",
            "Enhanced search functionality and query logic for the Journey Log Service.",
            "Optimized SQL Server performance through execution plan analysis and index management.",
            "Configured Istio routes for service visibility and managed OpenShift deployments.",
            "Automated Redis configuration reloads using custom pipelines and OpenShift commands.",
            "Managed end-to-end release cycles: artifact building, versioning, and environment specific tagging.",
        ],
    },
    {
        company: "Sirisoft Public Company Limited",
        position: "Software Developer",
        period: "May - Sep 2024",
        description: [
            "Refactored Spring Boot batch jobs from large transactions to row-by-row updates, eliminating deadlocks and lock contention.",
            "Built and maintained Azure DevOps CI/CD pipelines for Spring Boot (on Tomcat) and .NET (on IIS) applications.",
            "Designed automated PM2-based deployments for Node.js services with permanent startup configuration on server reboot.",
            "Developed CI/CD pipeline solutions for PHP applications deployed to IIS using FastCGI.",
        ],
    },
    {
        company: "Primo World Company Limited",
        position: "Software Developer (Cooperative Education)",
        period: "Dec 2023 - April 2024",
        description: [
            "Developed a TypeScript-based Config Generator Library to automate application configurations for new deployments.",
            "Built Azure DevOps CI pipelines for automated Docker image building and storage in AWS ECR.",
            "Customized and developed modern Enterprise Loyalty Platform UIs using Vue.js, SCSS, and TailwindCSS.",
        ],
    },
    {
        company: "TMBThanachart Bank Public Company Limited",
        position: "Software Engineer (Internship)",
        period: "June - Sep 2023",
        description: [
            "Implemented a Proof of Concept (POC) for Liquibase database version control using Docker, Shell scripts, and MongoDB.",
            "Developed a Release Dashboard with authentication and user role assignment using React.js, Spring Boot, and PostgreSQL.",
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
