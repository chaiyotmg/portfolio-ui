"use client";

import { motion } from "framer-motion";
import { ContactCard } from "@/components/molecules/ContactCard";
import { Profile } from "@/domain/entities";
import toast from "react-hot-toast";
import { Icon } from "@/components/atoms/Icon";


interface ContactProps {
    contact: Profile["contact"];
}


export const Contact = ({ contact }: ContactProps) => {
    return (
        <section id="contact" className="py-24 px-6 bg-transparent overflow-hidden">
            <div className="max-w-4xl mx-auto">
                {/* Contact Terminal Window */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="bg-white/40 backdrop-blur-md border border-slate-200/60 rounded-[2rem] shadow-2xl shadow-slate-200/50 overflow-hidden"
                >
                    {/* Terminal Top Bar */}
                    <div className="bg-white/80 border-b border-slate-200/60 px-8 py-5 flex items-center justify-between">
                        <div className="flex gap-2">
                            <div className="w-3.5 h-3.5 rounded-full bg-red-400/80 shadow-sm" />
                            <div className="w-3.5 h-3.5 rounded-full bg-yellow-400/80 shadow-sm" />
                            <div className="w-3.5 h-3.5 rounded-full bg-green-400/80 shadow-sm" />
                        </div>
                        <div className="flex items-center gap-2 text-slate-400 font-mono text-xs font-bold">
                            <Icon icon="Folder" size={14} className="text-emerald-500/60" />
                            ~/portfolio/contact
                        </div>
                    </div>

                    {/* Terminal Content */}
                    <div className="p-8 md:p-12">
                        {/* Section Header (Technical Style) */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="mb-12"
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-emerald-500 font-mono font-bold">$</span>
                                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
                                    Let&apos;s <span className="text-emerald-500 text-3xl md:text-4xl">Connect</span>
                                </h2>
                            </div>
                            <p className="text-slate-500 text-sm md:text-base font-mono leading-relaxed max-w-2xl border-l-2 border-emerald-500/20 pl-4 py-1">
                                I am always open to establishing new connections. If you are interested in hiring me, please feel free to download my resume and contact me.
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                viewport={{ once: true }}
                            >
                                <ContactCard
                                    icon="Mail"
                                    label="Email"
                                    value={contact.email}
                                    onClick={() => {
                                        navigator.clipboard.writeText(contact.email);
                                        toast.success((t) => (
                                            <div className="flex items-center gap-2">
                                                <span>Email copied to clipboard!</span>
                                                <button
                                                    onClick={() => toast.dismiss(t.id)}
                                                    className="p-1 hover:bg-emerald-50 rounded-full transition-colors cursor-pointer"
                                                >
                                                    <Icon icon="X" size={14} />
                                                </button>
                                            </div>
                                        ));
                                    }}
                                />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                viewport={{ once: true }}
                            >
                                <ContactCard
                                    icon="MapPin"
                                    label="Location"
                                    value={contact.location || "Bangkok, Thailand"}
                                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.location || "Bangkok, Thailand")}`}
                                />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                                viewport={{ once: true }}
                            >
                                <ContactCard
                                    icon="Linkedin"
                                    label="LinkedIn"
                                    value="Connect with me"
                                    href={contact.linkedin}
                                />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.6 }}
                                viewport={{ once: true }}
                            >
                                <ContactCard
                                    icon="Github"
                                    label="GitHub"
                                    value="chaiyotmg"
                                    href={contact.github}
                                />
                            </motion.div>
                        </div>
                    </div>

                    {/* Terminal Footer */}
                    <div className="bg-white/80 border-t border-slate-200/60 px-8 py-5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1.5 text-slate-400 font-mono text-xs">
                                <span className="text-emerald-500 font-bold">chaiyot@linux</span>
                                <span className="text-slate-400">:</span>
                                <span className="text-emerald-400">~/contact</span>
                                <span className="text-slate-400">$</span>
                                <span className="text-slate-600 ml-1">ssh chaiyot.mg@gmail.com</span>
                            </div>
                            <motion.div
                                animate={{ opacity: [1, 0] }}
                                transition={{ duration: 0.8, repeat: Infinity }}
                                className="w-1.5 h-4 bg-emerald-500 rounded-full"
                            />
                        </div>
                        <div className="hidden md:flex items-center gap-4 text-slate-300 font-mono text-[10px]">
                            <span>STATUS: LIVE</span>
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
