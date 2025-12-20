// src/components/ui/cyber-modal/types.ts
import { ReactNode } from 'react';

export interface ModalOptions {
    title?: ReactNode;
    content: ReactNode;
    footer?: ReactNode;
    onClose?: () => void;
    onConfirm?: () => void | Promise<void>;
    showCloseButton?: boolean;
    showConfirmButton?: boolean;
    confirmText?: string;
    cancelText?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    closeOnOverlayClick?: boolean;
    closeOnEsc?: boolean;
    className?: string;
    contentClassName?: string;
    showBackdrop?: boolean;
    backdropClassName?: string;
    // 赛博朋克特有样式
    theme?: 'neon' | 'pink' | 'blue' | 'purple' | 'cyber';
    glowEffect?: boolean;
    borderStyle?: 'gradient' | 'solid' | 'dashed' | 'neon';
}

export interface ModalInstance {
    id: string;
    options: ModalOptions;
    isOpen: boolean;
}

export type ModalRef = {
    open: (options: ModalOptions) => string;
    close: (id: string) => void;
    closeAll: () => void;
    update: (id: string, options: Partial<ModalOptions>) => void;
};