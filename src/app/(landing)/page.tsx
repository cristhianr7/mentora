import SignInModal from "@/components/auth/sign-in-modal";
import { AuroraBackground } from "@/components/ui/aurora-background";

export default function Home() {
  return (
    <AuroraBackground className="p-6 min-h-screen flex flex-col items-center justify-center">
      <main className="flex flex-col items-center">
        <p className="flex font-medium items-center mb-6 rounded-full border border-sky-700 bg-sky-50 px-3 h-9 text-sm text-sky-700 dark:border-sky-400 dark:bg-sky-950 dark:text-sky-400">
          ✨ Plataforma Impulsada con Inteligencia Artificial
        </p>
        <h1 className="text-center max-w-2xl">
          Domina la Programación de Forma Inteligente
        </h1>
        <p className="text-xl font-medium mt-6 max-w-2xl text-center text-muted-foreground">
          Aprende a programar con lecciones adaptativas que se ajustan a tu
          ritmo. ¡Empieza hoy y alcanza tus metas en programación!
        </p>
        <SignInModal />
      </main>
    </AuroraBackground>
  );
}
