import Link from "next/link";
import { ModeToggle } from "./theme-toggle";

export default function TopNav() {
  return (
    <div className="w-full flex flex-row p-2 items-center">
      <Link href="/">
        <h1 className="font-bold text-2xl">
          vlan-thing-v3
        </h1>
      </Link>
      <b className="flex-1"></b>
      <ModeToggle />
    </div>
  )
}