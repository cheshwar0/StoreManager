// src/pages/Shop.jsx
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingBag, ArrowRight, Filter, ChevronRight, Plus, Minus, Trash2, Package } from 'lucide-react';
import { useInventory } from '../context/InventoryContext';
import { useNavigate } from 'react-router-dom';

const Shop = () => {
  const { products, loading } = useInventory();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  const categories = ['All', ...new Set(products.map(p => p.category))];

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch   = p.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      if (existing.quantity >= product.stock) return;
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const decrementFromCart = (productId) => {
    const existing = cart.find(item => item.id === productId);
    if (!existing) return;
    if (existing.quantity <= 1) {
      setCart(cart.filter(item => item.id !== productId));
    } else {
      setCart(cart.map(item =>
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
      ));
    }
  };

  const getCartQuantity = (productId) => {
    const item = cart.find(i => i.id === productId);
    return item ? item.quantity : 0;
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (loading) return <div className="container mt-5 text-center">Loading Store...</div>;

  return (
    <div className="container mt-4 pb-5">
      {/* Search & Hero */}
      <div className="bg-laxmi-green rounded-4 p-5 mb-5 overflow-hidden position-relative shadow-sm border border-white border-opacity-10">
        <div className="position-relative z-1 text-white">
          <div className="d-flex flex-column mb-3">
            <h1 className="fw-black mb-0 tracking-tight text-white display-5">Sri Lakshmi Kirana Store</h1>
            <div className="d-flex align-items-center opacity-75" style={{ marginTop: '-4px' }}>
              <div className="bg-sk-blue text-white px-2 py-0 rounded-1 me-2 fw-black" style={{ fontSize: '0.6rem' }}>SK</div>
              <span className="smallest text-uppercase fw-black tracking-widest text-white" style={{ fontSize: '0.65rem' }}>Powered by StoreKing</span>
           </div>
          </div>
          <p className="opacity-75 fs-5 mb-4 max-w-md">Your neighborhood supermarket, now smarter and fresher with CLUB technology.</p>
          <div className="input-group bg-white rounded-pill shadow-lg p-1 max-w-lg">
            <span className="input-group-text bg-transparent border-0 px-3 text-muted"><Search size={20} /></span>
            <input
              type="text"
              className="form-control border-0 shadow-none py-2"
              placeholder="Search for fresh produce, groceries..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-sk-orange rounded-pill px-4 fw-bold shadow-sm">Search</button>
          </div>
        </div>
        <div className="position-absolute top-0 end-0 opacity-10 pointer-events-none" style={{ transform: 'translate(10%, -10%)' }}>
          <ShoppingBag size={400} />
        </div>
      </div>

      <div className="row g-4">
        {/* Sidebar: Categories */}
        <div className="col-lg-3">
          <div className="card border-0 shadow-sm rounded-4 p-4 sticky-top" style={{ top: '100px', zIndex: 1000 }}>
            <h5 className="fw-black text-dark mb-4 d-flex align-items-center">
              <Filter className="me-2 text-sk-blue" size={20} /> Categories
            </h5>
            <div className="d-flex flex-column gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`btn text-start rounded-pill px-3 py-2 transition-all d-flex justify-content-between align-items-center ${selectedCategory === cat ? 'bg-sk-blue text-white shadow' : 'bg-light text-muted opacity-75'}`}
                >
                  <span className="small fw-bold">{cat}</span>
                  <ChevronRight size={14} className={selectedCategory === cat ? 'opacity-100' : 'opacity-25'} />
                </button>
              ))}
            </div>

            <hr className="my-4 opacity-10" />
            <div className="bg-white p-3 rounded-4 shadow-sm mt-auto border border-sk-blue border-opacity-10">
              <div className="d-flex align-items-center mb-2">
                <ShoppingBag className="text-sk-blue me-2" size={18} />
                <span className="fw-bold small text-sk-blue">Current Basket</span>
              </div>
              <div className="small text-muted">{cartCount} items selected</div>
              <div className="fw-bold mt-1 text-sk-orange fs-4">₹{cartTotal}</div>
              {cartCount > 0 && (
                <button
                  onClick={() => navigate('/checkout', { state: { cart, total: cartTotal } })}
                  className="btn btn-sk-blue btn-sm w-100 mt-3 rounded-pill fw-bold py-3 d-flex align-items-center justify-content-center shadow-sm"
                >
                  Go to Checkout <ArrowRight size={14} className="ms-2" />
                </button>
              )}
            </div>
          </div>
        </div>        {/* Product Grid */}
        <div className="col-lg-9">
            <div className="bg-sk-blue bg-opacity-5 rounded-4 p-4 border border-sk-blue border-opacity-10 mb-5">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <h4 className="fw-black mb-0 d-flex align-items-center text-laxmi-green">
                  <div className="bg-sk-blue text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px' }}>
                    <ShoppingBag size={20} />
                  </div>
                  StoreKing • <span className="text-sk-orange ms-1">Featured Deals</span>
                </h4>
                <div className="badge bg-sk-orange text-white px-3 py-2 rounded-pill fw-bold small shadow-sm d-none d-md-inline-block">OFFICIAL PARTNER OFFERS</div>
              </div>
              
              <div className="d-flex gap-4 overflow-auto pb-3 custom-scrollbar" style={{ scrollSnapType: 'x mandatory' }}>
                {products.filter(p => p.isSponsored).map(product => (
                  <motion.div 
                    key={`featured-${product.id}`}
                    whileHover={{ y: -5 }}
                    className="bg-white border-start border-5 border-sk-orange rounded-4 shadow-sm p-4 d-flex align-items-center gap-4 flex-shrink-0"
                    style={{ minWidth: '350px', scrollSnapAlign: 'start' }}
                  >
                    <div className="product-image-mini" style={{ width: '100px', height: '100px' }}>
                      {product.image ? (
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-100 h-100 object-fit-contain rounded-3"
                          onError={(e) => { e.target.src = ""; e.target.onerror = null; }}
                        />
                      ) : (
                        <div className="w-100 h-100 d-flex align-items-center justify-content-center bg-light rounded-3 text-muted">
                          <Package size={40} />
                        </div>
                      )}
                    </div>
                    <div className="flex-grow-1">
                      <div className="badge bg-sk-blue bg-opacity-10 text-sk-blue smallest text-uppercase px-2 py-1 rounded-1 mb-2 fw-black">StoreKing Choice</div>
                      <h5 className="fw-bold mb-1 text-dark">{product.name}</h5>
                      <div className="fw-black text-sk-orange fs-5 mb-2">₹{product.price}</div>
                      <button onClick={() => addToCart(product)} className="btn btn-sk-orange btn-sm w-100 rounded-pill fw-bold shadow-sm">Grab Deal</button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

          <div className="row g-4">
            <AnimatePresence>
              {filteredProducts.map(product => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="col-md-6 col-xl-4"
                >
                  <div className={`card h-100 border-0 shadow-sm rounded-4 overflow-hidden card-hover position-relative group ${product.isSponsored ? 'border-top border-5 border-sk-orange' : ''}`}>
                    {/* Product Image / Placeholder */}
                    <div className="position-relative overflow-hidden" style={{ height: '220px', backgroundColor: '#f8f9fa' }}>
                      <motion.img 
                        whileHover={{ scale: 1.05 }}
                        src={product.image} 
                        alt={product.name} 
                        className="w-100 h-100 object-fit-contain p-3"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          const parent = e.target.parentElement;
                          const placeholder = parent.querySelector('.fallback-icon');
                          if (placeholder) placeholder.style.display = 'flex';
                        }}
                      />
                      <div className="fallback-icon w-100 h-100 flex-column align-items-center justify-content-center text-laxmi-green opacity-50" style={{ display: product.image ? 'none' : 'flex' }}>
                        {product.category === 'Dairy' && <div className="p-4 bg-white rounded-circle shadow-sm mb-2"><ShoppingBag size={48} /></div>}
                        {product.category === 'Snacks' && <div className="p-4 bg-white rounded-circle shadow-sm mb-2"><ShoppingBag size={48} /></div>}
                        {product.category === 'Household' && <div className="p-4 bg-white rounded-circle shadow-sm mb-2"><ShoppingBag size={48} /></div>}
                        {!['Dairy', 'Snacks', 'Household'].includes(product.category) && <div className="p-4 bg-white rounded-circle shadow-sm mb-2"><Package size={48} /></div>}
                        <span className="smallest text-uppercase fw-black tracking-widest">{product.category}</span>
                      </div>
                      
                      {product.isSponsored && (
                        <div className="position-absolute top-0 start-0 m-3">
                          <span className="badge bg-sk-orange text-white px-2 py-1 rounded-pill smallest fw-bold shadow-sm">
                            SK Choice
                          </span>
                        </div>
                      )}
                      
                      <div className="position-absolute top-0 end-0 m-3">
                        <div className="bg-white px-3 py-1 rounded-pill shadow-sm fw-bold text-dark small">
                          ₹{product.price}
                        </div>
                      </div>
                    </div>

                    <div className="card-body p-4 pt-3">
                      <div className="mb-3">
                        <div className="d-flex align-items-center gap-2 mb-1">
                          <span className="text-sk-blue smallest fw-bold">✓ Verified Stock</span>
                        </div>
                        <h6 className="fw-bold text-dark mb-0">{product.name}</h6>
                      </div>

                      <div className="d-flex justify-content-between align-items-center mt-auto">
                        <div className="lh-1">
                          <div className="smallest text-muted mb-1">Price:</div>
                          <div className="fw-bold fs-5 text-dark">₹{product.price}</div>
                        </div>
                        {product.stock > 0 ? (
                          getCartQuantity(product.id) > 0 ? (
                            <div className="d-flex align-items-center gap-0 bg-sk-orange rounded-3 overflow-hidden shadow-sm">
                              <button
                                onClick={(e) => { e.stopPropagation(); decrementFromCart(product.id); }}
                                className="btn btn-warning border-0 rounded-0 px-3 py-2 d-flex align-items-center bg-transparent"
                              >
                                {getCartQuantity(product.id) === 1 ? <Trash2 size={16} /> : <Minus size={16} />}
                              </button>
                              <span className="fw-bold text-white px-3 py-2 fs-6" style={{ minWidth: '40px', textAlign: 'center' }}>
                                {getCartQuantity(product.id)}
                              </span>
                              <button
                                onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                                disabled={getCartQuantity(product.id) >= product.stock}
                                className="btn btn-warning border-0 rounded-0 px-3 py-2 d-flex align-items-center bg-transparent"
                              >
                                <Plus size={16} />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => addToCart(product)}
                              className="btn btn-sk-orange rounded-3 px-4 py-2 fw-bold d-flex align-items-center shadow-sm transition-all"
                            >
                              Add To Basket
                            </button>
                          )
                        ) : (
                          <button className="btn btn-light disabled rounded-3 px-3 py-2 small fw-bold">Out of Stock</button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {filteredProducts.length === 0 && (
              <div className="text-center py-5 w-100">
                <Search size={64} className="text-muted opacity-25 mb-3" />
                <h4 className="text-muted">No items found matching your filter.</h4>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
