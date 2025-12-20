import {HDNodeWallet, Mnemonic} from "ethers";
import { Wallet as V5Wallet } from 'ethers-v5';

export interface CreateWalletInfo{
    address: string,
    privateKey: string,
    mnemonic: string | Mnemonic | null,
    walletInstance: HDNodeWallet | V5Wallet | null
}

export interface EtherFunctionCardLoading {
    connectWallet: boolean,
    createWallet: boolean
}

export interface WalletFunctions {
    connectWallet: () => Promise<any>;
    createWallet: () => CreateWalletInfo;
}