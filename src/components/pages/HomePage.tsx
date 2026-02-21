"use client";

import { PortfolioTemplate } from "@/components/templates/PortfolioTemplate";
import { Navbar } from "@/components/organisms/Navbar";
import { About } from "@/components/organisms/About";
import { Skills } from "@/components/organisms/Skills";
import { Experience } from "@/components/organisms/Experience";
import { Education } from "@/components/organisms/Education";
import { Projects } from "@/components/organisms/Projects";
import { Contact } from "@/components/organisms/Contact";
import { profile, skills, experiences, projects, educations } from "@/data/portfolioData";

export const HomePage = () => {
    return (
        <PortfolioTemplate
            navbar={<Navbar />}
            footer={
                <footer className="py-12 text-center text-slate-400 text-sm border-t border-slate-100 bg-transparent">
                    <p>Copyright © {new Date().getFullYear()}. Designed and Developed by {profile.name}.</p>
                </footer>
            }
        >
            <About
                name={profile.name}
                nickname={profile.nickname}
                role={profile.role}
                bio={profile.bio}
                github={profile.contact.github}
                linkedin={profile.contact.linkedin}
                email={profile.contact.email}
                resume={profile.contact.resume}
            />
            <Skills skills={skills} />
            <Experience experiences={experiences} />
            <Education educations={educations} />
            <Projects projects={projects} />
            <Contact contact={profile.contact} />
        </PortfolioTemplate>
    );
};
