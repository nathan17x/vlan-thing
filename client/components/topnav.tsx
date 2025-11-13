import Link from "next/link";
import { ModeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import { HomeIcon } from "lucide-react";
import Image from "next/image";

export default function TopNav() {
  return (
    <div className="w-full flex flex-row p-2 items-center gap-2">
      <Link href="/" className="flex flex-row items-center gap-2">
        <Image
          src="/logo.png"
          alt="logo"
          className="hover:cursor-pointer"
          width={40}
          height={40}
        />
        <h1 className="font-bold text-2xl">
          {process.env.NEXT_PUBLIC_PAGE_TITLE ?? "External Switch Status" }
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