// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { LogIn, Mail, Lock, Eye, EyeOff, User, Phone, UserPlus, ShoppingBag, ShieldCheck, Zap } from 'lucide-react';

const Login = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (isLoginMode) {
        const user = await login(email, password);
        if (user.role === 'Admin' || user.role === 'Staff') navigate('/');
        else if (user.role === 'Delivery') navigate('/orders-manage');
        else navigate('/shop');
      } else {
        await register(name, email, phone, password);
        navigate('/shop');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 position-relative d-flex align-items-center justify-content-center py-5 overflow-hidden" 
         style={{ background: 'linear-gradient(135deg, #0d6840 0%, #1a3b8b 100%)' }}>
      
      {/* Animated Background Elements */}
      <div className="position-absolute top-0 start-0 w-100 h-100 overflow-hidden" style={{ zIndex: 0 }}>
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="position-absolute rounded-circle bg-white opacity-10"
            animate={{
              x: [Math.random() * 1000, Math.random() * 1000],
              y: [Math.random() * 1000, Math.random() * 1000],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              width: 100 + Math.random() * 200,
              height: 100 + Math.random() * 200,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="position-relative"
        style={{ zIndex: 1, maxWidth: '480px', width: '92%' }}
      >
        <div className="card border-0 shadow-2xl rounded-5 overflow-hidden glass-card">
          <div className="bg-white bg-opacity-10 p-5 text-center border-bottom border-white border-opacity-10">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="bg-white rounded-4 p-3 d-inline-flex mb-4 shadow-lg text-laxmi-green"
            >
               {isLoginMode ? <Zap size={44} className="text-sk-orange" /> : <UserPlus size={44} className="text-sk-orange" />}
            </motion.div>
            
            <h1 className="fw-black mb-1 display-5 tracking-tight text-laxmi-green">Sri Lakshmi Store</h1>
            <div className="d-flex align-items-center justify-content-center mb-4">
               <div className="bg-sk-blue text-white px-2 py-0 rounded-1 me-2 fw-black" style={{ fontSize: '0.7rem' }}>SK</div>
               <span className="smallest text-uppercase fw-black tracking-widest text-sk-blue opacity-75">Official StoreKing CLUB Partner</span>
            </div>
            
            <div className="d-flex justify-content-center gap-2 bg-black bg-opacity-20 p-1.5 rounded-pill shadow-inner">
               <button 
                type="button" 
                onClick={() => {setIsLoginMode(true); setError('');}} 
                className={`btn rounded-pill px-4 fw-black flex-fill transition-all border-0 ${isLoginMode ? 'bg-white text-laxmi-green shadow' : 'text-white opacity-50'}`}
               >
                  SIGN IN
               </button>
               <button 
                type="button" 
                onClick={() => {setIsLoginMode(false); setError('');}} 
                className={`btn rounded-pill px-4 fw-black flex-fill transition-all border-0 ${!isLoginMode ? 'bg-white text-laxmi-green shadow' : 'text-white opacity-50'}`}
               >
                  JOIN US
               </button>
            </div>
          </div>

          <div className="card-body p-5 bg-white">
            <form onSubmit={handleSubmit}>
              {error && (
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="alert alert-danger border-0 rounded-4 py-3 small mb-4 shadow-sm fw-bold">
                  {error}
                </motion.div>
              )}
              
              <AnimatePresence mode="wait">
                {!isLoginMode && (
                  <motion.div 
                    initial={{ opacity: 0, x: 50 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    exit={{ opacity: 0, x: -50 }}
                    key="registration-fields"
                  >
                    <div className="mb-4">
                      <label className="form-label text-muted smallest fw-black text-uppercase tracking-widest ps-1">Full Name</label>
                      <div className="input-group bg-light rounded-4 border-0 p-1">
                        <span className="input-group-text bg-transparent border-0 ps-3"><User size={20} className="text-sk-blue" /></span>
                        <input required={!isLoginMode} type="text" className="form-control bg-transparent border-0 py-3 shadow-none fw-bold" placeholder="Store Owner Name" value={name} onChange={(e) => setName(e.target.value)} />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="form-label text-muted smallest fw-black text-uppercase tracking-widest ps-1">Mobile Number</label>
                      <div className="input-group bg-light rounded-4 border-0 p-1">
                        <span className="input-group-text bg-transparent border-0 ps-3"><Phone size={20} className="text-sk-blue" /></span>
                        <input required={!isLoginMode} type="tel" className="form-control bg-transparent border-0 py-3 shadow-none fw-bold" placeholder="98765 43210" value={phone} onChange={(e) => setPhone(e.target.value)} />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mb-4">
                <label className="form-label text-muted smallest fw-black text-uppercase tracking-widest ps-1">Email ID</label>
                <div className="input-group bg-light rounded-4 border-0 p-1">
                  <span className="input-group-text bg-transparent border-0 ps-3"><Mail size={20} className="text-sk-blue" /></span>
                  <input 
                    required 
                    type="email" 
                    className="form-control bg-transparent border-0 py-3 shadow-none fw-bold" 
                    placeholder="name@store.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-5">
                <label className="form-label text-muted smallest fw-black text-uppercase tracking-widest ps-1">Secure Password</label>
                <div className="input-group bg-light rounded-4 border-0 p-1">
                  <span className="input-group-text bg-transparent border-0 ps-3"><Lock size={20} className="text-sk-blue" /></span>
                  <input 
                    required 
                    type={showPassword ? 'text' : 'password'} 
                    className="form-control bg-transparent border-0 py-3 shadow-none fw-bold" 
                    placeholder="••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button 
                    type="button" 
                    className="btn btn-link text-muted border-0 shadow-none px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading} 
                type="submit" 
                className="btn bg-sk-orange text-white w-100 py-3 rounded-4 fw-black fs-5 shadow-lg border-0 mb-4 transition-all"
                style={{ background: 'linear-gradient(to right, #f38131, #e27529)' }}
              >
                {loading ? <span className="spinner-border spinner-border-sm me-2"></span> : (isLoginMode ? 'OPEN STORE' : 'JOIN CLUB')}
              </motion.button>

              {isLoginMode && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="position-relative mb-4 text-center">
                    <hr className="text-muted opacity-10" />
                    <span className="bg-white px-3 text-muted smallest fw-bold tracking-widest text-uppercase" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                      Express Access
                    </span>
                  </div>

                  <div className="d-flex gap-3 mb-4">
                     <button 
                       type="button" 
                       onClick={() => { setEmail('admin@laxmi.com'); setPassword('password123'); }}
                       className="btn btn-light bg-opacity-50 border-0 flex-fill rounded-4 py-3 small fw-black text-laxmi-green transition-all card-hover"
                     >
                       <ShieldCheck className="me-2 text-sk-blue" size={20} /> ADMIN
                     </button>
                     <button 
                       type="button" 
                       onClick={() => { setEmail('customer@laxmi.com'); setPassword('password123'); }}
                       className="btn btn-light bg-opacity-50 border-0 flex-fill rounded-4 py-3 small fw-black text-laxmi-green transition-all card-hover"
                     >
                       <ShoppingBag className="me-2 text-sk-blue" size={20} /> CUSTOMER
                     </button>
                  </div>
                </motion.div>
              )}
            </form>
          </div>

          <div className="card-footer bg-light p-4 border-0 text-center">
             <div className="d-flex align-items-center justify-content-center gap-2 opacity-50">
               <ShieldCheck size={14} />
               <small className="smallest text-uppercase fw-black tracking-widest">Secure CLUB Gateway Access</small>
             </div>
          </div>
        </div>
      </motion.div>
      
      <style>{`
        .glass-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }
        .card-hover:hover {
          background: white !important;
          box-shadow: 0 10px 20px rgba(0,0,0,0.05) !important;
          transform: translateY(-2px);
        }
        .shadow-inner {
          box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);
        }
      `}</style>
    </div>
  );
};

export default Login;
