import { Button } from "@/components/ui/button"
import { Gauge, Play, Database, Settings } from "lucide-react"

export default function SidebarNav({ active = "panel" }) {
  return (
    <div className="space-y-1">
      <Button 
        variant={active === "panel" ? "secondary" : "ghost"} 
        className="w-full justify-start gap-2"
      >
        <Gauge className="h-4 w-4" /> Panel
      </Button>

      <Button 
        variant={active === "simulacion" ? "secondary" : "ghost"} 
        className="w-full justify-start gap-2"
      >
        <Play className="h-4 w-4" /> Simulación
      </Button>

      <Button 
        variant={active === "historico" ? "secondary" : "ghost"} 
        className="w-full justify-start gap-2"
      >
        <Database className="h-4 w-4" /> Histórico
      </Button>

      <Button 
        variant={active === "config" ? "secondary" : "ghost"} 
        className="w-full justify-start gap-2"
      >
        <Settings className="h-4 w-4" /> Configuración
      </Button>
    </div>
  )
}
