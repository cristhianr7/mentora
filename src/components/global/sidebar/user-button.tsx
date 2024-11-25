import React from "react"
import { Button } from "../../ui/button"
import { auth } from "@/auth"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Ellipsis } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import LogOutButton from "../../auth/log-out-button"

export default async function UserButton() {
  const session = await auth()
  const userName = session?.user?.name?.split(" ")[0] || ""
  const userImage = session?.user?.image || ""

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="lg"
          variant="ghost"
          className="size-14 p-0 lg:h-12 lg:w-full lg:px-8"
        >
          <Avatar className="size-8 lg:mr-2">
            <AvatarImage src={userImage} alt={userName} />
            <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="hidden lg:inline">{userName}</span>
          <Ellipsis
            size={24}
            className="ml-2 hidden lg:inline"
            strokeWidth={2.5}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-52">
        <DropdownMenuItem>Perfil</DropdownMenuItem>
        <DropdownMenuItem>Configuración</DropdownMenuItem>
        <DropdownMenuSeparator />
        <AlertDialog>
          <AlertDialogTrigger className="flex h-10 w-full cursor-default select-none items-center rounded-sm px-3 font-semibold outline-none transition-colors hover:bg-accent hover:text-accent-foreground">
            Cerrar sesión
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                ¿Estás seguro de que quieres cerrar sesión?
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <LogOutButton />
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
