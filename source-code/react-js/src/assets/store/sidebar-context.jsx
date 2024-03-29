import { createContext, useState } from "react";

export const SidebarContext = createContext({
  isOpen: false,
  onToggleMenu: () => {},
});

export default function SideBarContextProvider({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  console.log(isMenuOpen);
  function toggleMenu() {
    setIsMenuOpen((prevState) => !prevState);
  }

  const contextValue = {
    isOpen: isMenuOpen,
    onToggleMenu: toggleMenu,
  };

  return (
    <SidebarContext.Provider value={contextValue}>
      {children}
    </SidebarContext.Provider>
  );
}
