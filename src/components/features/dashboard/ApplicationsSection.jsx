import React from 'react';
import { Target, Monitor, BookOpen, Zap, Gauge } from 'lucide-react';
import { Alert, AlertDescription } from "../../common/Alert/alert";


const ApplicationsSection = () => {
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-br from-indigo-50 to-purple-100 rounded-2xl p-8 border border-indigo-200">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center">
          <Target className="w-8 h-8 text-indigo-600 mr-3" />
          Aplicaciones y Alcances
        </h2>
        <p className="text-gray-700 text-lg">
          Implementación del gemelo digital en sistemas de realidad aumentada y 
          simulación educativa.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl p-6 border shadow-sm">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <Monitor className="w-5 h-5 text-blue-500 mr-2" />
            Aplicación Principal
          </h3>
          <div className="space-y-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-800 mb-2">Realidad Aumentada</h4>
              <p className="text-gray-600 text-sm">
                Implementación en Unity para simulaciones interactivas que permiten 
                visualizar y comprender el funcionamiento del sistema de control de agua.
              </p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-800 mb-2">Simulación Educativa</h4>
              <p className="text-gray-600 text-sm">
                Herramienta didáctica para estudiantes de ingeniería, facilitando la 
                comprensión de sistemas de control automatizado.
              </p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-800 mb-2">Entorno Seguro</h4>
              <p className="text-gray-600 text-sm">
                Permite experimentación sin riesgos físicos ni costos de equipos reales.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border shadow-sm">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <BookOpen className="w-5 h-5 text-green-500 mr-2" />
            Beneficios Educativos
          </h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="bg-green-500 w-3 h-3 rounded-full mt-2"></div>
              <div>
                <p className="font-medium text-gray-800">Visualización Interactiva</p>
                <p className="text-gray-600 text-sm">
                  Comprensión clara del funcionamiento de cada componente
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-blue-500 w-3 h-3 rounded-full mt-2"></div>
              <div>
                <p className="font-medium text-gray-800">Experimentación Virtual</p>
                <p className="text-gray-600 text-sm">
                  Modificación de parámetros sin consecuencias físicas
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-purple-500 w-3 h-3 rounded-full mt-2"></div>
              <div>
                <p className="font-medium text-gray-800">Reducción de Costos</p>
                <p className="text-gray-600 text-sm">
                  Eliminación de equipos físicos para entrenamiento
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-indigo-500 w-3 h-3 rounded-full mt-2"></div>
              <div>
                <p className="font-medium text-gray-800">Accesibilidad</p>
                <p className="text-gray-600 text-sm">
                  Disponible en múltiples dispositivos móviles
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 border shadow-sm">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Funcionalidades Proyectadas
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium text-gray-800 flex items-center">
              <Zap className="w-4 h-4 text-yellow-500 mr-2" />
              Características Actuales
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center p-2 bg-green-50 rounded">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span>Modelos 3D de alta calidad</span>
              </div>
              <div className="flex items-center p-2 bg-green-50 rounded">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span>Ecuaciones matemáticas implementadas</span>
              </div>
              <div className="flex items-center p-2 bg-green-50 rounded">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span>Texturas y materiales realistas</span>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-medium text-gray-800 flex items-center">
              <Gauge className="w-4 h-4 text-blue-500 mr-2" />
              Mejoras Futuras
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center p-2 bg-blue-50 rounded">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                <span>Animaciones de funcionamiento</span>
              </div>
              <div className="flex items-center p-2 bg-blue-50 rounded">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                <span>Interacción con parámetros en tiempo real</span>
              </div>
              <div className="flex items-center p-2 bg-blue-50 rounded">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                <span>Conexión con sistemas físicos</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Alert className="border-indigo-200 bg-indigo-50">
        <Target className="h-4 w-4" />
        <AlertDescription className="text-indigo-800">
          <strong>Impacto Esperado:</strong> Esta herramienta revolucionará la enseñanza 
          de sistemas de control, proporcionando una experiencia inmersiva y educativa 
          que complementa la formación teórica con práctica virtual.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default ApplicationsSection;