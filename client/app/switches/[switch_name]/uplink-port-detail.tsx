import { SwitchPort } from "@/lib/global";
import { getUplinkPortStatusIcon } from "@/lib/utils";

export default function UplinkPortDetail({ uplinkPort }:{ uplinkPort: SwitchPort }) {
  return (
    <div className="border-2 rounded-sm p-1 flex flex-row gap-2 bg-card items-center justify-center min-w-50">
      <div className="px-2">
        Uplink {uplinkPort.port_number}
      </div>
      <div>
        {getUplinkPortStatusIcon(uplinkPort.ifOperStatus)}
      </div>
      <div className="bg-secondary p-2 rounded-sm min-w-20">
        <p className="text-xs">Rx</p>
        <p>
          {
            (uplinkPort?.rxPower != null && uplinkPort.ifOperStatus != 2) 
              ? `${uplinkPort.rxPower / 10}db`
              : '---'
          }
        </p>   
      </div>
      <div className="bg-secondary p-2 rounded-sm min-w-20">
        <p className="text-xs">Tx</p>
        <p>
          {
            (uplinkPort?.txPower != null && uplinkPort.ifOperStatus != 2) 
              ? `${uplinkPort.txPower / 10}db`
              : '---'
          }
        </p>    
      </div>
    </div>
  )
}