import IconLogo from "@/src/components/icons/icon-logo";
import CyberGradientConnectButton from "@/src/components/cyber-gradient-connect-button";
import CyberCard from "@/src/components/card/cyber-card";
import React from "react";

export default function DashBoardNoConnected() {

    return <CyberCard className="flex flex-col justify-center w-10/12 lg:w-[800px] xl:w-[1000px] 2xl:w-[1200px] 3xl:w-[1440px] h-[70vh]"
                      contentClassName="flex flex-col justify-center items-center"
    >
        <div className="flex flex-col justify-center items-center mb-14">
            <IconLogo className="w-40 h-40"/>
            <div className="text-4xl font-bold bg-gradient-to-r from-cyber-neon-400 to-cyber-pink-400 bg-clip-text text-transparent">
                W3Wallet
            </div>
        </div>
        <h2 className="text-cyber-neon-400 text-xl font-bold mb-2">Please, connect your wallet</h2>
        <p className="text-cyber-blue-200 text-md mb-6">Please connect your wallet to see your supplies, borrowings, and open positions.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mb-16">
            <div className="bg-black/30 rounded-2xl p-6 border border-cyber-neon-400/30 hover:border-cyber-neon-400 transition-all duration-300">
                <div className="text-green-500 text-4xl mb-4">🌐</div>
                <h3 className="text-white text-xl font-bold mb-2">以太坊主网</h3>
                <p className="text-cyber-neon-400/70 mb-4">连接主网获取真实的 DeFi 市场数据</p>
                <ul className="text-cyber-neon-400/70 text-sm space-y-1">
                    <li>• DeFiLlama 实时 APY 数据</li>
                    <li>• CoinGecko 实时价格</li>
                    <li>• Aave V3 主网流动性</li>
                    <li>• 真实的链上交互</li>
                </ul>
            </div>

            <div className="bg-black/30 rounded-2xl p-6 border border-cyber-neon-400/30 hover:border-cyber-neon-400 transition-all duration-300">
                <div className="text-cyber-blue-400 text-4xl mb-4">🧪</div>
                <h3 className="text-white text-xl font-bold mb-2">测试网络</h3>
                <p className="text-cyber-neon-400/70 mb-4">连接到测试网或本地开发环境</p>
                <ul className="text-cyber-neon-400/70 text-sm space-y-1">
                    <li>• Sepolia 测试网模拟数据</li>
                    <li>• Hardhat 本地开发网络</li>
                    <li>• 无 Gas 费用测试</li>
                    <li>• 智能合约开发和调试</li>
                </ul>
            </div>
        </div>
        <CyberGradientConnectButton/>
    </CyberCard>
}