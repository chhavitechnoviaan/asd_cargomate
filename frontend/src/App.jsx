import { useState } from "react";
import { BrowserRouter, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import SolutionsPage from "./pages/SolutionsPage";
import AIModulesPage from "./pages/AIModulesPage";
import RefundPolicyPage from "./pages/RefundPolicyPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsConditionsPage from "./pages/TermsConditionsPage";
import PricingPage from "./pages/PricingPage";
import ResourcesPage from "./pages/ResourcesPage";
import ContactPage from "./pages/ContactPage";
import HelpCenterPage from "./pages/HelpCenterPage";
import ComingSoonPage from "./pages/ComingSoonPage";
import AuthPage from "./pages/AuthPage";
import AccountProfile from "./components/AccountProfile";
import ProtectedDashboard from "./components/ProtectedDashboard";

// Original dashboard implementations from the supplied asd-frontend 2 project.
import B2BDashboard from "./cargomateDashboard/pages/b2bDashboard/B2BDashboard.jsx";
import UserDashboard from "./cargomateDashboard/pages/userDashboard/UserDashboard.jsx";
import AdminDashboard from "./cargomateDashboard/pages/admin/AdminDashboard.jsx";
import "./cargomateDashboard/dashboard-global.css";

const builtPages = {
  Home: HomePage,
  About: AboutPage,
  Solution: SolutionsPage,
  "AI Module": AIModulesPage,
  Pricing: PricingPage,
  Resources: ResourcesPage,
  "Contact Us": ContactPage,
  "Refund Policy": RefundPolicyPage,
  "Privacy Policy": PrivacyPolicyPage,
  "Terms & Conditions": TermsConditionsPage,
  "Help Center": HelpCenterPage,
};

function AppContent() {
  const [activePage, setActivePage] = useState("Home");
  const location = useLocation();
  const navigate = useNavigate();
  const normalizedPath = location.pathname.replace(/\/+$/, "").toLowerCase() || "/";

  if (["/user-profile","/b2b-profile","/admin-profile"].includes(normalizedPath)) {const role=normalizedPath.split("/")[1].split("-")[0];return <ProtectedDashboard role={role}>{role==="b2b"?<B2BDashboard profileMode />:role==="admin"?<AdminDashboard profileMode />:<UserDashboard profileMode />}</ProtectedDashboard>;}
  if (normalizedPath === "/login" || normalizedPath === "/admin-login" || normalizedPath === "/signup") return <AuthPage />;
   if (normalizedPath === "/b2b-dashboard") return <ProtectedDashboard role="b2b"><B2BDashboard /></ProtectedDashboard>;
  if (normalizedPath === "/user-dashboard") return <ProtectedDashboard role="user"><UserDashboard /></ProtectedDashboard>;
  if (normalizedPath === "/admin-dashboard") return <ProtectedDashboard role="admin"><AdminDashboard /></ProtectedDashboard>;

  const handleNavigate = (page) => {
    setActivePage(page);
    if (location.pathname !== "/") navigate("/");
  };

  const handleLoginClick = () => navigate("/login");
  const handleSignupClick = () => navigate("/signup");

  const PageComponent = builtPages[activePage];

  return (
    <div>
      <Navbar
        activePage={activePage}
        onNavigate={handleNavigate}
        onLoginClick={handleLoginClick}
        onSignupClick={handleSignupClick}
      />
      {PageComponent ? (
        <PageComponent onNavigate={handleNavigate} />
      ) : (
        <ComingSoonPage title={activePage} />
      )}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
