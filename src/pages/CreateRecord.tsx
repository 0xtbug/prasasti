import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { contract } from "@/lib/contract";
import { Loader2, FilePlus } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

const CreateRecord = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    studentId: "",
    course: "",
    grade: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const loadingToast = toast.loading("Membuat catatan di blockchain...");

    try {
      const tx = await contract.createRecord(formData.studentId, formData.course, formData.grade);
      await tx.wait();

      toast.dismiss(loadingToast);
      toast.success("Catatan berhasil dibuat!", {
        description: (
          <span>
            Transaksi:{" "}
            <a
              href={`https://sepolia.etherscan.io/tx/${tx.hash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-primary"
            >
              {tx.hash.slice(0, 10)}...{tx.hash.slice(-8)}
            </a>
          </span>
        ),
        duration: 5000,
      });

      setFormData({ studentId: "", course: "", grade: "" });
    } catch (err: any) {
      console.error(err);

      toast.dismiss(loadingToast);

      toast.error("Gagal membuat catatan", {
        description: err.message || "Terjadi kesalahan saat membuat catatan.",
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background academic-gradient pt-24 pb-10 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto max-w-2xl"
      >
        <Card className="glass-panel">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-primary/10 p-2 rounded-lg">
                <FilePlus className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl font-serif">Buat Catatan Akademik</CardTitle>
                <CardDescription>Buat catatan baru yang tidak dapat diubah di blockchain.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="studentId">NPM/NIM</Label>
                <Input
                  id="studentId"
                  value={formData.studentId}
                  onChange={handleChange}
                  required
                  placeholder="e.g. 12345678"
                  className="bg-background/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="course">Nama Mata Kuliah</Label>
                <Input
                  id="course"
                  value={formData.course}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Blockchain 101"
                  className="bg-background/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="grade">Nilai</Label>
                <Input
                  id="grade"
                  value={formData.grade}
                  onChange={handleChange}
                  required
                  placeholder="e.g. A"
                  className="bg-background/50"
                />
              </div>

              <Button type="submit" className="w-full h-11 text-md" disabled={loading}>
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Buat Catatan"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default CreateRecord;
