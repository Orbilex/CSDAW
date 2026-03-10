import React, { useState, useMemo } from 'react';
import { 
  ShoppingBag, Plus, Minus, X, 
  ShoppingBasket, Search, ArrowLeft, Trash2, 
  CheckCircle, 
  Coffee, Package, LayoutDashboard,
  TrendingUp, DollarSign, Users, PackageOpen,
  Settings, Edit,
  Image as ImageIcon, Tag, FileText, PlusCircle,
  Flame, Layers
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, CartesianGrid 
} from 'recharts';
import { FoodItem, CartItem } from '../types';

// --- Data & Config ---

const INITIAL_INVENTORY: FoodItem[] = [
  {
    id: 1,
    name: "Organic Bananas",
    price: 2.99,
    category: "produce",
    calories: 105,
    image: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?auto=format&fit=crop&w=800&q=80",
    description: "Fresh organic bananas, perfect for smoothies or snacking.",
    badges: ["Organic"],
    popular: true,
    stock: 45
  },
  {
    id: 2,
    name: "Honeycrisp Apples",
    price: 3.49,
    category: "produce",
    calories: 95,
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80",
    description: "Crisp, juicy, and sweet red apples. Grown locally.",
    badges: ["Local Farm"],
    stock: 32
  },
  {
    id: 101,
    name: "Free-Range Eggs",
    price: 6.50,
    category: "dairy",
    calories: 70,
    image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=800&q=80",
    description: "Large brown eggs from pasture-raised hens. Dozen pack.",
    badges: ["Free Range", "Best Seller"],
    stock: 12
  },
  {
    id: 3,
    name: "Whole Milk",
    price: 4.29,
    category: "dairy",
    calories: 150,
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=800&q=80",
    description: "Creamy whole milk, pasteurized and vitamin D fortified.",
    badges: ["Fresh"],
    stock: 18
  },
  {
    id: 102,
    name: "Artisan Sourdough",
    price: 5.99,
    category: "bakery",
    calories: 180,
    image: "https://images.unsplash.com/photo-1585478402481-4643532a3780?auto=format&fit=crop&w=800&q=80",
    description: "Crusty artisan sourdough loaf, baked fresh daily.",
    stock: 8
  },
  {
    id: 4,
    name: "Chicken Breast",
    price: 9.50,
    category: "meat",
    calories: 165,
    image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=800&q=80",
    description: "Boneless, skinless chicken breasts. No antibiotics.",
    badges: ["High Protein"],
    stock: 25
  },
  {
    id: 103,
    name: "Lean Ground Beef",
    price: 8.99,
    category: "meat",
    calories: 250,
    image: "https://images.unsplash.com/photo-1588168333986-5078d3ae3976?auto=format&fit=crop&w=800&q=80",
    description: "1lb of premium lean ground beef. Perfect for burgers or tacos.",
    stock: 20
  },
  {
    id: 5,
    name: "Italian Pasta",
    price: 2.50,
    category: "pantry",
    calories: 200,
    image: "https://images.unsplash.com/photo-1551462147-37885acc36f1?auto=format&fit=crop&w=800&q=80",
    description: "Authentic durum wheat semolina spaghetti.",
    stock: 50
  },
  {
    id: 6,
    name: "Extra Virgin Olive Oil",
    price: 14.99,
    category: "pantry",
    calories: 120,
    image: "https://images.unsplash.com/photo-1474979266404-7cadd259c308?auto=format&fit=crop&w=800&q=80",
    description: "Cold pressed extra virgin olive oil from Italy.",
    badges: ["Imported"],
    stock: 15
  },
  {
    id: 104,
    name: "Cold Brew Coffee",
    price: 12.00,
    category: "beverages",
    calories: 5,
    image: "https://images.unsplash.com/photo-1517701604599-bb29b5dd73ad?auto=format&fit=crop&w=800&q=80",
    description: "Smooth, ready-to-drink cold brew coffee concentrate.",
    stock: 22
  },
  {
    id: 105,
    name: "Orange Juice",
    price: 4.99,
    category: "beverages",
    calories: 110,
    image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?auto=format&fit=crop&w=800&q=80",
    description: "100% pure squeezed orange juice. Pulp free.",
    stock: 10
  }
];

const INITIAL_CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'produce', label: 'Produce' },
  { id: 'dairy', label: 'Dairy & Eggs' },
  { id: 'bakery', label: 'Bakery' },
  { id: 'meat', label: 'Meat' },
  { id: 'pantry', label: 'Pantry' },
  { id: 'beverages', label: 'Beverages' },
];

const INITIAL_SALES_DATA = [
  { name: 'Mon', sales: 400 },
  { name: 'Tue', sales: 300 },
  { name: 'Wed', sales: 550 },
  { name: 'Thu', sales: 450 },
  { name: 'Fri', sales: 800 },
  { name: 'Sat', sales: 1200 },
  { name: 'Sun', sales: 900 },
];

interface CatalogAppProps {
  onBack: () => void;
}

export const CatalogApp: React.FC<CatalogAppProps> = ({ onBack }) => {
  // Mode: 'kiosk' (shopper) or 'manager' (owner)
  const [viewMode, setViewMode] = useState<'kiosk' | 'manager'>('kiosk');
  
  // Data State
  const [inventory, setInventory] = useState<FoodItem[]>(INITIAL_INVENTORY);
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [salesData, setSalesData] = useState(INITIAL_SALES_DATA);
  const [totalRevenue, setTotalRevenue] = useState(4600.00);
  const [totalOrders, setTotalOrders] = useState(142);

  // Kiosk State
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCheckoutSuccess, setIsCheckoutSuccess] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Manager State
  const [managerTab, setManagerTab] = useState<'overview' | 'products' | 'categories'>('overview');
  const [editingProduct, setEditingProduct] = useState<FoodItem | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  // Category Management State
  const [newCatName, setNewCatName] = useState('');
  const [newCatId, setNewCatId] = useState('');

  // --- Logic: Kiosk ---
  
  const addToCart = (item: FoodItem) => {
    const currentInCart = cart.find(i => i.id === item.id)?.quantity || 0;
    if (currentInCart >= item.stock) return;

    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: number) => {
    setCart(prev => prev.reduce((acc, item) => {
      if (item.id === itemId) {
        if (item.quantity > 1) return [...acc, { ...item, quantity: item.quantity - 1 }];
        return acc;
      }
      return [...acc, item];
    }, [] as CartItem[]));
  };

  const deleteFromCart = (itemId: number) => {
    setCart(prev => prev.filter(i => i.id !== itemId));
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const handleCheckout = () => {
    const newInventory = inventory.map(item => {
      const cartItem = cart.find(c => c.id === item.id);
      if (cartItem) {
        return { ...item, stock: Math.max(0, item.stock - cartItem.quantity) };
      }
      return item;
    });

    setInventory(newInventory);
    setTotalRevenue(prev => prev + total);
    setTotalOrders(prev => prev + 1);
    
    const today = new Date().toLocaleDateString('en-US', { weekday: 'short' });
    setSalesData(prev => {
       const last = prev[prev.length - 1];
       return [...prev.slice(0, -1), { ...last, sales: last.sales + total }];
    });

    setIsCheckoutSuccess(true);
    setTimeout(() => {
      setCart([]);
      setIsCheckoutSuccess(false);
      setIsCartOpen(false);
    }, 2000);
  };

  const filteredItems = useMemo(() => {
    return inventory.filter(item => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      // Only show items with stock > 0 in the kiosk view
      const hasStock = item.stock > 0;
      return matchesCategory && matchesSearch && hasStock;
    });
  }, [activeCategory, searchQuery, inventory]);


  // --- Logic: Manager ---
  
  const updateStock = (id: number, delta: number) => {
    setInventory(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, stock: Math.max(0, item.stock + delta) };
      }
      return item;
    }));
  };

  const updatePrice = (id: number, newPrice: number) => {
    setInventory(prev => prev.map(item => {
      if (item.id === id) return { ...item, price: newPrice };
      return item;
    }));
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    if (editingProduct.id === 0) {
      // Create New
      const newId = Math.max(0, ...inventory.map(i => i.id)) + 1;
      setInventory([...inventory, { ...editingProduct, id: newId }]);
    } else {
      // Update
      setInventory(inventory.map(i => i.id === editingProduct.id ? editingProduct : i));
    }
    setIsEditModalOpen(false);
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id: number) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setInventory(prev => prev.filter(i => i.id !== id));
    }
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (categories.some(c => c.id === newCatId)) {
      alert("Category ID already exists!");
      return;
    }
    setCategories([...categories, { id: newCatId, label: newCatName }]);
    setNewCatName('');
    setNewCatId('');
  };

  const handleDeleteCategory = (id: string) => {
    if (id === 'all') return;
    if (inventory.some(i => i.category === id)) {
      alert("Cannot delete category with existing products. Please reassign products first.");
      return;
    }
    setCategories(prev => prev.filter(c => c.id !== id));
    if (activeCategory === id) setActiveCategory('all');
  };

  const openEditModal = (item?: FoodItem) => {
    if (item) {
      setEditingProduct({ ...item });
    } else {
      setEditingProduct({
        id: 0,
        name: '',
        price: 0,
        category: categories.find(c => c.id !== 'all')?.id || 'produce',
        calories: 0,
        image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
        description: '',
        badges: [],
        stock: 0,
        popular: false
      });
    }
    setIsEditModalOpen(true);
  };

  const categoryOptions = categories.filter(c => c.id !== 'all').map(c => ({ value: c.id, label: c.label }));

  // --- Renders ---

  if (viewMode === 'manager') {
    return (
      <div className="fixed inset-0 bg-slate-100 z-[100] flex flex-col overflow-hidden font-sans">
        {/* Manager Header */}
        <div className="bg-slate-900 text-white p-4 flex items-center justify-between shrink-0 shadow-lg z-20">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orb-600 rounded-lg">
              <LayoutDashboard size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold font-display">Store Manager</h2>
              <p className="text-xs text-slate-400">Orbilex Market Admin</p>
            </div>
          </div>
          <button 
            onClick={() => setViewMode('kiosk')}
            className="flex items-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm font-medium transition-colors border border-slate-700"
          >
            <ShoppingBasket size={16} />
            <span className="hidden sm:inline">Return to Kiosk</span>
            <span className="sm:hidden">Exit</span>
          </button>
        </div>

        {/* Manager Navigation Tabs */}
        <div className="bg-white border-b border-slate-200 px-4 md:px-8">
          <div className="flex gap-6 overflow-x-auto no-scrollbar">
            <button 
              onClick={() => setManagerTab('overview')}
              className={`py-4 text-sm font-bold border-b-2 transition-colors whitespace-nowrap flex items-center gap-2 ${
                managerTab === 'overview' 
                  ? 'border-orb-600 text-orb-600' 
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <TrendingUp size={16} />
              Overview
            </button>
            <button 
              onClick={() => setManagerTab('products')}
              className={`py-4 text-sm font-bold border-b-2 transition-colors whitespace-nowrap flex items-center gap-2 ${
                managerTab === 'products' 
                  ? 'border-orb-600 text-orb-600' 
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <Package size={16} />
              Products
            </button>
             <button 
              onClick={() => setManagerTab('categories')}
              className={`py-4 text-sm font-bold border-b-2 transition-colors whitespace-nowrap flex items-center gap-2 ${
                managerTab === 'categories' 
                  ? 'border-orb-600 text-orb-600' 
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <Layers size={16} />
              Categories
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8">
          
          {managerTab === 'overview' && (
            <div className="space-y-8 animate-fade-in">
              {/* Stats Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                    <div>
                      <p className="text-slate-500 text-sm font-medium mb-1">Total Revenue</p>
                      <p className="text-2xl md:text-3xl font-bold text-slate-900">${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                    </div>
                    <div className="p-3 bg-green-100 text-green-600 rounded-full">
                      <DollarSign size={24} />
                    </div>
                </div>
                
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                    <div>
                      <p className="text-slate-500 text-sm font-medium mb-1">Total Orders</p>
                      <p className="text-2xl md:text-3xl font-bold text-slate-900">{totalOrders}</p>
                    </div>
                    <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
                      <Users size={24} />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                    <div>
                      <p className="text-slate-500 text-sm font-medium mb-1">Avg Order</p>
                      <p className="text-2xl md:text-3xl font-bold text-slate-900">${(totalRevenue / totalOrders).toFixed(2)}</p>
                    </div>
                    <div className="p-3 bg-purple-100 text-purple-600 rounded-full">
                      <TrendingUp size={24} />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                    <div>
                      <p className="text-slate-500 text-sm font-medium mb-1">Low Stock</p>
                      <p className="text-2xl md:text-3xl font-bold text-slate-900">{inventory.filter(i => i.stock < 10).length}</p>
                    </div>
                    <div className="p-3 bg-orange-100 text-orange-600 rounded-full">
                      <PackageOpen size={24} />
                    </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Chart Section */}
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                      <TrendingUp size={20} className="text-slate-400" />
                      Revenue Trends
                    </h3>
                    <div className="h-64 md:h-80 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={salesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                          <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                          <RechartsTooltip 
                            cursor={{fill: '#f1f5f9'}}
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} 
                          />
                          <Bar dataKey="sales" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-gradient-to-br from-orb-600 to-accent-600 p-6 rounded-2xl shadow-lg text-white">
                    <h3 className="text-xl font-bold mb-4">Quick Tips</h3>
                    <ul className="space-y-4">
                      <li className="flex gap-3 items-start opacity-90">
                        <CheckCircle className="shrink-0 mt-0.5" size={18} />
                        <span className="text-sm">Quickly adjust prices and stock in the table below.</span>
                      </li>
                      <li className="flex gap-3 items-start opacity-90">
                        <CheckCircle className="shrink-0 mt-0.5" size={18} />
                        <span className="text-sm">Use the "Products" tab to add new items, change images, or update nutritional info.</span>
                      </li>
                      <li className="flex gap-3 items-start opacity-90">
                        <CheckCircle className="shrink-0 mt-0.5" size={18} />
                        <span className="text-sm">Manage product categories in the "Categories" tab.</span>
                      </li>
                    </ul>
                </div>
              </div>

              {/* Quick Inventory List (Mobile Friendly) */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 px-1">
                  <PackageOpen size={20} className="text-slate-400" />
                  Quick Stock Adjustment
                </h3>
                
                <div className="grid grid-cols-1 gap-3">
                  {inventory.map(item => (
                    <div key={item.id} className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center gap-4">
                       {/* Product Info */}
                       <div className="flex items-center gap-3 flex-1">
                          <div className="w-12 h-12 rounded-lg bg-slate-100 shrink-0 overflow-hidden">
                             <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                          <div>
                             <div className="font-bold text-slate-900 text-sm">{item.name}</div>
                             <div className="text-xs text-slate-500">ID: {item.id}</div>
                          </div>
                       </div>

                       {/* Controls */}
                       <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
                          {/* Price Input */}
                          <div className="relative w-24 shrink-0">
                             <span className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400 text-xs">$</span>
                             <input 
                                type="number" 
                                value={item.price} 
                                onChange={(e) => updatePrice(item.id, parseFloat(e.target.value) || 0)}
                                className="w-full pl-5 pr-2 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold text-slate-900 focus:ring-2 focus:ring-orb-500 outline-none"
                             />
                          </div>

                          {/* Stock Stepper */}
                          <div className="flex items-center bg-slate-100 rounded-lg p-1 gap-1">
                             <button 
                                onClick={() => updateStock(item.id, -1)}
                                className="w-8 h-8 flex items-center justify-center bg-white rounded shadow-sm text-slate-600 active:scale-90 transition-transform"
                             >
                                <Minus size={16} />
                             </button>
                             <div className={`w-10 text-center font-bold text-sm ${item.stock < 5 ? 'text-red-600' : 'text-slate-900'}`}>
                                {item.stock}
                             </div>
                             <button 
                                onClick={() => updateStock(item.id, 1)}
                                className="w-8 h-8 flex items-center justify-center bg-white rounded shadow-sm text-green-600 active:scale-90 transition-transform"
                             >
                                <Plus size={16} />
                             </button>
                          </div>
                       </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {managerTab === 'products' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">Product Management</h3>
                  <p className="text-slate-500">Add, edit, or remove products from the catalog.</p>
                </div>
                <button 
                  onClick={() => openEditModal()}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-orb-600 text-white font-bold rounded-xl hover:bg-orb-700 transition-all shadow-lg shadow-orb-200"
                >
                  <PlusCircle size={20} />
                  Add New Product
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {inventory.map(item => (
                  <div key={item.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col">
                    <div className="relative h-48 bg-slate-100">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                      <div className="absolute top-2 right-2 flex gap-2">
                         <button 
                            onClick={() => openEditModal(item)}
                            className="p-2 bg-white text-slate-700 rounded-full shadow-md hover:text-orb-600 hover:scale-110 transition-all"
                         >
                            <Edit size={16} />
                         </button>
                         <button 
                            onClick={() => handleDeleteProduct(item.id)}
                            className="p-2 bg-white text-red-500 rounded-full shadow-md hover:bg-red-50 hover:scale-110 transition-all"
                         >
                            <Trash2 size={16} />
                         </button>
                      </div>
                      <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/60 backdrop-blur rounded text-white text-xs font-bold">
                        ID: {item.id}
                      </div>
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                      <h4 className="font-bold text-slate-900 mb-1 truncate">{item.name}</h4>
                      <div className="flex justify-between items-center text-sm mb-2">
                        <span className="text-slate-500 capitalize">{categories.find(c => c.id === item.category)?.label || item.category}</span>
                        <span className="font-bold text-slate-900">${item.price.toFixed(2)}</span>
                      </div>
                      <div className="mt-auto pt-3 border-t border-slate-100 flex gap-2 flex-wrap">
                        {item.badges && item.badges.map((b, i) => (
                          <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] rounded font-medium">{b}</span>
                        ))}
                        {item.calories > 0 && (
                          <span className="px-2 py-0.5 bg-orange-50 text-orange-600 text-[10px] rounded font-medium flex items-center gap-1">
                            <Flame size={10} /> {item.calories}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {managerTab === 'categories' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">Category Management</h3>
                  <p className="text-slate-500">Organize your products into custom categories.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Add Category Form */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-fit">
                   <h4 className="font-bold text-lg text-slate-900 mb-4 flex items-center gap-2">
                     <PlusCircle size={20} className="text-orb-600" />
                     Add Category
                   </h4>
                   <form onSubmit={handleAddCategory} className="space-y-4">
                      <div>
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Label</label>
                        <input 
                          type="text" 
                          required
                          value={newCatName}
                          onChange={(e) => {
                             setNewCatName(e.target.value);
                             if (!newCatId) setNewCatId(e.target.value.toLowerCase().replace(/\s+/g, '-'));
                          }}
                          className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orb-500 outline-none"
                          placeholder="e.g. Frozen Foods"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">ID (Unique)</label>
                        <input 
                          type="text" 
                          required
                          value={newCatId}
                          onChange={(e) => setNewCatId(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                          className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orb-500 outline-none font-mono text-sm"
                          placeholder="e.g. frozen-foods"
                        />
                      </div>
                      
                      <button 
                        type="submit"
                        className="w-full py-3 bg-orb-600 text-white font-bold rounded-xl hover:bg-orb-700 transition-all shadow-lg shadow-orb-200"
                      >
                        Create Category
                      </button>
                   </form>
                </div>

                {/* Category List */}
                <div className="lg:col-span-2 space-y-4">
                   {categories.map(cat => (
                     <div key={cat.id} className="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-between group">
                        <div className="flex items-center gap-4">
                           <div className="p-3 bg-slate-100 rounded-lg text-slate-600 font-bold text-lg">
                              {cat.label.charAt(0)}
                           </div>
                           <div>
                              <h4 className="font-bold text-slate-900">{cat.label}</h4>
                              <p className="text-xs text-slate-400 font-mono">ID: {cat.id}</p>
                           </div>
                        </div>
                        <div className="flex items-center gap-4">
                           <span className="text-sm text-slate-500 font-medium bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                              {inventory.filter(i => (activeCategory === 'all' || cat.id === 'all') ? true : i.category === cat.id).filter(i => cat.id === 'all' || i.category === cat.id).length} Products
                           </span>
                           {cat.id !== 'all' && (
                             <button 
                                onClick={() => handleDeleteCategory(cat.id)}
                                className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                title="Delete Category"
                             >
                                <Trash2 size={20} />
                             </button>
                           )}
                        </div>
                     </div>
                   ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Edit Modal */}
        {isEditModalOpen && editingProduct && (
          <div className="fixed inset-0 z-[150] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
              <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                <h3 className="text-xl font-bold text-slate-900">
                  {editingProduct.id === 0 ? 'Add New Product' : 'Edit Product'}
                </h3>
                <button onClick={() => setIsEditModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X size={24} />
                </button>
              </div>
              
              <form onSubmit={handleSaveProduct} className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Product Name</label>
                    <div className="relative">
                      <FileText className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input 
                        required
                        type="text" 
                        value={editingProduct.name}
                        onChange={e => setEditingProduct({...editingProduct, name: e.target.value})}
                        className="w-full pl-10 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orb-500 outline-none"
                        placeholder="e.g. Organic Bananas"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Category</label>
                    <div className="relative">
                      <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <select 
                        value={editingProduct.category}
                        onChange={e => setEditingProduct({...editingProduct, category: e.target.value})}
                        className="w-full pl-10 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orb-500 outline-none appearance-none"
                      >
                        {categoryOptions.map(opt => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Price ($)</label>
                    <input 
                      required
                      type="number"
                      step="0.01"
                      value={editingProduct.price}
                      onChange={e => setEditingProduct({...editingProduct, price: parseFloat(e.target.value)})}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orb-500 outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Stock Quantity</label>
                    <input 
                      required
                      type="number"
                      value={editingProduct.stock}
                      onChange={e => setEditingProduct({...editingProduct, stock: parseInt(e.target.value)})}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orb-500 outline-none"
                    />
                  </div>

                  {/* Expanded Customization */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Calories (kcal)</label>
                    <div className="relative">
                      <Flame className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input 
                        type="number"
                        value={editingProduct.calories}
                        onChange={e => setEditingProduct({...editingProduct, calories: parseInt(e.target.value) || 0})}
                        className="w-full pl-10 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orb-500 outline-none"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-bold text-slate-700">Promotional Badges</label>
                    <div className="relative">
                      <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input 
                        type="text"
                        value={editingProduct.badges?.join(', ') || ''}
                        onChange={e => setEditingProduct({...editingProduct, badges: e.target.value.split(',').map(s => s.trim()).filter(Boolean)})}
                        className="w-full pl-10 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orb-500 outline-none"
                        placeholder="e.g. Organic, Best Seller, Sale"
                      />
                    </div>
                    <p className="text-xs text-slate-400">Separate multiple badges with commas.</p>
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-bold text-slate-700">Image URL</label>
                    <div className="flex gap-4">
                      <div className="relative flex-1">
                        <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                          type="url" 
                          value={editingProduct.image}
                          onChange={e => setEditingProduct({...editingProduct, image: e.target.value})}
                          className="w-full pl-10 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orb-500 outline-none"
                          placeholder="https://..."
                        />
                      </div>
                      <div className="w-12 h-12 bg-slate-100 rounded-lg overflow-hidden shrink-0 border border-slate-200">
                        {editingProduct.image && <img src={editingProduct.image} alt="Preview" className="w-full h-full object-cover" />}
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-bold text-slate-700">Description</label>
                    <textarea 
                      value={editingProduct.description}
                      onChange={e => setEditingProduct({...editingProduct, description: e.target.value})}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orb-500 outline-none h-24 resize-none"
                      placeholder="Product description..."
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-end gap-4">
                  <button 
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="px-6 py-3 text-slate-600 font-bold hover:bg-slate-100 rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-6 py-3 bg-orb-600 text-white font-bold rounded-xl hover:bg-orb-700 transition-all shadow-lg shadow-orb-200"
                  >
                    Save Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ViewMode === 'kiosk'
  return (
    <div className="fixed inset-0 bg-slate-50 z-[100] flex flex-col md:flex-row overflow-hidden font-sans">
      {/* --- Sidebar / Navigation (Desktop) --- */}
      <div className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 h-full shrink-0 z-20">
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center gap-2 text-green-600 mb-1">
            <ShoppingBasket size={28} />
            <span className="font-display font-bold text-2xl text-slate-900">Orbilex<span className="text-green-600">Market</span></span>
          </div>
          <p className="text-xs text-slate-500 font-medium ml-1">Grocery Kiosk App</p>
        </div>
        
        <div className="p-4 flex-1 overflow-y-auto">
          <button 
            onClick={onBack}
            className="flex items-center gap-3 w-full p-3 mb-6 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors font-medium text-sm"
          >
            <ArrowLeft size={18} />
            Back to Home
          </button>

          <div className="space-y-1">
            <h3 className="px-3 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Departments</h3>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all ${
                  activeCategory === cat.id 
                    ? 'bg-green-50 text-green-700 font-bold shadow-sm' 
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="mt-8">
             <h3 className="px-3 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Admin</h3>
             <button 
                onClick={() => setViewMode('manager')}
                className="w-full flex items-center gap-3 p-3 rounded-xl text-left text-slate-600 hover:bg-slate-900 hover:text-white transition-all group"
              >
                <div className="bg-slate-100 group-hover:bg-slate-800 p-1.5 rounded-lg transition-colors">
                   <LayoutDashboard size={18} />
                </div>
                <span className="font-medium text-sm">Manager Tab</span>
              </button>
          </div>
        </div>

        <div className="p-4 border-t border-slate-200">
           <div className="bg-slate-900 text-white rounded-xl p-4 relative overflow-hidden">
             <div className="relative z-10">
               <p className="font-bold text-sm mb-1">Store Assistant</p>
               <p className="text-xs text-slate-400">Call for help</p>
             </div>
             <div className="absolute right-[-10px] bottom-[-10px] w-16 h-16 bg-white/10 rounded-full"></div>
           </div>
        </div>
      </div>

      {/* --- Main Content --- */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Mobile Header */}
        <div className="md:hidden bg-white border-b border-slate-200 p-4 flex items-center justify-between z-30">
          <div className="flex items-center gap-2">
            <button onClick={onBack} className="p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-full">
              <ArrowLeft size={24} />
            </button>
            {/* Mobile Manager Entry */}
            <button 
              onClick={() => setViewMode('manager')} 
              className="p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-900 rounded-full"
            >
              <Settings size={20} />
            </button>
          </div>
          
          <span className="font-display font-bold text-xl">Orbilex<span className="text-green-600">Market</span></span>
          
          <button 
            onClick={() => setIsCartOpen(!isCartOpen)}
            className="relative p-2 text-slate-900 hover:bg-slate-100 rounded-full"
          >
            <ShoppingBag size={24} />
            {cart.length > 0 && (
              <span className="absolute top-1 right-0 w-4 h-4 bg-green-600 text-white text-[10px] flex items-center justify-center rounded-full font-bold">
                {cart.reduce((a, b) => a + b.quantity, 0)}
              </span>
            )}
          </button>
        </div>

        {/* Top Bar (Search & Filter) */}
        <div className="bg-white/80 backdrop-blur-md border-b border-slate-200 p-4 md:px-8 md:py-6 flex flex-col md:flex-row gap-4 md:items-center justify-between shrink-0 z-10">
           <div className="md:hidden flex gap-2 overflow-x-auto pb-2 no-scrollbar">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap ${
                    activeCategory === cat.id 
                      ? 'bg-green-600 text-white' 
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
           </div>
           
           <div>
             <h2 className="text-2xl font-bold text-slate-900 hidden md:block">
               {categories.find(c => c.id === activeCategory)?.label}
             </h2>
             <p className="text-sm text-slate-500 hidden md:block">{filteredItems.length} products found</p>
           </div>

           <div className="relative w-full md:w-96">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
             <input 
               type="text" 
               placeholder="Search groceries..." 
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="w-full bg-slate-100 border-none rounded-full pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-green-500 outline-none transition-all"
             />
           </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1 overflow-y-auto bg-slate-50 p-4 md:p-6">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 pb-24 md:pb-8">
            {filteredItems.map(item => {
              const inCart = cart.find(c => c.id === item.id)?.quantity || 0;
              const isLowStock = item.stock < 5;
              
              return (
                <div 
                  key={item.id} 
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300 group flex flex-col"
                >
                  <div className="relative aspect-square overflow-hidden bg-slate-100">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-2 left-2 flex gap-1 flex-wrap content-start pr-2">
                      {item.badges && item.badges.slice(0, 2).map(b => (
                        <span key={b} className="px-1.5 py-0.5 bg-white/95 backdrop-blur rounded text-[10px] font-bold uppercase tracking-wider shadow-sm text-green-800 border border-slate-100">
                          {b}
                        </span>
                      ))}
                      {isLowStock && (
                        <span className="px-1.5 py-0.5 bg-red-100/95 backdrop-blur rounded text-[10px] font-bold uppercase tracking-wider shadow-sm text-red-800 border border-red-200">
                           Low Stock
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="p-3 flex-1 flex flex-col">
                    <div className="mb-1">
                      <h3 className="font-bold text-slate-900 text-sm leading-tight line-clamp-1" title={item.name}>{item.name}</h3>
                    </div>
                    <p className="text-[11px] text-slate-500 mb-3 line-clamp-2 leading-relaxed">{item.description}</p>
                    
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex flex-col">
                         <span className="font-bold text-base text-slate-900">${item.price.toFixed(2)}</span>
                         <span className="text-[10px] text-slate-400 font-medium">{item.stock} left</span>
                      </div>
                      
                      <button 
                        onClick={() => addToCart(item)}
                        disabled={inCart >= item.stock}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-sm ${
                          inCart >= item.stock 
                            ? 'bg-slate-100 text-slate-300 cursor-not-allowed' 
                            : 'bg-slate-900 text-white hover:bg-green-600 active:scale-90 shadow-slate-200'
                        }`}
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
            
            {filteredItems.length === 0 && (
              <div className="col-span-full py-20 text-center">
                 <div className="inline-block p-4 bg-slate-100 rounded-full mb-4">
                   <Search className="w-8 h-8 text-slate-400" />
                 </div>
                 <h3 className="text-lg font-bold text-slate-900">No items found</h3>
                 <p className="text-slate-500">Try adjusting your search filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- Cart Sidebar (Desktop & Mobile Drawer) --- */}
      <div className={`
        fixed inset-y-0 right-0 w-full md:w-96 bg-white shadow-2xl z-40 transform transition-transform duration-300 ease-in-out
        ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}
        md:relative md:translate-x-0 md:border-l md:border-slate-200 md:shadow-none
      `}>
         <div className="flex flex-col h-full">
            {/* Cart Header */}
            <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-white">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <ShoppingBag className="text-green-600" />
                Your Basket
              </h2>
              <button onClick={() => setIsCartOpen(false)} className="md:hidden p-2 text-slate-400 hover:text-slate-900">
                <X size={24} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
               {cart.length === 0 ? (
                 <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
                    <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center">
                      <ShoppingBasket size={32} className="text-slate-400" />
                    </div>
                    <p className="font-medium">Your basket is empty</p>
                 </div>
               ) : (
                 cart.map(item => {
                   const maxStock = inventory.find(i => i.id === item.id)?.stock || 0;
                   return (
                    <div key={item.id} className="flex gap-4 p-3 bg-slate-50 rounded-xl border border-slate-100 relative group">
                        <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg object-cover bg-white" />
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div className="pr-6">
                            <h4 className="font-bold text-slate-900 text-sm leading-tight line-clamp-2">{item.name}</h4>
                            <p className="text-xs text-slate-500 mt-1">${item.price.toFixed(2)}</p>
                          </div>
                          <div className="flex items-center gap-3">
                              <button onClick={() => removeFromCart(item.id)} className="w-6 h-6 rounded bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-100"><Minus size={12} /></button>
                              <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                              <button 
                                onClick={() => addToCart(item)} 
                                disabled={item.quantity >= maxStock}
                                className={`w-6 h-6 rounded bg-white border border-slate-200 flex items-center justify-center ${item.quantity >= maxStock ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-100'}`}
                              >
                                <Plus size={12} />
                              </button>
                          </div>
                          {item.quantity >= maxStock && (
                            <span className="text-[10px] text-red-500 font-medium">Max stock reached</span>
                          )}
                        </div>
                        <button 
                          onClick={() => deleteFromCart(item.id)}
                          className="absolute top-2 right-2 text-slate-300 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                    </div>
                   );
                 })
               )}
            </div>

            {/* Cart Footer */}
            <div className="p-6 bg-slate-50 border-t border-slate-200 space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-slate-500">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-slate-900 pt-2 border-t border-dashed border-slate-200">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <button 
                onClick={handleCheckout}
                disabled={cart.length === 0 || isCheckoutSuccess}
                className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg ${
                  isCheckoutSuccess 
                    ? 'bg-green-500 text-white' 
                    : 'bg-slate-900 text-white hover:bg-green-600 shadow-green-200/50'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isCheckoutSuccess ? (
                  <>
                    <CheckCircle size={20} />
                    Order Placed!
                  </>
                ) : (
                  <>
                    Checkout ${total.toFixed(2)}
                  </>
                )}
              </button>
            </div>
         </div>
      </div>
    </div>
  );
};