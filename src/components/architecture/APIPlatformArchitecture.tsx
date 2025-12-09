import { 
  Globe,
  Key,
  Shield,
  Database,
  Users,
  Server,
  Check,
  X
} from "lucide-react";

export function APIPlatformArchitecture() {
  return (
    <div className="space-y-4">
      {/* Developers Entry */}
      <div className="flex justify-center">
        <div className="bg-card border rounded-xl px-6 py-3 flex items-center gap-3">
          <Users size={16} className="text-muted-foreground" />
          <div>
            <div className="font-semibold text-sm">Developers</div>
            <div className="text-xs text-muted-foreground">Tenant Users | Integration</div>
          </div>
        </div>
      </div>

      {/* Arrow */}
      <div className="flex justify-center">
        <div className="flex flex-col items-center text-xs text-muted-foreground">
          <div className="w-px h-4 bg-border" />
          <span className="py-1 px-2 bg-secondary rounded text-[10px]">HTTPS</span>
          <div className="w-px h-4 bg-border" />
          <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-border" />
        </div>
      </div>

      {/* API Development Platform */}
      <div className="relative border-2 border-dashed border-api/40 rounded-xl p-5 bg-gradient-to-br from-api/5 to-transparent">
        <div className="absolute -top-3 left-4 px-2 py-0.5 bg-api text-white text-xs font-semibold rounded-full">
          API Development Platform
        </div>
        <div className="text-xs text-muted-foreground mb-4">Developer Portal</div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Domain & Authentication */}
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
            <div className="font-semibold text-emerald-600 dark:text-emerald-400 text-sm mb-1">Domain & Authentication</div>
            <div className="text-xs text-muted-foreground mb-3">Access Control</div>
            
            <div className="space-y-2">
              <div className="bg-card rounded-lg p-2 border flex items-center gap-2">
                <Globe size={14} className="text-muted-foreground" />
                <div>
                  <div className="text-xs font-medium">Subdomain Allocation</div>
                  <div className="text-[10px] text-muted-foreground font-mono">tenant-xxx.api.platform.com</div>
                </div>
              </div>
              <div className="bg-card rounded-lg p-2 border flex items-center gap-2">
                <Key size={14} className="text-muted-foreground" />
                <div>
                  <div className="text-xs font-medium">Project Token</div>
                  <div className="text-[10px] text-muted-foreground">Project-level Key Issuance</div>
                </div>
              </div>
            </div>
          </div>

          {/* Permission Config */}
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
            <div className="font-semibold text-emerald-600 dark:text-emerald-400 text-sm mb-1">Permission Config</div>
            <div className="text-xs text-muted-foreground mb-3">Access Rules</div>
            
            <div className="text-[10px] text-muted-foreground mb-2">Configure app permissions within Project</div>
            <div className="grid grid-cols-2 gap-2">
              <PermissionItem app="App A" level="CRUD" />
              <PermissionItem app="App B" level="CR" />
              <PermissionItem app="App C" level="R" />
              <PermissionItem app="App D" level="—" />
            </div>
          </div>
        </div>
      </div>

      {/* Arrow */}
      <div className="flex justify-center">
        <div className="flex flex-col items-center text-xs text-muted-foreground">
          <div className="w-px h-4 bg-border" />
          <span className="py-1 px-2 bg-secondary rounded text-[10px]">API Request + Token</span>
          <div className="w-px h-4 bg-border" />
          <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-border" />
        </div>
      </div>

      {/* Unified API Gateway */}
      <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
        <div className="font-semibold text-amber-600 dark:text-amber-400 mb-1">Unified API Gateway</div>
        <div className="text-xs text-muted-foreground mb-3 font-mono">api.platform.com</div>
        
        <div className="flex justify-center gap-4">
          <div className="bg-card rounded-lg p-3 border flex items-center gap-2">
            <Shield size={14} className="text-amber-500" />
            <div>
              <div className="text-xs font-medium">Token Validation</div>
              <div className="text-[10px] text-muted-foreground">Domain + Permission Check</div>
            </div>
          </div>
          <div className="bg-card rounded-lg p-3 border flex items-center gap-2">
            <Server size={14} className="text-amber-500" />
            <div>
              <div className="text-xs font-medium">Request Routing</div>
              <div className="text-[10px] text-muted-foreground">Forward to Tenant</div>
            </div>
          </div>
        </div>
      </div>

      {/* Arrow */}
      <div className="flex justify-center">
        <div className="flex flex-col items-center text-xs text-muted-foreground">
          <div className="w-px h-2 bg-border" />
          <div className="w-px h-2 bg-transparent" />
          <div className="w-px h-2 bg-border" />
          <span className="py-1 px-2 bg-secondary rounded text-[10px]">Forward</span>
          <div className="w-px h-4 bg-border" />
          <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-border" />
        </div>
      </div>

      {/* Lowcode Platform */}
      <div className="flex justify-center">
        <div className="bg-amber-100 dark:bg-amber-900/30 border border-amber-300 dark:border-amber-700 rounded-xl p-4 w-fit">
          <div className="font-semibold text-amber-700 dark:text-amber-400 text-sm mb-1">Lowcode Platform</div>
          <div className="text-xs text-muted-foreground mb-3">Applications</div>
          
          <div className="grid grid-cols-2 gap-2">
            {["App A", "App B", "App C", "App D"].map((app) => (
              <div key={app} className="bg-card rounded-lg p-2 border flex items-center gap-2">
                <Database size={12} className="text-muted-foreground" />
                <div>
                  <div className="text-xs font-medium">{app}</div>
                  <div className="text-[10px] text-muted-foreground">Data Tables</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Token Mechanism Comparison */}
      <div className="bg-secondary/30 rounded-xl p-5 border">
        <div className="font-semibold text-sm mb-1 text-api">Token Mechanism Comparison</div>
        <div className="text-xs text-muted-foreground mb-4">vs kintone</div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Check size={14} className="text-green-500" />
              Our Platform: Project-based
            </div>
            <ul className="text-xs text-muted-foreground space-y-1 ml-6">
              <li>• One token manages multiple app permissions</li>
              <li>• Unified endpoint, simplified integration</li>
              <li>• App-level CRUD fine-grained control</li>
            </ul>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium">
              <X size={14} className="text-red-500" />
              kintone: App-based
            </div>
            <ul className="text-xs text-muted-foreground space-y-1 ml-6">
              <li>• Each app requires separate token config</li>
              <li>• Complex token management for multi-app</li>
              <li>• Token count grows linearly with apps</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function PermissionItem({ app, level }: { app: string; level: string }) {
  const levelColor = level === "CRUD" ? "bg-green-500/20 text-green-700 dark:text-green-300" 
    : level === "CR" ? "bg-blue-500/20 text-blue-700 dark:text-blue-300"
    : level === "R" ? "bg-yellow-500/20 text-yellow-700 dark:text-yellow-300"
    : "bg-gray-500/20 text-gray-500";
    
  return (
    <div className="bg-card rounded px-2 py-1.5 border flex items-center justify-between">
      <span className="text-xs">{app}</span>
      <span className={`text-[10px] px-1.5 py-0.5 rounded ${levelColor}`}>{level}</span>
    </div>
  );
}
