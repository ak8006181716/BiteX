import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiShoppingBag, FiMapPin, FiLogOut, FiUser } from "react-icons/fi";
import { toast } from "react-hot-toast";
import { LogoutUser } from "../../services/auth.service.js";

const Navbar = ({ cartCount }) => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  // Try to retrieve user details from localStorage
  const getUserData = () => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch (e) {
      console.error(e);
    }
    return null;
  };

  const user = getUserData();

  const getUserInitial = () => {
    if (user && user.firstName) {
      return user.firstName.charAt(0).toUpperCase();
    }
    return "A";
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    setShowDropdown(false);
    const loadingToast = toast.loading("Logging out...");
    try {
      await LogoutUser();
      toast.dismiss(loadingToast);
      toast.success("Logged out successfully");
      localStorage.removeItem("user");
      navigate("/login");
    } catch (error) {
      toast.dismiss(loadingToast);
      console.error(error);
      toast.error("Logout failed, but clearing session");
      localStorage.removeItem("user");
      navigate("/login");
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800/80 px-4 sm:px-8 py-4 flex items-center justify-between">
      <div className="flex items-center gap-8">
        {/* Logo */}
        <Link to="/home" className="flex items-center gap-2 text-2xl font-black tracking-tight text-white">
          <span className="bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 px-3 py-1 rounded-xl shadow-lg font-extrabold rotate-[-3deg]">B</span>
          BiteX
        </Link>

        {/* Delivery Address Pick (Desktop) */}
        <div className="hidden md:flex items-center gap-2 text-xs text-slate-400 bg-slate-950/60 border border-slate-800/80 rounded-full px-4 py-2 hover:border-slate-700 transition-all cursor-pointer">
          <FiMapPin className="text-amber-500" />
          <span>Deliver to: <strong className="text-slate-200">123 Street, NY</strong></span>
        </div>
      </div>

      {/* Right side navigation actions */}
      <div className="flex items-center gap-4">
        {/* Demo Cart icon */}
        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => toast.success("Cart drawer open (Demo)")}
          className="relative bg-slate-950/60 border border-slate-800 hover:border-slate-700 p-2.5 rounded-xl cursor-pointer transition-colors"
        >
          <FiShoppingBag className="w-5 h-5 text-slate-200" />
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-slate-900">
              {cartCount}
            </span>
          )}
        </motion.div>

        {/* User avatar & Dropdown Dashboard Menu */}
        <div className="flex items-center border-l border-slate-800 pl-4 relative">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowDropdown(!showDropdown)}
            className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center font-bold text-slate-950 shadow-md cursor-pointer select-none"
          >
            {getUserInitial()}
          </motion.div>

          <AnimatePresence>
            {showDropdown && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-[110%] mt-2 w-72 bg-slate-900/95 backdrop-blur-2xl border border-slate-800 rounded-2xl shadow-2xl p-5 space-y-4 text-left z-50"
              >
                {/* Header User info */}
                <div className="border-b border-slate-800/80 pb-3 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-850 border border-slate-800 flex items-center justify-center text-slate-400">
                    <FiUser className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-white text-sm">
                      {user ? `${user.firstName} ${user.lastName}` : "BiteX User"}
                    </h4>
                    <p className="text-xs text-slate-500">@{user?.username || "user"}</p>
                  </div>
                </div>

                {/* Dashboard detail stats/links */}
                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-slate-500">Email</span>
                    <span className="text-slate-300 truncate max-w-[160px]">{user?.email || "N/A"}</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-slate-500">Phone</span>
                    <span className="text-slate-300">{user?.phone || "N/A"}</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-slate-500">Role</span>
                    <span className="text-amber-500/90 font-semibold capitalize">{user?.role || "Customer"}</span>
                  </div>
                </div>

                {/* Logout action button */}
                <button
                  onClick={handleLogout}
                  className="w-full mt-2 bg-slate-950/60 border border-slate-800 hover:bg-rose-500/10 hover:border-rose-500/20 hover:text-rose-400 text-slate-400 font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer"
                >
                  <FiLogOut className="w-3.5 h-3.5" /> Log Out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
