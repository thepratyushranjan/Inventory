import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, NavLink } from "react-router-dom";
import Header from "./Components/Header";
import Sidebartab from "./Components/Sidebartab";
import SignIn from "./Components/SignIn";
import Footer from "./Components/Footer";

// Import your icons
import HomeIcon from "./assets/Home.png";
import ProductIcon from "./assets/Products.png";
import ReportIcon from "./assets/Reports.png";
import ShipmentIcon from "./assets/Shipments.png";
import StockIcon from "./assets/Stock.png";
import SettingIcon from "./assets/Settings.png";

// Import pages
import Dashboard from "./Pages/Dashboard";
import Products from "./Pages/Products";
import Reports from "./Pages/Reports";
import Settings from "./Pages/Settings";
import Shipments from "./Pages/Shipments";
import Stock from "./Pages/Stock";
import Add from "./Pages/Add";
import ProfilePage from "./Pages/ProfilePage";
import Company from "./Pages/Company";
import CompanyForm from "./Pages/CompanyForm";
import OneView from "./Pages/OneView";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const inventoryTabs = [
    { name: "Dashboard", icon: HomeIcon, path: "/dashboard" },
    { name: "Company", icon: ReportIcon, path: "/company" },
    { name: "Products", icon: ProductIcon, path: "/products" },
    { name: "Stock", icon: StockIcon, path: "/stock" },
    { name: "Shipments", icon: ShipmentIcon, path: "/shipments" },
    { name: "Reports", icon: ReportIcon, path: "/reports" },
    { name: "Settings", icon: SettingIcon, path: "/settings" },
  ];

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <Routes>
        {!isAuthenticated ? (
          <Route path="*" element={<SignIn onLogin={handleLogin} />} />
        ) : (
          <Route
            path="*"
            element={
              <section className="w-full h-full">
                <Header />
                <main className="flex w-full h-[87vh]">
                  {/* Sidebar Navigation */}
                  <aside className="w-[16%] h-full bg-[#f8f9ff]">
                    {inventoryTabs.map((tab, index) => (
                      <NavLink
                        key={index}
                        to={tab.path}
                        className={({ isActive }) =>
                          isActive
                            ? "bg-white text-[#118cf0] block"
                            : "hover:bg-gray-200 bg-[#f8f9ff] block"
                        }
                      >
                        <Sidebartab name={tab.name} icon={tab.icon} />
                      </NavLink>
                    ))}
                  </aside>
                  
                  {/* Main Content */}
                  <main className="w-[84%] h-full p-0">
                    <Routes>
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/company" element={<Company/>} />
                      <Route path="/products" element={<Products />} />
                      <Route path="/stock" element={<Stock />} />
                      <Route path="/shipments" element={<Shipments />} />
                      <Route path="/reports" element={<Reports />} />
                      <Route path="/settings" element={<Settings />} />
                      <Route path="/add" element={<Add />} />
                      <Route path="/profile" element={<ProfilePage />} />
                      <Route path="/add-company" element={<CompanyForm />} />
                      <Route path="/company-details/:id" element={<OneView />} />
                      <Route path="*" element={<Navigate to="/dashboard" />} />
                    </Routes>
                  </main>
                </main>
                <Footer />  {/* Place Footer here to ensure it's rendered after the main content */}
              </section>
            }
          />
        )}
      </Routes>
    </Router>
  );
};

export default App;
