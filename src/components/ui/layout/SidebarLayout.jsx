import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { MoreVertical, PanelLeft } from "lucide-react"

const NavItem = ({ active, children, ...props }) => (
  <Button variant={active ? "secondary" : "ghost"} className="w-full justify-start" {...props}>
    {children}
  </Button>
)

export default function SidebarLayout({ title, subtitle, sidebar, children, rightActions }) {
  const [open, setOpen] = useState(false)

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background text-foreground">
        {/* Topbar */}
        <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3 flex items-center gap-3">
            {/* Mobile toggle */}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="outline" size="icon" aria-label="Abrir menú">
                  <PanelLeft className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-[280px]">
                <div className="h-14 flex items-center px-4 font-semibold">Menú</div>
                <Separator />
                <ScrollArea className="h-[calc(100vh-3.5rem)] px-3 py-2">
                  {sidebar}
                </ScrollArea>
              </SheetContent>
            </Sheet>

            <div className="flex-1">
              <h1 className="text-xl sm:text-2xl font-semibold leading-tight">{title}</h1>
              {subtitle ? <p className="text-sm text-muted-foreground">{subtitle}</p> : null}
            </div>

            <div className="flex items-center gap-2">
              {rightActions}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" aria-label="Más">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Acciones</TooltipContent>
              </Tooltip>
            </div>
          </div>
        </header>

        {/* Grid principal */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 grid lg:grid-cols-[260px_1fr] gap-6">
          {/* Sidebar desktop */}
          <aside className="hidden lg:block">
            <div className="rounded-2xl border bg-card">
              <div className="h-12 px-4 flex items-center justify-between">
                <span className="font-medium">Navegación</span>
                <Badge variant="secondary">v1</Badge>
              </div>
              <Separator />
              <ScrollArea className="h-[calc(100vh-14rem)] px-3 py-2">
                {sidebar}
              </ScrollArea>
            </div>
          </aside>

          {/* Contenido */}
          <main className="space-y-6">{children}</main>
        </div>
      </div>
    </TooltipProvider>
  )
}
