import { Chain } from 'wagmi'

export const quorumChain = () => {
  // default
  let quorum: Chain = {
    id: parseInt(process.env.NEXT_PUBLIC_CHAIN_ID),
    name: process.env.NEXT_PUBLIC_QUORUM_CHAIN,
    network: 'quorumdev',
    nativeCurrency: {
      decimals: 18,
      name: 'DAU',
      symbol: 'DAU',
    },
    rpcUrls: {
      public: { http: [process.env.NEXT_PUBLIC_RPC_URL] },
      default: { http: [process.env.NEXT_PUBLIC_RPC_URL] },
    },
    blockExplorers: {
      etherscan: { name: 'Quorum Explorer', url: process.env.NEXT_PUBLIC_BLOCK_EXPLORER },
      default: { name: 'Quorum Explorer', url: process.env.NEXT_PUBLIC_BLOCK_EXPLORER },
    },
    contracts: {
    },
  } as Chain;

  // if(!process.env.QUORUM_CHAIN || process.env.QUORUM_CHAIN === 'development' ) {
  //   chain = {
  //     id: 1337,
  //     name: 'Quorum Dev',
  //     network: 'quorumdev',
  //     nativeCurrency: {
  //       decimals: 18,
  //       name: 'DAU',
  //       symbol: 'DAU',
  //     },
  //     rpcUrls: {
  //       public: { http: ['http://quorumdev:8545'] },
  //       default: { http: ['http://quorumdev:8545'] },
  //     },
  //     blockExplorers: {
  //       etherscan: { name: 'Quorum Explorer', url: 'http://quorumdev:26000' },
  //       default: { name: 'Quorum Explorer', url: 'http://quorumdev:26000' },
  //     },
  //     contracts: {
  //     },
  //   } as Chain
  // } else if(process.env.QUORUM_CHAIN === 'uat') {
  //   chain = {
  //     id: 1337,
  //     name: 'Quorum Test',
  //     network: 'quorumtest',
  //     nativeCurrency: {
  //       decimals: 18,
  //       name: 'DAU',
  //       symbol: 'DAU',
  //     },
  //     rpcUrls: {
  //       public: { http: ['http://quorumtest:8545'] },
  //       default: { http: ['http://quorumtest:8545'] },
  //     },
  //     blockExplorers: {
  //       etherscan: { name: 'Quorum Explorer', url: 'http://quorumtest:26000' },
  //       default: { name: 'Quorum Explorer', url: 'http://quorumtest:26000' },
  //     },
  //     contracts: {
  //     },
  //   } as Chain
  // } else if(process.env.QUORUM_CHAIN === 'production') {
  //   // @todo add config for production chain
  // }

  return quorum
}