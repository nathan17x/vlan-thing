import { SwitchPort } from "@/lib/global";
import { getPortStatusColor } from "@/lib/utils";

export default function EdgePortSmall(edgePort: SwitchPort) {
  return (
    <div 
      className={`
        flex flex-row justify-center items-center w-full 
        font-bold ${getPortStatusColor(edgePort.ifOperStatus)}
        rounded-xs text-white border-1
      `}
    >
      {edgePort.port_number}
    </div>
  )
}