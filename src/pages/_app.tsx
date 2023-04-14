import { EthereumClient, modalConnectors, walletConnectProvider } from '@web3modal/ethereum'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import { WagmiConfig, configureChains, createClient } from 'wagmi'
import { arbitrum, avalanche, bsc, fantom, mainnet, optimism, polygon } from 'wagmi/chains'
import { quorumChain } from '../config/customChains'
import Navigation from '../components/Navigation'
import '../styles.css'
import { ethers } from 'ethers'

// 1. Get projectID at https://cloud.walletconnect.com
if (!process.env.NEXT_PUBLIC_PROJECT_ID) {
  throw new Error('You need to provide NEXT_PUBLIC_PROJECT_ID env variable')
}

export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID

// // 2. Configure wagmi client
const chains = [quorumChain()]
const { provider } = configureChains(chains, [walletConnectProvider({ projectId })])
export const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({
    appName: 'web3Modal',
    chains
  }),
  provider
})

// 3. Configure modal ethereum client
export const ethereumClient = new EthereumClient(wagmiClient, chains)

// 4. Wrap your app with WagmiProvider and add <Web3Modal /> compoennt
export default function App({ Component, pageProps }: AppProps) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setReady(true)
    forceSwitchNetwork()
  }, [])

  return (
    <>
      {ready ? (
        <WagmiConfig client={wagmiClient}>
          <Navigation />
          <Component {...pageProps} />
        </WagmiConfig>
      ) : null}

      {/* Add Web3Modal here, This example adds them in individual pages */}
      {/* <Web3Modal projectId={projectId} ethereumClient={ethereumClient} /> */}
    </>
  )
}

export async function forceSwitchNetwork() {
  const currentNetworkId: number = parseInt(window.ethereum.networkVersion);
  const requiredNetworkId: number = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID);
  if(currentNetworkId != requiredNetworkId) {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: ethers.utils.hexValue(requiredNetworkId) }]
      });
    } catch (err) {
      console.log(ethers.utils.hexValue(requiredNetworkId))
        // This error code indicates that the chain has not been added to MetaMask
      if (err.code === 4902) {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainName: 'Quorum Dev',
              chainId: ethers.utils.hexValue(requiredNetworkId),
              nativeCurrency: { name: 'DAU', decimals: 18, symbol: 'DAU' },
              rpcUrls: [process.env.NEXT_PUBLIC_RPC_URL],
            }
          ]
        });
      }
    }
  }
}