import { 
  Settings,
  Shield,
  Workflow,
  Clock,
  CheckCircle2,
  FileKey2,
  HardDriveDownload,
  Gauge,
  RefreshCw,
  Globe,
  Container
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ControlPlaneArchitecture } from "./ControlPlaneArchitecture";

export function TenantPlatformArchitecture() {
  return (
    <div className="space-y-8">
      {/* Architecture Diagram - Now using dedicated component */}
      <ControlPlaneArchitecture />

      {/* Platform Features Overview */}
      <div className="bg-gradient-to-br from-control-plane/5 to-data-plane/5 rounded-xl p-6 border">
        <h4 className="font-semibold text-base mb-5 flex items-center gap-2">
          <Settings size={18} className="text-control-plane" />
          Platform Features
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { 
              category: "Lifecycle Management",
              icon: Workflow,
              color: "text-blue-600 bg-blue-100",
              items: ["Tenant provisioning / deprovisioning", "Suspend / resume services", "Version upgrade / rollback"]
            },
            { 
              category: "Resource & Capacity",
              icon: Gauge,
              color: "text-green-600 bg-green-100",
              items: ["CPU / memory quota", "Auto scaling", "Storage capacity"]
            },
            { 
              category: "License & Billing",
              icon: FileKey2,
              color: "text-purple-600 bg-purple-100",
              items: ["License configuration", "Feature module authorization", "Usage metering"]
            },
            { 
              category: "Security & Access",
              icon: Shield,
              color: "text-red-600 bg-red-100",
              items: ["IP whitelist", "Access key rotation", "SSL certificate management"]
            },
            { 
              category: "Data Management",
              icon: HardDriveDownload,
              color: "text-amber-600 bg-amber-100",
              items: ["Scheduled backup", "Data recovery", "Cross-region migration"]
            },
            { 
              category: "Operations & Monitoring",
              icon: RefreshCw,
              color: "text-cyan-600 bg-cyan-100",
              items: ["Health check", "Log collection", "Alert notifications"]
            },
          ].map((group) => (
            <div key={group.category} className="bg-card rounded-lg p-4 border shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-3">
                <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", group.color)}>
                  <group.icon size={16} />
                </div>
                <h5 className="text-sm font-semibold">{group.category}</h5>
              </div>
              <ul className="space-y-1.5">
                {group.items.map((item) => (
                  <li key={item} className="text-xs text-muted-foreground flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-control-plane" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Lifecycle Flow */}
      <div className="bg-secondary/30 rounded-xl p-5 border">
        <h4 className="font-semibold mb-4 text-sm flex items-center gap-2">
          <Workflow size={14} />
          Tenant Lifecycle
        </h4>
        <div className="flex items-center justify-between overflow-x-auto pb-2">
          {[
            { step: "1", label: "Request", icon: Globe, desc: "API call received" },
            { step: "2", label: "Validate", icon: Shield, desc: "Auth & quota check" },
            { step: "3", label: "Plan", icon: Settings, desc: "Generate deploy plan" },
            { step: "4", label: "Execute", icon: Container, desc: "Helm operations" },
            { step: "5", label: "Wait", icon: Clock, desc: "Health check" },
            { step: "6", label: "Complete", icon: CheckCircle2, desc: "Status callback" },
          ].map((phase, idx, arr) => (
            <div key={phase.step} className="flex items-center">
              <div className="flex flex-col items-center min-w-[80px]">
                <div className="w-10 h-10 rounded-full bg-control-plane text-primary-foreground flex items-center justify-center text-sm font-bold shadow-md">
                  {phase.step}
                </div>
                <phase.icon size={14} className="mt-2 text-muted-foreground" />
                <span className="text-xs font-medium mt-1">{phase.label}</span>
                <span className="text-[9px] text-muted-foreground text-center">{phase.desc}</span>
              </div>
              {idx < arr.length - 1 && (
                <div className="w-8 h-0.5 bg-gradient-to-r from-control-plane to-control-plane/30 mx-1" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Design Principles */}
      <div className="bg-secondary/30 rounded-xl p-5 border">
        <h4 className="font-semibold mb-3 text-sm">Design Principles</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-control-plane mt-1.5 shrink-0" />
            <span><strong>Declarative API</strong> - Desired state reconciliation, idempotent operations</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-control-plane mt-1.5 shrink-0" />
            <span><strong>Namespace Isolation</strong> - Each tenant in dedicated K8s namespace</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-data-plane mt-1.5 shrink-0" />
            <span><strong>Helm-based Deploy</strong> - Consistent, versioned, rollback-capable</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-data-plane mt-1.5 shrink-0" />
            <span><strong>Async Ready</strong> - Event-driven architecture for scale</span>
          </div>
        </div>
      </div>
    </div>
  );
}
