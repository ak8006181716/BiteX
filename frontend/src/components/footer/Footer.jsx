import { Link } from "react-router-dom";
import { FiInstagram, FiTwitter, FiFacebook, FiGithub } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800/80 text-slate-400 py-12 px-4 sm:px-8 mt-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
        {/* Brand Column */}
        <div className="md:col-span-4 space-y-4">
          <Link to="/home" className="flex items-center gap-2 text-2xl font-black tracking-tight text-white">
            <span className="bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 px-3 py-1 rounded-xl shadow-lg font-extrabold rotate-[-3deg]">B</span>
            BiteX
          </Link>
          <p className="text-sm leading-relaxed text-slate-400 max-w-sm">
            Order delicious gourmet food, hot pizzas, juicy burgers, fresh sushi, and refreshing drinks from the best local restaurants in your city. Delivered in minutes.
          </p>
        </div>

        {/* Links Column 1: Cuisines */}
        <div className="md:col-span-3 space-y-3">
          <h4 className="font-bold text-white text-sm tracking-wide uppercase">Popular Cuisines</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#cuisines" className="hover:text-amber-500 transition-colors">Italian Woodfired Pizzas</a></li>
            <li><a href="#cuisines" className="hover:text-amber-500 transition-colors">Gourmet Burgers</a></li>
            <li><a href="#cuisines" className="hover:text-amber-500 transition-colors">Authentic Japanese Sushi</a></li>
            <li><a href="#cuisines" className="hover:text-amber-500 transition-colors">Healthy Vegan Salads</a></li>
          </ul>
        </div>

        {/* Links Column 2: Support */}
        <div className="md:col-span-3 space-y-3">
          <h4 className="font-bold text-white text-sm tracking-wide uppercase">Get Help</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#support" className="hover:text-amber-500 transition-colors">Help & FAQ Support</a></li>
            <li><a href="#restaurants" className="hover:text-amber-500 transition-colors">Partner with BiteX</a></li>
            <li><a href="#careers" className="hover:text-amber-500 transition-colors">Careers at BiteX</a></li>
            <li><a href="#delivery" className="hover:text-amber-500 transition-colors">Join as Delivery Partner</a></li>
          </ul>
        </div>

        {/* Links Column 3: Legal */}
        <div className="md:col-span-2 space-y-3">
          <h4 className="font-bold text-white text-sm tracking-wide uppercase">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#terms" className="hover:text-amber-500 transition-colors">Terms of Service</a></li>
            <li><a href="#privacy" className="hover:text-amber-500 transition-colors">Privacy Policy</a></li>
            <li><a href="#refund" className="hover:text-amber-500 transition-colors">Refund & Cancellation</a></li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="max-w-7xl mx-auto border-t border-slate-800/60 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
        <p>© {new Date().getFullYear()} BiteX Food Technologies. All rights reserved.</p>
        
        {/* Social Icons */}
        <div className="flex gap-4 text-lg">
          <a href="#social" className="hover:text-white transition-colors"><FiInstagram /></a>
          <a href="#social" className="hover:text-white transition-colors"><FiTwitter /></a>
          <a href="#social" className="hover:text-white transition-colors"><FiFacebook /></a>
          <a href="#social" className="hover:text-white transition-colors"><FiGithub /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
