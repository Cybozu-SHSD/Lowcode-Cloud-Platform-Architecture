import { ReactNode, useRef, useEffect, useState, useCallback } from "react";
import panzoom, { PanZoom } from "panzoom";
import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MermaidDiagramContainerProps {
  children: ReactNode;
  title?: string;
  legend?: ReactNode;
  minHeight?: string;
  enableZoom?: boolean;
}

export function MermaidDiagramContainer({
  children,
  title,
  legend,
  minHeight = "400px",
  enableZoom = true,
}: MermaidDiagramContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const panzoomRef = useRef<PanZoom | null>(null);
  const [zoomLevel, setZoomLevel] = useState(100);

  useEffect(() => {
    if (!enableZoom || !containerRef.current) return;

    // Wait for SVG to render
    const timer = setTimeout(() => {
      const svgElement = containerRef.current?.querySelector("svg");
      if (!svgElement) return;

      panzoomRef.current = panzoom(svgElement, {
        maxZoom: 3,
        minZoom: 0.3,
        initialZoom: 1,
        bounds: true,
        boundsPadding: 0.1,
        smoothScroll: false,
      });

      panzoomRef.current.on("zoom", (e: PanZoom) => {
        setZoomLevel(Math.round(e.getTransform().scale * 100));
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      panzoomRef.current?.dispose();
    };
  }, [enableZoom, children]);

  const handleZoomIn = useCallback(() => {
    if (!panzoomRef.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const { scale } = panzoomRef.current.getTransform();
    panzoomRef.current.smoothZoomAbs(centerX, centerY, scale * 1.3);
  }, []);

  const handleZoomOut = useCallback(() => {
    if (!panzoomRef.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const { scale } = panzoomRef.current.getTransform();
    panzoomRef.current.smoothZoomAbs(centerX, centerY, scale * 0.7);
  }, []);

  const handleReset = useCallback(() => {
    if (!panzoomRef.current || !containerRef.current) return;
    const svgElement = containerRef.current.querySelector("svg");
    if (svgElement) {
      panzoomRef.current.dispose();
      svgElement.style.transform = "";
      panzoomRef.current = panzoom(svgElement, {
        maxZoom: 3,
        minZoom: 0.3,
        initialZoom: 1,
        bounds: true,
        boundsPadding: 0.1,
        smoothScroll: false,
      });
      panzoomRef.current.on("zoom", (e: PanZoom) => {
        setZoomLevel(Math.round(e.getTransform().scale * 100));
      });
    }
    setZoomLevel(100);
  }, []);

  return (
    <div className="space-y-4">
      {title && (
        <div className="text-center">
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        </div>
      )}

      <div className="relative">
        {enableZoom && (
          <div className="absolute top-2 right-2 z-10 flex items-center gap-1 bg-background/80 backdrop-blur-sm rounded-lg p-1 border border-border">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={handleZoomOut}
              title="缩小"
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-xs text-muted-foreground min-w-[40px] text-center">
              {zoomLevel}%
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={handleZoomIn}
              title="放大"
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={handleReset}
              title="重置"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        )}
        <div
          ref={containerRef}
          className="bg-card rounded-xl p-6 border border-border overflow-hidden cursor-grab active:cursor-grabbing"
          style={{ minHeight }}
        >
          {children}
        </div>
      </div>

      {legend && (
        <div className="flex flex-wrap justify-center gap-6 text-xs text-muted-foreground">
          {legend}
        </div>
      )}
    </div>
  );
}

export function DiagramLegendItem({
  type,
  label,
}: {
  type: "sync" | "async";
  label: string;
}) {
  return (
    <div className="flex items-center gap-2">
      {type === "sync" ? (
        <div className="w-6 h-0.5 bg-foreground" />
      ) : (
        <div className="w-6 h-0.5 border-t-2 border-dashed border-muted-foreground" />
      )}
      <span>{label}</span>
    </div>
  );
}