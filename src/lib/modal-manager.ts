// src/lib/modal-manager.ts
import { ModalOptions } from '../components/ui/cyber-modal/types';

class ModalManager {
    private static instance: ModalManager;
    private openModalFn: ((options: ModalOptions) => string) | null = null;
    private closeModalFn: ((id: string) => void) | null = null;
    private closeAllModalsFn: (() => void) | null = null;
    private updateModalFn: ((id: string, options: Partial<ModalOptions>) => void) | null = null;

    private constructor() {}

    static getInstance(): ModalManager {
        if (!ModalManager.instance) {
            ModalManager.instance = new ModalManager();
        }
        return ModalManager.instance;
    }

    register(fns: {
        openModal: (options: ModalOptions) => string;
        closeModal: (id: string) => void;
        closeAllModals: () => void;
        updateModal: (id: string, options: Partial<ModalOptions>) => void;
    }) {
        this.openModalFn = fns.openModal;
        this.closeModalFn = fns.closeModal;
        this.closeAllModalsFn = fns.closeAllModals;
        this.updateModalFn = fns.updateModal;
    }

    open(options: ModalOptions): string {
        if (!this.openModalFn) {
            throw new Error('ModalManager not initialized. Make sure ModalProvider is mounted.');
        }
        return this.openModalFn(options);
    }

    close(id: string) {
        if (this.closeModalFn) {
            this.closeModalFn(id);
        }
    }

    closeAll() {
        if (this.closeAllModalsFn) {
            this.closeAllModalsFn();
        }
    }

    update(id: string, options: Partial<ModalOptions>) {
        if (this.updateModalFn) {
            this.updateModalFn(id, options);
        }
    }

    // 快捷方法
    static open = (options: ModalOptions) => {
        return ModalManager.getInstance().open(options);
    };

    static close = (id: string) => {
        ModalManager.getInstance().close(id);
    };

    static closeAll = () => {
        ModalManager.getInstance().closeAll();
    };

    static update = (id: string, options: Partial<ModalOptions>) => {
        ModalManager.getInstance().update(id, options);
    };
}

export default ModalManager;