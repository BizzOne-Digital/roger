import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './admin/layouts/AdminLayout';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import TestimonialsPage from './pages/TestimonialsPage';
import PricingPage from './pages/PricingPage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import BookingPage from './pages/BookingPage';
import BookingConfirmationPage from './pages/BookingConfirmationPage';
import BlogPage from './pages/BlogPage';
import BlogDetailPage from './pages/BlogDetailPage';
import ContactPage from './pages/ContactPage';
import AdminLogin from './admin/pages/AdminLogin';
import AdminDashboard from './admin/pages/AdminDashboard';
import AdminProducts from './admin/pages/AdminProducts';
import AdminServices from './admin/pages/AdminServices';
import AdminOrders from './admin/pages/AdminOrders';
import AdminTestimonials from './admin/pages/AdminTestimonials';
import IntroWrapper from './components/intro/IntroWrapper';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <IntroWrapper>
            <Routes>
              <Route element={<PublicLayout />}>
                <Route index element={<HomePage />} />
                <Route path="services" element={<ServicesPage />} />
                <Route path="testimonials" element={<TestimonialsPage />} />
                <Route path="pricing" element={<PricingPage />} />
                <Route path="shop" element={<ShopPage />} />
                <Route path="shop/:slug" element={<ProductDetailPage />} />
                <Route path="shop/checkout" element={<CheckoutPage />} />
                <Route path="shop/order-confirmation/:orderNumber" element={<OrderConfirmationPage />} />
                <Route path="booking" element={<BookingPage />} />
                <Route path="booking/confirmation/:orderNumber" element={<BookingConfirmationPage />} />
                <Route path="blog" element={<BlogPage />} />
                <Route path="blog/:slug" element={<BlogDetailPage />} />
                <Route path="contact" element={<ContactPage />} />
              </Route>

              <Route path="admin/login" element={<AdminLogin />} />
              <Route path="admin" element={<AdminLayout />}>
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="services" element={<AdminServices />} />
                <Route path="orders" element={<AdminOrders />} />
                <Route path="orders/:id" element={<AdminOrders />} />
                <Route path="testimonials" element={<AdminTestimonials />} />
              </Route>

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </IntroWrapper>
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: '#21080C',
                color: '#FFF8ED',
                border: '1px solid #C49445',
              },
            }}
          />
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
