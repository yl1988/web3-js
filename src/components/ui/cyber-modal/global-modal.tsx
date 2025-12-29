// src/components/ui/cyber-modal/global-modal.tsx
'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Modal from './index';

interface GlobalModalState {
    id: string;
    isOpen: boolean;
    props: any;
}

let globalModals: GlobalModalState[] = [];
let updateCallbacks: Array<() => void> = [];

const updateGlobalModals = (newModals: GlobalModalState[]) => {
    globalModals = newModals;
    updateCallbacks.forEach(cb => cb());
};

// 全局弹窗管理器
export class GlobalModalManager {
    static open(props: any): string {
        const id = `modal-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

        updateGlobalModals([
            ...globalModals,
            { id, isOpen: true, props }
        ]);

        return id;
    }

    static close(id: string) {
        updateGlobalModals(
            globalModals.filter(modal => modal.id !== id)
        );
    }

    static closeAll() {
        updateGlobalModals([]);
    }

    static update(id: string, newProps: any) {
        updateGlobalModals(
            globalModals.map(modal =>
                modal.id === id
                    ? { ...modal, props: { ...modal.props, ...newProps } }
                    : modal
            )
        );
    }
}

// React Hook 包装
export function useGlobalModal() {
    return {
        open: GlobalModalManager.open,
        close: GlobalModalManager.close,
        closeAll: GlobalModalManager.closeAll,
        update: GlobalModalManager.update,
    };
}

// 全局弹窗容器组件
export function GlobalModalContainer() {
    const [modals, setModals] = useState<GlobalModalState[]>(globalModals);

    useEffect(() => {
        const handleUpdate = () => {
            setModals([...globalModals]);
        };

        updateCallbacks.push(handleUpdate);
        return () => {
            updateCallbacks = updateCallbacks.filter(cb => cb !== handleUpdate);
        };
    }, []);

    if (typeof window === 'undefined') return null;

    return createPortal(
        <>
            {modals.map(modal => (
                <Modal
                    key={modal.id}
                    isOpen={modal.isOpen}
                    onClose={() => {
                        modal.props.onClose?.();
                        GlobalModalManager.close(modal.id);
                    }}
                    {...modal.props}
                />
            ))}
        </>,
        document.body
    );
}