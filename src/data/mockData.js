// src/data/mockData.js
// All local data — no backend required

// ─────────────────────────────────────────────
// PRODUCTS
// ─────────────────────────────────────────────
export const INITIAL_PRODUCTS = [
  { id: 'p1', name: "Basmati Rice (5kg)", category: "Grains", stock: 20, price: 450, salesHistory: [5, 4, 6, 8, 10, 12, 11], image: "/images/products/basmati_rice.png", isSponsored: true },
  { id: 'p2', name: "Sona Masoori Rice (5kg)", category: "Grains", stock: 35, price: 320, salesHistory: [10, 12, 11, 15, 18, 20, 22], image: "/images/products/sona_masoori.png" },
  { id: 'p3', name: "Wheat Flour (Atta, 5kg)", category: "Grains", stock: 50, price: 195, salesHistory: [20, 22, 25, 28, 32, 45, 40], image: "/images/products/atta.png" },
  { id: 'p4', name: "Toor Dal (1kg)", category: "Pulses", stock: 40, price: 160, salesHistory: [12, 14, 15, 18, 20, 18, 15], image: "/images/products/toor_dal.png" },
  { id: 'p5', name: "Moong Dal (1kg)", category: "Pulses", stock: 30, price: 130, salesHistory: [8, 10, 12, 10, 9, 15, 12], image: "/images/products/moong_dal.png" },
  { id: 'p6', name: "Refined Oil (1L)", category: "Oils", stock: 60, price: 145, salesHistory: [25, 30, 28, 35, 40, 48, 45], image: "/images/products/refined_oil.png", isSponsored: true },
  { id: 'p7', name: "Mustard Oil (1L)", category: "Oils", stock: 25, price: 175, salesHistory: [5, 8, 10, 12, 15, 14, 10], image: "/images/products/Mustard_Oil_(1L).png" },
  { id: 'p8', name: "Sugar (1kg)", category: "Groceries", stock: 100, price: 45, salesHistory: [40, 45, 50, 55, 60, 65, 70], image: "/images/products/Sugar_(1kg).png" },
  { id: 'p9', name: "Iodized Salt (1kg)", category: "Spices", stock: 150, price: 25, salesHistory: [10, 12, 10, 15, 12, 20, 18], image: "/images/products/salt.png" },
  { id: 'p10', name: "Turmeric Powder (200g)", category: "Spices", stock: 45, price: 55, salesHistory: [5, 8, 7, 10, 12, 11, 10], image: "/images/products/turmeric.png" },
  { id: 'p11', name: "Chili Powder (200g)", category: "Spices", stock: 40, price: 65, salesHistory: [8, 10, 12, 11, 15, 14, 13], image: "/images/products/chili.png" },
  { id: 'p12', name: "Pure Ghee (500ml)", category: "Dairy", stock: 15, price: 350, salesHistory: [2, 3, 5, 4, 6, 8, 7], image: "/images/products/ghee.png", isSponsored: true },
  { id: 'p13', name: "Amul Butter (100g)", category: "Dairy", stock: 20, price: 56, salesHistory: [15, 18, 20, 22, 25, 30, 28], image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?q=80&w=300&auto=format&fit=crop" },
  { id: 'p14', name: "Maggi Noodles (70g)", category: "Snacks", stock: 80, price: 14, salesHistory: [50, 55, 60, 65, 70, 75, 80], image: "https://d2u1z1lopyfwlx.cloudfront.net/thumbnails/d8446f59-db92-5169-b5f9-d3cc1c7b766c/82f597da-9160-504f-ad9e-ff2188661b5c.jpg", isSponsored: true },
  { id: 'p15', name: "Tea Powder (250g)", category: "Snacks", stock: 35, price: 110, salesHistory: [10, 12, 11, 15, 16, 18, 17], image: "https://www.bbassets.com/media/uploads/p/l/30004420_15-tata-tea-agni-dust-tea.jpg" },
  { id: 'p16', name: "Instant Coffee (50g)", category: "Snacks", stock: 12, price: 95, salesHistory: [4, 5, 7, 6, 8, 10, 9], image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=300&auto=format&fit=crop" },
  { id: 'p17', name: "Washing Soap Bar", category: "Household", stock: 65, price: 30, salesHistory: [12, 15, 18, 20, 22, 25, 24], image: "https://www.dhlindustries.com/wp-content/uploads/2020/04/266969_8-vim-dishwash-bar.jpg" },
  { id: 'p18', name: "Dishwash Liquid (250ml)", category: "Household", stock: 25, price: 45, salesHistory: [8, 10, 12, 11, 14, 16, 15], image: "https://www.mystore.in/s/62ea2c599d1398fa16dbae0a/660f76b99f01aea0be7e4309/266967_6-vim-dishwash-liquid-gel-lemon-640x640.jpg" },
];

// ─────────────────────────────────────────────
// USERS  (email → user object, passwords plain-text for demo)
// ─────────────────────────────────────────────
export const USERS_DB = [
  { id: 'u1', name: 'Store Admin', email: 'admin@laxmi.com', password: 'password123', role: 'Admin', phone: '9000000001' },
  { id: 'u2', name: 'Billing Clerk', email: 'staff@laxmi.com', password: 'password123', role: 'Staff', phone: '9000000002' },
  { id: 'u3', name: 'Regular Customer', email: 'customer@laxmi.com', password: 'password123', role: 'Customer', phone: '9876543210' },
  { id: 'u4', name: 'Ramesh Delivery', email: 'delivery@laxmi.com', password: 'password123', role: 'Delivery', phone: '9000000004' },
];

// ─────────────────────────────────────────────
// SEED DEMO ORDERS (pre-loaded so OrdersManager has data)
// ─────────────────────────────────────────────
export const DEMO_ORDERS = [
  {
    id: 'ord001',
    customerName: 'Priya Sharma',
    customerPhone: '9876543210',
    address: '12, Rose Garden, Jubilee Hills, Hyderabad',
    items: [
      { productId: 'p1', name: 'Basmati Rice (5kg)', quantity: 2, price: 450 },
      { productId: 'p8', name: 'Sugar (1kg)', quantity: 3, price: 45 },
    ],
    totalAmount: 1035,
    paymentMethod: 'UPI',
    paymentStatus: 'Paid',
    status: 'Accepted - Pack Items',
    deliveryBoy: 'Not Assigned',
    createdAt: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
  },
  {
    id: 'ord002',
    customerName: 'Arjun Reddy',
    customerPhone: '8765432109',
    address: '45, Banjara Hills, Road No. 3, Hyderabad',
    items: [
      { productId: 'p14', name: 'Maggi Noodles (70g)', quantity: 5, price: 14 },
      { productId: 'p15', name: 'Tea Powder (250g)', quantity: 2, price: 110 },
    ],
    totalAmount: 320,
    paymentMethod: 'COD',
    paymentStatus: 'Pending',
    status: 'Assigned',
    deliveryBoy: 'Ramesh (Laxmi Partner)',
    createdAt: new Date(Date.now() - 1000 * 60 * 55).toISOString(),
  },
  {
    id: 'ord003',
    customerName: 'Sunita Patel',
    customerPhone: '9876543210',
    address: '78, Film Nagar, Hyderabad',
    items: [
      { productId: 'p12', name: 'Pure Ghee (500ml)', quantity: 1, price: 350 },
      { productId: 'p13', name: 'Amul Butter (100g)', quantity: 2, price: 56 },
    ],
    totalAmount: 492,
    paymentMethod: 'Card',
    paymentStatus: 'Paid',
    status: 'Delivered',
    deliveryBoy: 'Ramesh (Laxmi Partner)',
    createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
  },
];

// ─────────────────────────────────────────────
// LocalStorage helpers
// ─────────────────────────────────────────────

const PRODUCTS_KEY = 'laxmi_products';
const ORDERS_KEY = 'laxmi_orders';
const USERS_KEY = 'laxmi_users';

/** Initialize localStorage with seed data (Force Refresh for Branding) */
export function initStore() {
  // CRITICAL: Always overwrite products during the rebrand to ensure new image URLs are applied
  localStorage.removeItem(PRODUCTS_KEY);
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(INITIAL_PRODUCTS));

  if (!localStorage.getItem(ORDERS_KEY)) {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(DEMO_ORDERS));
  }
  if (!localStorage.getItem(USERS_KEY)) {
    localStorage.setItem(USERS_KEY, JSON.stringify(USERS_DB));
  }
}

// — Product CRUD —
export function getProducts() {
  return JSON.parse(localStorage.getItem(PRODUCTS_KEY) || '[]');
}
export function saveProducts(products) {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
}

// — Order CRUD —
export function getOrders() {
  return JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]');
}
export function saveOrders(orders) {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}
export function addOrder(order) {
  const orders = getOrders();
  orders.unshift(order); // newest first
  saveOrders(orders);
  return order;
}

// — User CRUD —
export function getUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
}
export function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

/** Generate a random short ID */
export function genId(prefix = 'id') {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}
