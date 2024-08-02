import { createContext, useState } from "react";
import Toast from "../components/Toast";
import * as apiClient from "../api-client";
import { useQuery } from "react-query";

// Types ----------------------------------------------------------------
type ToastMessage = {
    message: string,
    type: "SUCCESS" | "ERROR",
}

export type AppContextType = {
    showToast: (toastMessage: ToastMessage) => void;
    isLoggedIn: boolean;
}

type Props = {
    children: React.ReactNode,
}

// App context initialization: As the app loads for the first time the context is undefined.
export const AppContext = createContext<AppContextType | undefined>(undefined);


// App context provider: This component wraps the app in a Provider component, 
// making the AppContext available to all its children.
export const AppContextProvider = ({ children }: Props) => {
    const [toast, setToast] = useState<ToastMessage | undefined>(undefined);

    const { isError } = useQuery("validateToken", apiClient.validateToken, {
        retry: false,
    })

    return (
        <AppContext.Provider 
            value={{
                showToast: (toastMessage) => {
                    setToast(toastMessage);
                },
                isLoggedIn: !isError
            }}
        >
            {toast && (
                <Toast 
                    message={toast.message} 
                    type={toast.type} 
                    onClose={()=> setToast(undefined)}
                />
            )}
            {children}
        </AppContext.Provider>
    )
};


// Custom Hook to get the AppContext was created in a separate file: /src/hooks/customHooks.ts
// This hook allows a component to access the AppContext.