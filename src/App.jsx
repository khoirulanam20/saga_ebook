import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ContentProvider } from './context/ContentContext';

// Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AdminSidebar from './components/layout/AdminSidebar';
import ChatbotWidget from './components/shared/ChatbotWidget';

// Guest Pages
import Home from './pages/guest/Home';
import Products from './pages/guest/Products';
import ProductDetail from './pages/guest/ProductDetail';
import ProductSales from './pages/guest/ProductSales';
import PackageLanding from './pages/guest/PackageLanding';
import Checkout from './pages/guest/Checkout';
import Testimonials from './pages/guest/Testimonials';
import About from './pages/guest/About';
import Contact from './pages/guest/Contact';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// User Pages
import UserDashboard from './pages/user/UserDashboard';
import UserLearning from './pages/user/UserLearning';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminProductForm from './pages/admin/AdminProductForm';
import AdminPackages from './pages/admin/AdminPackages';
import AdminTransactions from './pages/admin/AdminTransactions';
import AdminUsers from './pages/admin/AdminUsers';
import AdminTestimonials from './pages/admin/AdminTestimonials';
import AdminContent from './pages/admin/AdminContent';
import AdminPayment from './pages/admin/AdminPayment';
import AdminChatbot from './pages/admin/AdminChatbot';

import './styles/global.css';

// Guest Layout
function GuestLayout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ChatbotWidget />
    </>
  );
}

// Admin Layout - requires admin auth
function AdminLayout() {
  const { user, loading, isAdmin } = useAuth();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  if (loading) return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}><div className="loading-spinner" /></div>;
  if (!user || !isAdmin) return <Navigate to="/login" replace />;
  return (
    <div className={`admin-layout ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      <AdminSidebar isCollapsed={isSidebarCollapsed} toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
      <div className="admin-content" style={{ marginLeft: isSidebarCollapsed ? 80 : 'var(--sidebar-width)', transition: 'margin-left 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}>
        <Outlet />
      </div>
    </div>
  );
}

// Protected user route
function UserRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <ContentProvider>
        <AuthProvider>
          <CartProvider>
            <Toaster
              position="top-right"
              toastOptions={{
                style: { background: '#0f0f1a', color: '#f0f0f8', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', fontSize: '14px' },
                success: { iconTheme: { primary: '#10b981', secondary: '#0f0f1a' } },
                error: { iconTheme: { primary: '#ef4444', secondary: '#0f0f1a' } },
              }}
            />
            <Routes>
              {/* Guest Routes */}
              <Route element={<GuestLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/products/:id/buy" element={<ProductSales />} />
                <Route path="/packages/:slug" element={<PackageLanding />} />
                <Route path="/testimonials" element={<Testimonials />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
              </Route>

              {/* Checkout Route - Protected (must be logged in) */}
              <Route path="/checkout" element={<UserRoute><GuestLayout /></UserRoute>}>
                <Route index element={<Checkout />} />
              </Route>

              {/* Auth Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* User Routes */}
              <Route path="/dashboard" element={<UserRoute><GuestLayout /></UserRoute>}>
                <Route index element={<UserDashboard />} />
              </Route>

              {/* Standalone User Routes (No Navbar/Footer for Learning Mode) */}
              <Route path="/dashboard/learning/:id" element={<UserRoute><UserLearning /></UserRoute>} />

              {/* Admin Routes */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="products/create" element={<AdminProductForm />} />
                <Route path="products/:id/edit" element={<AdminProductForm />} />
                <Route path="packages" element={<AdminPackages />} />
                <Route path="transactions" element={<AdminTransactions />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="testimonials" element={<AdminTestimonials />} />
                <Route path="content" element={<AdminContent />} />
                <Route path="payment" element={<AdminPayment />} />
                <Route path="chatbot" element={<AdminChatbot />} />
              </Route>

              {/* Catch all */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </CartProvider>
        </AuthProvider>
      </ContentProvider>
    </BrowserRouter>
  );
}
