import { createContext, ReactNode, useContext, useState } from "react";

export enum NAVIGATION_STATE {
  SUMMARY = "summary",
  GRAPH = "graph",
  ABOUT = "about",
}
interface NavigationContextInterface {
  navigationState: NAVIGATION_STATE;
  setNavigationState: (state: NAVIGATION_STATE) => void;
}
export const NavigationContext = createContext<NavigationContextInterface>(
  {} as NavigationContextInterface
);

export const NavigationContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [navigationState, setNavigationState] = useState<NAVIGATION_STATE>(
    NAVIGATION_STATE.GRAPH
  );

  return (
    <NavigationContext.Provider value={{ navigationState, setNavigationState }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const { navigationState, setNavigationState } = useContext(NavigationContext);
  return { navigationState, setNavigationState };
};
