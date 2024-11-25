import React from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog"
import Image from "next/image"
import SocialButton from "./social-button"

export default function SignInModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mt-12 w-full sm:w-auto" size="lg">
          Empezar Ahora
          <ArrowRight className="ml-2" size={28} />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md gap-6">
        <DialogHeader className="flex flex-col items-center space-y-3">
          <Image
            src="/mentora.svg"
            alt="Mentora Logo"
            width={48}
            height={48}
            priority
          />
          <h2>Iniciar sesión</h2>
          <DialogDescription className=" text-center">
            Esto es estrictamente para fines de demostración: solo se
            almacenarán su correo electrónico, nombre y su foto de perfil.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <SocialButton />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
