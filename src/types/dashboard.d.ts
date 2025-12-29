export interface DashboardSupplyAssetData {
    key: string;
    symbol: string;
    fullName: string;
    name: string;
    supplyApy: string;
    borrowApy: string;
    walletBalance: number;
    formattedBalance: number;
    apy: string;
    canBeCollateral: boolean;
    canSupply: boolean;
    specialTags: string[];
    action: string;
    url: string;
    icon: string;
    formattedAPY: string;
    eModeLeverage: string;
    valueUSD: string;
    supplyAPY: string;
    priceUSD: number;
    priceChange24h: number;
    availableToBorrow: string;
    formattedBorrowAPY: string;
    formattedUtilization: string;
    borrowAPY: string;
}
// types.ts
export interface DashboardBorrowAssetData {
    symbol: string;
    fullName: string;
    walletBalance: number;
    formattedBalance: number;
    availableToBorrow: number;
    available: string;
    apy: string;
    specialTags: string[];
    action: string;
    blueCheck: boolean;
    url: string;
    icon: string;
    formattedBorrowAPY: string;
}