// src/components/Footer.jsx
import React from 'react';
import { ShoppingBag, ShieldCheck, Phone, Mail, MapPin, ExternalLink } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-top border-light mt-5 pt-5 pb-4">
      <div className="container">
        <div className="row g-4 mb-5">
          <div className="col-lg-4">
            <div className="d-flex align-items-center mb-4">
              <div className="bg-laxmi-green text-white p-2 rounded-3 me-3">
                <ShoppingBag size={24} />
              </div>
              <h4 className="fw-black mb-0 text-laxmi-green tracking-tight">Sri Lakshmi Store</h4>
            </div>
            <p className="text-muted small mb-4 pe-lg-5">
              The premier hyper-local supermarket powered by <strong>StoreKing CLUB</strong> technology. Bringing fresh groceries and smart retail to your doorstep.
            </p>
            <div className="d-flex align-items-center gap-2">
               <div className="bg-sk-blue text-white px-2 py-0 rounded-1 fw-black" style={{ fontSize: '0.65rem' }}>SK</div>
               <span className="smallest text-uppercase fw-black tracking-widest text-sk-blue">Official CLUB Partner</span>
            </div>
          </div>
          
          <div className="col-6 col-lg-2">
            <h6 className="fw-black text-uppercase smallest tracking-widest mb-4">Marketplace</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 small">
              <li><a href="/shop" className="text-muted text-decoration-none">Shop Groceries</a></li>
              <li><a href="/shop" className="text-muted text-decoration-none">Featured Deals</a></li>
              <li><a href="/shop" className="text-muted text-decoration-none">StoreKing Choice</a></li>
              <li><a href="/history" className="text-muted text-decoration-none">Order Tracking</a></li>
            </ul>
          </div>

          <div className="col-6 col-lg-2">
            <h6 className="fw-black text-uppercase smallest tracking-widest mb-4">Partner Portal</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 small">
              <li><a href="/" className="text-muted text-decoration-none">Staff Dashboard</a></li>
              <li><a href="/inventory" className="text-muted text-decoration-none">Inventory Sync</a></li>
              <li><a href="/billing" className="text-muted text-decoration-none">CLUB Billing</a></li>
              <li><a href="/profile" className="text-muted text-decoration-none">Owner Profile</a></li>
            </ul>
          </div>

          <div className="col-lg-4">
            <h6 className="fw-black text-uppercase smallest tracking-widest mb-4">Contact & Location</h6>
            <div className="d-flex flex-column gap-3">
              <div className="d-flex align-items-start gap-3">
                <MapPin size={18} className="text-sk-orange flex-shrink-0" />
                <span className="small text-muted">Main Road, Sector 4, Indiranagar, Bangalore, Karnataka 560038</span>
              </div>
              <div className="d-flex align-items-center gap-3">
                <Phone size={18} className="text-sk-orange" />
                <span className="small text-muted">+91 90000 12345</span>
              </div>
              <div className="d-flex align-items-center gap-3">
                <Mail size={18} className="text-sk-orange" />
                <span className="small text-muted">support@laxmistore.com</span>
              </div>
            </div>
          </div>
        </div>

        <hr className="opacity-10 mb-4" />

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
          <div className="smallest text-muted text-uppercase fw-bold tracking-widest">
            © 2026 Sri Lakshmi Kirana Store • <span className="text-sk-blue">StoreKing CLUB Technology</span>
          </div>
          <div className="d-flex align-items-center gap-4">
            <a href="#" className="smallest text-muted text-decoration-none fw-bold hover-text-sk-blue transition-all">Privacy Policy</a>
            <a href="#" className="smallest text-muted text-decoration-none fw-bold hover-text-sk-blue transition-all">Terms of Service</a>
            <div className="d-flex align-items-center gap-1 text-sk-blue fw-black pointer smallest tracking-widest text-uppercase">
               <ExternalLink size={12} />
               Visit StoreKing.in
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hover-text-sk-blue:hover {
          color: #1a3b8b !important;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
