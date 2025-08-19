import React, { useState } from 'react';
import { 
  Gauge, 
  Droplets, 
  Settings, 
  Monitor, 
  BookOpen, 
  Target,
  Beaker,
  Zap,
  Activity,
  BarChart3,
  FileText,
  ChevronLeft,
  ChevronRight,
  Waves,
  Container,
  Cpu
} from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const DigitalTwinDashboard = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const sidebarItems = [
    { id: 'overview', label: 'Resumen General', icon: Monitor, color: 'text-blue-500' },
    { id: 'components', label: 'Componentes 3D', icon: Container, color: 'text-green-500' },
    { id: 'tank', label: 'Tanque 500L', icon: Droplets, color: 'text-cyan-500' },
    { id: 'sensor', label: 'Sensor HC-SR04', icon: Activity, color: 'text-purple-500' },
    { id: 'valve', label: 'Válvula Solenoide', icon: Settings, color: 'text-orange-500' },
    { id: 'mathematics', label: 'Modelos Matemáticos', icon: BarChart3, color: 'text-red-500' },
    { id: 'applications', label: 'Aplicaciones', icon: Target, color: 'text-indigo-500' },
    { id: 'conclusions', label: 'Conclusiones', icon: FileText, color: 'text-gray-500' }
  ];

  const renderContent = () => {
    switch(activeSection) {
      case 'overview':
        return (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 border border-blue-200">
              <div className="flex items-center space-x-4 mb-6">
                <div className="bg-blue-500 p-3 rounded-full">
                  <Waves className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-800">Gemelo Digital - Sistema de Control de Agua</h1>
                  <p className="text-gray-600 text-lg">Universidad de la Amazonia - Programa de Ingeniería de Sistemas</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-800">Autores</h3>
                  <div className="space-y-2">
                    <p className="text-gray-700">• </p>
                    <p className="text-gray-700">• </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-800">Ubicación</h3>
                  <p className="text-gray-700">Florencia - Caquetá<br/>2025-1</p>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 border shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3 mb-4">
                  <Droplets className="w-6 h-6 text-cyan-500" />
                  <h3 className="font-semibold text-gray-800">Tanque de Agua</h3>
                </div>
                <p className="text-gray-600">Capacidad de 500 litros con estructura cilíndrica vertical de polietileno de alta densidad.</p>
              </div>

              <div className="bg-white rounded-xl p-6 border shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3 mb-4">
                  <Activity className="w-6 h-6 text-purple-500" />
                  <h3 className="font-semibold text-gray-800">Sensor Ultrasónico</h3>
                </div>
                <p className="text-gray-600">HC-SR04 para medición de nivel de agua mediante principio de tiempo de vuelo.</p>
              </div>

              <div className="bg-white rounded-xl p-6 border shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3 mb-4">
                  <Settings className="w-6 h-6 text-orange-500" />
                  <h3 className="font-semibold text-gray-800">Válvulas Solenoides</h3>
                </div>
                <p className="text-gray-600">Actuadores electromecánicos para control de flujo de entrada y salida de agua.</p>
              </div>
            </div>

            <Alert className="border-blue-200 bg-blue-50">
              <Monitor className="h-4 w-4" />
              <AlertDescription className="text-blue-800">
                Este gemelo digital será implementado en Unity con realidad aumentada para simulaciones interactivas y educativas.
              </AlertDescription>
            </Alert>
          </div>
        );

      case 'components':
        return (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-green-50 to-emerald-100 rounded-2xl p-8 border border-green-200">
              <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center">
                <Container className="w-8 h-8 text-green-600 mr-3" />
                Diseño en 3D de los Objetos
              </h2>
              <p className="text-gray-700 text-lg">Representación tridimensional precisa de cada componente del sistema.</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6 border shadow-sm">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <Beaker className="w-5 h-5 text-blue-500 mr-2" />
                  Fase 1: Herramientas
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-orange-500 w-3 h-3 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium text-gray-800">Blender</p>
                      <p className="text-gray-600">Modelado 3D con alta flexibilidad para objetos tridimensionales.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-purple-500 w-3 h-3 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium text-gray-800">Illustrator</p>
                      <p className="text-gray-600">Creación de imágenes vectoriales y elementos gráficos de alta calidad.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border shadow-sm">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <Target className="w-5 h-5 text-green-500 mr-2" />
                  Fase 2: Características
                </h3>
                <div className="space-y-3">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="font-medium text-gray-800">Dimensiones Precisas</p>
                    <p className="text-gray-600 text-sm">Medidas exactas basadas en objetos reales</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="font-medium text-gray-800">Materiales Simulados</p>
                    <p className="text-gray-600 text-sm">Texturas realistas de polietileno, metal y plástico</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="font-medium text-gray-800">Comportamiento Dinámico</p>
                    <p className="text-gray-600 text-sm">Interacciones funcionales entre componentes</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <Cpu className="w-5 h-5 text-purple-500 mr-2" />
                Fase 3: Elementos Digitales
              </h3>
              <p className="text-gray-700 mb-4">Cada componente fue modelado con precisión considerando sus características físicas y funcionales:</p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-cyan-50 rounded-lg">
                  <Droplets className="w-12 h-12 text-cyan-500 mx-auto mb-2" />
                  <p className="font-medium text-gray-800">Tanque</p>
                  <p className="text-sm text-gray-600">500L cilíndrico</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Activity className="w-12 h-12 text-purple-500 mx-auto mb-2" />
                  <p className="font-medium text-gray-800">Sensor</p>
                  <p className="text-sm text-gray-600">HC-SR04</p>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <Settings className="w-12 h-12 text-orange-500 mx-auto mb-2" />
                  <p className="font-medium text-gray-800">Válvula</p>
                  <p className="text-sm text-gray-600">Solenoide</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'tank':
        return (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-cyan-50 to-blue-100 rounded-2xl p-8 border border-cyan-200">
              <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center">
                <Droplets className="w-8 h-8 text-cyan-600 mr-3" />
                Tanque de Almacenamiento 500L
              </h2>
              <p className="text-gray-700 text-lg">Recipiente cilíndrico vertical de polietileno de alta densidad para almacenamiento de agua.</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6 border shadow-sm">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Especificaciones Técnicas</h3>
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
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Características del Diseño</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-cyan-500 w-3 h-3 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium text-gray-800">Forma Cilíndrica Vertical</p>
                      <p className="text-gray-600">Diseño optimizado basado en tanques comerciales estándar</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-500 w-3 h-3 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium text-gray-800">Superficie Translúcida</p>
                      <p className="text-gray-600">Simula polietileno de alta densidad con texturas realistas</p>
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
                  <p className="text-gray-600 text-sm">Modelado del tanque sin texturas siguiendo dimensiones reales</p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl font-bold text-blue-600">2</span>
                  </div>
                  <h4 className="font-medium text-gray-800 mb-2">Texturización</h4>
                  <p className="text-gray-600 text-sm">Aplicación de materiales y etiquetas comerciales</p>
                </div>
                <div className="text-center">
                  <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl font-bold text-indigo-600">3</span>
                  </div>
                  <h4 className="font-medium text-gray-800 mb-2">Tapa y Detalles</h4>
                  <p className="text-gray-600 text-sm">Diseño de tapa removible y detalles estructurales</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'sensor':
        return (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-purple-50 to-indigo-100 rounded-2xl p-8 border border-purple-200">
              <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center">
                <Activity className="w-8 h-8 text-purple-600 mr-3" />
                Sensor Ultrasónico HC-SR04
              </h2>
              <p className="text-gray-700 text-lg">Dispositivo de medición de distancias basado en el principio de tiempo de vuelo de ondas ultrasónicas.</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6 border shadow-sm">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Especificaciones del Sensor</h3>
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
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Componentes del Modelo 3D</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-purple-500 w-3 h-3 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium text-gray-800">Cuerpo Rectangular</p>
                      <p className="text-gray-600">Estructura principal del dispositivo con dimensiones precisas</p>
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
                      <p className="text-gray-600">Colores y acabados similares al dispositivo real</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Funcionamiento en el Sistema</h3>
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <Gauge className="w-5 h-5 text-purple-500 mr-2" />
                      Medición de Nivel
                    </h4>
                    <p className="text-gray-700 text-sm mb-3">El sensor mide la distancia hasta la superficie del agua utilizando ondas ultrasónicas.</p>
                    <div className="bg-white rounded p-3 text-xs font-mono text-gray-600">
                      d_agua = (v_sonido × t_vuelo) / 2
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <Zap className="w-5 h-5 text-indigo-500 mr-2" />
                      Control Automático
                    </h4>
                    <p className="text-gray-700 text-sm mb-3">Basado en la lectura de nivel, controla las válvulas de entrada y salida.</p>
                    <div className="bg-white rounded p-3 text-xs font-mono text-gray-600">
                      h = d_fondo - d_agua
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'valve':
        return (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-orange-50 to-red-100 rounded-2xl p-8 border border-orange-200">
              <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center">
                <Settings className="w-8 h-8 text-orange-600 mr-3" />
                Válvula Solenoide
              </h2>
              <p className="text-gray-700 text-lg">Actuador electromecánico para el control preciso del flujo de agua en el sistema.</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6 border shadow-sm">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Especificaciones Técnicas</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-700">Dimensiones:</span>
                    <span className="text-gray-800">80 × 32 × 70 mm</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-700">Entrada:</span>
                    <span className="text-gray-800">Rosca 1/2"</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-700">Salida:</span>
                    <span className="text-gray-800">Manguera 1/2"</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-700">Tipo:</span>
                    <span className="text-gray-800">Normalmente cerrada</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-700">Actuación:</span>
                    <span className="text-gray-800">Electromagnética</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border shadow-sm">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Componentes Modelados</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-orange-500 w-3 h-3 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium text-gray-800">Bobina Electromagnética</p>
                      <p className="text-gray-600">Genera campo magnético para activación</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-red-500 w-3 h-3 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium text-gray-800">Cubierta Metálica</p>
                      <p className="text-gray-600">Protección con etiquetas técnicas</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-yellow-500 w-3 h-3 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium text-gray-800">Mecanismo Interno</p>
                      <p className="text-gray-600">Émbolo, resorte y sello de goma</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-500 w-3 h-3 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium text-gray-800">Conexiones de Flujo</p>
                      <p className="text-gray-600">Entrada y salida para tuberías</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Estados de Funcionamiento</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-lg p-6 border border-green-200">
                  <div className="flex items-center mb-3">
                    <div className="bg-green-500 w-3 h-3 rounded-full mr-3"></div>
                    <h4 className="font-semibold text-gray-800">Estado Abierto</h4>
                  </div>
                  <p className="text-gray-700 text-sm mb-3">La bobina recibe señal eléctrica y el émbolo se desplaza, permitiendo el flujo de agua.</p>
                  <div className="bg-white rounded p-3 text-xs font-mono text-gray-600">
                    Estado = 1 (Señal activa)
                  </div>
                </div>

                <div className="bg-gradient-to-br from-red-50 to-rose-100 rounded-lg p-6 border border-red-200">
                  <div className="flex items-center mb-3">
                    <div className="bg-red-500 w-3 h-3 rounded-full mr-3"></div>
                    <h4 className="font-semibold text-gray-800">Estado Cerrado</h4>
                  </div>
                  <p className="text-gray-700 text-sm mb-3">Sin señal eléctrica, el resorte mantiene el émbolo en posición, bloqueando el flujo.</p>
                  <div className="bg-white rounded p-3 text-xs font-mono text-gray-600">
                    Estado = 0 (Sin señal)
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'mathematics':
        return (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-red-50 to-pink-100 rounded-2xl p-8 border border-red-200">
              <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center">
                <BarChart3 className="w-8 h-8 text-red-600 mr-3" />
                Modelos Matemáticos
              </h2>
              <p className="text-gray-700 text-lg">Ecuaciones fundamentales que rigen el comportamiento del sistema de control de nivel de agua.</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6 border shadow-sm">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <Activity className="w-5 h-5 text-purple-500 mr-2" />
                  Sensor Ultrasónico HC-SR04
                </h3>
                
                <div className="space-y-4">
                  <div className="bg-purple-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-800 mb-2">Cálculo de Distancia</h4>
                    <div className="bg-white rounded p-3 font-mono text-sm text-center border">
                      d<sub>agua</sub> = (v<sub>sonido</sub> × t<sub>vuelo</sub>) / 2
                    </div>
                    <p className="text-gray-600 text-sm mt-2">Donde v<sub>sonido</sub> = velocidad del sonido en el aire</p>
                  </div>

                  <div className="bg-indigo-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-800 mb-2">Nivel de Agua</h4>
                    <div className="bg-white rounded p-3 font-mono text-sm text-center border">
                      h = d<sub>fondo</sub> - d<sub>agua</sub>
                    </div>
                    <p className="text-gray-600 text-sm mt-2">h = altura del agua en el tanque</p>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-800 mb-2">Volumen de Agua</h4>
                    <div className="bg-white rounded p-3 font-mono text-sm text-center border">
                      V = π × r² × h
                    </div>
                    <p className="text-gray-600 text-sm mt-2">Para tanque cilíndrico</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border shadow-sm">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <Settings className="w-5 h-5 text-orange-500 mr-2" />
                  Válvulas Solenoides
                </h3>
                
                <div className="space-y-4">
                  <div className="bg-orange-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-800 mb-2">Caudal de Agua (Q)</h4>
                    <div className="bg-white rounded p-3 font-mono text-sm text-center border">
                      Q = A<sub>efectiva</sub> × √(2 × g × Δh)
                    </div>
                    <p className="text-gray-600 text-sm mt-2">A<sub>efectiva</sub> = área efectiva de paso</p>
                  </div>

                  <div className="bg-red-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-800 mb-2">Control de Apertura</h4>
                    <div className="bg-white rounded p-3 font-mono text-sm text-center border">
                      x(t) = u(t - T)
                    </div>
                    <p className="text-gray-600 text-sm mt-2">x = estado válvula, u = señal control, T = tiempo respuesta</p>
                  </div>

                  <div className="bg-yellow-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-800 mb-2">Conversión de Caudal</h4>
                    <div className="bg-white rounded p-3 font-mono text-sm text-center border">
                      Q<sub>L/s</sub> = Q<sub>m³/s</sub> × 1000
                    </div>
                    <p className="text-gray-600 text-sm mt-2">Conversión a litros por segundo</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Variables del Sistema</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-800 text-center">Sensor</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between p-2 bg-gray-50 rounded">
                      <span>v<sub>sonido</sub></span>
                      <span>343 m/s</span>
                    </div>
                    <div className="flex justify-between p-2 bg-gray-50 rounded">
                      <span>t<sub>vuelo</sub></span>
                      <span>Variable</span>
                    </div>
                    <div className="flex justify-between p-2 bg-gray-50 rounded">
                      <span>d<sub>fondo</sub></span>
                      <span>1.15 m</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-800 text-center">Tanque</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between p-2 bg-gray-50 rounded">
                      <span>Radio</span>
                      <span>0.325 m</span>
                    </div>
                    <div className="flex justify-between p-2 bg-gray-50 rounded">
                      <span>Altura</span>
                      <span>1.15 m</span>
                    </div>
                    <div className="flex justify-between p-2 bg-gray-50 rounded">
                      <span>V<sub>max</sub></span>
                      <span>500 L</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-800 text-center">Válvulas</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between p-2 bg-gray-50 rounded">
                      <span>Diámetro</span>
                      <span>1/2"</span>
                    </div>
                    <div className="flex justify-between p-2 bg-gray-50 rounded">
                      <span>Tiempo resp.</span>
                      <span>50-100 ms</span>
                    </div>
                    <div className="flex justify-between p-2 bg-gray-50 rounded">
                      <span>Presión op.</span>
                      <span>0-10 bar</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'applications':
        return (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-indigo-50 to-purple-100 rounded-2xl p-8 border border-indigo-200">
              <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center">
                <Target className="w-8 h-8 text-indigo-600 mr-3" />
                Aplicaciones y Alcances
              </h2>
              <p className="text-gray-700 text-lg">Implementación del gemelo digital en sistemas de realidad aumentada y simulación educativa.</p>
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
                    <p className="text-gray-600 text-sm">Implementación en Unity para simulaciones interactivas que permiten visualizar y comprender el funcionamiento del sistema de control de agua.</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-800 mb-2">Simulación Educativa</h4>
                    <p className="text-gray-600 text-sm">Herramienta didáctica para estudiantes de ingeniería, facilitando la comprensión de sistemas de control automatizado.</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-800 mb-2">Entorno Seguro</h4>
                    <p className="text-gray-600 text-sm">Permite experimentación sin riesgos físicos ni costos de equipos reales.</p>
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
                      <p className="text-gray-600 text-sm">Comprensión clara del funcionamiento de cada componente</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-500 w-3 h-3 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium text-gray-800">Experimentación Virtual</p>
                      <p className="text-gray-600 text-sm">Modificación de parámetros sin consecuencias físicas</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-purple-500 w-3 h-3 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium text-gray-800">Reducción de Costos</p>
                      <p className="text-gray-600 text-sm">Eliminación de equipos físicos para entrenamiento</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-indigo-500 w-3 h-3 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium text-gray-800">Accesibilidad</p>
                      <p className="text-gray-600 text-sm">Disponible en múltiples dispositivos móviles</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Funcionalidades Proyectadas</h3>
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
                <strong>Impacto Esperado:</strong> Esta herramienta revolucionará la enseñanza de sistemas de control, proporcionando una experiencia inmersiva y educativa que complementa la formación teórica con práctica virtual.
              </AlertDescription>
            </Alert>
          </div>
        );

      case 'conclusions':
        return (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-gray-50 to-slate-100 rounded-2xl p-8 border border-gray-200">
              <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center">
                <FileText className="w-8 h-8 text-gray-600 mr-3" />
                Conclusiones
              </h2>
              <p className="text-gray-700 text-lg">Resultados y logros obtenidos en el desarrollo del gemelo digital del sistema de control de nivel de agua.</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6 border shadow-sm">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <Gauge className="w-5 h-5 text-green-500 mr-2" />
                  Logros Principales
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-green-500 w-3 h-3 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium text-gray-800">Representación Fiel</p>
                      <p className="text-gray-600 text-sm">Modelos 3D precisos de tanque, sensor HC-SR04 y válvula solenoide</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-500 w-3 h-3 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium text-gray-800">Modelos Matemáticos</p>
                      <p className="text-gray-600 text-sm">Ecuaciones fundamentales para simulación realista del comportamiento</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-purple-500 w-3 h-3 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium text-gray-800">Optimización</p>
                      <p className="text-gray-600 text-sm">Rendimiento eficiente para dispositivos con recursos limitados</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-indigo-500 w-3 h-3 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium text-gray-800">Base Sólida</p>
                      <p className="text-gray-600 text-sm">Fundamento para aplicación de realidad aumentada en Unity</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border shadow-sm">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <Target className="w-5 h-5 text-orange-500 mr-2" />
                  Contribuciones
                </h3>
                <div className="space-y-4">
                  <div className="bg-orange-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-800 mb-2">Innovación Tecnológica</h4>
                    <p className="text-gray-600 text-sm">Integración de tecnologías emergentes como RA y simulación matemática en educación.</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-800 mb-2">Herramienta Educativa</h4>
                    <p className="text-gray-600 text-sm">Facilita aprendizaje de sistemas de control en entorno seguro y controlado.</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-800 mb-2">Metodología Replicable</h4>
                    <p className="text-gray-600 text-sm">Proceso sistemático aplicable a otros sistemas industriales.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Recomendaciones para Siguientes Etapas</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Zap className="w-8 h-8 text-blue-600" />
                  </div>
                  <h4 className="font-medium text-gray-800 mb-2">Dinámicas Avanzadas</h4>
                  <p className="text-gray-600 text-sm">Incorporar animaciones de funcionamiento y diferentes estados operativos del sistema</p>
                </div>
                <div className="text-center">
                  <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Monitor className="w-8 h-8 text-purple-600" />
                  </div>
                  <h4 className="font-medium text-gray-800 mb-2">Interactividad RA</h4>
                  <p className="text-gray-600 text-sm">Desarrollar mecanismos de interacción que permitan modificar parámetros en tiempo real</p>
                </div>
                <div className="text-center">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                    <BookOpen className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="font-medium text-gray-800 mb-2">Validación de Usuario</h4>
                  <p className="text-gray-600 text-sm">Realizar pruebas de usabilidad con usuarios finales para optimizar la experiencia</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <Activity className="w-5 h-5 text-blue-500 mr-2" />
                Impacto en Formación Técnica
              </h3>
              <p className="text-gray-700 mb-4">
                Este gemelo digital representa un avance significativo hacia la digitalización de la educación en ingeniería, 
                proporcionando una herramienta que combina teoría y práctica virtual de manera efectiva.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-medium text-gray-800 mb-2">Beneficios Inmediatos</h4>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• Comprensión visual de sistemas complejos</li>
                    <li>• Experimentación sin riesgos físicos</li>
                    <li>• Acceso remoto a laboratorios virtuales</li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-medium text-gray-800 mb-2">Proyección Futura</h4>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• Integración con sistemas IoT reales</li>
                    <li>• Expansión a otros procesos industriales</li>
                    <li>• Formación técnica especializada</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return <div>Selecciona una sección del menú</div>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`bg-white shadow-xl transition-all duration-300 ${sidebarCollapsed ? 'w-16' : 'w-80'} flex flex-col`}>
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {!sidebarCollapsed && (
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-lg">
                  <Waves className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-800">Gemelo Digital</h1>
                  <p className="text-xs text-gray-500">Control de Agua</p>
                </div>
              </div>
            )}
            <button 
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {sidebarItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  activeSection === item.id 
                    ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 text-blue-700' 
                    : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                <IconComponent className={`w-5 h-5 ${item.color} flex-shrink-0`} />
                {!sidebarCollapsed && (
                  <span className="font-medium text-left truncate">{item.label}</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          {!sidebarCollapsed && (
            <div className="text-center">
              <p className="text-xs text-gray-500 mb-1">Universidad de la Amazonia</p>
              <p className="text-xs text-gray-400">Ingeniería de Sistemas</p>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto p-8">
          <div className="max-w-6xl mx-auto">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalTwinDashboard;