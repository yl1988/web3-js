
import { cn } from '@/lib/utils';
import {CyberTableColumn} from "@/src/components/cyber-table/cyber-table";
import { DashboardBorrowAssetData} from "@/src/types/dashboard";
import AssetsTableButton from "@/src/components/dashboard/assets-table-button";

export const columns = (onBorrow: (value:string) => void, onDetails: (value:string) => void): CyberTableColumn<DashboardBorrowAssetData>[] => [
    {
        key: 'symbol',
        header: 'Asset',
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
        key: 'available',
        header: 'Available',
        width: '120px',
        sortable: true,
        cell: (value) => (
            <span className={value === '0' ? 'text-gray-500' : 'text-cyber-neon-400'}>
        {value}
      </span>
        )
    },
    {
        key: 'apy',
        header: 'APY, variable',
        width: '120px',
        sortable: true,
        cell: (value, row) => {
            const isHighAPY = parseFloat(value) > 5;
            const isLowAPY = value.includes('<0.01') || value === '0%';

            return (
                <div className="flex items-center gap-2">
          <span className={cn(
              isHighAPY ? 'text-red-400' :
                  isLowAPY ? 'text-gray-400' :
                      'text-cyber-cyan-400',
              'font-medium'
          )}>
            {value}
          </span>
                    {row.specialTags.length > 0 && (
                        <div className="flex gap-1">
                            {row.specialTags.map((tag, index) => {
                                const isEthena = tag.includes('ethena');
                                return (
                                    <span
                                        key={index}
                                        className={cn(
                                            "px-1.5 py-0.5 rounded text-xs font-medium",
                                            isEthena
                                                ? "bg-blue-900/30 text-blue-300 border border-blue-700/50"
                                                : "bg-cyber-dark-300/50 text-gray-300 border border-cyber-dark-300"
                                        )}
                                    >
                    {tag.split('(')[0]}
                  </span>
                                );
                            })}
                        </div>
                    )}
                </div>
            );
        }
    },
    {
        key: 'action',
        header: '',
        width: '80px',
        cell: (value) => <div className="flex items-center space-x-2">
            <AssetsTableButton onClick={onBorrow}>Borrow</AssetsTableButton>
            <AssetsTableButton onClick={onDetails}>Details</AssetsTableButton>
        </div>
    }
];

export const data: DashboardBorrowAssetData[] = [
    {
        symbol: "GHO",
        fullName: "Gho Token",
        available: "0",
        apy: "4.73%",
        specialTags: ["5x(ethena)"],
        action: "",
        blueCheck: false,
        url: "/reserve-overview/?underlyingAsset=0x40d16fc0246ad3160ccc09b8d0d3a2cd28ae6c2f&marketName=proto_mainnet_v3",
        icon: "/icons/tokens/gho.svg"
    },
    {
        symbol: "ETH",
        fullName: "Ethereum",
        available: "0",
        apy: "1.99%",
        specialTags: [],
        action: "",
        blueCheck: false,
        url: "/reserve-overview/?underlyingAsset=0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2&marketName=proto_mainnet_v3",
        icon: "/icons/tokens/eth.svg"
    },
    {
        symbol: "USDT",
        fullName: "Tether",
        available: "0",
        apy: "4.05%",
        specialTags: [],
        action: "",
        blueCheck: false,
        url: "/reserve-overview/?underlyingAsset=0xdac17f958d2ee523a2206206994597c13d831ec7&marketName=proto_mainnet_v3",
        icon: "/icons/tokens/usdt.svg"
    },
    {
        symbol: "weETH",
        fullName: "Wrapped eETH",
        available: "0",
        apy: "1.01%",
        specialTags: [],
        action: "",
        blueCheck: false,
        url: "/reserve-overview/?underlyingAsset=0xcd5fe23c85820f7b72d0926fc9b05b43e359b7ee&marketName=proto_mainnet_v3",
        icon: "/icons/tokens/weeth.svg"
    },
    {
        symbol: "USDC",
        fullName: "USD Coin",
        available: "0",
        apy: "4.92%",
        specialTags: [],
        action: "",
        blueCheck: false,
        url: "/reserve-overview/?underlyingAsset=0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48&marketName=proto_mainnet_v3",
        icon: "/icons/tokens/usdc.svg"
    },
    {
        symbol: "wstETH",
        fullName: "Wrapped liquid staked Ether 2.0",
        available: "0",
        apy: "0.15%",
        specialTags: [],
        action: "",
        blueCheck: false,
        url: "/reserve-overview/?underlyingAsset=0x7f39c581f595b53c5cb19bd0b3f8da6c935e2ca0&marketName=proto_mainnet_v3",
        icon: "/icons/tokens/wsteth.svg"
    },
    {
        symbol: "WBTC",
        fullName: "Wrapped BTC",
        available: "0",
        apy: "0.41%",
        specialTags: [],
        action: "",
        blueCheck: false,
        url: "/reserve-overview/?underlyingAsset=0x2260fac5e5542a773aa44fbcfedf7c193bc2c599&marketName=proto_mainnet_v3",
        icon: "/icons/tokens/wbtc.svg"
    },
    {
        symbol: "cbBTC",
        fullName: "Coinbase Wrapped BTC",
        available: "0",
        apy: "0.33%",
        specialTags: [],
        action: "",
        blueCheck: false,
        url: "/reserve-overview/?underlyingAsset=0xcbb7c0000ab88b473b1f5afd9ef808440eed33bf&marketName=proto_mainnet_v3",
        icon: "/icons/tokens/cbbtc.svg"
    },
    {
        symbol: "USDe",
        fullName: "USDe",
        available: "0",
        apy: "3.51%",
        specialTags: [],
        action: "",
        blueCheck: false,
        url: "/reserve-overview/?underlyingAsset=0x4c9edd5852cd905f086c759e8383e09bff1e68b3&marketName=proto_mainnet_v3",
        icon: "/icons/tokens/usde.svg"
    },
    {
        symbol: "RLUSD",
        fullName: "RLUSD",
        available: "0",
        apy: "3.58%",
        specialTags: [],
        action: "",
        blueCheck: false,
        url: "/reserve-overview/?underlyingAsset=0x8292bb45bf1ee4d140127049757c2e0ff06317ed&marketName=proto_mainnet_v3",
        icon: "/icons/tokens/rlusd.svg"
    },
    {
        symbol: "osETH",
        fullName: "Staked ETH",
        available: "0",
        apy: "<0.01%",
        specialTags: [],
        action: "",
        blueCheck: false,
        url: "/reserve-overview/?underlyingAsset=0xf1c9acdc66974dfb6decb12aa385b9cd01190e38&marketName=proto_mainnet_v3",
        icon: "/icons/tokens/oseth.svg"
    },
    {
        symbol: "PYUSD",
        fullName: "PayPal USD",
        available: "0",
        apy: "3.73%",
        specialTags: [],
        action: "",
        blueCheck: false,
        url: "/reserve-overview/?underlyingAsset=0x6c3ea9036406852006290770bedfcaba0e23a0e8&marketName=proto_mainnet_v3",
        icon: "/icons/tokens/pyusd.svg"
    },
    {
        symbol: "LINK",
        fullName: "ChainLink",
        available: "0",
        apy: "0.82%",
        specialTags: [],
        action: "",
        blueCheck: false,
        url: "/reserve-overview/?underlyingAsset=0x514910771af9ca656af840dff83e8264ecf986ca&marketName=proto_mainnet_v3",
        icon: "/icons/tokens/link.svg"
    },
    {
        symbol: "DAI",
        fullName: "Dai Stablecoin",
        available: "0",
        apy: "4.56%",
        specialTags: [],
        action: "",
        blueCheck: false,
        url: "/reserve-overview/?underlyingAsset=0x6b175474e89094c44da98b954eedeac495271d0f&marketName=proto_mainnet_v3",
        icon: "/icons/tokens/dai.svg"
    },
    {
        symbol: "tBTC",
        fullName: "tBTC",
        available: "0",
        apy: "0.30%",
        specialTags: [],
        action: "",
        blueCheck: false,
        url: "/reserve-overview/?underlyingAsset=0x18084fba666a33d37592fa2633fd49a74dd93a88&marketName=proto_mainnet_v3",
        icon: "/icons/tokens/tbtc.svg"
    },
    {
        symbol: "rETH",
        fullName: "Rocket Pool ETH",
        available: "0",
        apy: "0.02%",
        specialTags: [],
        action: "",
        blueCheck: false,
        url: "/reserve-overview/?underlyingAsset=0xae78736cd615f374d3085123a210448e74fc6393&marketName=proto_mainnet_v3",
        icon: "/icons/tokens/reth.svg"
    },
    {
        symbol: "USDtb",
        fullName: "USDtb",
        available: "0",
        apy: "3.42%",
        specialTags: [],
        action: "",
        blueCheck: false,
        url: "/reserve-overview/?underlyingAsset=0xc139190f447e929f090edeb554d95abb8b18ac1c&marketName=proto_mainnet_v3",
        icon: "/icons/tokens/usdtb.svg"
    },
    {
        symbol: "USDS",
        fullName: "USDS Stablecoin",
        available: "0",
        apy: "5.84%",
        specialTags: [],
        action: "",
        blueCheck: false,
        url: "/reserve-overview/?underlyingAsset=0xdc035d45d973e3ec169d2276ddab16f1e407384f&marketName=proto_mainnet_v3",
        icon: "/icons/tokens/usds.svg"
    },
    {
        symbol: "EURC",
        fullName: "Euro Coin",
        available: "0",
        apy: "1.55%",
        specialTags: [],
        action: "",
        blueCheck: true,
        url: "/reserve-overview/?underlyingAsset=0x1abaea1f7c830bd89acc67ec4af516284b1bc33c&marketName=proto_mainnet_v3",
        icon: "/icons/tokens/eurc.svg"
    },
    {
        symbol: "FBTC",
        fullName: "FunctionBTC",
        available: "0",
        apy: "0.51%",
        specialTags: [],
        action: "",
        blueCheck: false,
        url: "/reserve-overview/?underlyingAsset=0xc96de26018a54d51c097160568752c4e3bd6c364&marketName=proto_mainnet_v3",
        icon: "/icons/tokens/fbtc.svg"
    },
    {
        symbol: "ETHx",
        fullName: "ETHx",
        available: "0",
        apy: "<0.01%",
        specialTags: [],
        action: "",
        blueCheck: false,
        url: "/reserve-overview/?underlyingAsset=0xa35b1b31ce002fbf2058d22f30f95d405200a15b&marketName=proto_mainnet_v3",
        icon: "/icons/tokens/ethx.svg"
    },
    {
        symbol: "cbETH",
        fullName: "Coinbase Wrapped Staked ETH",
        available: "0",
        apy: "0.16%",
        specialTags: [],
        action: "",
        blueCheck: false,
        url: "/reserve-overview/?underlyingAsset=0xbe9895146f7af43049ca1c1ae358b0541ea49704&marketName=proto_mainnet_v3",
        icon: "/icons/tokens/cbeth.svg"
    },
    {
        symbol: "BAL",
        fullName: "Balancer",
        available: "0",
        apy: "6.26%",
        specialTags: [],
        action: "",
        blueCheck: false,
        url: "/reserve-overview/?underlyingAsset=0xba100000625a3754423978a60c9317c58a424e3d&marketName=proto_mainnet_v3",
        icon: "/icons/tokens/bal.svg"
    },
    {
        symbol: "UNI",
        fullName: "Uniswap",
        available: "0",
        apy: "0.54%",
        specialTags: [],
        action: "",
        blueCheck: false,
        url: "/reserve-overview/?underlyingAsset=0x1f9840a85d5af5bf1d1762f925bdaddc4201f984&marketName=proto_mainnet_v3",
        icon: "/icons/tokens/uni.svg"
    },
    {
        symbol: "CRV",
        fullName: "Curve DAO Token",
        available: "0",
        apy: "6.46%",
        specialTags: [],
        action: "",
        blueCheck: false,
        url: "/reserve-overview/?underlyingAsset=0xd533a949740bb3306d119cc777fa900ba034cd52&marketName=proto_mainnet_v3",
        icon: "/icons/tokens/crv.svg"
    },
    {
        symbol: "LUSD",
        fullName: "LUSD Stablecoin",
        available: "0",
        apy: "4.33%",
        specialTags: [],
        action: "",
        blueCheck: false,
        url: "/reserve-overview/?underlyingAsset=0x5f98805a4e8be255a32880fdec7f6728c6568ba0&marketName=proto_mainnet_v3",
        icon: "/icons/tokens/lusd.svg"
    },
    {
        symbol: "LDO",
        fullName: "Lido DAO Token",
        available: "0",
        apy: "1.32%",
        specialTags: [],
        action: "",
        blueCheck: false,
        url: "/reserve-overview/?underlyingAsset=0x5a98fcbea516cf06857215779fd812ca3bef1b32&marketName=proto_mainnet_v3",
        icon: "/icons/tokens/ldo.svg"
    },
    {
        symbol: "MKR",
        fullName: "Maker",
        available: "0",
        apy: "0.02%",
        specialTags: [],
        action: "",
        blueCheck: false,
        url: "/reserve-overview/?underlyingAsset=0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2&marketName=proto_mainnet_v3",
        icon: "/icons/tokens/mkr.svg"
    },
    {
        symbol: "RPL",
        fullName: "Rocket Pool Protocol",
        available: "0",
        apy: "3.54%",
        specialTags: [],
        action: "",
        blueCheck: false,
        url: "/reserve-overview/?underlyingAsset=0xd33526068d116ce69f19a9ee46f0bd304f21a51f&marketName=proto_mainnet_v3",
        icon: "/icons/tokens/rpl.svg"
    },
    {
        symbol: "1INCH",
        fullName: "1inch Network",
        available: "0",
        apy: "0.50%",
        specialTags: [],
        action: "",
        blueCheck: false,
        url: "/reserve-overview/?underlyingAsset=0x111111111117dc0aa78b770fa6a738034120c302&marketName=proto_mainnet_v3",
        icon: "/icons/tokens/1inch.svg"
    },
    {
        symbol: "ENS",
        fullName: "Ethereum Name Service",
        available: "0",
        apy: "1.54%",
        specialTags: [],
        action: "",
        blueCheck: false,
        url: "/reserve-overview/?underlyingAsset=0xc18360217d8f7ab5e7c516566761ea12ce7f9d72&marketName=proto_mainnet_v3",
        icon: "/icons/tokens/ens.svg"
    },
    {
        symbol: "crvUSD",
        fullName: "Curve.Fi USD Stablecoin",
        available: "0",
        apy: "5.20%",
        specialTags: [],
        action: "",
        blueCheck: false,
        url: "/reserve-overview/?underlyingAsset=0xf939e0a03fb07f59a73314e73794be0e57ac1b4e&marketName=proto_mainnet_v3",
        icon: "/icons/tokens/crvusd.svg"
    },
    {
        symbol: "mUSD",
        fullName: "MetaMask USD",
        available: "0",
        apy: "0.62%",
        specialTags: [],
        action: "",
        blueCheck: false,
        url: "/reserve-overview/?underlyingAsset=0xaca92e438df0b2401ff60da7e4337b687a2435da&marketName=proto_mainnet_v3",
        icon: "/icons/tokens/musd.svg"
    }
];