"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/organisms/Navbar";
import { Hero } from "@/components/organisms/Hero";
import { Skills } from "@/components/organisms/Skills";
import { Experience } from "@/components/organisms/Experience";
import { Projects } from "@/components/organisms/Projects";
import { profile, skills, experiences, projects } from "@/data/portfolioData";
import { Contact } from "@/components/organisms/Contact";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      <Navbar />

      <main className="pt-20">
        <Hero
          name={profile.name}
          nickname={profile.nickname}
          role={profile.role}
          bio={profile.bio}
          github={profile.contact.github}
          linkedin={profile.contact.linkedin}
          email={profile.contact.email}
        />

        <Skills skills={skills} />

        <Experience experiences={experiences} />

        <Projects projects={projects} />

        <Contact contact={profile.contact} />
      </main>

      <footer className="py-12 text-center text-slate-400 text-sm border-t border-slate-100 bg-white">
        <p>Copyright © {new Date().getFullYear()}. Designed and Developed by {profile.name}.</p>
      </footer>
    </div>
  );
}
