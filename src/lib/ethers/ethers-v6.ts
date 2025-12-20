// src/lib/ethers/ethers-v6.ts
import { ethers, Wallet, BrowserProvider, JsonRpcSigner } from 'ethers';
import {CreateWalletInfo, WalletFunctions} from "@/src/types/ethers-function";

/**
 * v6 连接钱包
 */
export const connectWallet_v_six = async (): Promise<JsonRpcSigner> => {
    if (!window.ethereum) {
        throw new Error('请安装 MetaMask!');
    }

    const provider = new BrowserProvider(window.ethereum);
    await provider.send('eth_requestAccounts', []);
    const signer = await provider.getSigner();

    console.log('连接地址:', await signer.getAddress());
    console.log('Provider:', provider);

    return signer;
};

/**
 * v6 创建钱包
 */
export const createWallet_v_six = (): CreateWalletInfo => {
    const wallet = Wallet.createRandom();
    const mnemonic = wallet.mnemonic?.phrase || wallet.mnemonic || '';

    return {
        address: wallet.address,
        privateKey: wallet.privateKey,
        mnemonic: mnemonic,
        walletInstance: wallet,
    };
};

/**
 * 获取 v6 所有函数
 */
export const getV6Functions = (): WalletFunctions => ({
    connectWallet: connectWallet_v_six,
    createWallet: createWallet_v_six,
});