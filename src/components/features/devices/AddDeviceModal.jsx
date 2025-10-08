import React, { useState } from 'react';
import { X, MapPin, Settings, Droplets, Wifi, Save, AlertCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import LoadingSpinner, { LoadingButton } from '@/components/common/LoadingSpinner';

export default function AddDeviceModal({ isOpen, onClose, onSave }) {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm({
    defaultValues: {
      name: '',
      type: 'tank',
      capacity: 500,
      unit: 'liters',
      location: '',
      building: '',
      floor: '',
      room: '',
      description: '',
      manufacturer: '',
      model: '',
      serialNumber: '',
      installationDate: '',
      maintenanceInterval: 30,
      status: 'active'
    }
  });

  const deviceType = watch('type');

  const deviceTypes = [
    { value: 'tank', label: 'Tanque de Agua', icon: Droplets },
    { value: 'sensor', label: 'Sensor Ultrasónico', icon: Wifi },
    { value: 'valve', label: 'Válvula Solenoide', icon: Settings },
    { value: 'controller', label: 'Controlador IoT', icon: Settings },
    { value: 'pump', label: 'Bomba de Agua', icon: Settings }
  ];

  const capacityUnits = {
    tank: [
      { value: 'liters', label: 'Litros' },
      { value: 'gallons', label: 'Galones' },
      { value: 'cubic_meters', label: 'Metros Cúbicos' }
    ],
    sensor: [
      { value: 'meters', label: 'Metros' },
      { value: 'centimeters', label: 'Centímetros' },
      { value: 'millimeters', label: 'Milímetros' }
    ],
    valve: [
      { value: 'inches', label: 'Pulgadas' },
      { value: 'millimeters', label: 'Milímetros' }
    ],
    controller: [
      { value: 'units', label: 'Unidades' }
    ],
    pump: [
      { value: 'hp', label: 'Caballos de Fuerza' },
      { value: 'watts', label: 'Watts' }
    ]
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Simular guardado (aquí conectarías con tu API)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const deviceData = {
        id: Date.now().toString(),
        ...data,
        createdAt: new Date().toISOString(),
        status: 'active',
        lastMaintenance: null,
        nextMaintenance: new Date(Date.now() + data.maintenanceInterval * 24 * 60 * 60 * 1000).toISOString()
      };

      onSave(deviceData);
      toast.success('Dispositivo agregado exitosamente');
      reset();
      onClose();
    } catch (error) {
      toast.error('Error al agregar el dispositivo');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg">
              <Settings className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Agregar Nuevo Dispositivo
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Configura todos los detalles del dispositivo IoT
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {/* Información Básica */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Información Básica
            </h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Nombre del Dispositivo *
                </label>
                <input
                  {...register('name', { required: 'El nombre es obligatorio' })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Ej: Tanque Principal A"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Tipo de Dispositivo *
                </label>
                <select
                  {...register('type', { required: 'El tipo es obligatorio' })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  {deviceTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Capacidad/Tamaño *
                </label>
                <input
                  type="number"
                  {...register('capacity', { 
                    required: 'La capacidad es obligatoria',
                    min: { value: 1, message: 'Debe ser mayor a 0' }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="500"
                />
                {errors.capacity && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.capacity.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Unidad
                </label>
                <select
                  {...register('unit')}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  {capacityUnits[deviceType]?.map(unit => (
                    <option key={unit.value} value={unit.value}>
                      {unit.label}
                    </option>
                  )) || <option value="units">Unidades</option>}
                </select>
              </div>
            </div>
          </div>

          {/* Ubicación */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Ubicación
            </h3>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Edificio/Bloque *
                </label>
                <input
                  {...register('building', { required: 'El edificio es obligatorio' })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Bloque A"
                />
                {errors.building && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.building.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Piso
                </label>
                <input
                  {...register('floor')}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Sala/Laboratorio
                </label>
                <input
                  {...register('room')}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Lab 1"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Ubicación Específica
              </label>
              <input
                {...register('location')}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Cerca de la entrada principal"
              />
            </div>
          </div>

          {/* Información Técnica */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Información Técnica
            </h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Fabricante
                </label>
                <input
                  {...register('manufacturer')}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Ej: Siemens, Schneider Electric"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Modelo
                </label>
                <input
                  {...register('model')}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Ej: HC-SR04, ESP32"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Número de Serie
                </label>
                <input
                  {...register('serialNumber')}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="SN-123456789"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Fecha de Instalación
                </label>
                <input
                  type="date"
                  {...register('installationDate')}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Descripción
              </label>
              <textarea
                {...register('description')}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Descripción detallada del dispositivo y su función..."
              />
            </div>
          </div>

          {/* Mantenimiento */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center gap-2">
              <Droplets className="w-5 h-5" />
              Configuración de Mantenimiento
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Intervalo de Mantenimiento (días)
              </label>
              <input
                type="number"
                {...register('maintenanceInterval', { 
                  min: { value: 1, message: 'Mínimo 1 día' },
                  max: { value: 365, message: 'Máximo 365 días' }
                })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="30"
              />
              {errors.maintenanceInterval && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.maintenanceInterval.message}
                </p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              Cancelar
            </button>
            
            <LoadingButton
              type="submit"
              loading={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Guardar Dispositivo
            </LoadingButton>
          </div>
        </form>
      </div>
    </div>
  );
}
