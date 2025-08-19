import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AspectRatio } from "@/components/ui/aspect-ratio"

export default function DemoAspect() {
  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Ejemplo con AspectRatio</CardTitle>
      </CardHeader>
      <CardContent>
        <AspectRatio ratio={16 / 9} className="bg-muted">
          <img
            src="https://placekitten.com/800/450"
            alt="Ejemplo"
            className="h-full w-full object-cover rounded-md"
          />
        </AspectRatio>
      </CardContent>
    </Card>
  )
}
