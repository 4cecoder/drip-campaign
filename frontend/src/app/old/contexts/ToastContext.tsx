// src/contexts/ToastContext.tsx
import React, { createContext, useState, ReactNode, useCallback } from 'react';

interface ToastState {
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
}

export interface ToastContextData {
    toast: ToastState | null;
    setToast: (toast: ToastState | null) => void;
    displayToast: (message: string, type: 'info' | 'success' | 'warning' | 'error') => void;
}

export const ToastContext = createContext<ToastContextData | undefined>(undefined);

interface ToastProviderProps {
    children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
    const [toast, setToast] = useState<ToastState | null>(null);

    const displayToast = useCallback((message: string, type: 'info' | 'success' | 'warning' | 'error') => {
        setToast({ message, type });
    }, []);

    return (
        <ToastContext.Provider value={{ toast, setToast, displayToast }}>
            {children}
        </ToastContext.Provider>
    );
};