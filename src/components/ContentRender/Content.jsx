import React from 'react';
import OverviewSection from "../Overview/OverviewSection";
import ComponentsSection from "../ComponentsSection/ComponentsSection";
import TankSection from "../TankSection/TankSection";
import SensorSection from "../SensorSection/SensorSection";
import ValveSection from "../ValveSection/ValveSection";
import MathematicsSection from "../MathematicsSection/MathematicsSection";
import ApplicationsSection from "../ApplicationsSection/ApplicationsSection";

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
      case 'conclusions':
        return <ConclusionsSection />;
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