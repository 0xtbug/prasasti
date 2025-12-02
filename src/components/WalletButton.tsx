import { useAppKit } from '@reown/appkit/react'
import { toast } from "sonner"
import { useAccount, useDisconnect } from 'wagmi'
import { Button } from '@/components/ui/button'
import { Wallet, LogOut } from 'lucide-react'

interface WalletButtonProps {
  onConnected?: (address: string) => void;
  className?: string;
}

export function WalletButton({ onConnected, className }: WalletButtonProps) {
  const { open } = useAppKit()
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()

  if (isConnected && address && onConnected) {
    onConnected(address)
  }

  const handleClick = () => {
    if (isConnected) {
      disconnect()
      toast.success("Logged out successfully")
    } else {
      open()
    }
  }

  return (
    <Button
      onClick={handleClick}
      className={className}
      size="lg"
    >
      {isConnected ? (
        <>
          <LogOut className="mr-2 h-5 w-5" />
          Disconnect ({address?.slice(0, 6)}...{address?.slice(-4)})
        </>
      ) : (
        <>
          <Wallet className="mr-2 h-5 w-5" />
          Connect Wallet
        </>
      )}
    </Button>
  )
}
