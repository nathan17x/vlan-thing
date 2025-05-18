import { clsx, type ClassValue } from "clsx"
import { CircleArrowDown, CircleCheck, CircleX, TriangleAlert } from "lucide-react"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getPortStatusColor(status: number){
  switch (status) {
    case 1: return "bg-green-700"
    case 2: return "bg-red-700"
    default: return "bg-secondary"
  }
}

export function getPortStatusIcon(ifOperStatus: number, ifAdminStatus: number){
  if (ifAdminStatus !== 1){
    return <CircleArrowDown size={16} color="orange"/>
  } else {
    switch (ifOperStatus) {
      case 1: return <CircleCheck size={16} color="green"/>
      case 2: return <CircleX size={16} color="gray"/>
      default: return <TriangleAlert size={16} color="yellow"/>
    }
  }
}

export function getUplinkPortStatusIcon(status: number){
  switch (status) {
    case 1: return <CircleCheck size={30} color="green"/>
    case 2: return <CircleX size={30} color="red"/>
    default: return <TriangleAlert size={30} color="yellow"/>
  }
}