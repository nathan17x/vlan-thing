import { clsx, type ClassValue } from "clsx"
import { CircleCheck, CircleX, TriangleAlert } from "lucide-react"
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

export function getPortStatusIcon(status: number){
  switch (status) {
    case 1: return <CircleCheck size={16} color="green"/>
    case 2: return <CircleX size={16} color="gray"/>
    default: return <TriangleAlert size={16} color="yellow"/>
  }
}
