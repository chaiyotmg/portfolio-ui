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
    imageOrientation?: "vertical" | "horizontal";
    imageObjectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
}

export const ZoomableImage = ({ image, svg, alt, imageOrientation = "horizontal", imageObjectFit = "cover" }: ZoomableImageProps) => {
    const [isIdOpen, setIsIdOpen] = useState(false);
    const [scale, setScale] = useState(0.5);
    const [svgContent, setSvgContent] = useState<string | null>(null);
    const [isSvgLoading, setIsSvgLoading] = useState(false);
    const [mounted, setMounted] = useState(false);
    const constraintsRef = useRef<HTMLDivElement>(null);
    const svgContainerRef = useRef<HTMLDivElement>(null);
    const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
    const [touchDistance, setTouchDistance] = useState<number | null>(null);
    const [viewport, setViewport] = useState({ w: 1000, h: 1000 });

    const isSvg = !!svg;

    // Monitor viewport size
    useEffect(() => {
        if (typeof window === "undefined") return;
        const updateSize = () => setViewport({ w: window.innerWidth, h: window.innerHeight });
        updateSize();
        window.addEventListener("resize", updateSize);
        return () => window.removeEventListener("resize", updateSize);
    }, []);

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
                    
                    // Try to parse dimensions from SVG text
                    try {
                        const parser = new DOMParser();
                        const doc = parser.parseFromString(text, "image/svg+xml");
                        const svgElement = doc.querySelector('svg');
                        if (svgElement) {
                            // First priority: viewBox
                            const viewBox = svgElement.getAttribute('viewBox');
                            if (viewBox) {
                                const parts = viewBox.split(/[\s,]+/).map(Number).filter(n => !isNaN(n));
                                if (parts.length >= 4) {
                                    setImageSize({ width: Math.abs(parts[2]), height: Math.abs(parts[3]) });
                                }
                            } else {
                                // Second priority: width/height attributes
                                const w = parseFloat(svgElement.getAttribute('width') || "0");
                                const h = parseFloat(svgElement.getAttribute('height') || "0");
                                if (w > 0 && h > 0) {
                                    setImageSize({ width: w, height: h });
                                }
                            }
                        }
                    } catch (e) {
                        console.error("Error parsing SVG for size:", e);
                    }
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
        const zoomStep = 0.1 * scale;
        if (delta < 0) {
            setScale(prev => Math.min(prev + zoomStep, 5));
        } else {
            setScale(prev => Math.max(prev - zoomStep, 0.4));
        }
    };

    // Handle touch pinch to zoom
    const handleTouchStart = (e: React.TouchEvent) => {
        if (e.touches.length === 2) {
            const dist = Math.hypot(
                e.touches[0].clientX - e.touches[1].clientX,
                e.touches[0].clientY - e.touches[1].clientY
            );
            setTouchDistance(dist);
        }
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (e.touches.length === 2 && touchDistance !== null) {
            const dist = Math.hypot(
                e.touches[0].clientX - e.touches[1].clientX,
                e.touches[0].clientY - e.touches[1].clientY
            );
            
            const delta = dist - touchDistance;
            if (Math.abs(delta) > 5) {
                const zoomFactor = delta > 0 ? 1.05 : 0.95;
                setScale(prev => Math.min(Math.max(prev * zoomFactor, 0.4), 5));
                setTouchDistance(dist);
            }
        }
    };

    const handleTouchEnd = () => {
        setTouchDistance(null);
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

    const handleZoomIn = () => setScale(prev => Math.min(prev + 0.2, 5));
    const handleZoomOut = () => setScale(prev => Math.max(prev - 0.2, 0.4));
    const handleReset = () => setScale(0.5);

    const closeModal = () => {
        setIsIdOpen(false);
        setScale(0.5);
    };

    // Calculate effective content dimensions after object-contain scaling
    let initW = viewport.w;
    let initH = viewport.h;

    if (imageSize.width > 0 && imageSize.height > 0) {
        const imageRatio = imageSize.width / imageSize.height;
        const viewportRatio = viewport.w / viewport.h;

        if (imageRatio > viewportRatio) {
            // Wide image: occupies full Width, height is scaled down
            initW = viewport.w;
            initH = viewport.w / imageRatio;
        } else {
            // Tall image: occupies full Height, width is scaled down
            initH = viewport.h;
            initW = viewport.h * imageRatio;
        }
    }

    const constraintX = Math.max(0, (initW * scale - viewport.w) / 2);
    const constraintY = Math.max(0, (initH * scale - viewport.h) / 2);

    return (
        <div className="relative mb-12">
            {/* Thumbnail View (Always Image) */}
            <div
                className="relative group/thumb cursor-zoom-in"
                onClick={() => setIsIdOpen(true)}
            >
                <div className={`relative w-full ${imageOrientation === "vertical" ? "h-[500px] md:h-[800px]" : "h-[240px] md:h-[400px]"} bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-2xl shadow-slate-200/50`}>
                    <Image
                        src={image}
                        alt={alt}
                        fill
                        loading="lazy"
                        className={`w-full h-full object-${imageObjectFit} transition-transform duration-700 group-hover/thumb:scale-105`}

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
                                onTouchStart={handleTouchStart}
                                onTouchMove={handleTouchMove}
                                onTouchEnd={handleTouchEnd}
                                className="w-full h-full flex items-center justify-center relative overflow-hidden cursor-move"
                            >
                                <motion.div
                                    className="flex items-center justify-center bg-transparent p-0"
                                    style={{ scale }}
                                    drag
                                    dragConstraints={{
                                        left: -constraintX,
                                        right: constraintX,
                                        top: -constraintY,
                                        bottom: constraintY,
                                    }}
                                    dragElastic={0.2}
                                    dragMomentum={false}
                                >
                                    <div className="relative w-screen h-screen bg-transparent flex items-center justify-center">
                                        {isSvg ? (
                                            isSvgLoading ? (
                                                <div className="w-[80vw] h-[60vh] bg-slate-100/10 animate-pulse rounded-xl flex items-center justify-center">
                                                    <div className="flex flex-col items-center gap-4">
                                                        <div className="w-12 h-12 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
                                                        <span className="text-slate-400 font-mono text-xs animate-pulse">LOADING ARCHITECTURE ...</span>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div
                                                    ref={svgContainerRef}
                                                    className="w-full h-full flex items-center justify-center [&_svg]:w-full [&_svg]:h-full [&_svg]:block [&_svg]:max-w-full [&_svg]:max-h-full"
                                                    dangerouslySetInnerHTML={{ __html: svgContent || "" }}
                                                />
                                            )
                                        ) : (
                                            <Image
                                                src={image}
                                                alt={alt}
                                                fill
                                                loading="eager"
                                                showLoader={true}
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
                                        )}
                                    </div>
                                </motion.div>
                            </div>

                            {/* Controls Toolbar */}
                            <div className="absolute bottom-10 flex flex-col items-center gap-6 z-[110] select-none">
                                <div className="flex bg-white px-2 py-2 rounded-3xl border border-slate-200 shadow-[0_10px_40px_rgba(0,0,0,0.3)] gap-2">
                                    <button
                                        onClick={handleZoomOut}
                                        className="p-3 hover:bg-slate-100 rounded-2xl transition-colors text-slate-800 disabled:opacity-30"
                                        disabled={scale <= 0.4}
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
                                        disabled={scale >= 5}
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
                                        Scroll / Pinch to Zoom
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
