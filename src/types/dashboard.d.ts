export interface DashboardSupplyAssetData {
    symbol: string;
    fullName: string;
    walletBalance: string;
    apy: string;
    canBeCollateral: boolean;
    specialTags: string[];
    action: string;
    url: string;
    icon: string;
}
// types.ts
export interface DashboardBorrowAssetData {
    symbol: string;
    fullName: string;
    available: string;
    apy: string;
    specialTags: string[];
    action: string;
    blueCheck: boolean;
    url: string;
    icon: string;
}