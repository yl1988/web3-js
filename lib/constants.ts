// lib/constants.ts
// 测试环境配置
export const TESTNET_CONFIG = {
    // Sepolia 网络
    SEPOLIA: {
        chainId: 11155111,
        name: 'Sepolia Testnet',
        rpcUrl: 'https://sepolia.infura.io/v3/d8ed0bd1de8242d998a1405b6932ab33',

        // 在 Sepolia 上部署的测试合约地址
        // 注意：这些是示例地址，你需要替换为实际部署的合约
        // 或者可以使用 Compound、AAVE 在测试网上的部署
        TOKEN_ADDRESSES: {
            ETH: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
            WETH: '0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9', // Sepolia WETH
            USDC: '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238', // Sepolia USDC
            USDT: '0xaA8E23Fb1079EA71e0a56F48a2aA51851D8433D0', // Sepolia USDT
            DAI: '0xFF34B3d4Aee8ddCd6F9AFFFB6Fe49bD371b8a357', // Sepolia DAI
            WBTC: '0x29f2D40B0605204364af54EC677bD022dA425d03', // Sepolia WBTC
        } as const,

        // 你可以部署自己的借贷合约，或者使用已有的测试网 DeFi 协议
        // 这里用 Compound 在 Sepolia 的地址作为示例
        COMPOUND: {
            COMPTROLLER: '0x3d9819210A31b4961b30EF54bE2aeD79B9c9Cd3B',
            CETH: '0x4Ddc2D193948926D02f9B1fE9e1daa0718270ED5',
            CUSDC: '0x39AA39c021dfbaE8faC545936693aC917d5E7563',
            CDAI: '0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643',
        },
    },

    // Hardhat 本地网络
    HARHAT: {
        chainId: 31337,
        name: 'Hardhat Local',
        rpcUrl: 'http://127.0.0.1:8545',

        // Hardhat 本地网络的默认测试代币地址
        TOKEN_ADDRESSES: {
            ETH: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
            // Hardhat 通常会部署一些测试代币，你需要查看部署脚本
            USDC: '0x5FbDB2315678afecb367f032d93F642f64180aa3', // 示例地址
            DAI: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512', // 示例地址
        },
    },
} as const;

// 通用 ERC20 ABI
export const ERC20_ABI = [
    {
        constant: true,
        inputs: [{ name: '_owner', type: 'address' }],
        name: 'balanceOf',
        outputs: [{ name: 'balance', type: 'uint256' }],
        type: 'function',
    },
    {
        constant: true,
        inputs: [],
        name: 'decimals',
        outputs: [{ name: '', type: 'uint8' }],
        type: 'function',
    },
    {
        constant: true,
        inputs: [],
        name: 'symbol',
        outputs: [{ name: '', type: 'string' }],
        type: 'function',
    },
    {
        constant: true,
        inputs: [],
        name: 'name',
        outputs: [{ name: '', type: 'string' }],
        type: 'function',
    },
    {
        constant: true,
        inputs: [],
        name: 'totalSupply',
        outputs: [{ name: '', type: 'uint256' }],
        type: 'function',
    },
] as const;

// 简单的借贷池合约 ABI（示例）
export const SIMPLE_LENDING_POOL_ABI = [
    {
        inputs: [],
        name: 'getReserves',
        outputs: [
            {
                components: [
                    { internalType: 'address', name: 'asset', type: 'address' },
                    { internalType: 'uint256', name: 'totalLiquidity', type: 'uint256' },
                    { internalType: 'uint256', name: 'availableLiquidity', type: 'uint256' },
                    { internalType: 'uint256', name: 'totalBorrowed', type: 'uint256' },
                    { internalType: 'uint256', name: 'borrowRate', type: 'uint256' },
                    { internalType: 'uint256', name: 'supplyRate', type: 'uint256' },
                    { internalType: 'uint256', name: 'collateralFactor', type: 'uint256' },
                    { internalType: 'bool', name: 'isActive', type: 'bool' },
                ],
                internalType: 'struct ILendingPool.ReserveData[]',
                name: '',
                type: 'tuple[]',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [{ internalType: 'address', name: 'user', type: 'address' }],
        name: 'getUserAccountData',
        outputs: [
            { internalType: 'uint256', name: 'totalCollateral', type: 'uint256' },
            { internalType: 'uint256', name: 'totalDebt', type: 'uint256' },
            { internalType: 'uint256', name: 'availableBorrow', type: 'uint256' },
            { internalType: 'uint256', name: 'healthFactor', type: 'uint256' },
        ],
        stateMutability: 'view',
        type: 'function',
    },
] as const;