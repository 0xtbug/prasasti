import { createAppKit } from '@reown/appkit/react'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { sepolia, mainnet } from '@reown/appkit/networks'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'

const queryClient = new QueryClient()

const projectId = import.meta.env.VITE_PROJECT_ID || '1b97735cd7bad5d480d71ec6982a4a03'

const metadata = {
  name: import.meta.env.VITE_APP_NAME || 'PRASASTI DApp',
  description: import.meta.env.VITE_APP_DESCRIPTION || 'Decentralized Academic Records Management',
  url: import.meta.env.VITE_APP_URL || 'http://localhost:5173',
  icons: [import.meta.env.VITE_APP_ICON || 'https://avatars.githubusercontent.com/u/37784886']
}

export const networks = [sepolia, mainnet] as any

export const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: true
})

createAppKit({
  adapters: [wagmiAdapter],
  networks,
  metadata,
  projectId,
  features: {
    analytics: true,
  }
})

export { WagmiProvider, QueryClientProvider, queryClient }
