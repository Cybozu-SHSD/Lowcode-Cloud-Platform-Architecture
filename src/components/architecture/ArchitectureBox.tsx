import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ArchitectureBoxProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  variant?: "control" | "data" | "broker" | "storage" | "neutral" | "external";
  className?: string;
  icon?: ReactNode;
  size?: "sm" | "md" | "lg";
}

const variantStyles = {
  control: "border-control-plane bg-control-plane-light/50",
  data: "border-data-plane bg-data-plane-light/50",
  broker: "border-broker bg-broker-light/50",
  storage: "border-storage bg-storage-light/50",
  neutral: "border-border bg-card",
  external: "border-dashed border-muted-foreground/50 bg-muted/30",
};

const variantIconBg = {
  control: "bg-control-plane text-primary-foreground",
  data: "bg-data-plane text-accent-foreground",
  broker: "bg-broker text-primary-foreground",
  storage: "bg-storage text-primary-foreground",
  neutral: "bg-muted text-muted-foreground",
  external: "bg-muted text-muted-foreground",
};

const sizeStyles = {
  sm: "p-2 text-xs",
  md: "p-3",
  lg: "p-4",
};

export function ArchitectureBox({
  title,
  subtitle,
  children,
  variant = "neutral",
  className,
  icon,
  size = "md",
}: ArchitectureBoxProps) {
  return (
    <div
      className={cn(
        "rounded-lg border-2 component-hover shadow-sm",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      <div className="flex items-start gap-2">
        {icon && (
          <div className={cn("rounded-md p-1.5 shrink-0", variantIconBg[variant])}>
            {icon}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className={cn("font-semibold text-foreground", size === "sm" ? "text-xs" : "text-sm")}>{title}</h3>
          {subtitle && (
            <p className="text-[10px] text-muted-foreground mt-0.5">{subtitle}</p>
          )}
          {children && <div className="mt-2">{children}</div>}
        </div>
      </div>
    </div>
  );
}

// Standard architecture diagram connector
interface ConnectorProps {
  direction: "down" | "right" | "left" | "up" | "bidirectional-h" | "bidirectional-v";
  label?: string;
  className?: string;
  variant?: "control" | "data" | "broker" | "neutral";
}

const connectorColors = {
  control: "bg-control-plane/60",
  data: "bg-data-plane/60",
  broker: "bg-broker/60",
  neutral: "bg-muted-foreground/40",
};

const arrowColors = {
  control: "border-control-plane/80",
  data: "border-data-plane/80",
  broker: "border-broker/80",
  neutral: "border-muted-foreground/60",
};

export function Connector({ direction, label, className, variant = "neutral" }: ConnectorProps) {
  const lineColor = connectorColors[variant];
  const arrowColor = arrowColors[variant];

  if (direction === "down") {
    return (
      <div className={cn("flex flex-col items-center", className)}>
        <div className={cn("w-0.5 h-4", lineColor)} />
        {label && (
          <span className="text-[9px] text-muted-foreground font-mono px-1.5 py-0.5 bg-background border rounded whitespace-nowrap">
            {label}
          </span>
        )}
        <div className={cn("w-0.5 h-4", lineColor)} />
        <div className={cn("w-0 h-0 border-l-[5px] border-r-[5px] border-t-[6px] border-l-transparent border-r-transparent", arrowColor)} />
      </div>
    );
  }

  if (direction === "right") {
    return (
      <div className={cn("flex items-center", className)}>
        <div className={cn("h-0.5 w-4", lineColor)} />
        {label && (
          <span className="text-[9px] text-muted-foreground font-mono px-1.5 py-0.5 bg-background border rounded whitespace-nowrap">
            {label}
          </span>
        )}
        <div className={cn("h-0.5 w-4", lineColor)} />
        <div className={cn("w-0 h-0 border-t-[5px] border-b-[5px] border-l-[6px] border-t-transparent border-b-transparent", arrowColor)} />
      </div>
    );
  }

  if (direction === "bidirectional-v") {
    return (
      <div className={cn("flex flex-col items-center", className)}>
        <div className={cn("w-0 h-0 border-l-[5px] border-r-[5px] border-b-[6px] border-l-transparent border-r-transparent", arrowColor)} />
        <div className={cn("w-0.5 h-6", lineColor)} />
        {label && (
          <span className="text-[9px] text-muted-foreground font-mono px-1.5 py-0.5 bg-background border rounded whitespace-nowrap">
            {label}
          </span>
        )}
        <div className={cn("w-0.5 h-6", lineColor)} />
        <div className={cn("w-0 h-0 border-l-[5px] border-r-[5px] border-t-[6px] border-l-transparent border-r-transparent", arrowColor)} />
      </div>
    );
  }

  return null;
}

// Zone/Region container for architecture diagrams
interface ZoneProps {
  title: string;
  variant?: "control" | "data" | "external" | "broker";
  children: ReactNode;
  className?: string;
}

export function Zone({ title, variant = "control", children, className }: ZoneProps) {
  const borderColors = {
    control: "border-control-plane/40",
    data: "border-data-plane/40",
    external: "border-muted-foreground/30",
    broker: "border-broker/40",
  };

  const bgColors = {
    control: "bg-control-plane-light/20",
    data: "bg-data-plane-light/20",
    external: "bg-muted/10",
    broker: "bg-broker-light/20",
  };

  const labelColors = {
    control: "bg-control-plane text-primary-foreground",
    data: "bg-data-plane text-accent-foreground",
    external: "bg-muted-foreground text-background",
    broker: "bg-broker text-primary-foreground",
  };

  return (
    <div className={cn("relative rounded-xl border-2 border-dashed p-4 pt-8", borderColors[variant], bgColors[variant], className)}>
      <div className={cn("absolute -top-3 left-4 px-3 py-1 rounded-full text-xs font-semibold", labelColors[variant])}>
        {title}
      </div>
      {children}
    </div>
  );
}
