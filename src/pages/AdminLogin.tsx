import { useEffect } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAccount, useReadContract, useDisconnect } from "wagmi";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ABI, CONTRACT_ADDRESS } from "@/lib/contract";
import { setAdminAuth } from "@/lib/auth";
import { Shield } from "lucide-react";
import { motion } from "framer-motion";
import { WalletButton } from "@/components/WalletButton";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const { data: ownerAddress, isLoading: isVerifying, isError, error: contractError } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: 'owner',
  });

  useEffect(() => {
    if (!isConnected || !address || isVerifying) return;

    if (isError) {
      console.error("Owner verification failed", contractError);
      toast.error(`Failed to verify ownership: ${contractError?.message || 'Unknown error'}`);
      return;
    }

    if (ownerAddress) {
      if (typeof ownerAddress === 'string' && address.toLowerCase() !== ownerAddress.toLowerCase()) {
        toast.error("Access denied. Not the contract owner.");
        disconnect();
      } else if (typeof ownerAddress === 'string' && address.toLowerCase() === ownerAddress.toLowerCase()) {
        setAdminAuth(address);
        toast.success("Login successful");
        navigate("/create");
      }
    }
  }, [isConnected, address, ownerAddress, isVerifying, isError, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-background academic-gradient p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-md glass-panel">
          <CardHeader className="text-center space-y-2">
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-2">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl font-serif">Portal Admin</CardTitle>
            <CardDescription>
              Akses yang aman untuk administrator yang terautentikasi.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <WalletButton
                className="w-full h-11 text-md shadow-md hover:shadow-lg transition-all"
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
