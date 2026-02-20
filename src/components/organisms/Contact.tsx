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
        <section id="contact" className="relative py-24 px-6 overflow-hidden">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">Let&apos;s Connect</h2>
                    <div className="flex justify-center mb-8">
                        <div className="h-1.5 w-24 rounded-full bg-gradient-to-r from-blue-500 to-emerald-500" />
                    </div>
                    <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
                        Ready to discuss platform engineering solutions? I&apos;d love to hear about your infrastructure challenges and explore how we can build something scalable together.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
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
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
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
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
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
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
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
        </section>
    );
};
