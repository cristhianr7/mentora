import SideBar from "@/components/global/sidebar"
import React from "react"

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <SideBar />
      <main className="mb-20 flex-1 sm:mb-0 sm:ml-20 lg:ml-64">{children}</main>
    </>
  )
}
