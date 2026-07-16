import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight, FiUser, FiAtSign, FiCheck, FiPhone } from "react-icons/fi";
import { toast } from "react-hot-toast";
import { registerUser } from "../api/auth.api.js";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, username, email, password, confirmPassword, phone } = formData;

    if (!firstName || !lastName || !username || !email || !password || !confirmPassword || !phone) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords and verify password is not metched");
      return;
    }

    if (!agreeTerms) {
      toast.error("Please agree to the Terms of Service & Privacy Policy");
      return;
    }

    setIsLoading(true);
    const loadingToast = toast.loading("Creating your account...");

    try {
      const response = await registerUser({ firstName, lastName, username, email, password, phone });
      toast.dismiss(loadingToast);
      
      if (response?.success) {
        // Swapped arguments fallback: determine which field holds the user object
        const userObject = typeof response.data === "object" ? response.data : (typeof response.message === "object" ? response.message : null);
        const successMsg = typeof response.data === "string" ? response.data : (typeof response.message === "string" ? response.message : "Account created successfully!");
        
        toast.success(successMsg);
        
        if (userObject) {
          localStorage.setItem("user", JSON.stringify(userObject));
        }
        navigate("/home");
      } else {
        const errorMsg = typeof response?.message === "string" ? response.message : "Registration failed";
        toast.error(errorMsg);
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      const errMsg = error.response?.data?.message || error.message || "An error occurred during registration";
      toast.error(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Decorative gradient glowing spheres */}
      <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-rose-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-5xl grid md:grid-cols-12 bg-slate-900/60 backdrop-blur-xl rounded-3xl border border-slate-800/80 shadow-2xl overflow-hidden relative z-10">
        
        {/* Left Side: Brand & Feature Section */}
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
              Join the BiteX Feast.
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-orange-50/90 text-sm leading-relaxed"
            >
              Unlock access to exclusive discounts, order tracking, curated gourmet selections, and reward points on every single order.
            </motion.p>
          </div>

          <div className="relative z-10 flex items-center gap-4 text-xs text-white/70">
            <span className="flex items-center gap-1"><FiCheck /> Fast Setup</span>
            <span className="w-1.5 h-1.5 bg-white/40 rounded-full" />
            <span className="flex items-center gap-1"><FiCheck /> Zero Hidden Fees</span>
          </div>
        </div>

        {/* Right Side: Form Section */}
        <div className="col-span-12 md:col-span-7 p-8 sm:p-12 flex flex-col justify-center">
          
          {/* Mobile Logo */}
          <div className="flex md:hidden items-center justify-between mb-8">
            <Link to="/" className="flex items-center gap-2 text-xl font-bold tracking-tight text-white">
              <span className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-2.5 py-0.5 rounded-lg font-black">B</span>
              BiteX
            </Link>
            <Link to="/login" className="text-sm font-medium text-amber-500 hover:text-amber-400 transition-colors">
              Sign In instead
            </Link>
          </div>

          <div className="mb-6">
            <motion.h3 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl sm:text-3xl font-bold text-white tracking-tight"
            >
              Create Account
            </motion.h3>
            <p className="text-slate-400 text-sm mt-2">
              Sign up today and get free delivery on your first order.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Grid for First Name & Last Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* First Name */}
              <div className="space-y-1.5">
                <label htmlFor="firstName" className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  First Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                    <FiUser className="w-4 h-4" />
                  </div>
                  <input
                    id="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Ankit"
                    className="w-full bg-slate-950/60 border border-slate-800 focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 rounded-xl py-3 pl-11 pr-4 text-slate-100 placeholder-slate-600 text-sm outline-none transition-all duration-200"
                    required
                  />
                </div>
              </div>

              {/* Last Name */}
              <div className="space-y-1.5">
                <label htmlFor="lastName" className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Last Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                    <FiUser className="w-4 h-4" />
                  </div>
                  <input
                    id="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Kumar"
                    className="w-full bg-slate-950/60 border border-slate-800 focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 rounded-xl py-3 pl-11 pr-4 text-slate-100 placeholder-slate-600 text-sm outline-none transition-all duration-200"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Grid for Username & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Username */}
              <div className="space-y-1.5">
                <label htmlFor="username" className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                    <FiAtSign className="w-4 h-4" />
                  </div>
                  <input
                    id="username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="ankit123"
                    className="w-full bg-slate-950/60 border border-slate-800 focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 rounded-xl py-3 pl-11 pr-4 text-slate-100 placeholder-slate-600 text-sm outline-none transition-all duration-200"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label htmlFor="email" className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                    <FiMail className="w-4 h-4" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="ankit@gmail.com"
                    className="w-full bg-slate-950/60 border border-slate-800 focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 rounded-xl py-3 pl-11 pr-4 text-slate-100 placeholder-slate-600 text-sm outline-none transition-all duration-200"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Phone Field */}
            <div className="space-y-1.5">
              <label htmlFor="phone" className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                  <FiPhone className="w-4 h-4" />
                </div>
                <input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className="w-full bg-slate-950/60 border border-slate-800 focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 rounded-xl py-3 pl-11 pr-4 text-slate-100 placeholder-slate-600 text-sm outline-none transition-all duration-200"
                  required
                />
              </div>
            </div>

            {/* Grid for Password & Confirm Password */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Password */}
              <div className="space-y-1.5">
                <label htmlFor="password" className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                    <FiLock className="w-4 h-4" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full bg-slate-950/60 border border-slate-800 focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 rounded-xl py-3 pl-11 pr-10 text-slate-100 placeholder-slate-600 text-sm outline-none transition-all duration-200"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-350 cursor-pointer"
                  >
                    {showPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-1.5">
                <label htmlFor="confirmPassword" className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                    <FiLock className="w-4 h-4" />
                  </div>
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full bg-slate-950/60 border border-slate-800 focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 rounded-xl py-3 pl-11 pr-10 text-slate-100 placeholder-slate-600 text-sm outline-none transition-all duration-200"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-350 cursor-pointer"
                  >
                    {showConfirmPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Agree Terms Checkbox */}
            <div className="pt-2">
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={() => setAgreeTerms(!agreeTerms)}
                  className="sr-only peer"
                />
                <div className="w-5 h-5 mt-0.5 border border-slate-800 peer-checked:border-amber-500 peer-checked:bg-amber-500 rounded-md flex items-center justify-center transition-all shrink-0">
                  {agreeTerms && <FiCheck className="text-slate-950 w-3.5 h-3.5 stroke-[4]" />}
                </div>
                <span className="text-xs text-slate-400 leading-normal">
                  I agree to BiteX's{" "}
                  <a href="#terms" className="text-amber-500 hover:underline">Terms of Service</a>
                  {" "}and{" "}
                  <a href="#privacy" className="text-amber-500 hover:underline">Privacy Policy</a>
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={isLoading}
              className="w-full mt-4 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-orange-950/20 flex items-center justify-center gap-2 group transition-all duration-300 disabled:opacity-55 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Create Account
                  <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </motion.button>
          </form>

          {/* Bottom Link (Desktop Only) */}
          <div className="hidden md:block mt-6 text-center">
            <p className="text-sm text-slate-400">
              Already have an account?{" "}
              <Link to="/login" className="font-semibold text-amber-500 hover:text-amber-400 transition-colors">
                Sign In
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Register;