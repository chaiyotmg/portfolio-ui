"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@/components/atoms/Icon";
import { Image } from "@/components/atoms/Image";

interface ZoomableImageProps {
    image: string;
    svg?: string;
    alt: string;
}

export const ZoomableImage = ({ image, svg, alt }: ZoomableImageProps) => {
    const [isIdOpen, setIsIdOpen] = useState(false);
    const [scale, setScale] = useState(0.5);
    const [svgContent, setSvgContent] = useState<string | null>(null);
    const [isSvgLoading, setIsSvgLoading] = useState(false);
    const [mounted, setMounted] = useState(false);
    const constraintsRef = useRef<HTMLDivElement>(null);
    const svgContainerRef = useRef<HTMLDivElement>(null);
    const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

    const isSvg = !!svg;

    useEffect(() => {
        setMounted(true);
    }, []);

    // Fetch SVG content when needed
    useEffect(() => {
        if (isIdOpen && svg && !svgContent) {
            setIsSvgLoading(true);
            fetch(svg)
                .then(res => res.text())
                .then(text => {
                    setSvgContent(text);
                    setIsSvgLoading(false);
                })
                .catch(err => {
                    console.error("Failed to load SVG:", err);
                    setIsSvgLoading(false);
                });
        }
    }, [isIdOpen, svg, svgContent]);

    // Handle scroll to zoom
    const handleWheel = (e: React.WheelEvent) => {
        if (!isIdOpen) return;
        const delta = e.deltaY;
        const zoomStep = 0.1 * scale; // Exponential zoom for better feel
        if (delta < 0) {
            setScale(prev => Math.min(prev + zoomStep, 2));
        } else {
            setScale(prev => Math.max(prev - zoomStep, 0.5));
        }
    };

    // Body scroll locking
    useEffect(() => {
        if (isIdOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isIdOpen]);

    const handleZoomIn = () => setScale(prev => Math.min(prev + 0.1, 2));
    const handleZoomOut = () => setScale(prev => Math.max(prev - 0.1, 0.5));
    const handleReset = () => setScale(0.5);

    const closeModal = () => {
        setIsIdOpen(false);
        setScale(0.5);
    };

    return (
        <div className="relative mb-12">
            {/* Thumbnail View (Always Image) */}
            <div
                className="relative group/thumb cursor-zoom-in"
                onClick={() => setIsIdOpen(true)}
            >
                <div className="relative w-full h-[240px] md:h-[400px] bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-2xl shadow-slate-200/50">
                    <Image
                        src={image}
                        alt={alt}
                        fill
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover/thumb:scale-105"

                    />

                    <div className="absolute inset-0 bg-slate-900/0 group-hover/thumb:bg-slate-900/10 transition-colors duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover/thumb:opacity-100 transform translate-y-4 group-hover/thumb:translate-y-0 transition-all duration-300 bg-white/90 backdrop-blur-md px-6 py-3 rounded-full flex items-center gap-2 shadow-xl border border-slate-100">
                            <Icon icon="Maximize" size={18} className="text-emerald-500" />
                            <span className="text-sm font-bold text-slate-800 tracking-tight">
                                View Fullscreen
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal View rendered via Portal to escape stacking context */}
            {mounted && typeof document !== "undefined" && createPortal(
                <AnimatePresence>
                    {isIdOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onWheel={handleWheel}
                            className="fixed inset-0 z-[99999] bg-black/40 flex flex-col items-center justify-center p-0"
                        >
                            {/* Modal Header */}
                            <div className="absolute top-0 left-0 right-0 p-6 md:p-10 flex items-center justify-end z-[110]">
                                <button
                                    onClick={closeModal}
                                    className="cursor-pointer w-12 h-12 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-all hover:rotate-90 border border-white/20 shadow-xl backdrop-blur-md"
                                >
                                    <Icon icon="X" size={24} />
                                </button>
                            </div>

                            {/* Interactive Area */}
                            <div
                                ref={constraintsRef}
                                className="w-full h-full flex items-center justify-center relative overflow-hidden cursor-move"
                            >
                                <motion.div
                                    className="flex items-center justify-center bg-transparent p-0"
                                    style={{ scale }}
                                    drag
                                    dragConstraints={{
                                        left: -Math.max(0, ((imageSize.width > 0 ? Math.min(window.innerWidth, imageSize.width * (window.innerHeight / imageSize.height)) : (typeof window !== 'undefined' ? window.innerWidth : 1000)) * scale) / 2),
                                        right: Math.max(0, ((imageSize.width > 0 ? Math.min(window.innerWidth, imageSize.width * (window.innerHeight / imageSize.height)) : (typeof window !== 'undefined' ? window.innerWidth : 1000)) * scale) / 2),
                                        top: -Math.max(0, ((imageSize.height > 0 ? Math.min(window.innerHeight, imageSize.height * (window.innerWidth / imageSize.width)) : (typeof window !== 'undefined' ? window.innerHeight : 1000)) * scale) / 2),
                                        bottom: Math.max(0, ((imageSize.height > 0 ? Math.min(window.innerHeight, imageSize.height * (window.innerWidth / imageSize.width)) : (typeof window !== 'undefined' ? window.innerHeight : 1000)) * scale) / 2),
                                    }}
                                    dragElastic={0}
                                    dragMomentum={false}
                                >
                                    {isSvg ? (
                                        isSvgLoading ? (
                                            <div className="w-[80vw] h-[60vh] bg-slate-100 animate-pulse rounded-xl flex items-center justify-center">
                                                <div className="flex flex-col items-center gap-4">
                                                    <div className="w-12 h-12 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
                                                    <span className="text-slate-400 font-mono text-xs animate-pulse">LOADING ...</span>
                                                </div>
                                            </div>
                                        ) : (
                                            <div
                                                ref={svgContainerRef}
                                                className="w-full h-full flex items-center justify-center"
                                                dangerouslySetInnerHTML={{ __html: svgContent || "" }}
                                            />
                                        )
                                    ) : (
                                        <div className="relative w-screen h-screen bg-transparent">
                                            <Image
                                                src={image}
                                                alt={alt}
                                                fill
                                                loading="lazy"
                                                onLoad={(e) => {
                                                    const img = e.currentTarget;
                                                    setImageSize({ width: img.naturalWidth, height: img.naturalHeight });
                                                }}
                                                className="w-full h-full object-contain pointer-events-none select-none"
                                                style={{
                                                    imageRendering: "-webkit-optimize-contrast",
                                                    WebkitBackfaceVisibility: "hidden"
                                                } as React.CSSProperties}
                                                sizes="100vw"
                                            />
                                        </div>
                                    )}
                                </motion.div>
                            </div>

                            {/* Controls Toolbar */}
                            <div className="absolute bottom-10 flex flex-col items-center gap-6 z-[110] select-none">
                                <div className="flex bg-white px-2 py-2 rounded-3xl border border-slate-200 shadow-[0_10px_40px_rgba(0,0,0,0.3)] gap-2">
                                    <button
                                        onClick={handleZoomOut}
                                        className="p-3 hover:bg-slate-100 rounded-2xl transition-colors text-slate-800 disabled:opacity-30"
                                        disabled={scale <= 0.5}
                                        title="Zoom Out"
                                    >
                                        <Icon icon="Minus" size={20} />
                                    </button>
                                    <button
                                        onClick={handleReset}
                                        className="px-6 hover:bg-slate-100 rounded-2xl transition-colors text-slate-900 text-sm font-bold font-mono min-w-[100px]"
                                        title="Reset Zoom"
                                    >
                                        {Math.round(scale * 100)}%
                                    </button>
                                    <button
                                        onClick={handleZoomIn}
                                        className="p-3 hover:bg-slate-100 rounded-2xl transition-colors text-slate-800 disabled:opacity-30"
                                        disabled={scale >= 2}
                                        title="Zoom In"
                                    >
                                        <Icon icon="Plus" size={20} />
                                    </button>
                                </div>

                                {/* Interaction Tips */}
                                <div className="flex flex-wrap justify-center items-center gap-6 text-white/70 font-mono text-[9px] uppercase tracking-[0.25em] bg-black/40 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 select-none">
                                    <div className="flex items-center gap-2">
                                        <Icon icon="MousePointer2" size={10} className="text-emerald-400" />
                                        Drag to Pan
                                    </div>
                                    <div className="w-1 h-1 rounded-full bg-white/20" />
                                    <div className="flex items-center gap-2">
                                        <Icon icon="Mouse" size={10} className="text-emerald-400" />
                                        Scroll to Zoom
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </div>
    );
};
