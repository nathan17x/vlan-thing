import { ExternalSwitch } from "@/lib/global"
import EdgePortDetail from "./edge-port-detail";



export default function SwitchPortAssignments({ externalSwitch }:{ externalSwitch: ExternalSwitch | null }) {

  const oddEdgePorts = externalSwitch?.edge_ports.filter(item => item.port_number % 2 !== 0);
  const evenEdgePorts = externalSwitch?.edge_ports.filter(item => item.port_number % 2 == 0); 
  return (
    <div className="flex flex-row w-full gap-2">
      <div className="flex flex-col w-full gap-1">
        {oddEdgePorts?.map((item) => {
          return (
            <EdgePortDetail {...item} key={item.port_number}/>
          )
        })}
      </div>
      <div className="flex flex-col w-full gap-1">
        {evenEdgePorts?.map((item) => {
          return (
            <EdgePortDetail {...item} key={item.port_number}/>
          )
        })}
      </div>
    </div>
  )
}