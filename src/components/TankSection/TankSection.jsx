import React from 'react';
import { Droplets } from 'lucide-react';

const TankSection = () => {
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-br from-cyan-50 to-blue-100 rounded-2xl p-8 border border-cyan-200">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center">
          <Droplets className="w-8 h-8 text-cyan-600 mr-3" />
          Tanque de Almacenamiento 500L
        </h2>
        <p className="text-gray-700 text-lg">
          Recipiente cilíndrico vertical de polietileno de alta densidad para 
          almacenamiento de agua.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl p-6 border shadow-sm">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Especificaciones Técnicas
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="font-medium text-gray-700">Capacidad:</span>
              <span className="text-gray-800">500 Litros</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="font-medium text-gray-700">Diámetro Inferior:</span>
              <span className="text-gray-800">0.65 m</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="font-medium text-gray-700">Diámetro Superior:</span>
              <span className="text-gray-800">1.02 m</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="font-medium text-gray-700">Altura:</span>
              <span className="text-gray-800">1.15 m</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="font-medium text-gray-700">Material:</span>
              <span className="text-gray-800">PEAD</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border shadow-sm">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Características del Diseño
          </h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="bg-cyan-500 w-3 h-3 rounded-full mt-2"></div>
              <div>
                <p className="font-medium text-gray-800">Forma Cilíndrica Vertical</p>
                <p className="text-gray-600">
                  Diseño optimizado basado en tanques comerciales estándar
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-blue-500 w-3 h-3 rounded-full mt-2"></div>
              <div>
                <p className="font-medium text-gray-800">Superficie Translúcida</p>
                <p className="text-gray-600">
                  Simula polietileno de alta densidad con texturas realistas
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-indigo-500 w-3 h-3 rounded-full mt-2"></div>
              <div>
                <p className="font-medium text-gray-800">Tapa Superior Removible</p>
                <p className="text-gray-600">Acceso para mantenimiento y limpieza</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-purple-500 w-3 h-3 rounded-full mt-2"></div>
              <div>
                <p className="font-medium text-gray-800">Orificios de Conexión</p>
                <p className="text-gray-600">Entrada y salida para válvulas y sensores</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 border shadow-sm">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Proceso de Modelado</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-cyan-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl font-bold text-cyan-600">1</span>
            </div>
            <h4 className="font-medium text-gray-800 mb-2">Diseño Base</h4>
            <p className="text-gray-600 text-sm">
              Modelado del tanque sin texturas siguiendo dimensiones reales
            </p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl font-bold text-blue-600">2</span>
            </div>
            <h4 className="font-medium text-gray-800 mb-2">Texturización</h4>
            <p className="text-gray-600 text-sm">
              Aplicación de materiales y etiquetas comerciales
            </p>
          </div>
          <div className="text-center">
            <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl font-bold text-indigo-600">3</span>
            </div>
            <h4 className="font-medium text-gray-800 mb-2">Tapa y Detalles</h4>
            <p className="text-gray-600 text-sm">
              Diseño de tapa removible y detalles estructurales
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TankSection;