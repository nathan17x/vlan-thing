import { SwitchPort } from "@/lib/global"
import { getPortStatusIcon } from "@/lib/utils"

export default function EdgePortDetail( edgePort: SwitchPort) {
  return (
    <div className="flex flex-row gap-1">
      <div className="bg-muted flex flex-row items-center max-w-14 rounded-xs w-full p-1">
        <div className="flex flex-row justify-center flex-1">
          {edgePort.port_number}
        </div>
        <div className="flex flex-row justify-center flex-1">
          {getPortStatusIcon(edgePort.ifOperStatus, edgePort.ifAdminStatus)}
        </div>
      </div>
      <div className="bg-card w-full py-1 max-w-16 flex flex-col items-center justify-center">
        <p className="text-xs">
          vlan {edgePort.vmVlan}
        </p>
      </div>
      <div className="bg-card w-full py-1 px-2 flex flex-col justify-center">
        <p className="text-xs">
          {edgePort.ifAlias}
        </p>
      </div>
    </div>
  )
}
