import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAccount, useDisconnect, useReadContract } from "wagmi";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setStudentAuth } from "@/lib/auth";
import { ABI, CONTRACT_ADDRESS } from "@/lib/contract";
import { GraduationCap } from "lucide-react";
import { motion } from "framer-motion";
import { WalletButton } from "@/components/WalletButton";

const StudentLogin = () => {
  const [studentId, setStudentId] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { address, isConnected } = useAccount();

  const { disconnect } = useDisconnect();

  const { data: ownerAddress } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: 'owner',
  });

  useEffect(() => {
    if (isConnected && address && studentId.trim()) {
      if (ownerAddress && typeof ownerAddress === 'string' && address.toLowerCase() === ownerAddress.toLowerCase()) {
        toast.error("Admin wallet cannot login as student");
        disconnect();
        return;
      }

      setStudentAuth(address, studentId);
      toast.success("Login successful");
      navigate("/verify");
    }
  }, [isConnected, address, studentId, navigate, ownerAddress, disconnect]);

  const handleStudentIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudentId(e.target.value);
    if (error) setError("");
  };

  const handleConnect = () => {
    if (!studentId.trim()) {
      setError("Student ID diperlukan untuk melihat catatan akademik Anda.");
      return;
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background academic-gradient p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-md glass-panel">
          <CardHeader className="text-center space-y-2">
            <div className="mx-auto bg-secondary p-3 rounded-full w-fit mb-2">
              <GraduationCap className="h-8 w-8 text-secondary-foreground" />
            </div>
            <CardTitle className="text-2xl font-serif">Portal Mahasiswa</CardTitle>
            <CardDescription>
              Akses dan verifikasi nilai/status akademik Anda.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="studentId">Student ID / NIM (Diperlukan)</Label>
                <Input
                  id="studentId"
                  placeholder="Masukkan Student ID"
                  value={studentId}
                  onChange={handleStudentIdChange}
                  className="bg-background/50"
                  required
                />
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
              <div onClick={handleConnect}>
                <WalletButton
                  className="w-full h-11 text-md shadow-md hover:shadow-lg transition-all"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default StudentLogin;
