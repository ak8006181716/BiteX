import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AppRoutes from "./routes/AppRoutes.jsx";

const App = () => {
  return (
    <BrowserRouter>
      {/* Toast notifications container */}
      <Toaster position="top-right" reverseOrder={false} />
      
      {/* App pages */}
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;