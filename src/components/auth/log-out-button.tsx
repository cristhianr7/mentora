import React from "react"
import { Button } from "../ui/button"
import { signOut } from "@/auth"

export default function LogOutButton() {
  return (
    <form
      action={async () => {
        "use server"
        await signOut({ redirectTo: "/" })
      }}
    >
      <Button type="submit" className="w-full" variant="destructive">
        Cerrar sesión
      </Button>
    </form>
  )
}
