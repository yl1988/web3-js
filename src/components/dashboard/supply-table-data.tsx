import {CyberTableColumn} from "@/src/components/cyber-table/cyber-table";
import { DashboardSupplyAssetData} from "@/src/types/dashboard";
import {cn} from "@/lib/utils";
import AssetsTableButton from "@/src/components/dashboard/assets-table-button";

export const columns = (onSuplly: (value:string) => void, onDetails: (value:string) => void):CyberTableColumn<DashboardSupplyAssetData>[] => [
    {
        key: 'symbol',
        header: 'Assets',
        width: '120px',
        sortable: true,
        cell: (value, row) => (
            <div className="flex flex-col">
                <span className="font-medium text-white">{value}</span>
                <span className="text-sm text-gray-400">{row.fullName}</span>
            </div>
        )
    },
    {
        key: 'walletBalance',
        header: 'Wallet balance',
        width: '100px',
        sortable: true,
        cell: (value) => (
            <span className={value === '0' ? 'text-gray-500' : 'text-cyber-neon-400'}>
        {value}
      </span>
        )
    },
    {
        key: 'apy',
        header: 'APY',
        width: '100px',
        sortable: true,
        cell: (value:string) => {
            const isHighAPY = parseFloat(value) > 5;
            const isLowAPY = value.includes('<0.01') || value === '0%';

            return (
                <span className={cn(
                    isHighAPY ? 'text-green-400' :
                        isLowAPY ? 'text-gray-400' :
                            'text-cyber-cyan-400'
                )}>
          {value}
        </span>
            );
        }
    },
    {
        key: 'canBeCollateral',
        header: 'Can be collateral',
        width: '90px',
        cell: (value) => (
            <div className="flex items-center justify-center">
                {value ? (
                    <div className="
            w-6 h-6 rounded-full
            bg-green-900/30 border border-green-500/50
            flex items-center justify-center
          ">
                        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    </div>
                ) : (
                    <span className="text-gray-500">—</span>
                )}
            </div>
        )
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

export const data: DashboardSupplyAssetData[] = [
    {
        symbol: "ETH",
        fullName: "Ethereum",
        walletBalance: "0",
        apy: "1.22%",
        canBeCollateral: true,
        specialTags: [],
        action: "",
        url: "/reserve-overview/?underlyingAsset=0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2&marketName=proto_mainnet_v3",
        icon: "/icons/tokens/eth.svg"
    },
    {
        symbol: "WETH",
        fullName: "Wrapped ETH",
        walletBalance: "0",
        apy: "1.22%",
        canBeCollateral: true,
        specialTags: [],
        action: "",
        url: "/reserve-overview/?underlyingAsset=0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2&marketName=proto_mainnet_v3",
        icon: "/icons/tokens/weth.svg"
    },
    {
        symbol: "USDT",
        fullName: "Tether",
        walletBalance: "0",
        apy: "2.40%",
        canBeCollateral: true,
        specialTags: [],
        action: "",
        url: "/reserve-overview/?underlyingAsset=0xdac17f958d2ee523a2206206994597c13d831ec7&marketName=proto_mainnet_v3",
        icon: "/icons/tokens/usdt.svg"
    },
    {
        symbol: "weETH",
        fullName: "Wrapped eETH",
        walletBalance: "0",
        apy: "<0.01%",
        canBeCollateral: true,
        specialTags: ["3x(ether.fi)"],
        action: "",
        url: "/reserve-overview/?underlyingAsset=0xcd5fe23c85820f7b72d0926fc9b05b43e359b7ee&marketName=proto_mainnet_v3",
        icon: "/icons/tokens/weeth.svg"
    },
    {
        symbol: "USDC",
        fullName: "USD Coin",
        walletBalance: "0",
        apy: "3.53%",
        canBeCollateral: true,
        specialTags: [],
        action: "",
        url: "/reserve-overview/?underlyingAsset=0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48&marketName=proto_mainnet_v3",
        icon: "/icons/tokens/usdc.svg"
    },
    {
        symbol: "wstETH",
        fullName: "Wrapped liquid staked Ether 2.0",
        walletBalance: "0",
        apy: "0.01%",
        canBeCollateral: true,
        specialTags: [],
        action: "",
        url: "/reserve-overview/?underlyingAsset=0x7f39c581f595b53c5cb19bd0b3f8da6c935e2ca0&marketName=proto_mainnet_v3",
        icon: "/icons/tokens/wsteth.svg"
    },
    {
        symbol: "WBTC",
        fullName: "Wrapped BTC",
        walletBalance: "0",
        apy: "<0.01%",
        canBeCollateral: true,
        specialTags: [],
        action: "",
        url: "/reserve-overview/?underlyingAsset=0x2260fac5e5542a773aa44fbcfedf7c193bc2c599&marketName=proto_mainnet_v3",
        icon: "/icons/tokens/wbtc.svg"
    },
    {
        symbol: "cbBTC",
        fullName: "Coinbase Wrapped BTC",
        walletBalance: "0",
        apy: "<0.01%",
        canBeCollateral: true,
        specialTags: [],
        action: "",
        url: "/reserve-overview/?underlyingAsset=0xcbb7c0000ab88b473b1f5afd9ef808440eed33bf&marketName=proto_mainnet_v3",
        icon: "/icons/tokens/cbbtc.svg"
    },
    {
        symbol: "sUSDe",
        fullName: "Staked USDe",
        walletBalance: "0",
        apy: "0%",
        canBeCollateral: true,
        specialTags: ["5x(ethena)"],
        action: "",
        url: "/reserve-overview/?underlyingAsset=0x9d39a5de30e57443bff2a8307a4256c8797a3497&marketName=proto_mainnet_v3",
        icon: "/icons/tokens/susde.svg"
    },
    {
        symbol: "USDe",
        fullName: "USDe",
        walletBalance: "0",
        apy: "5.74%",
        canBeCollateral: true,
        specialTags: ["5x(ethena)"],
        action: "blue-check",
        url: "/reserve-overview/?underlyingAsset=0x4c9edd5852cd905f086c759e8383e09bff1e68b3&marketName=proto_mainnet_v3",
        icon: "/icons/tokens/usde.svg"
    },
    {
        symbol: "RLUSD",
        fullName: "RLUSD",
        walletBalance: "0",
        apy: "6.03%",
        canBeCollateral: false,
        specialTags: [],
        action: "blue-check",
        url: "/reserve-overview/?underlyingAsset=0x8292bb45bf1ee4d140127049757c2e0ff06317ed&marketName=proto_mainnet_v3",
        icon: "/icons/tokens/rlusd.svg"
    },
    {
        symbol: "rsETH",
        fullName: "rsETH",
        walletBalance: "0",
        apy: "<0.01%",
        canBeCollateral: true,
        specialTags: [],
        action: "",
        url: "/reserve-overview/?underlyingAsset=0xa1290d69c65a6fe4df752f95823fae25cb99e5a7&marketName=proto_mainnet_v3",
        icon: "/icons/tokens/rseth.svg"
    },
    {
        symbol: "osETH",
        fullName: "Staked ETH",
        walletBalance: "0",
        apy: "<0.01%",
        canBeCollateral: true,
        specialTags: [],
        action: "",
        url: "/reserve-overview/?underlyingAsset=0xf1c9acdc66974dfb6decb12aa385b9cd01190e38&marketName=proto_mainnet_v3",
        icon: "/icons/tokens/oseth.svg"
    },
    {
        symbol: "PYUSD",
        fullName: "PayPal USD",
        walletBalance: "0",
        apy: "5.93%",
        canBeCollateral: true,
        specialTags: [],
        action: "warning",
        url: "/reserve-overview/?underlyingAsset=0x6c3ea9036406852006290770bedfcaba0e23a0e8&marketName=proto_mainnet_v3",
        icon: "/icons/tokens/pyusd.svg"
    },
    {
        symbol: "PT sUSDe February 5th 2026",
        fullName: "PT sUSDe February 2026",
        walletBalance: "0",
        apy: "0%",
        canBeCollateral: true,
        specialTags: [],
        action: "",
        url: "/reserve-overview/?underlyingAsset=0xe8483517077afa11a9b07f849cee2552f040d7b2&marketName=proto_mainnet_v3",
        icon: "/icons/tokens/ptsusde.svg"
    },
    // ... 继续添加其他资产数据
];
