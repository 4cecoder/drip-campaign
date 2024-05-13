// src/components/Toast.tsx
import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faCheckCircle, faExclamationCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { useToast } from '../../../../../enerflo-server/frontend/src/contexts/useToast';

const Toast: React.FC = () => {
    const { toast, setToast } = useToast();

    useEffect(() => {
        if (toast) {
            const timer = setTimeout(() => {
                setToast(null);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [toast, setToast]);

    if (!toast) return null;

    const icon: IconDefinition = {
        info: faInfoCircle,
        success: faCheckCircle,
        warning: faExclamationCircle,
        error: faTimesCircle,
    }[toast.type];

    const backgroundColor = {
        info: 'bg-blue-500',
        success: 'bg-green-500',
        warning: 'bg-yellow-500',
        error: 'bg-red-500',
    }[toast.type];

    return (
        <div className={`fixed bottom-5 right-5 min-w-[250px] p-4 ${backgroundColor} text-white rounded-lg flex items-center`}>
            <FontAwesomeIcon icon={icon} />
            <span className="ml-3">{toast.message}</span>
        </div>
    );
};

export default Toast;