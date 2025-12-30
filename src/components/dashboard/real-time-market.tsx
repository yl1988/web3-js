import {useAccount, useChainId} from "wagmi";
import {useRealMarketData} from "@/hooks/use-real-market-data";
import React, {useEffect, useMemo, useState} from "react";
import {DashboardSupplyAssetData} from "@/src/types/dashboard";
import {formatNumber} from "@/src/utils/utils";
import {hardhat, mainnet, sepolia} from "wagmi/chains";
import CyberButton from "@/src/components/ui/cyber-button";
import IndexContentListCard from "@/src/components/dashboard/index-content-list-card";
import {columns} from "@/src/components/dashboard/dashboard-table-columns";
import BottomCount from "@/src/components/dashboard/bottom-count";
import DashboardLoading from "@/src/components/dashboard/dashboard-loading";
import DashBoardNoData from "@/src/components/dashboard/dashboard-no-data";
import DashBoardNoConnected from "@/src/components/dashboard/dashboard-no-connected";
import {useQuery} from "@tanstack/react-query";

// 将自定义 Hook 移到组件外部
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
        enabled: !!address, // 只在有地址时启用
    });
}

export default function RealTimeMarket() {
    const { address, isConnected } = useAccount();
    const chainId = useChainId();
    const { data: marketData, isLoading: marketLoading, refetch: refetchMarket } = useRealMarketData();
    const [lastUpdated, setLastUpdated] = useState<string>('');
    const [refreshing, setRefreshing] = useState(false);

    // 使用自定义 Hook - 必须在所有条件语句之前调用
    const { data: balancesData, isLoading: balancesLoading } = useUserTokenBalances(address!);
    const balances = balancesData as Record<string, string>;

    // 自动更新时间
    useEffect(() => {
        if (marketData) {
            setLastUpdated(new Date().toLocaleTimeString());
        }
    }, [marketData]);

    // 计算用户投资组合价值 - 使用 useMemo
    const portfolio = useMemo(() => {
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

    // 获取市场数据项 - 使用 useMemo
    const marketItems = useMemo((): DashboardSupplyAssetData[] => {
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
                walletBalance: formatNumber(userBalance),
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

    /**
     * 刷新所有数据
     */
    const refreshData = async () => {
        setRefreshing(true);
        try {
            await refetchMarket();
            setLastUpdated(new Date().toLocaleTimeString());
        } catch (error:any) {
            console.error('refresh failed:', error);
        } finally {
            setRefreshing(false);
        }
    };

    /**
     * 获取供应事件
     * @param value
     */
    const onSuplly = (value:string) => {
        console.log(value)
        // getTokenBalance()
    }
    /**
     * 获取供应详情
     * @param value
     */
    const onDetails = (value:string) => {
        console.log(value)
    }

    // 连接状态检查
    if(!isConnected || !address){
        return (
            <div className="bg-black/90 rounded-2xl border border-cyber-neon-400/20 overflow-hidden backdrop-blur-lg">
                <DashBoardNoConnected/>
            </div>
        );
    }

    const loading = balancesLoading || marketLoading;
    const chainName = chainId === mainnet.id ? 'Ethereum Mainnet' :
        chainId === sepolia.id ? 'Sepolia testnet' :
            chainId === hardhat.id ? 'Hardhat local' : 'unowned';

    // 加载状态检查
    if (loading) {
        return <DashboardLoading chainId={chainId} chainName={chainName}/>
    }

    // 如果没有数据
    if (!marketItems.length) {
        return <DashBoardNoData refreshData={refreshData}/>
    }

    return (
        <div className="flex-1 w-full px-4 py-6 max-w-screen-2xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">
                        {chainId === mainnet.id ? '🚀 Real-time DeFi Market (Mainnet Data)' : '🧪 Testnet market data'}
                    </h1>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full animate-pulse ${
                                chainId === mainnet.id ? 'bg-green-500' : 'bg-yellow-500'
                            }`}/>
                            <span className={`text-sm ${
                                chainId === mainnet.id ? 'text-green-400' : 'text-yellow-400'
                            }`}>
                  {chainId === mainnet.id ? 'Real Data' : 'simulated Data'}
                </span>
                        </div>
                        <span className="text-cyber-neon-400/70 text-sm">•</span>
                        <span className="text-cyber-neon-400/70 text-sm">{chainName}</span>
                        <span className="text-cyber-neon-400/70 text-sm">•</span>
                        <span className="text-cyber-neon-400/70 text-sm">
                Data Source: {marketData?.dataSource === 'Real Data' ? 'DeFiLlama' : 'Simulated Data'}
              </span>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    {portfolio && (
                        <div className="bg-black/40 rounded-xl px-4 py-3 border border-cyber-neon-400/30">
                            <div className="text-cyber-neon-400 text-sm mb-1">total asset value</div>
                            <div className="text-white text-xl font-bold">
                                ${portfolio.totalValue.toFixed(2)}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-black/30 rounded-xl p-4 border border-cyber-neon-400/20">
                    <div className="text-cyber-neon-400 text-sm mb-1">Network</div>
                    <div className="text-white font-semibold flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                            chainId === mainnet.id ? 'bg-green-500' :
                                chainId === sepolia.id ? 'bg-yellow-500' : 'bg-blue-500'
                        }`}/>
                        {chainName}
                    </div>
                </div>

                <div className="bg-black/30 rounded-xl p-4 border border-cyber-neon-400/20">
                    <div className="text-cyber-neon-400 text-sm mb-1">Wallet Address</div>
                    <div className="text-white font-mono text-sm truncate" title={address}>
                        {address.slice(0, 8)}...{address.slice(-6)}
                    </div>
                </div>

                <div className="bg-black/30 rounded-xl p-4 border border-cyber-neon-400/20">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-cyber-neon-400 text-sm mb-1">Updated</div>
                            <div className="text-white text-sm">{lastUpdated || '--:--:--'}</div>
                        </div>

                        <CyberButton
                            onClick={refreshData}
                            disabled={refreshing}
                        >
                            {refreshing ? (
                                <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"/>
                    refreshing
                  </span>
                            ) : (
                                '🔄 Refresh Data'
                            )}
                        </CyberButton>
                    </div>
                </div>
            </div>
            <div className="flex gap-4">
                <IndexContentListCard
                    title={"Assets to supply and borrow"}
                    columns={columns({chainId: chainId as number, onSuplly, onDetails})}
                    data={marketItems}
                />
            </div>
            {/* 底部统计信息 */}
            <BottomCount chainId={chainId} marketData={marketData} marketItems={marketItems}/>
        </div>
    );
}