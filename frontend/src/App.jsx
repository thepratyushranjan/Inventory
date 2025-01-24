
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import Header from "./Components/Header";
import Sidebartab from "./Components/Sidebartab";
import Footer from "./Components/Footer";  // Import Footer

import HomeIcon from "../src/assets/Home.png";
import ProductIcon from "../src/assets/Products.png";
import ReportIcon from "../src/assets/Reports.png";
import ShipmentIcon from "../src/assets/Shipments.png";
import StockIcon from "../src/assets/Stock.png";
import SettingIcon from "../src/assets/Settings.png";

import Dashboard from './Pages/Dashboard';
import Products from './Pages/Products';
import Reports from './Pages/Reports';
import Settings from './Pages/Settings';
import Shipments from './Pages/Shipments';
import Stock from './Pages/Stock';
import Add from './Pages/Add';

const App = () => {

  const inventoryTabs = [
    { name: "Dashboard", icon: HomeIcon, path: "/" },
    { name: "Products", icon: ProductIcon, path: "/products" },
    { name: "Stock", icon: StockIcon, path: "/stock" },
    { name: "Shipments", icon: ShipmentIcon, path: "/shipments" },
    { name: "Reports", icon: ReportIcon, path: "/reports" },
    { name: "Settings", icon: SettingIcon, path: "/settings" },
  ];

  return (
   <Router>
      <section className="w-full h-full flex flex-col">
        <Header />
        <main className="flex w-full h-[87vh]">
          <aside className="w-[16%] h-full bg-[#f8f9ff]">
            {inventoryTabs.map((tab, index) => (
              <NavLink
                key={index}
                to={tab.path}
                className={({ isActive }) =>
                  isActive
                ? "bg-white text-[#118cf0] block" // Apply active styles
                : "hover:bg-gray-200 bg-[#f8f9ff] block" // Ensure a consistent block layout
                }
              >
                <Sidebartab name={tab.name} icon={tab.icon} />
              </NavLink>
            ))}
          </aside>
          <main className="w-[84%] h-full p-0">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/stock" element={<Stock />} />
              <Route path="/shipments" element={<Shipments />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/add" element={<Add />} />
            </Routes>
          </main>
        </main>
      </section>
      <Footer /> 
    </Router>
  );
};

export default App;
