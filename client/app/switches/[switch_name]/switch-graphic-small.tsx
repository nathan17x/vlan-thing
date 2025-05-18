"use client"

import { ExternalSwitch } from "@/lib/global"
import { getPortStatusColor } from "@/lib/utils"
import EdgePortSmall from "./edge-port-small";

export default function SwitchGraphicSmall(
  { externalSwitch }:{ externalSwitch: ExternalSwitch | null}
){
  const oddEdgePorts = externalSwitch?.edge_ports.filter(item => item.port_number % 2 !== 0);
  const evenEdgePorts = externalSwitch?.edge_ports.filter(item => item.port_number % 2 == 0);  
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex flex-row gap-1 w-full min-h-8">
        {oddEdgePorts?.map(item => <EdgePortSmall {...item} key={item.port_number}/>)}
      </div>
      <div className="flex flex-row gap-1 w-full min-h-8">
        {evenEdgePorts?.map(item => <EdgePortSmall {...item} key={item.port_number}/>)}
      </div>
    </div>
  )
}