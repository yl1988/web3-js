import {mainnet} from "wagmi/chains";
import React from "react";
import {formatNumber} from "@/src/utils/utils";

export default function BottomCount({marketItems, marketData, chainId} : {marketItems: any[], marketData: any, chainId: number}) {

    return <div className="p-6 border-t rounded-xl mt-4 border-cyber-neon-400/20 bg-black/50">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-black/30 rounded-xl p-4 border border-cyber-neon-400/30">
                <div className="text-cyber-neon-400 text-sm mb-2">Total liquidity</div>
                <div className="text-white text-2xl font-bold">
                    ${marketItems.reduce((sum, item) => sum + parseFloat(item.totalLiquidity || '0'), 0).toLocaleString()}
                </div>
            </div>

            <div className="bg-black/30 rounded-xl p-4 border border-cyber-neon-400/30">
                <div className="text-cyber-neon-400 text-sm mb-2">Average supply APY</div>
                <div className="text-white text-2xl font-bold">
                    {formatNumber(
                        marketItems.reduce((sum, item) => sum + parseFloat(item.supplyAPY || '0'), 0) / marketItems.length,
                        2
                    )}%
                </div>
            </div>

            <div className="bg-black/30 rounded-xl p-4 border border-cyber-neon-400/30">
                <div className="text-cyber-neon-400 text-sm mb-2">Average borrowing APY</div>
                <div className="text-white text-2xl font-bold">
                    {formatNumber(
                        marketItems.reduce((sum, item) => sum + parseFloat(item.borrowAPY || '0'), 0) / marketItems.length,
                        2
                    )}%
                </div>
            </div>

            <div className="bg-black/30 rounded-xl p-4 border border-cyber-neon-400/30">
                <div className="text-cyber-neon-400 text-sm mb-2">Active assets</div>
                <div className="text-white text-2xl font-bold">
                    {marketItems.length} kinds
                </div>
            </div>
        </div>

        <div className="mt-6 text-center">
            <p className="text-cyber-neon-400/70 text-sm">
                DataSource: {marketData?.dataSource === 'real' ? 'DeFiLlama + CoinGecko 真实数据' : '测试网模拟数据'}
                <br />
                {chainId === mainnet.id && (
                    <span className="text-green-400/70 text-xs">
                Data automatically refreshes every 60 seconds • Real-time mainnet data
              </span>
                )}
                {chainId !== mainnet.id && (
                    <span className="text-yellow-400/70 text-xs">
                Testnet environment • Some data are simulated
              </span>
                )}
            </p>
        </div>
    </div>
}