import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { contract } from "@/lib/contract";
import { Loader2, ShieldCheck, FileCheck, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

const VerifyRecord = () => {
  const [loading, setLoading] = useState(false);
  const [records, setRecords] = useState<any[]>([]);
  const [verifyingId, setVerifyingId] = useState<string | null>(null);
  const [verificationResults, setVerificationResults] = useState<Record<string, boolean>>({});

  const studentId = localStorage.getItem("student-id");

  const fetchRecords = async () => {
    if (!studentId) return;
    setLoading(true);
    setRecords([]);
    try {
      const count = await contract.recordCount();
      const totalRecords = Number(count);
      const fetchedRecords = [];

      for (let i = 1; i <= totalRecords; i++) {
        try {
          const data = await contract.getRecord(i);
          if (data[0] === studentId) {
            fetchedRecords.push({
              id: i.toString(),
              studentId: data[0],
              course: data[1],
              grade: data[2],
              timestamp: Number(data[3]),
              issuer: data[4],
            });
          }
        } catch (e) {
          console.warn(`Failed to fetch record ${i}`, e);
        }
      }
      setRecords(fetchedRecords);
    } catch (err) {
      console.error("Failed to fetch records", err);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (recordId: string) => {
    setVerifyingId(recordId);
    const record = records.find((r) => r.id === recordId);
    if (!record) return;

    try {
      const isValid = await contract.verifyRecord(recordId, record.studentId, record.course);
      setVerificationResults((prev) => ({ ...prev, [recordId]: isValid }));
    } catch (err) {
      console.error("Verification failed", err);
    } finally {
      setVerifyingId(null);
    }
  };

  useState(() => {
    fetchRecords();
  });

  return (
    <div className="min-h-screen bg-background academic-gradient pt-24 pb-10 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto max-w-4xl"
      >
        <Card className="glass-panel">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className="bg-secondary p-2 rounded-lg flex-shrink-0">
                  <FileCheck className="h-6 w-6 text-secondary-foreground" />
                </div>
                <div className="min-w-0 flex-1">
                  <CardTitle className="text-xl sm:text-2xl font-serif">Catatan Nilai/Status Akademik Saya</CardTitle>
                  <CardDescription className="text-xs sm:text-sm truncate">
                    NPM/NIM: <span className="text-primary font-mono">{studentId}</span>
                  </CardDescription>
                </div>
              </div>
              <Button onClick={fetchRecords} disabled={loading} variant="outline" size="sm" className="w-full sm:w-auto flex-shrink-0">
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-2 h-4 w-4" />}
                Refresh
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {loading && records.length === 0 ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : records.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <FileCheck className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-sm sm:text-base">Tidak ditemukan catatan akademik untuk NPM/NIM.</p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {records.map((record) => (
                  <motion.div
                    key={record.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="border-2 border-border rounded-lg p-4 bg-card hover:shadow-lg transition-shadow"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-semibold text-base sm:text-lg break-words flex-1">{record.course}</h3>
                        <Badge variant="secondary" className="flex-shrink-0 text-sm sm:text-base">
                          {record.grade}
                        </Badge>
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground">Record ID: {record.id}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Issued: {new Date(Number(record.timestamp) * 1000).toLocaleDateString()}
                      </p>
                      <div className="bg-muted/50 p-2 rounded text-xs break-all">
                        <span className="font-medium">Issuer:</span>{" "}
                        <span className="font-mono">{record.issuer}</span>
                      </div>
                      {verificationResults[record.id] !== undefined && (
                        <div
                          className={`p-2 rounded text-xs sm:text-sm font-medium ${
                            verificationResults[record.id]
                              ? "bg-green-600 text-white"
                              : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300"
                          }`}
                        >
                          {verificationResults[record.id] ? "✓ Valid" : "✗ Tidak Valid"}
                        </div>
                      )}
                      <Button
                        onClick={() => handleVerify(record.id)}
                        disabled={verifyingId === record.id}
                        size="sm"
                        className="w-full"
                      >
                        {verifyingId === record.id ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Verifikasi...
                          </>
                        ) : (
                          <>
                            <ShieldCheck className="mr-2 h-4 w-4" />
                            Verifikasi Catatan
                          </>
                        )}
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default VerifyRecord;
