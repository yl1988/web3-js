// src/lib/ethers/index.ts
import { getV5Functions } from './ethers-v5';
import { getV6Functions } from './ethers-v6';
import { WalletFunctions } from '../../types/ethers-function';

/**
 * 根据版本获取对应的函数集
 */
export const getEthersFunctions = (version: string): WalletFunctions => {
    if (version === '6') {
        return getV6Functions();
    }
    return getV5Functions();
};

// 单独导出，方便按需使用
export { getV5Functions, getV6Functions };