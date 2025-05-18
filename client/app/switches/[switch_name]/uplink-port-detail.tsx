import { SwitchPort } from "@/lib/global";
import { getPortStatusIcon } from "@/lib/utils";

export default function UplinkPortDetail({ uplinkPort }:{ uplinkPort: SwitchPort }) {
  return (
    <div className="border-2 rounded-sm p-1 flex flex-row gap-2 bg-card items-center justify-center min-w-50">
      <div className="px-2">
        Uplink {uplinkPort.port_number}
      </div>
      <div>
        {getPortStatusIcon(uplinkPort.status)}
      </div>
      <div className="bg-secondary p-2 rounded-sm min-w-16">
        <p className="text-xs">Rx</p>
        {uplinkPort.rx_power}
      </div>
      <div className="bg-secondary p-2 rounded-sm min-w-16">
        <p className="text-xs">Tx</p>
        {uplinkPort.tx_power}
      </div>
    </div>
  )
}