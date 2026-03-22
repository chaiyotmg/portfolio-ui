"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { TransformWrapper, TransformComponent, useControls, useTransformComponent } from "react-zoom-pan-pinch";
import { Icon } from "@/components/atoms/Icon";
import { Image } from "@/components/atoms/Image";

interface ZoomableImageProps {
    image: string;
    svg?: string;
    alt: string;
    imageOrientation?: "vertical" | "horizontal";
    imageObjectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
}

const ZoomControls = ({ fitScale }: { fitScale: number }) => {
    const { zoomIn, zoomOut, resetTransform, centerView } = useControls();
    const scale = useTransformComponent(({ state }) => state.scale);

    return (
        <div className="absolute bottom-10 flex items-center justify-center z-[110] select-none gap-3 bg-white/10 backdrop-blur-md p-2 rounded-full border border-white/20 shadow-2xl">
            <button
                onClick={() => zoomOut()}
                className="w-10 h-10 rounded-full bg-white hover:bg-slate-50 border border-slate-200 shadow-lg flex items-center justify-center transition-all text-slate-800 disabled:opacity-30 active:scale-95"
                disabled={scale <= fitScale + 0.01}
                title="Zoom Out"
            >
                <Icon icon="Minus" size={18} />
            </button>

            <button
                onClick={() => zoomIn()}
                className="w-10 h-10 rounded-full bg-white hover:bg-slate-50 border border-slate-200 shadow-lg flex items-center justify-center transition-all text-slate-800 disabled:opacity-30 active:scale-95"
                disabled={scale >= 8}
                title="Zoom In"
            >
                <Icon icon="Plus" size={18} />
            </button>

            <div className="w-px h-6 bg-white/20 mx-1" />

            <button
                onClick={() => centerView()}
                className="w-10 h-10 rounded-full bg-white hover:bg-slate-50 border border-slate-200 shadow-lg flex items-center justify-center transition-all text-slate-800 active:scale-95"
                title="Center View"
            >
                <Icon icon="Focus" size={18} />
            </button>

            <button
                onClick={() => {
                   resetTransform(0);
                   centerView(0, 10)
                }}
                className="w-10 h-10 rounded-full bg-white hover:bg-slate-50 border border-slate-200 shadow-lg flex items-center justify-center transition-all text-slate-800 active:scale-95"
                title="Reset"
            >
                <Icon icon="RotateCcw" size={18} />
            </button>
        </div>
    );
};

export const ZoomableImage = ({ image, svg, alt, imageOrientation = "horizontal", imageObjectFit = "cover" }: ZoomableImageProps) => {
    const [isIdOpen, setIsIdOpen] = useState(false);
    const [svgContent, setSvgContent] = useState<string | null>(null);
    const [isSvgLoading, setIsSvgLoading] = useState(false);
    const [mounted, setMounted] = useState(false);
    const svgContainerRef = useRef<HTMLDivElement>(null);
    const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
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

    // Calculate the fit scale based on requirements
    const getFitScale = () => {
        if (imageSize.width === 0 || imageSize.height === 0) return 1;

        // Requirement: If image is smaller than viewport, use original size (scale 1)
        if (imageSize.width <= viewport.w && imageSize.height <= viewport.h) {
            return 1;
        }

        // Requirement: If image is larger than viewport, fit it (either width or height)
        const scaleW = viewport.w / imageSize.width;
        const scaleH = viewport.h / imageSize.height;

        // min of the two ensures it fits entirely within the screen
        return Math.min(scaleW, scaleH);
    };

    const fitScale = getFitScale();

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

    // Body scroll locking
    useEffect(() => {
        if (isIdOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isIdOpen]);

    const closeModal = () => {
        setIsIdOpen(false);
    };

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
                            className="fixed inset-0 z-[99999] bg-black/40 flex flex-col items-center justify-center p-0"
                        >
                            <TransformWrapper
                                key={`zoom-${fitScale}`}
                                initialScale={fitScale}
                                minScale={fitScale}
                                maxScale={8}
                                centerOnInit={true}
                                centerZoomedOut={true}
                                wheel={{ step: 0.1 }}
                            >
                                <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden">
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
                                    <div className="w-full h-full flex items-center justify-center relative overflow-hidden cursor-move">
                                        <TransformComponent
                                            wrapperStyle={{
                                                width: "100%",
                                                height: "100%",
                                            }}
                                            contentStyle={{
                                                minWidth: "100%",
                                                minHeight: "100%",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center"
                                            }}
                                        >
                                            <div className="relative flex items-center justify-center min-w-full min-h-screen">
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
                                                            style={{
                                                                width: imageSize.width > 0 ? imageSize.width : "100%",
                                                                height: imageSize.height > 0 ? imageSize.height : "auto",
                                                                display: "flex",
                                                                alignItems: "center",
                                                                justifyContent: "center",
                                                                pointerEvents: "none"
                                                            }}
                                                            className="[&_svg]:w-full [&_svg]:h-full [&_svg]:block [&_svg]:pointer-events-none"
                                                            dangerouslySetInnerHTML={{ __html: svgContent || "" }}
                                                        />
                                                    )
                                                ) : (
                                                    <div className="relative flex items-center justify-center">
                                                        <Image
                                                            src={image}
                                                            alt={alt}
                                                            width={imageSize.width || 1920}
                                                            height={imageSize.height || 1080}
                                                            loading="eager"
                                                            showLoader={true}
                                                            onLoad={(e) => {
                                                                const img = e.currentTarget;
                                                                setImageSize({ width: img.naturalWidth, height: img.naturalHeight });
                                                            }}
                                                            className="select-none"
                                                            style={{
                                                                width: imageSize.width > 0 ? imageSize.width : "auto",
                                                                height: imageSize.height > 0 ? imageSize.height : "auto",
                                                                display: "block",
                                                                imageRendering: "-webkit-optimize-contrast",
                                                                WebkitBackfaceVisibility: "hidden"
                                                            } as React.CSSProperties}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </TransformComponent>
                                    </div>

                                    {/* Controls Toolbar (Isolated for Reactivity) */}
                                    <ZoomControls fitScale={fitScale} />
                                </div>
                            </TransformWrapper>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </div>
    );
};
