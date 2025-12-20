// src/lib/ethers/ethers-v5.ts
import { ethers } from 'ethers-v5';
import {CreateWalletInfo, WalletFunctions} from "@/src/types/ethers-function";

declare global {
    interface Window {
        ethereum?: any;
    }
}

/**
 * v5 连接钱包
 */
export const connectWallet_v_five = async (): Promise<any> => {
    if (!window.ethereum) {
        throw new Error('请安装 MetaMask!');
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();

    console.log('连接地址:', await signer.getAddress());
    console.log('Provider:', provider);

    return signer;
};

/**
 * v5 创建钱包
 */
export const createWallet_v_five = (): CreateWalletInfo => {
    const wallet = ethers.Wallet.createRandom();

    return {
        address: wallet.address,
        privateKey: wallet.privateKey,
        mnemonic: wallet.mnemonic.phrase,
        walletInstance: wallet,
    };
};

/**
 * 获取 v5 所有函数
 */
export const getV5Functions = (): WalletFunctions => ({
    connectWallet: connectWallet_v_five,
    createWallet: createWallet_v_five,
});