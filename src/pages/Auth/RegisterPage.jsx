import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";



export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !pass1 || !pass2) return toast.error("Completa todos los campos");
    if (pass1.length < 6) return toast.error("La contraseña debe tener al menos 6 caracteres");
    if (pass1 !== pass2) return toast.error("Las contraseñas no coinciden");

    setSubmitting(true);
    try {
      await register({ name, email, password: pass1 });
      toast.success("Cuenta creada. Ahora inicia sesión.");
      navigate("/login");
    } catch (err) {
      toast.error(err.message || "No se pudo registrar");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen grid place-items-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Crear cuenta</CardTitle>
          <CardDescription>Regístrate para acceder al dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={onSubmit}>
            <div className="space-y-2">
              <Label htmlFor="name">Nombre</Label>
              <Input id="name" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Tu nombre" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Correo</Label>
              <Input id="email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="tucorreo@demo.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pass1">Contraseña</Label>
              <Input id="pass1" type="password" value={pass1} onChange={(e)=>setPass1(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pass2">Repetir contraseña</Label>
              <Input id="pass2" type="password" value={pass2} onChange={(e)=>setPass2(e.target.value)} />
            </div>
            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? "Creando…" : "Crear cuenta"}
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              ¿Ya tienes cuenta? <Link to="/login" className="underline">Inicia sesión</Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
