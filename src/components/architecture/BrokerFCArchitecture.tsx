import { 
  Shield, 
  Zap,
  Database,
  Key,
  Globe,
  ArrowRight
} from "lucide-react";

export function BrokerFCArchitecture() {
  return (
    <div className="space-y-6">
      {/* FC Function Compute Container */}
      <div className="relative border-2 border-dashed border-broker/40 rounded-2xl p-6 bg-gradient-to-br from-broker/5 to-transparent">
        {/* FC Label */}
        <div className="absolute -top-3 left-6 px-3 py-1 bg-broker text-primary-foreground text-xs font-semibold rounded-full flex items-center gap-1.5">
          <Zap size={12} />
          FC Function Compute (Serverless)
        </div>

        <div className="mt-4 space-y-4">
          {/* HTTP Trigger Layer */}
          <div className="bg-card rounded-xl p-4 border">
            <div className="text-xs text-muted-foreground mb-3 font-medium flex items-center gap-1.5">
              <Globe size={12} />
              HTTP Triggers
            </div>
            <div className="grid grid-cols-3 gap-3">
              <TriggerBox 
                name="/authorize" 
                method="GET"
                desc="Initiate OAuth flow"
              />
              <TriggerBox 
                name="/callback" 
                method="GET"
                desc="Handle IdP callback"
              />
              <TriggerBox 
                name="/token" 
                method="POST"
                desc="Token exchange"
              />
            </div>
          </div>

          {/* Function Layer */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FunctionBox
              name="authorize-fn"
              features={[
                "Parse tenant_id",
                "Generate state JWT",
                "Redirect to IdP",
              ]}
            />
            <FunctionBox
              name="callback-fn"
              features={[
                "Validate state",
                "Fetch IdP Token",
                "Generate handoff JWT",
                "Redirect to tenant",
              ]}
              primary
            />
            <FunctionBox
              name="token-fn"
              features={[
                "Validate handoff token",
                "Return user info",
              ]}
            />
          </div>

          {/* Shared Layer */}
          <div className="bg-secondary/30 rounded-xl p-4 border">
            <div className="text-xs text-muted-foreground mb-3 font-medium">Shared Layer</div>
            <div className="flex flex-wrap gap-2">
              <LayerItem name="oauth-adapters" desc="MS/WeChat/DingTalk" />
              <LayerItem name="jwt-utils" desc="RS256 sign/verify" />
              <LayerItem name="config-client" desc="Tablestore client" />
            </div>
          </div>
        </div>
      </div>

      {/* Storage Layer */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StorageBlock
          title="Tablestore (OTS)"
          icon={<Database size={16} />}
          tables={[
            { name: "oauth_providers", desc: "IdP configuration" },
            { name: "tenant_mapping", desc: "Callback URL mapping" },
          ]}
        />
        <StorageBlock
          title="KMS"
          icon={<Key size={16} />}
          tables={[
            { name: "RSA Private Key", desc: "JWT signing" },
            { name: "RSA Public Key", desc: "JWT verification" },
          ]}
        />
      </div>

      {/* Design Benefits */}
      <div className="bg-broker/10 rounded-xl p-5 border border-broker/30">
        <h4 className="font-semibold mb-3 text-sm flex items-center gap-2">
          <Zap size={14} className="text-broker" />
          FC Benefits
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs">
          <BenefitItem title="Pay-per-use" />
          <BenefitItem title="Auto-scaling" />
          <BenefitItem title="Zero Ops" />
          <BenefitItem title="High Availability" />
          <BenefitItem title="Secure Isolation" />
          <BenefitItem title="Version Control" />
        </div>
      </div>

      {/* Flow Diagram */}
      <div className="bg-card rounded-xl p-5 border">
        <h4 className="font-semibold mb-4 text-sm">Authentication Flow</h4>
        <div className="flex items-center gap-2 text-xs flex-wrap">
          <FlowStep num={1} label="User" />
          <ArrowRight size={14} className="text-muted-foreground" />
          <FlowStep num={2} label="authorize-fn" color="broker" />
          <ArrowRight size={14} className="text-muted-foreground" />
          <FlowStep num={3} label="IdP" />
          <ArrowRight size={14} className="text-muted-foreground" />
          <FlowStep num={4} label="callback-fn" color="broker" />
          <ArrowRight size={14} className="text-muted-foreground" />
          <FlowStep num={5} label="Tenant App" color="data-plane" />
        </div>
      </div>
    </div>
  );
}

function TriggerBox({ name, method, desc }: { name: string; method: string; desc: string }) {
  return (
    <div className="bg-broker/10 rounded-lg p-3 border border-broker/30 text-center">
      <div className="flex items-center justify-center gap-1.5 mb-1">
        <span className="text-[10px] px-1.5 py-0.5 bg-broker text-primary-foreground rounded font-mono">{method}</span>
        <span className="text-xs font-mono font-medium">{name}</span>
      </div>
      <div className="text-[10px] text-muted-foreground">{desc}</div>
    </div>
  );
}

function FunctionBox({ 
  name, 
  features,
  primary 
}: { 
  name: string; 
  features: string[];
  primary?: boolean;
}) {
  return (
    <div className={`bg-card rounded-xl p-4 border ${primary ? 'ring-2 ring-broker/50 border-broker/50' : ''}`}>
      <div className="flex items-center gap-2 mb-3">
        <div className="w-6 h-6 rounded bg-broker/20 flex items-center justify-center">
          <Zap size={12} className="text-broker" />
        </div>
        <span className="font-mono text-sm font-semibold">{name}</span>
      </div>

      <div className="space-y-1">
        {features.map((f, i) => (
          <div key={i} className="text-[11px] text-muted-foreground flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-broker shrink-0" />
            {f}
          </div>
        ))}
      </div>
    </div>
  );
}

function LayerItem({ name, desc }: { name: string; desc: string }) {
  return (
    <div className="bg-card rounded px-3 py-2 border text-xs">
      <span className="font-mono font-medium">{name}</span>
      <span className="text-muted-foreground ml-2">{desc}</span>
    </div>
  );
}

function StorageBlock({ 
  title, 
  icon, 
  tables 
}: { 
  title: string; 
  icon: React.ReactNode; 
  tables: { name: string; desc: string }[] 
}) {
  return (
    <div className="bg-card rounded-xl p-4 border">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
          {icon}
        </div>
        <div className="font-semibold text-sm">{title}</div>
      </div>
      <div className="space-y-1.5">
        {tables.map((t, i) => (
          <div key={i} className="flex items-center justify-between text-xs bg-secondary/50 rounded px-2 py-1.5">
            <span className="font-mono">{t.name}</span>
            <span className="text-muted-foreground">{t.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function BenefitItem({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-1.5 h-1.5 rounded-full bg-broker shrink-0" />
      <span className="font-medium">{title}</span>
    </div>
  );
}

function FlowStep({ num, label, color }: { num: number; label: string; color?: string }) {
  const bgColor = color === 'broker' ? 'bg-broker/10 border-broker/30' 
    : color === 'data-plane' ? 'bg-data-plane/10 border-data-plane/30' 
    : 'bg-card';
  
  return (
    <div className={`px-3 py-2 rounded-lg border ${bgColor} text-center`}>
      <div className="flex items-center gap-1.5">
        <span className="w-4 h-4 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center">{num}</span>
        <span className="font-medium">{label}</span>
      </div>
    </div>
  );
}
