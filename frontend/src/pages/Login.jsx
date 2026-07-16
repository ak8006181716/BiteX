import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight, FiCheck } from "react-icons/fi";
import { toast } from "react-hot-toast";
import { LoginUser } from "../services/auth.service";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    
    setIsLoading(true);
    const loadingToast = toast.loading("Verifying credentials...");
    
    try {
      const response =await LoginUser({ email, password });
      toast.dismiss(loadingToast);
      
      if (response?.success) {
        // Swapped arguments fallback: determine which field holds the user object
        const userObject = typeof response.data === "object" ? response.data : (typeof response.message === "object" ? response.message : null);
        const successMsg = typeof response.data === "string" ? response.data : (typeof response.message === "string" ? response.message : "Welcome back! Login successful.");
        
        toast.success(successMsg);
        
        if (userObject) {
          localStorage.setItem("user", JSON.stringify(userObject));
        }
        navigate("/home");
      } else {
        console.log(response);
        const errorMsg = typeof response?.message === "string" ? response.message : "Login failed";
        toast.error(errorMsg);
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      const errMsg = error.response?.data?.message || error.message || "An error occurred during login";
      toast.error(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    toast.success("Password reset functionality is under construction");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Decorative gradient glowing spheres */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-rose-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-5xl grid md:grid-cols-12 bg-slate-900/60 backdrop-blur-xl rounded-3xl border border-slate-800/80 shadow-2xl overflow-hidden relative z-10">
        
        {/* Left Side: Illustration / Brand Section */}
        <div className="hidden md:flex md:col-span-5 bg-gradient-to-br from-amber-500 via-orange-600 to-rose-600 p-12 flex-col justify-between relative overflow-hidden">
          {/* Overlay Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none" />
          
          <div className="relative z-10">
            <Link to="/" className="flex items-center gap-2 text-2xl font-black tracking-tight text-white">
              <span className="bg-white text-orange-600 px-3 py-1 rounded-xl shadow-lg font-extrabold rotate-[-3deg]">B</span>
              BiteX
            </Link>
          </div>

          <div className="relative z-10 my-auto py-12">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl font-extrabold text-white leading-tight mb-4"
            >
              Satisfy Your Cravings in Just a Few Bites.
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-orange-50/90 text-sm leading-relaxed"
            >
              Access your favorite restaurants, track orders in real-time, and enjoy lightning-fast delivery to your doorstep.
            </motion.p>
          </div>

          <div className="relative z-10 flex items-center gap-4 text-xs text-white/70">
            <span className="flex items-center gap-1"><FiCheck /> 50k+ Reviews</span>
            <span className="w-1.5 h-1.5 bg-white/40 rounded-full" />
            <span className="flex items-center gap-1"><FiCheck /> Instant Delivery</span>
          </div>
        </div>

        {/* Right Side: Form Section */}
        <div className="col-span-12 md:col-span-7 p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
          
          {/* Mobile Logo */}
          <div className="flex md:hidden items-center justify-between mb-8">
            <Link to="/" className="flex items-center gap-2 text-xl font-bold tracking-tight text-white">
              <span className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-2.5 py-0.5 rounded-lg font-black">B</span>
              BiteX
            </Link>
            <Link to="/register" className="text-sm font-medium text-amber-500 hover:text-amber-400 transition-colors">
              Create an account
            </Link>
          </div>

          <div className="mb-8">
            <motion.h3 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl sm:text-3xl font-bold text-white tracking-tight"
            >
              Welcome Back
            </motion.h3>
            <p className="text-slate-400 text-sm mt-2">
              Please enter your details to sign in to your account.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                  <FiMail className="w-5 h-5" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-slate-950/60 border border-slate-800 focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 rounded-2xl py-3.5 pl-12 pr-4 text-slate-100 placeholder-slate-600 outline-none transition-all duration-200"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Password
                </label>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-xs font-medium text-amber-500 hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                  <FiLock className="w-5 h-5" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950/60 border border-slate-800 focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 rounded-2xl py-3.5 pl-12 pr-12 text-slate-100 placeholder-slate-600 outline-none transition-all duration-200"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                >
                  {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me Box */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="sr-only peer"
                />
                <div className="w-5 h-5 border border-slate-800 peer-checked:border-amber-500 peer-checked:bg-amber-500 rounded-md flex items-center justify-center transition-all">
                  {rememberMe && <FiCheck className="text-slate-950 w-3.5 h-3.5 stroke-[4]" />}
                </div>
                <span className="text-sm font-medium text-slate-400 hover:text-slate-300 transition-colors">
                  Remember this device
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-bold py-4 px-6 rounded-2xl shadow-lg shadow-orange-950/20 flex items-center justify-center gap-2 group transition-all duration-300 disabled:opacity-55 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Sign In
                  <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </motion.button>
          </form>

          {/* Bottom Link (Desktop Only) */}
          <div className="hidden md:block mt-8 text-center">
            <p className="text-sm text-slate-400">
              Don't have an account?{" "}
              <Link to="/register" className="font-semibold text-amber-500 hover:text-amber-400 transition-colors">
                Create an account
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;
