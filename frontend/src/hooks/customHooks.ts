import { useContext } from "react";
import { AppContext, AppContextType } from "../contexts/AppContext";

// Custom Hook to get the AppContext: This hook allows a component to easily access the AppContext.
export const useAppContext = () => {
    const context = useContext(AppContext);
    return context as AppContextType;
}