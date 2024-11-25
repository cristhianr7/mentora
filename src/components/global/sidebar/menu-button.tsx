"use client"
import React from "react"
import { MenuProps, IconMap } from "@/constants/navigation"
import { Button } from "../../ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export default function MenuButton({ label, icon, path }: MenuProps) {
  const pathname = usePathname()
  const isActive = pathname === `/${path}`
  const Icon = IconMap[icon]

  return (
    <Button
      asChild
      size="lg"
      variant="ghost"
      className={cn(
        "h-14 w-14 p-0 lg:h-12 lg:w-full lg:justify-start lg:px-8",
        {
          "bg-accent": isActive,
        },
      )}
    >
      <Link href={`/${path}`}>
        <Icon size={24} className="lg:mr-2" strokeWidth={2.5} />
        <span className="hidden lg:inline">{label}</span>
      </Link>
    </Button>
  )
}
