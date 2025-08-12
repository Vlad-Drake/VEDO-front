import { useEffect } from "react";

interface ComponentData {
  element: HTMLElement;
  close: () => void;
}

const registeredComponents: ComponentData[] = [];

const handleClickOutside = (event: MouseEvent) => {
  //console.log('click')
  //console.log(event.button);
  // Проходим по всем зарегистрированным компонентам
  registeredComponents.forEach(({ element, close }) => {
    // Если клик был вне компонента, вызываем функцию закрытия
    if (!element.contains(event.target as Node)) {
      close();
    }
  });
  //console.log('click', registeredComponents)
};

export const useGlobalClickOutside = () => {
  const registerComponent = (data: ComponentData) => {
    registeredComponents.push(data);
    //console.log('registeredComponents', registeredComponents)
  };

  const unregisterComponent = (element: HTMLElement) => {
    const index = registeredComponents.findIndex((c) => c.element === element);
    if (index !== -1) {
      registeredComponents.splice(index, 1);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return {
    registerComponent,
    unregisterComponent,
  };
};
