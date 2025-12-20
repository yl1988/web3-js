// src/components/ui/cyber-modal/modal-provider.tsx
'use client';

import React, {useState, useCallback, useEffect} from 'react';
import { ModalContext} from './modal-context';
import { ModalInstance, ModalOptions } from './types';
import { nanoid } from 'nanoid';
import ModalManager from "@/src/lib/modal-manager";

export function ModalProvider({ children }: { children: React.ReactNode }) {
    const [modals, setModals] = useState<ModalInstance[]>([]);

    const openModal = useCallback((options: ModalOptions): string => {
        const id = nanoid();
        setModals(prev => [...prev, { id, options, isOpen: true }]);
        return id;
    }, []);

    const closeModal = useCallback((id: string) => {
        setModals(prev => {
            const modal = prev.find(m => m.id === id);
            if (modal?.options.onClose) {
                modal.options.onClose();
            }
            return prev.filter(m => m.id !== id);
        });
    }, []);

    const closeAllModals = useCallback(() => {
        setModals([]);
    }, []);

    const updateModal = useCallback((id: string, options: Partial<ModalOptions>) => {
        setModals(prev =>
            prev.map(modal =>
                modal.id === id
                    ? { ...modal, options: { ...modal.options, ...options } }
                    : modal
            )
        );
    }, []);

// 在组件内添加
    useEffect(() => {
        ModalManager.getInstance().register({
            openModal,
            closeModal,
            closeAllModals,
            updateModal,
        });
    }, [openModal, closeModal, closeAllModals, updateModal]);

    return (
        <ModalContext.Provider
            value={{
                modals,
                openModal,
                closeModal,
                closeAllModals,
                updateModal,
            }}
        >
            {children}
            {modals.map(modal => (
                <Modal
                    key={modal.id}
                    isOpen={modal.isOpen}
                    onClose={() => closeModal(modal.id)}
                    {...modal.options}
                />
            ))}
        </ModalContext.Provider>
    );
}