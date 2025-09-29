import React from 'react';
import OverviewSection from "../features/dashboard/OverviewSection";
import ComponentsSection from "../features/dashboard/ComponentsSection";
import TankSection from "../features/dashboard/TankSection";
import SensorSection from "../features/dashboard/SensorSection";
import ValveSection from "../features/dashboard/ValveSection";
import MathematicsSection from "../features/dashboard/MathematicsSection";
import ApplicationsSection from "../features/dashboard/ApplicationsSection";

const ContentRenderer = ({ activeSection }) => {
  const renderContent = () => {
    switch(activeSection) {
      case 'overview':
        return <OverviewSection />;
      case 'components':
        return <ComponentsSection />;
      case 'tank':
        return <TankSection />;
      case 'sensor':
        return <SensorSection />;
      case 'valve':
        return <ValveSection />;
      case 'mathematics':
        return <MathematicsSection />;
      case 'applications':
        return <ApplicationsSection />;
      default:
        return (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <h3 className="text-xl font-medium text-gray-800 mb-2">
                Selecciona una sección
              </h3>
              <p className="text-gray-600">
                Elige una opción del menú Documentación para comenzar
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="w-full">
      {renderContent()}
    </div>
  );
};

export default ContentRenderer;