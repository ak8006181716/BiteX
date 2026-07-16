import { useState } from "react";
import Navbar from "../components/navbar/Navbar.jsx";
import Footer from "../components/footer/Footer.jsx";
import { motion } from "framer-motion";

const Home = () => {
  const [cartCount] = useState(0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col justify-between relative overflow-hidden">
      {/* Decorative gradient glowing spheres */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-rose-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Top Navbar Component */}
      <Navbar cartCount={cartCount} />

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center p-8 relative z-10 my-16">
        <div className="max-w-2xl text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg shadow-orange-950/5"
          >
            🚀 Launching Soon
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight"
          >
            Welcome to <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 bg-clip-text text-transparent">BiteX</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-400 text-sm sm:text-lg max-w-lg mx-auto leading-relaxed"
          >
            We are cooking up something truly amazing. Prepare your tastebuds for the fastest, most premium food ordering experience. We're launching in your city soon!
          </motion.p>
          
          {/* Subtle separator */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-24 h-0.5 bg-gradient-to-r from-amber-500 to-rose-500 mx-auto"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xs text-slate-500 font-medium uppercase tracking-widest"
          >
            we are online soon
          </motion.p>
        </div>
      </main>

      {/* Footer Component */}
      <Footer />
    </div>
  );
};

export default Home;
