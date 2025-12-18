import { JsonRpcProvider, Contract, formatUnits, formatEther } from 'ethers';

// 1. 连接 Infura
const provider = new JsonRpcProvider(
    'https://mainnet.infura.io/v3/d8ed0bd1de8242d998a1405b6932ab33'
);

// 2. 读取 ERC20 代币余额
export async function getTokenBalance(tokenAddress, userAddress) {
    const abi = [
        "function balanceOf(address owner) view returns (uint256)",
        "function decimals() view returns (uint8)",
        "function symbol() view returns (string)"
    ];

    const tokenContract = new Contract(tokenAddress, abi, provider);

    const balance = await tokenContract.balanceOf(userAddress);
    const decimals = await tokenContract.decimals();
    const symbol = await tokenContract.symbol();

    return {
        symbol,
        balance: formatUnits(balance, decimals),
        decimals
    };
}

// 3. 获取 ETH 余额
export async function getETHBalance(address) {
    const balance = await provider.getBalance(address);
    return formatEther(balance);
}