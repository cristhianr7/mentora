import React from "react"
import { Button } from "../ui/button"
import { FaGoogle } from "react-icons/fa"
import { signIn } from "@/auth"

export default function SocialButton() {
  return (
    <form
      className="w-full"
      action={async () => {
        "use server"
        await signIn("google", { redirectTo: "/courses" })
      }}
    >
      <Button type="submit" className="w-full" variant="outline" size="lg">
        <FaGoogle className="mr-2 size-4" />
        Continuar con Google
      </Button>
    </form>
  )
}
