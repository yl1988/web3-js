// hooks/useRealMarketData.ts - 完整版
import { useQuery } from '@tanstack/react-query';
import { useChainId } from 'wagmi';
import { sepolia, hardhat, mainnet } from 'wagmi/chains';

// 从 DeFiLlama 获取真实 APY 数据
async function fetchRealAaveData() {
    try {
        const response = await fetch('https://yields.llama.fi/pools');
        const data = await response.json();

        // 过滤 Aave V3 以太坊主网的数据
        const aavePools = data.data.filter((pool: any) =>
            pool.project === 'aave-v3' &&
            pool.chain === 'Ethereum' &&
            pool.symbol !== 'USD'
        );

        return aavePools.map((pool: any) => ({
            symbol: pool.symbol,
            supplyAPY: pool.apy.toFixed(2),
            borrowAPY: pool.apyBaseBorrow ? pool.apyBaseBorrow.toFixed(2) : '0.00',
            tvlUsd: pool.tvlUsd,
            totalSupplyUsd: pool.totalSupplyUsd,
            totalBorrowUsd: pool.totalBorrowUsd,
            utilization: pool.totalBorrowUsd ?
                ((pool.totalBorrowUsd / pool.totalSupplyUsd) * 100).toFixed(1) : '0.0',
        }));
    } catch (error:any) {
        console.error('Error fetching DeFiLlama data:', error);
        return null;
    }
}

// 从 CoinGecko 获取实时价格
async function fetchRealPrices(symbols: string[]) {
    try {
        const ids = symbols.map(s => {
            const map: Record<string, string> = {
                'ETH': 'ethereum',
                'WETH': 'ethereum',
                'USDC': 'usd-coin',
                'USDT': 'tether',
                'DAI': 'dai',
                'WBTC': 'wrapped-bitcoin',
                'LINK': 'chainlink',
                'AAVE': 'aave',
                'UNI': 'uniswap',
            };
            return map[s] || s.toLowerCase();
        }).join(',');

        const response = await fetch(
            `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`
        );
        const data = await response.json();

        const prices: Record<string, { price: number; change24h: number }> = {};
        symbols.forEach(symbol => {
            const id = symbol === 'ETH' || symbol === 'WETH' ? 'ethereum' : symbol.toLowerCase();
            prices[symbol] = {
                price: data[id]?.usd || 0,
                change24h: data[id]?.usd_24h_change || 0,
            };
        });

        return prices;
    } catch (error:any) {
        console.error('Error fetching CoinGecko data:', error);
        return {};
    }
}

// 获取测试网 Aave 数据（模拟或从测试网 API 获取）
async function fetchTestnetAaveData(chainId: number) {
    try {
        // 这里可以调用测试网 Aave API，但目前先返回模拟数据
        // 实际项目中可以从以下地址获取：
        // Sepolia: https://aave-api-v2.aave.com/data/poolData?network=sepolia

        // 模拟数据 - 基于主网数据稍作调整
        return [
            { symbol: 'ETH', supplyAPY: '2.85', borrowAPY: '3.50', totalSupplyUsd: 500000, totalBorrowUsd: 200000, utilization: '40.0' },
            { symbol: 'USDC', supplyAPY: '1.25', borrowAPY: '2.10', totalSupplyUsd: 300000, totalBorrowUsd: 120000, utilization: '40.0' },
        ];
    } catch (error:any) {
        console.error('Error fetching testnet Aave data:', error);
        return null;
    }
}

// 获取默认 APY
function getDefaultAPY(symbol: string, type: 'supply' | 'borrow'): string {
    const defaults: Record<string, { supply: string; borrow: string }> = {
        ETH: { supply: '2.85', borrow: '3.50' },
        USDC: { supply: '1.25', borrow: '2.10' },
        USDT: { supply: '1.15', borrow: '2.00' },
        DAI: { supply: '1.30', borrow: '2.20' },
        WBTC: { supply: '0.85', borrow: '1.50' },
        LINK: { supply: '3.50', borrow: '4.20' },
        AAVE: { supply: '4.20', borrow: '5.00' },
        UNI: { supply: '2.50', borrow: '3.50' },
    };

    return defaults[symbol]?.[type] || (type === 'supply' ? '2.00' : '3.00');
}

// 获取默认流动性
function getDefaultLiquidity(symbol: string): string {
    const defaults: Record<string, string> = {
        ETH: '500000',
        USDC: '300000',
        USDT: '250000',
        DAI: '150000',
        WBTC: '100000',
        LINK: '80000',
        AAVE: '50000',
        UNI: '60000',
    };

    return defaults[symbol] || '100000';
}

// 获取测试网代币地址
function getTestnetTokenAddress(symbol: string, chainId: number): string {
    // Sepolia 测试网代币地址
    if (chainId === sepolia.id) {
        const addresses: Record<string, string> = {
            ETH: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
            USDC: '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238', // Sepolia USDC
            USDT: '0x7169D38820dfd117C3FA1f22a697dBA58d90BA06', // Sepolia USDT
            DAI: '0x3e622317f8C93f7328350cF0B56d9eD4C620C5d6', // Sepolia DAI
        };
        return addresses[symbol] || '0x0000000000000000000000000000000000000000';
    }

    // Hardhat 本地网络（使用常见测试代币地址）
    if (chainId === hardhat.id) {
        return '0x5FbDB2315678afecb367f032d93F642f64180aa3'; // Hardhat 测试代币地址
    }

    return '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';
}

// 获取网络名称
function getChainName(chainId: number): string {
    switch (chainId) {
        case mainnet.id: return '以太坊主网';
        case sepolia.id: return 'Sepolia 测试网';
        case hardhat.id: return 'Hardhat 本地网络';
        default: return `网络 ${chainId}`;
    }
}

// 获取备选数据（当主要数据源失败时）
function getFallbackData(chainId: number) {
    const tokens = getTokenConfigs(chainId);

    const marketData = tokens.map(token => ({
        ...token,
        supplyAPY: getDefaultAPY(token.symbol, 'supply'),
        borrowAPY: getDefaultAPY(token.symbol, 'borrow'),
        canBeCollateral: true,
        liquidationThreshold: token.symbol === 'WBTC' ? '75' : '80',
        ltv: token.symbol === 'WBTC' ? '70' : '75',
        totalLiquidity: getDefaultLiquidity(token.symbol),
        totalBorrowed: (parseInt(getDefaultLiquidity(token.symbol)) * 0.4).toString(),
        priceUSD: token.symbol === 'ETH' ? 3000 : 1,
        priceChange24h: 0,
        utilization: '40.0',
        source: 'fallback',
        lastUpdated: new Date().toISOString(),
    }));

    return {
        reserves: marketData,
        timestamp: Date.now(),
        chainId,
        chainName: getChainName(chainId),
        dataSource: 'fallback',
    };
}

// 根据网络获取代币配置
function getTokenConfigs(chainId: number) {
    const baseTokens = [
        {
            symbol: 'ETH',
            name: 'Ethereum',
            address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
            decimals: 18,
            icon: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png',
            color: '#627EEA',
            isNative: true,
        },
        {
            symbol: 'WETH',
            name: 'Wrapped Ethereum',
            address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
            decimals: 18,
            icon: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png',
            color: '#627EEA',
        },
        {
            symbol: 'USDC',
            name: 'USD Coin',
            address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
            decimals: 6,
            icon: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png',
            color: '#2775CA',
        },
        {
            symbol: 'USDT',
            name: 'Tether',
            address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
            decimals: 6,
            icon: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png',
            color: '#26A17B',
        },
        {
            symbol: 'DAI',
            name: 'Dai Stablecoin',
            address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
            decimals: 18,
            icon: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png',
            color: '#FAB01B',
        },
        {
            symbol: 'WBTC',
            name: 'Wrapped Bitcoin',
            address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
            decimals: 8,
            icon: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599/logo.png',
            color: '#F7931A',
        },
    ];

    if (chainId === mainnet.id) {
        return baseTokens;
    }

    // 测试网配置（简化的代币列表）
    return [
        {
            symbol: 'ETH',
            name: 'Ethereum',
            address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
            decimals: 18,
            icon: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png',
            color: '#627EEA',
            isNative: true,
        },
        {
            symbol: 'USDC',
            name: 'USD Coin',
            address: getTestnetTokenAddress('USDC', chainId),
            decimals: 6,
            icon: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png',
            color: '#2775CA',
        },
    ];
}

// 获取 Aave 数据（支持主网和测试网）
async function fetchAaveData(chainId: number) {
    try {
        if (chainId === mainnet.id) {
            // 主网从 DeFiLlama 获取
            return await fetchRealAaveData();
        } else {
            // 测试网可以从 Aave 测试网 API 获取
            return await fetchTestnetAaveData(chainId);
        }
    } catch (error:any) {
        console.error('Error fetching Aave data:', error);
        return null;
    }
}

// 真实的数据获取函数（同时支持主网和测试网）
async function fetchRealMarketData(chainId: number) {
    try {
        // 定义不同网络的代币配置
        const tokenConfigs = getTokenConfigs(chainId);

        // 同时获取多个数据源
        const [aaveData, prices] = await Promise.all([
            fetchAaveData(chainId),
            fetchRealPrices(tokenConfigs.map(t => t.symbol)),
        ]);

        // 合并数据
        const marketData = tokenConfigs.map(token => {
            const aavePool = aaveData?.find((pool: any) =>
                pool.symbol === token.symbol ||
                (token.symbol === 'ETH' && pool.symbol === 'WETH')
            );

            const priceData = prices[token.symbol] || { price: 0, change24h: 0 };

            return {
                ...token,
                supplyAPY: aavePool?.supplyAPY || getDefaultAPY(token.symbol, 'supply'),
                borrowAPY: aavePool?.borrowAPY || getDefaultAPY(token.symbol, 'borrow'),
                canBeCollateral: true,
                liquidationThreshold: token.symbol === 'WBTC' ? '75' : '80',
                ltv: token.symbol === 'WBTC' ? '70' : '75',
                totalLiquidity: aavePool?.totalSupplyUsd
                    ? (aavePool.totalSupplyUsd / 1e6).toFixed(2)
                    : getDefaultLiquidity(token.symbol),
                totalBorrowed: aavePool?.totalBorrowUsd
                    ? (aavePool.totalBorrowUsd / 1e6).toFixed(2)
                    : '0',
                priceUSD: priceData.price,
                priceChange24h: priceData.change24h,
                utilization: aavePool?.utilization || '0.0',
                source: aavePool ? 'DeFiLlama' : 'default',
                lastUpdated: new Date().toISOString(),
                eModeLeverage: token.symbol === 'ETH' || token.symbol === 'WETH' ? '3x' : null,
            };
        });

        return {
            reserves: marketData,
            timestamp: Date.now(),
            chainId,
            chainName: getChainName(chainId),
            dataSource: aaveData ? 'real' : 'default',
        };

    } catch (error:any) {
        console.error('Error fetching market data:', error);
        return getFallbackData(chainId);
    }
}

// 主 hook
export function useRealMarketData() {
    const chainId = useChainId();

    return useQuery({
        queryKey: ['real-market-data', chainId],
        queryFn: () => fetchRealMarketData(chainId),
        refetchInterval: 60000, // 每分钟刷新
        staleTime: 30000, // 30秒后数据视为过时
    });
}

// 获取用户代币余额的 hook
export function useUserTokenBalances(address: `0x${string}`) {
    const chainId = useChainId();

    return useQuery({
        queryKey: ['user-token-balances', address, chainId],
        queryFn: async () => {
            // 模拟数据 - 在实际应用中应该从链上获取
            const mockBalances: Record<string, string> = {
                ETH: (Math.random() * 5).toFixed(4),
                USDC: (Math.random() * 10000).toFixed(2),
                USDT: (Math.random() * 5000).toFixed(2),
                DAI: (Math.random() * 3000).toFixed(2),
                WBTC: (Math.random() * 0.1).toFixed(4),
            };
            return mockBalances;
        },
        enabled: !!address, // 只在有地址时启用
        staleTime: 30000,
    });
}