import { SwitchPort } from "@/lib/global";
import UplinkPortDetail from "./uplink-port-detail";

export default function UplinkDetail({ uplinkPorts }:{ uplinkPorts: SwitchPort[] | null}){
  return(
    <div className="h-full w-full flex flex-col items-center justify-around gap-2">
      {uplinkPorts?.map((item) => {
        return (
          <div key={item.port_number}>
            <UplinkPortDetail uplinkPort={item} />
          </div>
        )
      })}
    </div>
  )
}