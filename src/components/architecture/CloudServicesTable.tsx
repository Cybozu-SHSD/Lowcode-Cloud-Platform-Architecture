import { 
  Globe, 
  Container,
  Network,
  Database,
  Key,
  HardDrive,
  FileText,
  BarChart3,
  ArrowUpRight
} from "lucide-react";

export function CloudServicesTable() {
  const services = [
    {
      layer: "Traffic Entry",
      service: "ALB + Nginx Ingress",
      icon: <Globe size={14} />,
      notes: "ALB for public entry, Ingress for L7 routing",
      color: "text-control-plane",
    },
    {
      layer: "Container Platform",
      service: "ACK (Managed K8s)",
      icon: <Container size={14} />,
      notes: "Single cluster to start, multi-cluster as needed",
      color: "text-control-plane",
    },
    {
      layer: "Tenant Isolation",
      service: "NetworkPolicy",
      icon: <Network size={14} />,
      notes: "K8s native network isolation, no ASM required",
      color: "text-data-plane",
    },
    {
      layer: "Control Plane DB",
      service: "RDS PostgreSQL",
      icon: <Database size={14} />,
      notes: "Tenant metadata, deployment records",
      color: "text-storage",
    },
    {
      layer: "Secret Storage",
      service: "K8s Secret → KMS",
      icon: <Key size={14} />,
      notes: "Start with K8s Secrets, upgrade to KMS",
      color: "text-broker",
    },
    {
      layer: "Image Registry",
      service: "ACR",
      icon: <Container size={14} />,
      notes: "Platform and tenant image storage",
      color: "text-control-plane",
    },
    {
      layer: "Object Storage",
      service: "OSS",
      icon: <HardDrive size={14} />,
      notes: "Helm Charts, SQL migrations, assets",
      color: "text-storage",
    },
    {
      layer: "Logging",
      service: "SLS",
      icon: <FileText size={14} />,
      notes: "Unified log collection and analysis",
      color: "text-muted-foreground",
    },
    {
      layer: "Monitoring",
      service: "Prometheus → ARMS",
      icon: <BarChart3 size={14} />,
      notes: "ACK built-in metrics, upgrade to ARMS",
      color: "text-muted-foreground",
    },
  ];

  const expansionPoints = [
    { title: "Multi-Cluster", desc: "Deploy Service targets multiple clusters" },
    { title: "Multi-Region", desc: "Cluster labels for region routing" },
    { title: "Config Center", desc: "Nacos for dynamic configuration" },
    { title: "Message Queue", desc: "RocketMQ for async deployment" },
    { title: "API Gateway", desc: "MSE Gateway for API metering" },
    { title: "Service Mesh", desc: "ASM for advanced traffic control" },
  ];

  return (
    <div className="space-y-6">
      {/* Services Table */}
      <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-secondary/50">
                <th className="text-left p-3 font-semibold text-xs">Layer</th>
                <th className="text-left p-3 font-semibold text-xs">Service</th>
                <th className="text-left p-3 font-semibold text-xs">Notes</th>
              </tr>
            </thead>
            <tbody>
              {services.map((svc, idx) => (
                <tr key={idx} className="border-t border-border hover:bg-secondary/30 transition-colors">
                  <td className="p-3 text-xs font-medium">{svc.layer}</td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <span className={svc.color}>{svc.icon}</span>
                      <code className="text-xs bg-secondary px-1.5 py-0.5 rounded">{svc.service}</code>
                    </div>
                  </td>
                  <td className="p-3 text-muted-foreground text-xs">{svc.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Expansion Points */}
      <div className="bg-secondary/30 rounded-xl p-5 border">
        <h4 className="font-semibold mb-4 text-sm flex items-center gap-2">
          <ArrowUpRight size={16} className="text-control-plane" />
          Reserved Expansion Points
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {expansionPoints.map((point, idx) => (
            <div key={idx} className="p-3 bg-card rounded-lg border text-xs">
              <div className="font-medium mb-1">{point.title}</div>
              <p className="text-muted-foreground">{point.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Key Decisions */}
      <div className="bg-card rounded-xl p-5 border shadow-sm">
        <h4 className="font-semibold mb-3 text-sm">Service Selection Rationale</h4>
        <div className="space-y-2 text-xs text-muted-foreground">
          <p>
            <strong className="text-foreground">Minimal viable stack</strong> - Start with essential services only, add complexity as needed
          </p>
          <p>
            <strong className="text-foreground">Managed services preferred</strong> - ACK, RDS, OSS reduce operational overhead
          </p>
          <p>
            <strong className="text-foreground">Clear upgrade path</strong> - Each component has a natural evolution (K8s Secret → KMS, Prometheus → ARMS)
          </p>
        </div>
      </div>
    </div>
  );
}
