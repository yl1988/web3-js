import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  arbitrum,
  base,
  mainnet,
  optimism,
  polygon,
  sepolia,
  hardhat
} from 'wagmi/chains';
import { http } from 'viem';
import { localNetRequestAddress, sepoliaNetRequestAddress } from '@/src/constants/net-address';

// wagmi.config.ts
const isDevelopment = process.env.NODE_ENV === 'development';

export const config = getDefaultConfig({
  appName: 'w3-wallet',
  projectId: 'c05ef50f0a865030879bb99e19e9917a',
  chains: isDevelopment
      ? [
        // 开发环境：只保留需要的链
        hardhat,
        sepolia, // 可选
      ]
      : [
        // 生产环境：所有主网
        mainnet,
        polygon,
        optimism,
        arbitrum,
        base,
      ],
  transports: {
    // 开发环境配置
    ...(isDevelopment && {
      [hardhat.id]: http(localNetRequestAddress),
      [sepolia.id]: http(sepoliaNetRequestAddress),
    }),
    // 生产环境配置
    ...(!isDevelopment && {
      [mainnet.id]: http(),
      [polygon.id]: http(),
      [optimism.id]: http(),
      [arbitrum.id]: http(),
      [base.id]: http(),
    }),
  },
  ssr: true,
});

export const defaultChainId: number = isDevelopment
    ? hardhat.id  // 开发用 hardhat
    : mainnet.id; // 生产用主网
