import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Database, Wallet, GraduationCap, CheckCircle2 } from "lucide-react";

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 50,
        damping: 20,
      },
    },
  };

  return (
    <div className="min-h-screen bg-background academic-gradient flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col justify-center pt-32 pb-20 px-6">
        <motion.div
          className="container mx-auto max-w-7xl grid lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Column: Content */}
          <div className="space-y-8 text-center lg:text-left">
            <motion.div variants={itemVariants} className="backdrop-blur-sm">
              <Badge
                variant="outline"
                className="px-4 py-1.5 text-sm border-primary/20 bg-primary/5 text-primary uppercase tracking-widest font-semibold"
              >
                Decentralized Education
              </Badge>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-4">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-foreground font-serif leading-[0.9]">
                PRASASTI
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto lg:mx-0">
                <span className="text-foreground font-medium">Pencatatan Riwayat Akademik Sah, Aman, Serta Transparan Indonesia</span>
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-4"
            >
              <Link to="/admin-login">
                <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 rounded-xl">
                  Portal Admin <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/student-login">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto h-14 px-8 text-lg bg-background/50 backdrop-blur-md hover:bg-primary/5 border-primary/20 hover:border-primary/50 transition-all duration-300 rounded-xl"
                >
                  Portal Mahasiswa <GraduationCap className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>

            <motion.div variants={itemVariants} className="pt-8 flex items-center justify-center lg:justify-start gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2 backdrop-blur-sm">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>Anti-rusak</span>
              </div>
              <div className="flex items-center gap-2 backdrop-blur-sm">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>Verifikasi Instan</span>
              </div>
              <div className="flex items-center gap-2 backdrop-blur-sm">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>Tanpa Waktu Henti</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Visual */}
          <motion.div
            variants={itemVariants}
            className="relative hidden lg:block h-[600px] w-full"
          >
             {/* Abstract Block Visual */}
            <div className="absolute inset-0 flex items-center justify-center">
               <div className="relative w-full h-full">
                  <motion.div
                    animate={{ y: [0, -20, 0] }}
                    transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                    className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-3xl backdrop-blur-xl border border-primary/20 z-10"
                  />
                  <motion.div
                    animate={{ y: [0, 20, 0] }}
                    transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 1 }}
                    className="absolute top-1/3 right-1/4 w-56 h-56 bg-secondary/80 rounded-full blur-3xl opacity-30 z-0"
                  />
                   <motion.div
                    animate={{ rotate: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
                    className="absolute bottom-1/4 right-1/3 w-72 h-48 glass-panel rounded-2xl flex items-center justify-center z-20 p-6"
                  >
                    <div className="space-y-4 w-full">
                        <div className="h-4 w-3/4 bg-primary/20 rounded animate-pulse" />
                        <div className="h-4 w-1/2 bg-primary/10 rounded animate-pulse" />
                        <div className="h-20 w-full bg-muted/50 rounded-lg mt-4 border border-border/50 flex items-center justify-center">
                            <Database className="h-8 w-8 text-primary/40" />
                        </div>
                    </div>
                  </motion.div>
               </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <motion.section
        className="py-20 px-6 bg-card/30 border-t border-border/50 backdrop-blur-sm"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">Kenapa PRASASTI?</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">Dibangun berdasarkan prinsip desentralisasi untuk memastikan prestasi akademik Anda tetap abadi.</p>
            </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: ShieldCheck,
                title: "Integritas Kriptografi",
                desc: "Catatan dienkripsi dan ditandatangani secara digital, sehingga secara matematis tidak mungkin untuk dipalsukan.",
                className: "md:col-span-2 bg-primary/5 border-primary/10"
              },
              {
                icon: Wallet,
                title: "Kepemilikan Dompet",
                desc: "Mahasiswa memiliki akses ke catatan mereka melalui dompet kripto pribadi mereka.",
                className: ""
              },
              {
                icon: Database,
                title: "Penyimpanan Permanen",
                desc: "Data disimpan di blockchain Ethereum, sehingga tidak terpengaruh oleh kegagalan server.",
                className: ""
              },
              {
                icon: GraduationCap,
                title: "Verifikasi Global",
                desc: "Institusi di seluruh dunia dapat memverifikasi kredensial secara instan tanpa perantara.",
                className: "md:col-span-2 bg-secondary/50 border-secondary/20"
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className={`glass-panel p-8 rounded-2xl flex flex-col justify-between gap-4 transition-all duration-300 hover:shadow-2xl ${feature.className}`}
              >
                <div className="bg-background/50 w-12 h-12 rounded-xl flex items-center justify-center border border-border/50">
                    <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
