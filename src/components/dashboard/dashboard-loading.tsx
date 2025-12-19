import {mainnet} from "wagmi/chains";
import React from "react";


export default function DashboardLoading({chainId, chainName} : {chainId: number, chainName: string}){
    return <div className="flex flex-col items-center justify-center min-h-[500px]">
        <div className="relative">
            <div className="w-16 h-16 border-4 border-cyber-neon-400/30 border-t-cyber-neon-400 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 bg-gradient-to-r from-cyber-neon-400 to-cyber-pink-400 rounded-full animate-pulse"></div>
            </div>
        </div>
        <p className="text-cyber-neon-400 text-lg mt-6">正在从 {chainName} 获取实时数据...</p>
        <p className="text-cyber-neon-400/70 text-sm mt-2">
            {chainId === mainnet.id
                ? '连接到 DeFiLlama + CoinGecko 获取真实数据'
                : '获取模拟市场数据'}
        </p>
    </div>
}