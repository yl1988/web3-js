// app/test/page.tsx - 完整版本（已适配新版 useRealMarketData）
'use client'

import React, { useState, useMemo } from 'react';
import { useAccount, useChainId } from 'wagmi';
import { useRealMarketData } from '../../../hooks/use-real-market-data';
import { sepolia, hardhat, mainnet } from 'wagmi/chains';
import {useQuery} from "@tanstack/react-query";

// 获取用户代币余额的 hook（需要根据你的实际情况实现）
function useUserTokenBalances(address: `0x${string}`) {
    // 这里应该实现获取用户代币余额的逻辑
    // 为了示例，返回模拟数据
    return useQuery({
        queryKey: ['user-token-balances', address],
        queryFn: async () => ({
            ETH: '1.5',
            USDC: '1000',
            USDT: '500',
            DAI: '750',
            WBTC: '0.05',
        }),
    });
}

// 计算用户投资组合价值
function useUserPortfolioValue(address: `0x${string}`, marketData: any) {
    const { data: balances } = useUserTokenBalances(address);

    return useMemo(() => {
        if (!balances || !marketData?.reserves) return null;

        const totalValue = Object.entries(balances).reduce((sum, [symbol, balanceStr]) => {
            const token = marketData.reserves.find((t: any) => t.symbol === symbol);
            const balance = parseFloat(balanceStr as string);
            const price = token?.priceUSD || 0;
            return sum + (balance * price);
        }, 0);

        return {
            totalValue,
            breakdown: Object.entries(balances).map(([symbol, balanceStr]) => {
                const token = marketData.reserves.find((t: any) => t.symbol === symbol);
                const balance = parseFloat(balanceStr as string);
                const price = token?.priceUSD || 0;
                const value = balance * price;
                return { symbol, balance, price, value };
            }),
        };
    }, [balances, marketData]);
}

// 格式化数字
const formatNumber = (num: number | string, decimals: number = 4): string => {
    if (typeof num === 'string') num = parseFloat(num);
    if (isNaN(num)) return '0';
    if (num < 0.01 && num > 0) return '<0.01';
    return num.toFixed(decimals).replace(/\.?0+$/, '');
};

// 供应操作处理
function handleSupply(item: any) {
    console.log('准备供应:', item);
    alert(`准备供应 ${item.symbol}\n余额: ${item.userBalance}\n供应利率: ${item.supplyAPY}%\n借款利率: ${item.borrowAPY}%`);
}

// 借款操作处理
function handleBorrow(item: any) {
    console.log('准备借款:', item);
    alert(`准备借款 ${item.symbol}\n最大可借: ${item.availableToBorrow}\n借款利率: ${item.borrowAPY}%`);
}

// 主组件
function RealTimeMarket({ userAddress }: { userAddress: `0x${string}` }) {
    const chainId = useChainId();
    const { data: balances, isLoading: balancesLoading } = useUserTokenBalances(userAddress);
    const { data: marketData, isLoading: marketLoading, refetch: refetchMarket } = useRealMarketData();
    const portfolio = useUserPortfolioValue(userAddress, marketData);
    const [lastUpdated, setLastUpdated] = useState<string>('');
    const [refreshing, setRefreshing] = useState(false);

    // 合并数据
    const marketItems = useMemo(() => {
        if (!marketData?.reserves || !balances) return [];

        return marketData.reserves.map((token: any) => {
            const userBalance = balances[token.symbol] || '0';
            const hasBalance = parseFloat(userBalance) > 0;

            // 计算可借款额度（基于抵押因子）
            const collateralValue = parseFloat(userBalance) * (token.priceUSD || 0);
            const maxBorrow = token.canBeCollateral
                ? collateralValue * (parseInt(token.ltv || '75') / 100)
                : 0;

            return {
                ...token,
                userBalance: formatNumber(userBalance),
                formattedBalance: formatNumber(userBalance, token.decimals < 6 ? 4 : 2),
                canSupply: hasBalance,
                availableToBorrow: formatNumber(maxBorrow.toString(), 2),
                formattedAPY: `${token.supplyAPY || '0.00'}%`,
                formattedBorrowAPY: `${token.borrowAPY || '0.00'}%`,
                formattedLiquidation: `${token.liquidationThreshold || '80'}%`,
                formattedLTV: `${token.ltv || '75'}%`,
                formattedUtilization: `${token.utilization || '0.0'}%`,
                hasWarning: parseFloat(token.liquidationThreshold || '80') < 75 || parseFloat(token.supplyAPY || '0') < 0.1,
                valueUSD: (parseFloat(userBalance) * (token.priceUSD || 0)).toFixed(2),
                totalLiquidity: token.totalLiquidity || '0',
            };
        });
    }, [marketData, balances]);

    // 刷新所有数据
    const refreshData = async () => {
        setRefreshing(true);
        try {
            await refetchMarket();
            setLastUpdated(new Date().toLocaleTimeString());
        } catch (error) {
            console.error('刷新数据失败:', error);
        } finally {
            setRefreshing(false);
        }
    };

    // 自动更新时间
    React.useEffect(() => {
        if (marketData) {
            setLastUpdated(new Date().toLocaleTimeString());
        }
    }, [marketData]);

    const loading = balancesLoading || marketLoading;
    const chainName = chainId === mainnet.id ? '以太坊主网' :
        chainId === sepolia.id ? 'Sepolia 测试网' :
            chainId === hardhat.id ? 'Hardhat 本地网络' : '未知网络';

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[500px]">
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
        );
    }

    // 如果没有数据
    if (!marketItems.length) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[500px]">
                <div className="text-6xl mb-6">📊</div>
                <h2 className="text-2xl font-bold text-white mb-4">暂无市场数据</h2>
                <p className="text-cyber-neon-400/70 text-lg max-w-md text-center">
                    未能获取到市场数据，请检查网络连接或稍后再试
                </p>
                <button
                    onClick={refreshData}
                    className="mt-6 px-6 py-3 bg-gradient-to-r from-cyber-neon-400 to-cyber-pink-400 rounded-lg font-bold text-black hover:scale-105 transition-all duration-300"
                >
                    重试获取数据
                </button>
            </div>
        );
    }

    return (
        <div className="bg-black/90 rounded-2xl border border-cyber-neon-400/20 overflow-hidden backdrop-blur-lg">
            {/* 头部信息 */}
            <div className="bg-gradient-to-r from-cyber-neon-400/10 via-cyber-pink-400/10 to-cyber-blue-400/10 p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">
                            {chainId === mainnet.id ? '🚀 实时 DeFi 市场（主网数据）' : '🧪 测试网市场数据'}
                        </h1>
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                                <div className={`w-3 h-3 rounded-full animate-pulse ${
                                    chainId === mainnet.id ? 'bg-green-500' : 'bg-yellow-500'
                                }`}></div>
                                <span className={`text-sm ${
                                    chainId === mainnet.id ? 'text-green-400' : 'text-yellow-400'
                                }`}>
                  {chainId === mainnet.id ? '真实数据' : '模拟数据'}
                </span>
                            </div>
                            <span className="text-cyber-neon-400/70 text-sm">•</span>
                            <span className="text-cyber-neon-400/70 text-sm">{chainName}</span>
                            <span className="text-cyber-neon-400/70 text-sm">•</span>
                            <span className="text-cyber-neon-400/70 text-sm">
                数据源: {marketData?.dataSource === 'real' ? 'DeFiLlama' : '模拟数据'}
              </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        {portfolio && (
                            <div className="bg-black/40 rounded-xl px-4 py-3 border border-cyber-neon-400/30">
                                <div className="text-cyber-neon-400 text-sm mb-1">总资产价值</div>
                                <div className="text-white text-xl font-bold">
                                    ${portfolio.totalValue.toFixed(2)}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-black/30 rounded-xl p-4 border border-cyber-neon-400/20">
                        <div className="text-cyber-neon-400 text-sm mb-1">网络状态</div>
                        <div className="text-white font-semibold flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${
                                chainId === mainnet.id ? 'bg-green-500' :
                                    chainId === sepolia.id ? 'bg-yellow-500' : 'bg-blue-500'
                            }`}></div>
                            {chainName}
                        </div>
                    </div>

                    <div className="bg-black/30 rounded-xl p-4 border border-cyber-neon-400/20">
                        <div className="text-cyber-neon-400 text-sm mb-1">钱包地址</div>
                        <div className="text-white font-mono text-sm truncate" title={userAddress}>
                            {userAddress.slice(0, 8)}...{userAddress.slice(-6)}
                        </div>
                    </div>

                    <div className="bg-black/30 rounded-xl p-4 border border-cyber-neon-400/20">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-cyber-neon-400 text-sm mb-1">最后更新</div>
                                <div className="text-white text-sm">{lastUpdated || '--:--:--'}</div>
                            </div>
                            <button
                                onClick={refreshData}
                                disabled={refreshing}
                                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                                    refreshing
                                        ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-cyber-neon-400 to-cyber-pink-400 hover:from-cyber-neon-500 hover:to-cyber-pink-500 text-black hover:scale-105 active:scale-95'
                                }`}
                            >
                                {refreshing ? (
                                    <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                    刷新中
                  </span>
                                ) : (
                                    '🔄 刷新数据'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* 市场表格 */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                    <tr className="bg-black/50 border-b border-cyber-neon-400/20">
                        <th className="text-left p-4 text-cyber-neon-400 font-semibold">资产</th>
                        <th className="text-left p-4 text-cyber-neon-400 font-semibold">余额 / 价值</th>
                        <th className="text-left p-4 text-cyber-neon-400 font-semibold">供应 APY</th>
                        <th className="text-left p-4 text-cyber-neon-400 font-semibold">借款 APY</th>
                        <th className="text-left p-4 text-cyber-neon-400 font-semibold">价格 / 变化</th>
                        <th className="text-left p-4 text-cyber-neon-400 font-semibold">操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    {marketItems.map((item: any) => (
                        <tr
                            key={item.symbol}
                            className={`border-b border-cyber-neon-400/10 hover:bg-cyber-neon-400/5 transition-colors duration-300 ${
                                item.hasWarning ? 'bg-yellow-900/10' : ''
                            }`}
                        >
                            {/* 资产信息 */}
                            <td className="p-4">
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-10 h-10 rounded-full border-2 border-cyber-neon-400/50 flex items-center justify-center"
                                        style={{ backgroundColor: `${item.color}20` }}
                                    >
                                        <img
                                            src={item.icon}
                                            alt={item.symbol}
                                            className="w-6 h-6 rounded-full"
                                            onError={(e) => {
                                                e.currentTarget.onerror = null;
                                                e.currentTarget.src = `https://via.placeholder.com/24/666/fff?text=${item.symbol.substring(0, 2)}`;
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <div className="text-white font-semibold">{item.symbol}</div>
                                        <div className="text-cyber-neon-400/70 text-sm">{item.name}</div>
                                        {item.eModeLeverage && (
                                            <div className="inline-block mt-1 px-2 py-0.5 bg-gradient-to-r from-cyber-neon-400/20 to-cyber-pink-400/20 text-cyber-neon-400 text-xs rounded border border-cyber-neon-400/30">
                                                {item.eModeLeverage}
                                            </div>
                                        )}
                                        {chainId === mainnet.id && (
                                            <div className="inline-block mt-1 px-2 py-0.5 bg-green-900/20 text-green-400 text-xs rounded border border-green-400/30 ml-1">
                                                主网
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </td>

                            {/* 余额和价值 */}
                            <td className="p-4">
                                <div className="space-y-1">
                                    <div className="text-white font-mono">{item.formattedBalance} {item.symbol}</div>
                                    <div className="text-cyber-neon-400/70 text-sm">
                                        ${item.valueUSD}
                                    </div>
                                    {item.availableToBorrow !== '0' && item.canBeCollateral && (
                                        <div className="text-cyber-blue-400 text-xs">
                                            可借: ${item.availableToBorrow}
                                        </div>
                                    )}
                                </div>
                            </td>

                            {/* 供应 APY */}
                            <td className="p-4">
                                <div className="flex items-center gap-2">
                    <span className={`text-lg font-bold ${
                        parseFloat(item.supplyAPY || '0') > 5
                            ? 'text-cyber-pink-400'
                            : parseFloat(item.supplyAPY || '0') > 2
                                ? 'text-cyber-neon-400'
                                : 'text-gray-400'
                    }`}>
                      {item.formattedAPY}
                    </span>
                                    {parseFloat(item.supplyAPY || '0') > 3 && (
                                        <span className="text-cyber-pink-400 animate-pulse text-sm">🔥</span>
                                    )}
                                </div>
                            </td>

                            {/* 借款 APY */}
                            <td className="p-4">
                                <div className={`text-lg font-bold ${
                                    parseFloat(item.borrowAPY || '0') < 3
                                        ? 'text-green-400'
                                        : parseFloat(item.borrowAPY || '0') < 6
                                            ? 'text-yellow-400'
                                            : 'text-red-400'
                                }`}>
                                    {item.formattedBorrowAPY}
                                </div>
                                <div className="text-cyber-neon-400/70 text-xs mt-1">
                                    利用率: {item.formattedUtilization}
                                </div>
                            </td>

                            {/* 价格和24小时变化 */}
                            <td className="p-4">
                                <div className="space-y-1">
                                    <div className="text-white font-bold">
                                        ${formatNumber(item.priceUSD || 0, 2)}
                                    </div>
                                    {item.priceChange24h && (
                                        <div className={`text-sm ${
                                            item.priceChange24h >= 0 ? 'text-green-400' : 'text-red-400'
                                        }`}>
                                            {item.priceChange24h >= 0 ? '↗' : '↘'} {Math.abs(item.priceChange24h).toFixed(2)}%
                                        </div>
                                    )}
                                </div>
                            </td>

                            {/* 操作按钮 */}
                            <td className="p-4">
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleSupply(item)}
                                        disabled={!item.canSupply}
                                        className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex-1 ${
                                            item.canSupply
                                                ? 'bg-gradient-to-r from-cyber-neon-400 to-cyber-pink-400 hover:from-cyber-neon-500 hover:to-cyber-pink-500 text-black hover:scale-105 active:scale-95'
                                                : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                                        }`}
                                    >
                                        供应
                                    </button>

                                    <button
                                        onClick={() => handleBorrow(item)}
                                        disabled={parseFloat(item.availableToBorrow) <= 0}
                                        className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex-1 ${
                                            parseFloat(item.availableToBorrow) > 0
                                                ? 'bg-gradient-to-r from-cyber-blue-400 to-cyber-purple-400 hover:from-cyber-blue-500 hover:to-cyber-purple-500 text-black hover:scale-105 active:scale-95'
                                                : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                                        }`}
                                    >
                                        借款
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* 底部统计信息 */}
            <div className="p-6 border-t border-cyber-neon-400/20 bg-black/50">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-black/30 rounded-xl p-4 border border-cyber-neon-400/30">
                        <div className="text-cyber-neon-400 text-sm mb-2">总流动性</div>
                        <div className="text-white text-2xl font-bold">
                            ${marketItems.reduce((sum, item) => sum + parseFloat(item.totalLiquidity || '0'), 0).toLocaleString()}
                        </div>
                    </div>

                    <div className="bg-black/30 rounded-xl p-4 border border-cyber-neon-400/30">
                        <div className="text-cyber-neon-400 text-sm mb-2">平均供应 APY</div>
                        <div className="text-white text-2xl font-bold">
                            {formatNumber(
                                marketItems.reduce((sum, item) => sum + parseFloat(item.supplyAPY || '0'), 0) / marketItems.length,
                                2
                            )}%
                        </div>
                    </div>

                    <div className="bg-black/30 rounded-xl p-4 border border-cyber-neon-400/30">
                        <div className="text-cyber-neon-400 text-sm mb-2">平均借款 APY</div>
                        <div className="text-white text-2xl font-bold">
                            {formatNumber(
                                marketItems.reduce((sum, item) => sum + parseFloat(item.borrowAPY || '0'), 0) / marketItems.length,
                                2
                            )}%
                        </div>
                    </div>

                    <div className="bg-black/30 rounded-xl p-4 border border-cyber-neon-400/30">
                        <div className="text-cyber-neon-400 text-sm mb-2">活跃资产</div>
                        <div className="text-white text-2xl font-bold">
                            {marketItems.length} 种
                        </div>
                    </div>
                </div>

                <div className="mt-6 text-center">
                    <p className="text-cyber-neon-400/70 text-sm">
                        数据源: {marketData?.dataSource === 'real' ? 'DeFiLlama + CoinGecko 真实数据' : '测试网模拟数据'}
                        <br />
                        {chainId === mainnet.id && (
                            <span className="text-green-400/70 text-xs">
                数据每60秒自动刷新 • 实时主网数据
              </span>
                        )}
                        {chainId !== mainnet.id && (
                            <span className="text-yellow-400/70 text-xs">
                测试网环境 • 部分数据为模拟
              </span>
                        )}
                    </p>
                </div>
            </div>
        </div>
    );
}

// 连接钱包提示
function ConnectWalletPrompt() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] p-8">
            <div className="text-center mb-10">
                <div className="text-6xl mb-6 animate-pulse">🔗</div>
                <h2 className="text-3xl font-bold text-white mb-4">连接钱包查看实时数据</h2>
                <p className="text-cyber-neon-400 text-lg max-w-2xl mx-auto">
                    连接您的钱包以获取实时代币余额和市场数据，支持以太坊主网真实数据
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
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
        </div>
    );
}

// 主页面组件
export default function TestPage() {
    const { address, isConnected, chainId } = useAccount();

    if (!isConnected || !address) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-black via-cyber-neon-900/30 to-black p-4 md:p-8">
                <ConnectWalletPrompt />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-cyber-neon-900/30 to-black p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <RealTimeMarket userAddress={address} />
            </div>
        </div>
    );
}