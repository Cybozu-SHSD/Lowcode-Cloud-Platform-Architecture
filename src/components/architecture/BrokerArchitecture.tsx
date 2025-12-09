import { 
  Shield, 
  Users,
  Globe,
  Server
} from "lucide-react";
import { ArchitectureBox, Zone } from "./ArchitectureBox";

export function BrokerArchitecture() {
  return (
    <div className="space-y-4">
      {/* External */}
      <Zone title="External" variant="external">
        <div className="flex justify-center gap-8">
          <ArchitectureBox
            title="User"
            subtitle="Browser"
            icon={<Users size={14} />}
            variant="external"
            size="sm"
            className="w-32"
          />
          <ArchitectureBox
            title="OAuth Providers"
            subtitle="MS / WeChat / DingTalk"
            icon={<Globe size={14} />}
            variant="external"
            size="sm"
            className="w-44"
          />
        </div>
      </Zone>

      {/* Broker System */}
      <Zone title="Broker System" variant="broker">
        <div className="space-y-4">
          <div className="flex justify-center">
            <ArchitectureBox
              title="Broker Service"
              subtitle="OAuth Proxy & Token Service"
              icon={<Shield size={14} />}
              variant="broker"
              className="w-64"
            >
              <div className="grid grid-cols-2 gap-1.5 mt-2">
                {["Authorize", "Callback", "Token Svc", "Adapters"].map((m) => (
                  <div key={m} className="text-[9px] bg-broker-medium/50 px-2 py-1 rounded text-center">
                    {m}
                  </div>
                ))}
              </div>
            </ArchitectureBox>
          </div>
          
          <div className="flex justify-center gap-4">
            <ArchitectureBox
              title="Config DB"
              subtitle="Provider & Tenant Mapping"
              icon={<Server size={14} />}
              variant="storage"
              size="sm"
              className="w-44"
            />
            <ArchitectureBox
              title="RSA Keys"
              subtitle="Token Signing"
              icon={<Server size={14} />}
              variant="storage"
              size="sm"
              className="w-36"
            />
          </div>
        </div>
      </Zone>

      {/* Tenant Apps */}
      <Zone title="Tenant Applications (Data Plane)" variant="data">
        <div className="flex justify-center gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-card rounded-lg p-3 border border-data-plane/30 w-36 text-center">
              <div className="text-xs font-mono font-medium">tenant-{String(i).padStart(3, '0')}</div>
              <div className="text-[10px] text-muted-foreground mt-1">Callback Receiver</div>
            </div>
          ))}
        </div>
      </Zone>

      {/* Flow Description */}
      <div className="bg-secondary/30 rounded-xl p-4 border">
        <h4 className="font-semibold mb-2 text-sm">Authentication Flow</h4>
        <div className="flex items-center gap-2 text-xs text-muted-foreground flex-wrap">
          <span className="px-2 py-1 bg-card rounded border">User</span>
          <span>→</span>
          <span className="px-2 py-1 bg-broker-light rounded border border-broker">Broker /authorize</span>
          <span>→</span>
          <span className="px-2 py-1 bg-card rounded border">IdP Login</span>
          <span>→</span>
          <span className="px-2 py-1 bg-broker-light rounded border border-broker">Broker /callback</span>
          <span>→</span>
          <span className="px-2 py-1 bg-data-plane-light rounded border border-data-plane">Tenant App (with handoff token)</span>
        </div>
      </div>
    </div>
  );
}
