"use client"

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useEffect, use } from "react";
import { pb } from "@/lib/pb";
import { RecordModel } from "pocketbase";

export default function Page() {
  const [switches, setSwitches] = useState<RecordModel[]>([]);

  const fetchSwitches = async () => {
    try {
      const records = await pb
        .collection('external_switches')
        .getFullList(200, {
          sort: 'name',
        })
      setSwitches(records)
    } catch (error: any) {
      console.error(error)
    }
  }
  useEffect(()=> {
    fetchSwitches();
  },[])
  return (
    <div className="flex flex-col gap-2 w-full px-2">
      <div className="flex flex-col gap-2">
        <h2>
          External Switches:
        </h2>
        {switches.map((item) => {
          return (
            <Link href={`/switches/${item.name}`} key={item.id} >
              <div className="flex flex-col border-2 rounded-md px-4 py-2">
                <h2 className="text-xl font-bold">
                  {item.name}
                </h2>
                <p>
                  {item.ip_address}
                </p>
                <p>
                  {item.description}
                </p>
              </div>
            </Link>
          )
        })}

      </div>
    </div>
  )
}