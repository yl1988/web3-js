// src/components/ui/cyber-modal/use-modal.ts
'use client';

import { useModalContext } from './modal-context';
import { ModalOptions } from './types';

export const useModal = () => {
    const context = useModalContext();

    return {
        open: context.openModal,
        close: context.closeModal,
        closeAll: context.closeAllModals,
        update: context.updateModal,
    };
};