// src/pages/Checkout.jsx
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Truck, ShieldCheck, CreditCard, Wallet, Check, Plus, MapPin, Home, Briefcase, Package, Star } from 'lucide-react';

export default function Checkout() {
    const location = useLocation();
    const navigate = useNavigate();

    // Buy Now ya Cart se aaya product/cart items
    const buyNowItem = location.state?.product || null;
    const buyNowQty = location.state?.quantity || 1;
    const buyNowCartItems = location.state?.cartItems || null;

    // Demo cart items (real app mein CartContext se aayega)
    const cartItems = buyNowItem
        ? [{ ...buyNowItem, quantity: buyNowQty }]
        : buyNowCartItems || []; // agar cart hai toh use kar lena

    const [step, setStep] = useState(1); // 1=Address, 2=Summary, 3=Payment
    const [addresses, setAddresses] = useState([]); // saved addresses
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [showAddressForm, setShowAddressForm] = useState(false); // Initially false

    // Razorpay Payment Function
    const openRazorpay = () => {
        const options = {
            key: "rzp_test_1DP5mmOlF5G5ag", // Test key (production mein change karna)
            amount: total * 100, // paise mein
            currency: "INR",
            name: "ShopKart",
            description: `Order of ${cartItems.length} item${cartItems.length > 1 ? 's' : ''}`,
            image: "https://your-logo-url.com/logo.png", // optional
            handler: function (response) {
                // Payment success - Create order in database
                createOrder(response.razorpay_payment_id);
            },
            prefill: {
                name: selectedAddress?.name || "",
                email: "customer@example.com",
                contact: selectedAddress?.mobile || ""
            },
            notes: {
                address: `${selectedAddress?.address}, ${selectedAddress?.city}, ${selectedAddress?.pincode}`
            },
            theme: {
                color: "#6366f1" // indigo
            },
            modal: {
                ondismiss: function () {
                    alert("Payment cancelled");
                }
            }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    // Auto-show address form if no addresses exist
    useEffect(() => {
        if (addresses.length === 0) {
            setShowAddressForm(true);
        }
    }, [addresses]);

    // New Address Form State
    const [newAddress, setNewAddress] = useState({
        name: '',
        mobile: '',
        pincode: '',
        address: '',
        locality: '',
        city: '',
        state: '',
        type: 'HOME' // HOME or WORK
    });

    // Calculate totals
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discount = Math.round(subtotal * 0.20); // example 20% off
    const delivery = subtotal > 999 ? 0 : 29;
    const total = subtotal - discount + delivery;

    const handleAddAddress = () => {
        if (!newAddress.name || !newAddress.mobile || !newAddress.pincode || !newAddress.address) {
            alert("Please fill all required fields");
            return;
        }
        const newAddr = { ...newAddress, id: Date.now() };
        setAddresses([...addresses, newAddr]);
        setSelectedAddress(newAddr); // Automatically select the newly added address
        setNewAddress({
            name: '', mobile: '', pincode: '', address: '', locality: '', city: '', state: '', type: 'HOME'
        });
        setShowAddressForm(false);
    };

    const handleContinue = () => {
        if (step === 1) {
            if (addresses.length === 0) {
                // If no addresses exist and form is not shown, show the form
                if (!showAddressForm) {
                    setShowAddressForm(true);
                    return;
                } else {
                    alert("Please save the address you entered");
                    return;
                }
            } else {
                // At least one address exists, allow progression
                setSelectedAddress(addresses[0]); // Select the first address by default
            }
        }
        if (step < 3) {
            setStep(step + 1);
        } else {
            // Final order placement
            alert(`Order Placed Successfully! 🎉\nTotal: ₹${total.toLocaleString()}`);
            navigate('/products');
        }
    };

    // Create order after successful payment
    const createOrder = async (paymentId) => {
        try {
            console.log('Creating order with paymentId:', paymentId);
            console.log('Selected address:', selectedAddress);
            console.log('Cart items:', cartItems);
            
            const token = localStorage.getItem('token');
            
            const response = await fetch('http://localhost:5000/api/orders/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    address: `${selectedAddress.address}, ${selectedAddress.locality}, ${selectedAddress.city}, ${selectedAddress.state} - ${selectedAddress.pincode}`,
                    paymentMethod: 'Razorpay',
                    paymentId: paymentId,
                    products: cartItems.map(item => ({
                        productId: item._id || item.id || item.productId,
                        quantity: item.quantity || 1
                    }))
                })
            });
            
            console.log('Order creation response status:', response.status);
            
            if (response.ok) {
                const orderData = await response.json();
                console.log('Order created successfully:', orderData);
                alert(`Order Created Successfully! 🎉\nOrder ID: ${orderData._id}`);
                navigate('/products'); // Navigate to user's orders page
            } else {
                const errorData = await response.json().catch(() => ({ message: 'Unable to parse server error' }));
                console.error('Order creation error response:', errorData);
                alert(`Order creation failed: ${errorData.msg || errorData.message || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Error creating order:', error);
            alert('Error creating order. Please try again.');
        }
    };


    return (
        <div className="min-h-screen bg-gray-50">
            {/* Clean & Professional Progress Header - 2026 Best Practice */}
            <div className="sticky top-0 bg-white shadow-sm z-50 border-b border-gray-200">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Top Bar */}
                    <div className="flex items-center justify-between py-3">
                        <button
                            onClick={() => navigate(-1)}
                            className="p-2 hover:bg-gray-100 rounded-full transition"
                        >
                            <ArrowLeft size={24} className="text-gray-700" />
                        </button>

                        <h1 className="text-lg font-bold text-gray-900">Secure Checkout</h1>

                        <div className="flex items-center gap-2 text-xs font-medium text-green-700">
                            <ShieldCheck size={16} className="text-green-600" />
                            100% Secure
                        </div>
                    </div>

                    {/* Progress Steps - Clean & Responsive */}
                    <div className="py-4 border-t border-gray-100">
                        <div className="flex items-center justify-center gap-8 md:gap-16">
                            {[
                                { num: 1, label: "Delivery Address" },
                                { num: 2, label: "Order Summary" },
                                { num: 3, label: "Payment" }
                            ].map((s, i) => (
                                <div key={i} className="flex items-center">
                                    {/* Step Circle */}
                                    <div className={`relative flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm transition-all duration-300 ${step > s.num
                                            ? 'bg-green-600 text-white'
                                            : step === s.num
                                                ? 'bg-blue-600 text-white ring-4 ring-blue-100'
                                                : 'bg-gray-200 text-gray-500'
                                        }`}>
                                        {step > s.num ? (
                                            <Check size={20} />
                                        ) : (
                                            s.num
                                        )}
                                    </div>

                                    {/* Label */}
                                    <div className="ml-3 hidden sm:block">
                                        <p className={`font-medium transition-colors ${step >= s.num ? 'text-gray-900' : 'text-gray-400'
                                            }`}>
                                            {s.label}
                                        </p>
                                    </div>

                                    {/* Connecting Line */}
                                    {i < 2 && (
                                        <div className="hidden sm:block flex-1 h-0.5 mx-4 bg-gray-200">
                                            <div className={`h-full transition-all duration-500 ${step > s.num + 1 ? 'bg-blue-600' : step > s.num ? 'bg-blue-600 w-1/2' : 'w-0'
                                                }`} />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Mobile Simple Progress Text */}
                        <div className="sm:hidden text-center mt-4">
                            <p className="text-sm text-gray-600">
                                Step {step} of 3 —{' '}
                                <span className="font-medium text-gray-900">
                                    {step === 1 ? 'Delivery Address' : step === 2 ? 'Order Summary' : 'Payment'}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="max-w-5xl mx-auto px-4 py-8">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Center content on step 1 and step 2, otherwise main content */}
                    <div className={`${step === 1 || step === 2 ? 'lg:col-span-3' : 'lg:col-span-2'} space-y-6`}>
                        {/* Step 1: Address */}
                        {step === 1 && (
                            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mx-auto max-w-2xl">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold">Delivery Address</h2>
                                    <button
                                        onClick={() => setShowAddressForm(true)}
                                        className="text-blue-600 font-medium flex items-center gap-2 hover:text-blue-700 transition"
                                    >
                                        <Plus size={20} /> Add New Address
                                    </button>
                                </div>

                                {showAddressForm && (
                                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
                                        <h3 className="font-semibold mb-4">Add New Address</h3>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <input
                                                type="text"
                                                placeholder="Full Name *"
                                                value={newAddress.name}
                                                onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                                                className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                            />
                                            <input
                                                type="tel"
                                                inputMode="numeric"
                                                pattern="[0-9]*"
                                                placeholder="Mobile Number *"
                                                value={newAddress.mobile}
                                                maxLength={10}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    // Allow only numeric values and max 10 digits
                                                    if (/^\d{0,10}$/.test(value)) {
                                                        setNewAddress({ ...newAddress, mobile: value });
                                                    }
                                                }}
                                                className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                            />
                                            <input
                                                type="tel"
                                                inputMode="numeric"
                                                pattern="[0-9]*"
                                                placeholder="Pincode"
                                                value={newAddress.pincode}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    // Allow only numeric values
                                                    if (/^\d{0,6}$/.test(value)) {
                                                        setNewAddress({ ...newAddress, pincode: value });
                                                    }
                                                }}
                                                className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Flat, House no., Building *"
                                                value={newAddress.address}
                                                onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                                                className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none md:col-span-2"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Locality / Area"
                                                value={newAddress.locality}
                                                onChange={(e) => setNewAddress({ ...newAddress, locality: e.target.value })}
                                                className="px-4 py-3 border rounded-lg"
                                            />
                                            <input
                                                type="text"
                                                placeholder="City / District"
                                                value={newAddress.city}
                                                onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                                                className="px-4 py-3 border rounded-lg"
                                            />
                                            <input
                                                type="text"
                                                placeholder="State"
                                                value={newAddress.state}
                                                onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                                                className="px-4 py-3 border rounded-lg"
                                            />
                                            <div className="flex gap-4">
                                                <label className="flex items-center gap-2">
                                                    <input type="radio" name="type" value="HOME" checked={newAddress.type === 'HOME'} onChange={(e) => setNewAddress({ ...newAddress, type: e.target.value })} />
                                                    <Home size={18} /> Home
                                                </label>
                                                <label className="flex items-center gap-2">
                                                    <input type="radio" name="type" value="WORK" checked={newAddress.type === 'WORK'} onChange={(e) => setNewAddress({ ...newAddress, type: e.target.value })} />
                                                    <Briefcase size={18} /> Work
                                                </label>
                                            </div>
                                        </div>
                                        <div className="flex gap-3 mt-6">
                                            <button onClick={handleAddAddress} className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium">
                                                Save Address
                                            </button>
                                            <button onClick={() => setShowAddressForm(false)} className="px-6 py-3 border rounded-lg hover:bg-gray-50 transition">
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Saved Addresses */}
                                <div className="space-y-4">
                                    {addresses.length === 0 ? (
                                        <p className="text-center text-gray-500 py-8">No saved addresses. Add one above.</p>
                                    ) : (
                                        addresses.map((addr) => (
                                            <label
                                                key={addr.id}
                                                className={`block border-2 rounded-xl p-5 cursor-pointer transition-all ${selectedAddress?.id === addr.id ? 'border-blue-600 shadow-lg bg-blue-50' : 'border-gray-200 hover:border-gray-400'
                                                    }`}
                                            >
                                                <div className="flex items-start gap-4">
                                                    <input
                                                        type="radio"
                                                        name="address"
                                                        checked={selectedAddress?.id === addr.id}
                                                        onChange={() => setSelectedAddress(addr)}
                                                        className="mt-1"
                                                    />
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-3 mb-2">
                                                            <span className="font-semibold">{addr.name}</span>
                                                            <span className="bg-gray-200 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                                                                {addr.type === 'HOME' ? <Home size={14} /> : <Briefcase size={14} />}
                                                                {addr.type}
                                                            </span>
                                                        </div>
                                                        <p className="text-gray-700">{addr.address}, {addr.locality}</p>
                                                        <p className="text-gray-700">{addr.city}, {addr.state} - {addr.pincode}</p>
                                                        <p className="font-medium mt-1">Mobile: {addr.mobile}</p>
                                                    </div>
                                                </div>
                                            </label>
                                        ))
                                    )}
                                </div>
                                <div className="fixed bottom-0 left-0 right-0 bg-white shadow-2xl border-t border-gray-200 p-4 md:static md:shadow-none md:border-0">
                                    <div className="max-w-5xl mx-auto">
                                        <button
                                            onClick={handleContinue}
                                            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-xl py-5 rounded-2xl transition shadow-lg transform hover:scale-[1.02] active:scale-[0.98]"
                                        >
                                            Continue to Order Summary
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Order Summary - Premium Professional Version */}
                        {step === 2 && (
                            <div className="space-y-8">
                                {/* Page Title */}
                                <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Summary</h2>
                                    <p className="text-gray-600">Review your items before payment</p>
                                </div>

                                {/* Each Product Card - Premium Style */}
                                {cartItems.map((item, index) => (
                                    <div key={item.id || index} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                                        <div className="flex flex-col md:flex-row">
                                            {/* Product Image */}
                                            <div className="md:w-48 md:h-48 bg-gray-50 p-6 flex items-center justify-center">
                                                <img
                                                    src={item.image || item.images?.[0] || 'https://via.placeholder.com/200?text=Product'}
                                                    alt={item.title}
                                                    className="max-w-full max-h-full object-contain rounded-lg"
                                                />
                                            </div>

                                            {/* Product Details */}
                                            <div className="flex-1 p-6 md:p-8">
                                                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
                                                    <div className="flex-1">
                                                        {/* Title */}
                                                        <h3 className="text-xl font-semibold text-gray-900 mb-3 leading-tight">
                                                            {item.title}
                                                        </h3>

                                                        {/* Variants (if any) */}
                                                        {item.selectedVariants && Object.keys(item.selectedVariants).length > 0 && (
                                                            <p className="text-gray-600 mb-3">
                                                                {Object.entries(item.selectedVariants).map(([key, value]) => `${key}: ${value}`).join(' | ')}
                                                            </p>
                                                        )}

                                                        {/* Seller Info (optional) */}
                                                        <p className="text-sm text-gray-500 mb-4">
                                                            Sold by <span className="font-medium text-gray-700">ShopKart Official</span>
                                                        </p>

                                                        {/* Rating */}
                                                        <div className="flex items-center gap-3 mb-4">
                                                            <div className="flex items-center bg-green-600 text-white px-2 py-1 rounded text-sm font-medium">
                                                                {item.rating || 4.5} <Star size={14} className="ml-1 fill-white" />
                                                            </div>
                                                            <span className="text-gray-600 text-sm">({item.reviews?.toLocaleString() || '1,234'} ratings)</span>
                                                        </div>

                                                        {/* Quantity Selector */}
                                                        <div className="flex items-center gap-4 mb-6">
                                                            <span className="text-gray-700 font-medium">Quantity:</span>
                                                            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                                                                <button className="px-4 py-2 hover:bg-gray-100 transition">-</button>
                                                                <span className="px-6 py-2 font-semibold">{item.quantity}</span>
                                                                <button className="px-4 py-2 hover:bg-gray-100 transition">+</button>
                                                            </div>
                                                        </div>

                                                        {/* Delivery Info */}
                                                        <div className="flex items-center gap-3 text-green-700 font-medium">
                                                            <Truck size={20} />
                                                            <span>Delivery by <strong>Jan 18, Sunday</strong> | <span className="text-green-600">Free</span></span>
                                                        </div>
                                                    </div>

                                                    {/* Price Section */}
                                                    <div className="text-right">
                                                        <div className="mb-4">
                                                            {item.originalPrice && (
                                                                <p className="text-gray-500 line-through text-lg">
                                                                    ₹{(item.originalPrice * item.quantity).toLocaleString('en-IN')}
                                                                </p>
                                                            )}
                                                            <p className="text-3xl font-bold text-gray-900">
                                                                ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                                                            </p>
                                                        </div>

                                                        {/* Hot Deal Badge */}
                                                        {item.tag && (
                                                            <span className="inline-block bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-bold">
                                                                {item.tag}
                                                            </span>
                                                        )}

                                                        {/* Offer Text */}
                                                        <p className="text-sm text-green-600 font-medium mt-4">
                                                            You save ₹{((item.originalPrice || item.price * 1.5) * item.quantity - item.price * item.quantity).toLocaleString('en-IN')}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {/* Premium Savings Celebration Banner */}
                                {discount > 0 && (
                                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-8 text-white shadow-2xl relative overflow-hidden">
                                        <div className="absolute inset-0 bg-black opacity-10"></div>
                                        <div className="relative z-10 flex items-center justify-between">
                                            <div className="flex items-center gap-6">
                                                <div className="text-6xl">🎉</div>
                                                <div>
                                                    <h3 className="text-3xl font-bold mb-2">Huge Savings Alert!</h3>
                                                    <p className="text-xl opacity-90">
                                                        Congratulations! You've saved a massive
                                                    </p>
                                                    <p className="text-5xl font-extrabold mt-3">
                                                        ₹{discount.toLocaleString('en-IN')}
                                                    </p>
                                                    <p className="text-lg mt-2 opacity-90">on this order</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm opacity-80">Keep shopping for more deals!</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Offers Section */}
                                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                                    <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                                        <ShieldCheck size={24} className="text-blue-600" />
                                        Available Offers
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-200">
                                            <div className="text-2xl">💳</div>
                                            <div>
                                                <p className="font-medium text-blue-900">10% Instant Discount on Credit Cards</p>
                                                <p className="text-sm text-blue-700">On orders above ₹5000</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3 p-4 bg-green-50 rounded-xl border border-green-200">
                                            <div className="text-2xl">🏦</div>
                                            <div>
                                                <p className="font-medium text-green-900">Extra ₹500 off on UPI payments</p>
                                                <p className="text-sm text-green-700">Limited time offer</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-xl border border-purple-200">
                                            <div className="text-2xl">🎁</div>
                                            <div>
                                                <p className="font-medium text-purple-900">Free Gift with every order above ₹3000</p>
                                                <p className="text-sm text-purple-700">Surprise gift included!</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Continue Button */}
                                <div className="fixed bottom-0 left-0 right-0 bg-white shadow-2xl border-t border-gray-200 p-4 md:static md:shadow-none md:border-0">
                                    <div className="max-w-5xl mx-auto">
                                        <button
                                            onClick={handleContinue}
                                            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-xl py-5 rounded-2xl transition shadow-lg transform hover:scale-[1.02] active:scale-[0.98]"
                                        >
                                            Continue to Payment
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right: Price Summary Sidebar - Show only on step 3 (Payment) */}
                    {/* Step 3: Payment - Official Razorpay Style (Professional & Clean) */}
                    {step === 3 && (
                        <div className="lg:col-span-3 flex justify-center">
                            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 max-w-2xl w-full overflow-hidden">
                                {/* Top Header - Razorpay Branding */}
                                <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-8 px-10 text-center">
                                    <h2 className="text-3xl font-bold mb-3 flex items-center justify-center gap-4">
                                        <CreditCard size={36} />
                                        Secure Payment
                                    </h2>
                                    <p className="text-lg opacity-90">Your payment is protected with bank-grade security</p>
                                </div>

                                {/* Razorpay Powered By Section */}
                                <div className="bg-gray-50 py-8 text-center border-b">
                                    <p className="text-gray-700 font-medium mb-4">Powered by</p>
                                    <img
                                        src="https://razorpay.com/assets/razorpay-glyph.svg"
                                        alt="Razorpay"
                                        className="h-12 mx-auto mb-4"
                                    />
                                    <div className="flex items-center justify-center gap-2 text-green-600 font-bold">
                                        <ShieldCheck size={24} />
                                        <span className="text-lg">100% Secure • PCI DSS Certified</span>
                                    </div>
                                </div>

                                {/* Order Amount Summary */}
                                <div className="p-8 bg-gradient-to-b from-gray-50 to-white">
                                    <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">Amount to be Paid</h3>
                                    <div className="text-center mb-10">
                                        <p className="text-6xl font-extrabold text-indigo-600">
                                            ₹{total.toLocaleString('en-IN')}
                                        </p>
                                        <p className="text-gray-600 mt-3">
                                            Inclusive of all taxes & charges
                                        </p>
                                    </div>

                                    {/* Quick Summary */}
                                    <div className="bg-white rounded-2xl p-6 shadow-inner border mb-10">
                                        <div className="space-y-4">
                                            <div className="flex justify-between text-lg">
                                                <span className="text-gray-700">Subtotal</span>
                                                <span className="font-semibold">₹{subtotal.toLocaleString()}</span>
                                            </div>
                                            {discount > 0 && (
                                                <div className="flex justify-between text-lg text-green-600 font-medium">
                                                    <span>Savings Applied</span>
                                                    <span>-₹{discount.toLocaleString()}</span>
                                                </div>
                                            )}
                                            <div className="flex justify-between text-lg">
                                                <span className="text-gray-700">Delivery</span>
                                                <span className={delivery === 0 ? 'text-green-600 font-bold' : ''}>
                                                    {delivery === 0 ? 'FREE' : `₹${delivery}`}
                                                </span>
                                            </div>
                                            <div className="border-t-2 border-dashed pt-4">
                                                <div className="flex justify-between text-2xl font-extrabold text-indigo-700">
                                                    <span>Total Payable</span>
                                                    <span>₹{total.toLocaleString()}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Supported Payment Methods */}
                                    <div className="mb-10">
                                        <p className="text-center text-gray-700 font-medium mb-6">All major payment methods accepted</p>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                            <div className="flex flex-col items-center p-4 bg-blue-50 rounded-xl">
                                                <CreditCard size={40} className="text-blue-600 mb-2" />
                                                <span className="text-sm font-medium">Cards</span>
                                            </div>
                                            <div className="flex flex-col items-center p-4 bg-green-50 rounded-xl">
                                                <div className="bg-green-600 text-white w-14 h-14 rounded-xl flex items-center justify-center text-2xl font-bold mb-2">
                                                    UPI
                                                </div>
                                                <span className="text-sm font-medium">UPI</span>
                                            </div>
                                            <div className="flex flex-col items-center p-4 bg-purple-50 rounded-xl">
                                                <Wallet size={40} className="text-purple-600 mb-2" />
                                                <span className="text-sm font-medium">Wallets</span>
                                            </div>
                                            <div className="flex flex-col items-center p-4 bg-orange-50 rounded-xl">
                                                <div className="bg-orange-600 text-white px-5 py-3 rounded-lg font-bold mb-2">
                                                    NET
                                                </div>
                                                <span className="text-sm font-medium">Net Banking</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Final Pay Button - Razorpay Style */}
                                    <button
                                        onClick={openRazorpay}
                                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-extrabold text-2xl py-7 rounded-2xl shadow-2xl transition-all duration-500 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-5"
                                    >
                                        <ShieldCheck size={32} />
                                        PROCEED TO PAY ₹{total.toLocaleString()}
                                    </button>

                                    {/* Trust Footer */}
                                    <div className="mt-8 text-center">
                                        <div className="flex items-center justify-center gap-6 text-sm text-gray-500 mb-4">
                                            <span className="flex items-center gap-2">
                                                <ShieldCheck size={18} className="text-green-600" />
                                                Encrypted Connection
                                            </span>
                                            <span className="flex items-center gap-2">
                                                <ShieldCheck size={18} className="text-green-600" />
                                                No Card Storage
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-500">
                                            By continuing, you agree to our{' '}
                                            <a href="#" className="text-indigo-600 underline font-medium">Terms of Service</a> and{' '}
                                            <a href="#" className="text-indigo-600 underline font-medium">Privacy Policy</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
