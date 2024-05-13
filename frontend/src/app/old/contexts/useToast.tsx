// src/contexts/useToast.tsx
import { useContext } from 'react';
import { ToastContextData, ToastContext } from './ToastContext';

export const useToast = (): ToastContextData => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};