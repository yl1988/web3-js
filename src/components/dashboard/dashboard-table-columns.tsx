import {CyberTableColumn} from "@/src/components/ui/cyber-table/cyber-table";
import { DashboardSupplyAssetData} from "@/src/types/dashboard";
import AssetsTableButton from "@/src/components/dashboard/assets-table-button";
import {mainnet} from "wagmi/chains";
import React from "react";
import {formatNumber} from "@/src/utils/utils";

interface Props {
    chainId: number;
    onSuplly: (value:string) => void;
    onDetails: (value:string) => void;
}

export const columns = (options:Props):CyberTableColumn<DashboardSupplyAssetData>[] => {
    const {chainId, onSuplly, onDetails} = options;
    return   [
        {
            key: 'symbol',
            header: 'Assets',
            width: '150px',
            sortable: true,
            cell: (value, item) => (
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
                                mainnet
                            </div>
                        )}
                    </div>
                </div>
            )
        },
        {
            key: 'walletBalance',
            header: 'Wallet balance',
            width: '100px',
            sortable: true,
            cell: (value, item) =>  <div className="space-y-1">
                <div className="text-white font-mono">{item.formattedBalance} {item.symbol}</div>
                <div className="text-cyber-neon-400/70 text-sm">
                    ${item.valueUSD}
                </div>
                {item.availableToBorrow !== '0' && item.canBeCollateral && (
                    <div className="text-cyber-blue-400 text-xs">
                        can borrow: ${item.availableToBorrow}
                    </div>
                )}
            </div>
        },
        {
            key: 'supplyApy',
            header: 'SUPPLY APY',
            width: '100px',
            sortable: true,
            cell: (value:string, item) => {
                // const isHighAPY = parseFloat(value) > 5;
                // const isLowAPY = value.includes('<0.01') || value === '0%';

                return <div className="flex items-center gap-2">
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
            }
        },
        {
            key: 'borrowApy',
            header: 'Borrow APY',
            width: '150px',
            sortable: true,
            cell: (value:string, item) => {
                // const isHighAPY = parseFloat(value) > 5;
                // const isLowAPY = value.includes('<0.01') || value === '0%';

                return <>
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
                        utilization rate: {item.formattedUtilization}
                    </div>
                </>
            }
        },
        {
            key: 'priceUSD',
            header: 'Price / Change',
            width: '120px',
            cell: (value, item) => <div className="space-y-1">
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
        },
        {
            key: 'action',
            header: '',
            width: '100px',
            cell: (value) => <div className="flex items-center space-x-2">
                <AssetsTableButton onClick={onSuplly}>Suplly</AssetsTableButton>
                <AssetsTableButton onClick={onDetails}>Details</AssetsTableButton>
            </div>
        }
    ];
}
