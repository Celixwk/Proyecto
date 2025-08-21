import { useState, useCallback } from 'react';

/**
 * Hook personalizado para manejar la sección activa en el dashboard
 * @param {string} initialSection - Sección inicial por defecto
 * @returns {Object} - Objeto con estado y funciones para manejar secciones
 */
const useActiveSection = (initialSection = 'overview') => {
  const [activeSection, setActiveSection] = useState(initialSection);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [documentationExpanded, setDocumentationExpanded] = useState(true);

  // Función para cambiar la sección activa
  const changeSection = useCallback((sectionId) => {
    setActiveSection(sectionId);
    
    // Si el sidebar está colapsado y se selecciona una sección,
    // expandir automáticamente la documentación
    if (!documentationExpanded && sectionId !== activeSection) {
      setDocumentationExpanded(true);
    }
  }, [activeSection, documentationExpanded]);

  // Función para toggle del sidebar
  const toggleSidebar = useCallback(() => {
    setSidebarCollapsed(prev => !prev);
  }, []);

  // Función para toggle del menú documentación
  const toggleDocumentation = useCallback(() => {
    setDocumentationExpanded(prev => !prev);
  }, []);

  // Función para verificar si una sección está activa
  const isActiveSection = useCallback((sectionId) => {
    return activeSection === sectionId;
  }, [activeSection]);

  // Función para obtener la información de la sección actual
  const getCurrentSectionInfo = useCallback(() => {
    return {
      id: activeSection,
      isDocumentationSection: ['overview', 'components', 'tank', 'sensor', 
                              'valve', 'mathematics', 'applications', 'conclusions']
                              .includes(activeSection)
    };
  }, [activeSection]);

  return {
    // Estado
    activeSection,
    sidebarCollapsed,
    documentationExpanded,
    
    // Funciones
    setActiveSection: changeSection,
    toggleSidebar,
    toggleDocumentation,
    isActiveSection,
    getCurrentSectionInfo,
    
    // Funciones de estado directo (para compatibilidad)
    setSidebarCollapsed,
    setDocumentationExpanded
  };
};

export default useActiveSection;