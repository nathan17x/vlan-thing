"use client"

import { useParams } from "next/navigation"
import SwitchGraphicSmall from "./switch-graphic-small";
import SwitchPortAssignments from "./switch-port-assignments";
import { useEffect, useState } from "react";
import { pb } from "@/lib/pb";
import { ExternalSwitch } from "@/lib/global";
import UplinkDetail from "./uplink-detail";
import { RecordModel } from "pocketbase";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function Page() {
  const params = useParams<{ switch_name: string; }>();
  const [externalSwitch, setExternalSwitch] = useState<ExternalSwitch | null>(null);

  function castToExternalSwitch(raw: RecordModel) {
    return {
      ...raw,
      edge_ports: Array.isArray(raw.edge_ports) ? raw.edge_ports : []
    } as ExternalSwitch
  }  

  useEffect(() => {
    const fetchAndSubscribe = async () => {
      try {
        const externalSwitchRecord = await pb.collection('external_switches')
          .getFirstListItem(`name="${params.switch_name}"`)
  
          setExternalSwitch(castToExternalSwitch(externalSwitchRecord))
  
        pb.collection('external_switches').subscribe('*', (event) => {
          if (event.action === "update" && event.record.id === externalSwitchRecord.id) {
            setExternalSwitch(event.record as ExternalSwitch)
          }
        })
      } catch (error) {
        console.error(error)
      }
    }
  
    fetchAndSubscribe()

    return () => {
      pb.collection('external_switches').unsubscribe('*')
    }
  }, [params.switch_name])

  if (!externalSwitch?.switch_up){
    return (
      <div className="flex flex-col items-center">
        <div className="flex flex-row w-full max-w-[600px] gap-4 rounded-lg bg-popover p-4 items-center">
          <Button asChild variant='secondary'>
            <Link href='/'>
              <ArrowLeft />
              Return
            </Link>
          </Button>
          {externalSwitch?.name} is down :(
        </div>
      </div>
    )
  }
  
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col w-full max-w-[600px] gap-4 rounded-lg bg-popover p-4">
        <div className="flex flex-row w-full ">
          <div className="flex flex-col p-2 w-full">
            <h2 className="font-bold text-3xl">
              {params.switch_name}
            </h2>
            <p className="text-2xl">
              {externalSwitch?.description}
            </p>
          </div>
          <div className="">
            <UplinkDetail uplinkPorts={externalSwitch?.uplink_ports ?? []}/>
          </div>
        </div>
        <SwitchGraphicSmall externalSwitch = {externalSwitch}/>
        <SwitchPortAssignments externalSwitch = {externalSwitch}/>
        <p className="text-xs text-muted-foreground">
          * Cisco firmware only updates optical power stats every 600 seconds. The link status is accurate.
        </p>
      </div>
    </div>
  )
}
