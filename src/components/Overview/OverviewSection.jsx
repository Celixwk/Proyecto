import React from 'react';
import { Waves, Droplets, Activity, Settings, Monitor } from 'lucide-react';
import { Alert, AlertDescription } from "../Alert/alert";


const OverviewSection = () => {
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 border border-blue-200">
        <div className="flex items-center space-x-4 mb-6">
          <div className="bg-blue-500 p-3 rounded-full">
            <Waves className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Gemelo Digital - Sistema de Control de Agua
            </h1>
            <p className="text-gray-600 text-lg">
              Universidad de la Amazonia - Programa de Ingeniería de Sistemas
            </p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">Autores</h3>
            <div className="space-y-2">
              <p className="text-gray-700">• [Autor 1]</p>
              <p className="text-gray-700">• [Autor 2]</p>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">Ubicación</h3>
            <p className="text-gray-700">
              Florencia - Caquetá<br/>2025-1
            </p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 border shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3 mb-4">
            <Droplets className="w-6 h-6 text-cyan-500" />
            <h3 className="font-semibold text-gray-800">Tanque de Agua</h3>
          </div>
          <p className="text-gray-600">
            Capacidad de 500 litros con estructura cilíndrica vertical de polietileno de alta densidad.
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3 mb-4">
            <Activity className="w-6 h-6 text-purple-500" />
            <h3 className="font-semibold text-gray-800">Sensor Ultrasónico</h3>
          </div>
          <p className="text-gray-600">
            HC-SR04 para medición de nivel de agua mediante principio de tiempo de vuelo.
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3 mb-4">
            <Settings className="w-6 h-6 text-orange-500" />
            <h3 className="font-semibold text-gray-800">Válvulas Solenoides</h3>
          </div>
          <p className="text-gray-600">
            Actuadores electromecánicos para control de flujo de entrada y salida de agua.
          </p>
        </div>
      </div>

      <Alert className="border-blue-200 bg-blue-50">
        <Monitor className="h-4 w-4" />
        <AlertDescription className="text-blue-800">
          Este gemelo digital será implementado en Unity con realidad aumentada para 
          simulaciones interactivas y educativas.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default OverviewSection;