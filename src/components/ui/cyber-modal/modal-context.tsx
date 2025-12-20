// src/components/ui/cyber-modal/modal-context.tsx
'use client';

import React, { createContext, useContext } from 'react';
import {ModalInstance, ModalOptions, ModalRef} from './types';

interface ModalContextType {
    modals: ModalInstance[];
    openModal: (options: ModalOptions) => string;
    closeModal: (id: string) => void;
    closeAllModals: () => void;
    updateModal: (id: string, options: Partial<ModalOptions>) => void;
}

export const ModalContext = createContext<ModalContextType | null>(null);

export const useModalContext = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModalContext must be used within ModalProvider');
    }
    return context;
};