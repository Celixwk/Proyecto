import React from 'react';
import { Activity, Gauge, Zap } from 'lucide-react';
import SensorDemo from './SensorDemo';

const SensorSection = () => {
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-br from-purple-50 to-indigo-100 rounded-2xl p-8 border border-purple-200">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center">
          <Activity className="w-8 h-8 text-purple-600 mr-3" />
          Sensor Ultrasónico HC-SR04
        </h2>
        <p className="text-gray-700 text-lg">
          Dispositivo de medición de distancias basado en el principio de tiempo de 
          vuelo de ondas ultrasónicas.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl p-6 border shadow-sm">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Especificaciones del Sensor
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="font-medium text-gray-700">Dimensiones:</span>
              <span className="text-gray-800">45 × 20 × 15 mm</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="font-medium text-gray-700">Transductores:</span>
              <span className="text-gray-800">2 (Emisor + Receptor)</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="font-medium text-gray-700">Principio:</span>
              <span className="text-gray-800">Tiempo de vuelo</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="font-medium text-gray-700">Material Carcasa:</span>
              <span className="text-gray-800">Plástico</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="font-medium text-gray-700">Transductores:</span>
              <span className="text-gray-800">Aluminio</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border shadow-sm">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Componentes del Modelo 3D
          </h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="bg-purple-500 w-3 h-3 rounded-full mt-2"></div>
              <div>
                <p className="font-medium text-gray-800">Cuerpo Rectangular</p>
                <p className="text-gray-600">
                  Estructura principal del dispositivo con dimensiones precisas
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-indigo-500 w-3 h-3 rounded-full mt-2"></div>
              <div>
                <p className="font-medium text-gray-800">Transductores Circulares</p>
                <p className="text-gray-600">Emisor y receptor de ondas ultrasónicas</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-blue-500 w-3 h-3 rounded-full mt-2"></div>
              <div>
                <p className="font-medium text-gray-800">Circuitos y Conexiones</p>
                <p className="text-gray-600">Detalles eléctricos y PCB del sensor</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-cyan-500 w-3 h-3 rounded-full mt-2"></div>
              <div>
                <p className="font-medium text-gray-800">Texturas Realistas</p>
                <p className="text-gray-600">
                  Colores y acabados similares al dispositivo real
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 border shadow-sm">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Funcionamiento en el Sistema
        </h3>
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                <Gauge className="w-5 h-5 text-purple-500 mr-2" />
                Medición de Nivel
              </h4>
              <p className="text-gray-700 text-sm mb-3">
                El sensor mide la distancia hasta la superficie del agua utilizando 
                ondas ultrasónicas.
              </p>
              <div className="bg-white rounded p-3 text-xs font-mono text-gray-600">
                d_agua = (v_sonido × t_vuelo) / 2
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                <Zap className="w-5 h-5 text-indigo-500 mr-2" />
                Control Automático
              </h4>
              <p className="text-gray-700 text-sm mb-3">
                Basado en la lectura de nivel, controla las válvulas de entrada y salida.
              </p>
              <div className="bg-white rounded p-3 text-xs font-mono text-gray-600">
                h = d_fondo - d_agua
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Demostración Interactiva del Sensor */}
      <SensorDemo />
    </div>
  );
};

export default SensorSection;