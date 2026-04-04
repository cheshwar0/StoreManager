// mobile/data/MockStorage.js
// A lightweight simulation of persistent storage for the mobile app demore

const DEMO_ORDERS = [
  {
    id: 'ord001',
    customerName: 'Priya Sharma',
    customerPhone: '9876543210',
    address: '12, Rose Garden, Jubilee Hills, Hyderabad',
    items: [
      { productId: 'p1', name: 'Basmati Rice (5kg)', quantity: 2, price: 450 },
      { productId: 'p8', name: 'Sugar (1kg)',         quantity: 3, price: 45  },
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
      { productId: 'p15', name: 'Tea Powder (250g)',    quantity: 2, price: 110 },
    ],
    totalAmount: 320,
    paymentMethod: 'COD',
    paymentStatus: 'Pending',
    status: 'Assigned',
    deliveryBoy: 'Ramesh (Laxmi Partner)',
    createdAt: new Date(Date.now() - 1000 * 60 * 55).toISOString(),
  },
];

let orders = [...DEMO_ORDERS];

export const getOrders = () => {
  return orders;
};

export const updateOrderStatus = (id, status) => {
  orders = orders.map(o => o.id === id ? { ...o, status } : o);
  return orders;
};

export const getAssignedOrders = (deliveryBoyName) => {
  return orders.filter(o => o.deliveryBoy === deliveryBoyName || o.status === 'Assigned');
};
