import Link from "next/link";
import { ModeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import { HomeIcon } from "lucide-react";

export default function TopNav() {
  return (
    <div className="w-full flex flex-row p-2 items-center gap-2">
      <Link href="/" className="flex flex-row items-center gap-2">
        <img
          src="/gcv.png"
          alt="gcv"
          className="size-12 hover:cursor-pointer"
        />
        <h1 className="font-bold text-2xl">
          GCV Centennial
        </h1>
      </Link>
      <b className="flex-1"></b>
      <Button asChild variant='outline' size='icon'>
        <Link href="/">
          <HomeIcon />
        </Link>
      </Button>
      <ModeToggle />
    </div>
  )
}