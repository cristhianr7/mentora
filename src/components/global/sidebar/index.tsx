import Image from "next/image"
import React from "react"
import UserButton from "./user-button"
import { MENU_ITEMS } from "@/constants/navigation"
import MenuButton from "./menu-button"

export default function SideBar() {
  return (
    <nav className="fixed bottom-0 z-50 flex h-20 w-full items-center justify-between gap-6 border-t-2 bg-background px-6 sm:left-0 sm:top-0 sm:h-screen sm:w-20 sm:flex-col sm:border-r-2 sm:border-t-0 sm:px-0 sm:py-6 lg:w-64 lg:px-6">
      <div className="flex grow items-center sm:flex-col sm:gap-6">
        <div className="hidden items-center justify-center gap-3 sm:flex">
          <Image
            src="/mentora.svg"
            alt="Mentora Logo"
            width={40}
            height={40}
            priority
          />
          <span className="hidden text-2xl font-bold text-primary lg:block">
            Mentora
          </span>
        </div>
        <div className="flex w-full justify-between gap-3 sm:flex-col">
          {MENU_ITEMS.map((item) => (
            <MenuButton key={item.id} {...item} />
          ))}
        </div>
      </div>
      <UserButton />
    </nav>
  )
}
