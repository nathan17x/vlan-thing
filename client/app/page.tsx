"use client"

import Link from "next/link";
import { useState, useEffect } from "react";
import { pb } from "@/lib/pb";
import { ExternalSwitch } from "@/lib/global";
import { CircleCheck, CircleX } from "lucide-react";

export default function Page() {
  const [switches, setSwitches] = useState<ExternalSwitch[]>([]);

  useEffect(() => {
    const subscribe = async () => {
      try {
        pb.collection('external_switches').subscribe('*', (event) => {
          if (event.action === "update") {
            refreshSwitches()
          }
        })
      } catch (error) {
        console.error(error)
      }
    }
    const refreshSwitches = async () => {
      try {
        const records = await pb
          .collection('external_switches')
          .getFullList(200, {
            sort: 'name',
          })
        setSwitches(records as ExternalSwitch[])
      } catch (error) {
        console.error(error)
      }
    }
    refreshSwitches()
    subscribe()
    return () => {
      pb.collection('external_switches').unsubscribe('*')
    }
  }, [])

  const fetchSwitches = async () => {
    try {
      const records = await pb
        .collection('external_switches')
        .getFullList(200, {
          sort: 'name',
        })
      setSwitches(records as ExternalSwitch[])
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(()=> {
    fetchSwitches();
  },[])
  return (
    <div className="flex flex-col gap-2 w-full px-2 items-center">
      <div className="flex flex-col gap-2 max-w-[600px] w-full">
        {switches.map((item) => {
          return (
            <Link href={`/switches/${item.name}`} key={item.id} >
              <div className="flex flex-row border-2 rounded-md px-4 py-2 items-center hover:border-primary">
                <div className={`flex flex-col ${item.switch_up ? 'text-primary' : 'text-muted-foreground'}`}>
                  <h2 className="text-xl font-bold">
                    {item.name}
                  </h2>
                  <p>
                    {item.description}
                  </p>
                </div>
                <b className="flex-1"/>
                {item.switch_up ? <CircleCheck size={30} color="green" />:<CircleX size={30} color="gray"/>}
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}