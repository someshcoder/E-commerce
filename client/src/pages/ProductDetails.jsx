import { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link, useNavigate } from 'react-router-dom'; 
import { useCart } from '../context/CartContext';
import { Heart, ShoppingCart, Star, Share2, ChevronLeft, ChevronRight, Truck, ShieldCheck, RefreshCw } from 'lucide-react';
const getProductById = (id) => {
  // This is just a placeholder — in real app use API call
  const products = [
    // Copy-paste few products from your Products.jsx here (or fetch from backend)
    {
      id: 1,
      title: "iPhone 17 Pro Max (256GB) Black Titanium",
      price: 144900,
      rating: 4.8,
      reviews: 1245,
      image: "https://m.media-amazon.com/images/I/71R8VsJ07nL._SX679_.jpg",
      images: [
        "https://m.media-amazon.com/images/I/71R8VsJ07nL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/91crodPatIL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/81vgjjh37wL._SX679_.jpg",
      ],
      description: "Experience the ultimate iPhone with the new A18 Pro chip, 48MP Fusion camera system, and stunning 6.9-inch Super Retina XDR display with ProMotion.",
      specs: [
        { key: "Display", value: "6.9-inch Super Retina XDR OLED, 120Hz ProMotion" },
        { key: "Processor", value: "A18 Pro chip" },
        { key: "Camera", value: "48MP Main + 48MP Ultra Wide + 12MP Telephoto (5x)" },
        { key: "Battery", value: "Up to 33 hours video playback" },
        { key: "Storage", value: "256GB" },
        { key: "Color", value: "Black Titanium" },
      ],
      category: "Electronics",
    },
   {
    id: 2,
    title: "Samsung Galaxy S25 Ultra 5G (Titanium Silver)",
    price: 129999,
    rating: 4.7,
    reviews: 876,
    image: "https://hniesfp.imgix.net/8/images/detailed/1001/S25U128GB_TSB_1.jpg?fit=fill&bg=0FFF&w=1500&h=1000&auto=format,compress",
    category: "Electronics",
    tag: "Best Seller",
    description: "The Samsung Galaxy S25 Ultra is a premium Android flagship with Snapdragon 8 Gen 4 processor, a massive 6.8-inch Dynamic AMOLED 2X display, and a versatile 200MP quad camera system for exceptional photography in any condition.",
    specs: [
      { key: "Display", value: "6.8-inch Dynamic AMOLED 2X, 120Hz, 2600 nits brightness" },
      { key: "Processor", value: "Snapdragon 8 Gen 4" },
      { key: "Camera", value: "200MP Main, 50MP Ultra Wide, 10MP 3x Telephoto, 50MP 5x Telephoto; 8K video" },
      { key: "Battery", value: "5000mAh with 45W fast charging, wireless charging" },
      { key: "Storage", value: "512GB" },
      { key: "Other", value: "S Pen support, IP68 rating, Galaxy AI features" },
    ],
    images: [
      "https://hniesfp.imgix.net/8/images/detailed/1001/S25U128GB_TSB_1.jpg?fit=fill&bg=0FFF&w=1500&h=1000&auto=format,compress",
      "https://m.media-amazon.com/images/I/81gJVEFtA8L._SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71iRY9pUoVL._SX569_.jpg"
    ],
  },
  {
    id: 3,
    title: "Noise ColorFit Ultra 4 Smartwatch (Bluetooth Calling)",
    price: 3499,
    rating: 4.5,
    reviews: 4521,
    image: "https://m.media-amazon.com/images/I/61gvNkugY4L._SX679_.jpg",
    category: "Electronics",
    tag: "Trending",
    description: "The Noise ColorFit Ultra 4 is an affordable smartwatch with a 1.96-inch AMOLED display, built-in Bluetooth calling, over 100 sports modes, and health tracking features including heart rate and SpO2 monitoring.",
    specs: [
      { key: "Display", value: "1.96-inch AMOLED, 410x502 resolution, 600 nits" },
      { key: "Battery", value: "Up to 7 days, 300mAh" },
      { key: "Features", value: "Bluetooth calling, 100+ sports modes, IP68 water resistance" },
      { key: "Health Tracking", value: "Heart rate, SpO2, sleep tracking, stress monitor" },
      { key: "Compatibility", value: "Android & iOS" },
      { key: "Other", value: "Custom watch faces, music control" },
    ],
    images: [
      "https://m.media-amazon.com/images/I/61gvNkugY4L._SX679_.jpg",
      "https://m.media-amazon.com/images/I/71JcDJWy8bL._SL1500_.jpg",
      "https://m.media-amazon.com/images/I/61rE-uD9e3L._SL1500_.jpg",
    ],
  },
  // Add similar for id 4 to 45 with unique descriptions, specs, and 3-4 images each. For brevity, here's one more example
  {
    id: 4,
    title: "boAt Airdopes 161 Pro TWS Earbuds (50H Playtime)",
    price: 1499,
    rating: 4.4,
    reviews: 7890,
    image: "https://m.media-amazon.com/images/I/41NcjJTXN5L._SY300_SX300_QL70_FMwebp_.jpg",
    category: "Electronics",
    tag: "Super Saver",
    description: "boAt Airdopes 161 Pro offers true wireless freedom with 50 hours total playtime, ENx technology for clear calls, and ASAP Charge for quick top-ups, making it ideal for music lovers on a budget.",
    specs: [
      { key: "Battery", value: "50 hours total playtime, 5.5 hours per bud" },
      { key: "Charging", value: "ASAP Charge: 10 min for 120 min playtime, Type-C" },
      { key: "Audio", value: "10mm drivers, boAt Signature Sound" },
      { key: "Features", value: "ENx tech for calls, touch controls, IPX5 sweat resistance" },
      { key: "Connectivity", value: "Bluetooth 5.3, instant wake & pair" },
      { key: "Other", value: "Voice assistant support, low latency mode" },
    ],
    images: [
      "https://m.media-amazon.com/images/I/41NcjJTXN5L._SY300_SX300_QL70_FMwebp_.jpg",
      "https://m.media-amazon.com/images/I/716O40UvROL._SL1500_.jpg",
      "https://m.media-amazon.com/images/I/81tA0mXC6wL._SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71qo1SnFcCL._SL1500_.jpg",
    ],
  },
    {
      id: 5,
      title: "OnePlus 15R (16GB+512GB) Midnight Ocean",
      price: 69999,
      rating: 4.6,
      reviews: 2341,
      image: "https://m.media-amazon.com/images/I/41WRtyMpHSL._SY300_SX300_QL70_FMwebp_.jpg",
      category: "Electronics",
      tag: "Flagship",
      description: "The OnePlus 13 features the latest Snapdragon 8 Gen 4 processor, a stunning 6.7-inch LTPO AMOLED display with 120Hz, and a versatile triple camera system with Hasselblad tuning for exceptional photography.",
      specs: [
        { key: "Display", value: "6.7-inch LTPO AMOLED, 120Hz adaptive, 2K resolution" },
        { key: "Processor", value: "Snapdragon 8 Gen 4" },
        { key: "Camera", value: "50MP Main + 50MP Ultra Wide + 32MP Telephoto" },
        { key: "Battery", value: "5000mAh with 100W fast charging" },
        { key: "Storage", value: "512GB UFS 4.0" },
        { key: "OS", value: "OxygenOS 15 (Android 15)" },
      ],
      images: [
        "https://m.media-amazon.com/images/I/41WRtyMpHSL._SY300_SX300_QL70_FMwebp_.jpg",
        "https://m.media-amazon.com/images/I/71rPlphLv6L._SL1500_.jpg",
        "https://m.media-amazon.com/images/I/51EKrccnNVL._SL1002_.jpg",
      ],
    },
    {
      id: 6,
      title: "Sony WH-1000XM6 Wireless Headphones",
      price: 29990,
      rating: 4.9,
      reviews: 3120,
      image: "https://m.media-amazon.com/images/I/61Y1KUYxmQL._SY450_.jpg",
      category: "Electronics",
      tag: "Premium Audio",
      description: "Sony WH-1000XM6 headphones deliver industry-leading noise cancellation with premium sound quality. Features include 360 Reality Audio, Speak-to-Chat, and up to 30 hours of battery life.",
      specs: [
        { key: "Driver", value: "30mm dynamic drivers" },
        { key: "Battery", value: "Up to 30 hours with ANC on, 40 hours with ANC off" },
        { key: "Noise Cancellation", value: "Industry-leading V1 processor" },
        { key: "Connectivity", value: "Bluetooth 5.2, LDAC, Multipoint" },
        { key: "Controls", value: "Touch sensor panel" },
        { key: "Weight", value: "250g" },
      ],
      images: [
        "https://sm.pcmag.com/pcmag_me/review/s/sony-wh-10/sony-wh-1000xm6_m5eq.jpg",
        "https://m.media-amazon.com/images/I/6128D2i-rOL._SL1500_.jpg",
        "https://m.media-amazon.com/images/I/719TRO20qWL._SL1500_.jpg",
      ],
    },
    {
      id: 7,
      title: "Apple Watch Series 10 (46mm)",
      price: 49900,
      rating: 4.8,
      reviews: 1890,
      image: "https://m.media-amazon.com/images/I/41J2ByfeQwL._SX342_SY445_QL70_FMwebp_.jpg",
      category: "Electronics",
      tag: "New Release",
      description: "The Apple Watch Series 10 features a larger Always-On Retina display, advanced health monitoring with ECG and blood oxygen sensing, and next-generation fitness tracking capabilities.",
      specs: [
        { key: "Display", value: "46mm Always-On Retina LTPO OLED" },
        { key: "Processor", value: "S10 SiP chip" },
        { key: "Health", value: "ECG, Blood oxygen, Sleep tracking, Temperature sensing" },
        { key: "Fitness", value: "Advanced workout tracking, Crash detection, Fall detection" },
        { key: "Connectivity", value: "Bluetooth 5.3, Wi-Fi, Cellular option" },
        { key: "Battery", value: "Up to 18 hours" },
      ],
      images: [
        "https://m.media-amazon.com/images/I/41J2ByfeQwL._SX342_SY445_QL70_FMwebp_.jpg",
        "https://m.media-amazon.com/images/I/817-UzcCLWL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/713d1BUBGnL._SX679_.jpg",
        
      ],
    },
    {
      id: 8,
      title: "JBL Tune 760NC Over-Ear Headphones",
      price: 5999,
      rating: 4.5,
      reviews: 4567,
      image: "https://m.media-amazon.com/images/I/71x1ljuwF8L._SY450_.jpg",
      category: "Electronics",
      tag: "Party Essential",
      description: "JBL Tune 760NC headphones feature active noise cancellation, JBL Pure Bass sound, and up to 55 hours of playtime. Perfect for music lovers who want immersive sound without breaking the bank.",
      specs: [
        { key: "Driver", value: "40mm drivers" },
        { key: "Battery", value: "Up to 55 hours with ANC on" },
        { key: "Noise Cancellation", value: "Active Noise Cancelling" },
        { key: "Connectivity", value: "Bluetooth 5.2" },
        { key: "Controls", value: "On-ear touch controls" },
        { key: "Weight", value: "240g" },
      ],
      images: [
        "https://m.media-amazon.com/images/I/71x1ljuwF8L._SY450_.jpg",
        "https://m.media-amazon.com/images/I/51tHkXIHgdL._SX450_.jpg",
        "https://m.media-amazon.com/images/I/714Gv8AZrHL._SL1500_.jpg",
      ],
    },
    {
      id: 9,
      title: "Logitech MX Master 3S Wireless Mouse",
      price: 8999,
      rating: 4.7,
      reviews: 3214,
      image: "https://m.media-amazon.com/images/I/61ni3t1ryQL._SX679_.jpg",
      category: "Electronics",
      tag: "Productivity",
      description: "The Logitech MX Master 3S is the ultimate productivity mouse with Hyperfast scrolling, precise tracking, and multi-device control. Features an ergonomic design for all-day comfort.",
      specs: [
        { key: "Sensor", value: "4000 DPI Darkfield sensor" },
        { key: "Scroll Wheel", value: "Hyperfast scroll wheel with ratchet mode" },
        { key: "Connectivity", value: "Bluetooth Low Energy and USB receiver" },
        { key: "Multi-Device", value: "Control up to 3 devices" },
        { key: "Battery", value: "Up to 70 days on a single charge" },
        { key: "Compatibility", value: "Windows, Mac, Linux" },
      ],
      images: [
        "https://m.media-amazon.com/images/I/61ni3t1ryQL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71TN+wk-ZgL._SL1500_.jpg",
        "https://m.media-amazon.com/images/I/71wcqYX2sbL._SL1500_.jpg",
      ],
    },
    {
      id: 10,
      title: "Sony PlayStation 5 Slim Console",
      price: 49990,
      rating: 4.8,
      reviews: 5432,
      image: "https://m.media-amazon.com/images/I/41c+1Roq2aL._SL1000_.jpg",
      category: "Electronics",
      tag: "Gaming",
      description: "The PlayStation 5 Slim offers the same incredible gaming experience in a more compact form factor. Features a custom SSD, 3D audio, and exclusive titles that redefine gaming.",
      specs: [
        { key: "CPU", value: "AMD Zen 2 8-core, 3.5GHz" },
        { key: "GPU", value: "AMD RDNA 2, 10.28 TFLOPs" },
        { key: "Storage", value: "1TB Custom SSD" },
        { key: "Memory", value: "16GB GDDR6" },
        { key: "Resolution", value: "Up to 4K, up to 120fps" },
        { key: "Optical Drive", value: "4K UHD Blu-ray" },
      ],
      images: [
        "https://m.media-amazon.com/images/I/41c+1Roq2aL._SL1000_.jpg",
        "https://m.media-amazon.com/images/I/61C2SciguhL._SL1000_.jpg",
        "https://m.media-amazon.com/images/I/51ID0Fg8DyL._SL1000_.jpg",
      ],
    },
    {
      id: 11,
      title: "Nike Air Max Sneakers (Men's)",
      price: 8999,
      rating: 4.6,
      reviews: 5678,
      image: "https://m.media-amazon.com/images/I/610L-9ZK7eL._SY695_.jpg",
      category: "Fashion",
      tag: "Fashion",
      description: "Nike Air Max sneakers combine iconic style with innovative cushioning technology. Features a visible Air Max unit in the heel for lightweight cushioning and a comfortable fit for everyday wear.",
      specs: [
        { key: "Material", value: "Synthetic leather upper with textile lining" },
        { key: "Cushioning", value: "Visible Air Max unit in the heel" },
        { key: "Closure", value: "Lace-up front" },
        { key: "Sole", value: "Durable rubber outsole with waffle pattern" },
        { key: "Style", value: "Low-top casual sneakers" },
        { key: "Color", value: "Black/White/Red" },
      ],
      images: [
        "https://m.media-amazon.com/images/I/610L-9ZK7eL._SY695_.jpg",
        "https://m.media-amazon.com/images/I/712wNFuEAbL._SY695_.jpg",
        "https://m.media-amazon.com/images/I/71i75iH6ryL._SY695_.jpg",
      ],
    },
    {
      id: 12,
      title: "Levi's Men's Slim Fit Jeans",
      price: 2499,
      rating: 4.4,
      reviews: 8901,
      image: "https://m.media-amazon.com/images/I/61x4xvIXSjL._SY741_.jpg",
      category: "Fashion",
      tag: "Casual Wear",
      description: "Levi's Men's Slim Fit Jeans offer a modern, flattering fit with classic denim style. Made with premium denim fabric for comfort and durability that lasts wash after wash.",
      specs: [
        { key: "Fit", value: "Slim fit through hip and thigh" },
        { key: "Rise", value: "Mid rise" },
        { key: "Material", value: "98% Cotton, 2% Elastane" },
        { key: "Closure", value: "Button and zip fly" },
        { key: "Pockets", value: "5-pocket design" },
        { key: "Care", value: "Machine wash cold, tumble dry low" },
      ],
      images: [
        "https://m.media-amazon.com/images/I/61x4xvIXSjL._SY741_.jpg",
        "https://m.media-amazon.com/images/I/71x0HZwearL._SY741_.jpg",
        "https://m.media-amazon.com/images/I/61ae7dIk1FL._SX679_.jpg",
      ],
    },
    {
      id: 13,
      title: "Puma Women's Running Shoes",
      price: 3499,
      rating: 4.5,
      reviews: 4321,
      image: "https://m.media-amazon.com/images/I/619d18a7h9L._SY500_.jpg",
      category: "Fashion",
      tag: "Sports",
      description: "Puma Women's Running Shoes provide lightweight comfort and responsive cushioning for every run. Features PUMA's signature design with advanced comfort technology for optimal performance.",
      specs: [
        { key: "Material", value: "Breathable mesh upper with synthetic overlays" },
        { key: "Cushioning", value: "EVA midsole for lightweight cushioning" },
        { key: "Traction", value: "Durable rubber outsole with traction pattern" },
        { key: "Closure", value: "Lace-up with quick-pull lacing" },
        { key: "Technology", value: "SoftFoam+ sockliner for step-in comfort" },
        { key: "Color", value: "White/Black/Blue" },
      ],
      images: [
        "https://m.media-amazon.com/images/I/619d18a7h9L._SY500_.jpg",
        "https://m.media-amazon.com/images/I/716-7ZH--AL._SY675_.jpg",
        "https://m.media-amazon.com/images/I/61aaEnj5jiL._SY675_.jpg",
      ],
    },
    {
      id: 14,
      title: "Ray-Ban Wayfarer Sunglasses",
      price: 7999,
      rating: 4.7,
      reviews: 6543,
      image: "https://m.media-amazon.com/images/I/614GABAKY3L._SX679_.jpg",
      category: "Fashion",
      tag: "Accessories",
      description: "The iconic Ray-Ban Wayfarer sunglasses feature a timeless design that has been worn by celebrities and style icons for decades. Provides 100% UV protection with premium lenses.",
      specs: [
        { key: "Frame Material", value: "Acetate" },
        { key: "Lens Material", value: "Crystal or G-15 glass" },
        { key: "UV Protection", value: "100% UV protection" },
        { key: "Lens Width", value: "50mm" },
        { key: "Bridge Width", value: "22mm" },
        { key: "Temple Length", value: "145mm" },
      ],
      images: [
        "https://m.media-amazon.com/images/I/614GABAKY3L._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61GIwddgWgL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/7115b6bZAEL._SX679_.jpg",
      ],
    },
    {
      id: 15,
      title: "Adidas Men's Hoodie",
      price: 2999,
      rating: 4.6,
      reviews: 3210,
      image: "https://m.media-amazon.com/images/I/41L-tFSf3EL._SX679_.jpg",
      category: "Fashion",
      tag: "Winter Wear",
      description: "The Adidas Men's Hoodie combines comfort and style with a classic design. Made from soft cotton blend fabric with moisture-wicking properties for all-day comfort.",
      specs: [
        { key: "Material", value: "60% Cotton, 40% Polyester" },
        { key: "Fit", value: "Regular fit" },
        { key: "Features", value: "Kangaroo pocket, drawstring hood" },
        { key: "Care", value: "Machine wash cold, tumble dry low" },
        { key: "Design", value: "Adidas trefoil logo" },
        { key: "Color", value: "Grey" },
      ],
      images: [
        "https://m.media-amazon.com/images/I/41L-tFSf3EL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71z7xXZ5AwL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71UYBj3+jZL._SX679_.jpg",
      ],
    },
    {
      id: 16,
      title: "Zara Women's Summer Dress",
      price: 1999,
      rating: 4.3,
      reviews: 5678,
      image: "https://m.media-amazon.com/images/I/71FnJpw5J2L._SY741_.jpg",
      category: "Fashion",
      tag: "Fashion",
      description: "The Zara Women's Summer Dress features a flattering fit and breathable fabric perfect for warm weather. A versatile piece that can be dressed up or down for various occasions.",
      specs: [
        { key: "Material", value: "Viscose blend" },
        { key: "Fit", value: "Fitted silhouette" },
        { key: "Length", value: "Knee-length" },
        { key: "Sleeves", value: "Sleeveless" },
        { key: "Neckline", value: "V-neck" },
        { key: "Care", value: "Machine wash gentle cycle" },
      ],
      images: [
        "https://m.media-amazon.com/images/I/71FnJpw5J2L._SY741_.jpg",
        "https://m.media-amazon.com/images/I/81zeY8lh1iL._SY741_.jpg",
        "https://m.media-amazon.com/images/I/71lXqz-mCTL._SX679_.jpg",
      ],
    },
    {
      id: 17,
      title: "Fastrack Analog Watch (Men's)",
      price: 1499,
      rating: 4.4,
      reviews: 7890,
      image: "https://m.media-amazon.com/images/I/718Z44GF0IL._SX679_.jpg",
      category: "Fashion",
      tag: "Accessories",
      description: "The Fastrack Analog Watch combines classic design with modern functionality. Features a sleek dial with genuine leather strap, perfect for adding style to any outfit.",
      specs: [
        { key: "Display", value: "Analog with luminous hands" },
        { key: "Case Material", value: "Stainless steel" },
        { key: "Strap Material", value: "Genuine leather" },
        { key: "Water Resistance", value: "3 ATM water resistance" },
        { key: "Movement", value: "Japanese quartz movement" },
        { key: "Dial Color", value: "Black" },
      ],
      images: [
        "https://m.media-amazon.com/images/I/718Z44GF0IL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61EVAZeBB7L._SX679_.jpg",
        "https://m.media-amazon.com/images/I/718jHNClHLL._SX679_.jpg",
      ],
    },
    {
      id: 18,
      title: "BULLMER T-Shirt Pack (2 Pieces)",
      price: 999,
      rating: 4.2,
      reviews: 12345,
      image: "https://m.media-amazon.com/images/I/71KYZQHKduL._SY741_.jpg",
      category: "Fashion",
      tag: "Basics",
      description: "H&M Men's T-Shirt Pack includes 3 basic t-shirts made from soft, breathable cotton. Perfect for everyday wear with a comfortable fit and versatile styling options.",
      specs: [
        { key: "Material", value: "100% Cotton" },
        { key: "Fit", value: "Regular fit" },
        { key: "Quantity", value: "3-Pack" },
        { key: "Care", value: "Machine wash cold, tumble dry low" },
        { key: "Features", value: "Soft cotton fabric, comfortable fit" },
        { key: "Color", value: "Assorted colors" },
      ],
      images: [
        "https://m.media-amazon.com/images/I/71KYZQHKduL._SY741_.jpg",
        "https://m.media-amazon.com/images/I/71ATc78aqLL._SY741_.jpg",
        "https://m.media-amazon.com/images/I/81gMAqfUJ2L._SY741_.jpg",
      ],
    },
    {
      id: 19,
      title: "Reebok Women's Leggings",
      price: 1299,
      rating: 4.5,
      reviews: 4567,
      image: "https://m.media-amazon.com/images/I/714tAle1nqL._SX569_.jpg",
      category: "Fashion",
      tag: "Activewear",
      description: "Reebok Women's Leggings provide a perfect fit for workouts and casual wear. Made with moisture-wicking fabric and 4-way stretch technology for maximum comfort and flexibility.",
      specs: [
        { key: "Material", value: "87% Polyester, 13% Elastane" },
        { key: "Fit", value: "Fitted" },
        { key: "Features", value: "Moisture-wicking, 4-way stretch" },
        { key: "Care", value: "Machine wash cold, hang dry" },
        { key: "Waistband", value: "Elastic, wide waistband for comfort" },
        { key: "Style", value: "High waist" },
      ],
      images: [
        "https://m.media-amazon.com/images/I/714tAle1nqL._SX569_.jpg",
        "https://m.media-amazon.com/images/I/91hUMlR8dlL._SX569_.jpg",
        "https://m.media-amazon.com/images/I/71hWvF64MEL._SX569_.jpg",
      ],
    },
    {
      id: 20,
      title: "Fastrack Leather Wallet",
      price: 899,
      rating: 4.3,
      reviews: 3214,
      image: "https://m.media-amazon.com/images/I/613Zl7sRwML._SY575_.jpg",
      category: "Fashion",
      tag: "Accessories",
      description: "Fastrack Leather Wallet combines style and functionality with multiple card slots and compartments. Made from genuine leather with a secure zip closure.",
      specs: [
        { key: "Material", value: "Genuine leather" },
        { key: "Compartments", value: "Multiple card slots, note compartment, coin pocket" },
        { key: "Closure", value: "Zip closure" },
        { key: "Dimensions", value: "10 x 8 x 2 cm" },
        { key: "Color", value: "Black" },
        { key: "Style", value: "Bifold wallet" },
      ],
      images: [
        "https://m.media-amazon.com/images/I/613Zl7sRwML._SY575_.jpg",
        "https://m.media-amazon.com/images/I/61g-OXlLP+L._SY575_.jpg",
        "https://m.media-amazon.com/images/I/61JfevlXBwL._SY575_.jpg",
      ],
    },
    {
      id: 21,
      title: "Lakme Absolute Matte Lipstick",
      price: 499,
      rating: 4.4,
      reviews: 8901,
      image: "https://m.media-amazon.com/images/I/31Cp4kOeclL._SY300_SX300_QL70_FMwebp_.jpg",
      category: "Beauty",
      tag: "Makeup",
      description: "Lakme Absolute Matte Lipstick offers intense color with a long-lasting matte finish. Enriched with Vitamin E and Jojoba Oil for nourished lips that stay beautiful all day.",
      specs: [
        { key: "Finish", value: "Matte" },
        { key: "Shade Range", value: "Multiple shades available" },
        { key: "Ingredients", value: "Vitamin E, Jojoba Oil" },
        { key: "Longevity", value: "Up to 8 hours" },
        { key: "Texture", value: "Smoother and creamier formula" },
        { key: "Coverage", value: "Full coverage" },
      ],
      images: [
        "https://m.media-amazon.com/images/I/31Cp4kOeclL._SY300_SX300_QL70_FMwebp_.jpg",
        "https://m.media-amazon.com/images/I/51OPRxrG7uL._SY450_.jpg",
        "https://m.media-amazon.com/images/I/61yOEct3WFL._SY450_.jpg",
      ],
    },
    {
      id: 22,
      title: "Neutrogena Hydro Boost Moisturizer",
      price: 799,
      rating: 4.6,
      reviews: 6543,
      image: "https://m.media-amazon.com/images/I/51YTdG8RPSL._SY450_.jpg",
      category: "Beauty",
      tag: "Skincare",
      description: "Neutrogena Hydro Boost Moisturizer provides intense hydration with Hyaluronic Acid. This lightweight, oil-free gel-cream instantly plumps and smooths skin for 24-hour moisture.",
      specs: [
        { key: "Key Ingredient", value: "Hyaluronic Acid" },
        { key: "Type", value: "Gel-cream" },
        { key: "Skin Type", value: "All skin types" },
        { key: "Benefits", value: "Hydrates, plumps, smooths fine lines" },
        { key: "Usage", value: "Apply to face and neck daily" },
        { key: "Size", value: "50ml" },
      ],
      images: [
        "https://m.media-amazon.com/images/I/51YTdG8RPSL._SY450_.jpg",
        "https://m.media-amazon.com/images/I/61ZVlwfUfaL._SL1001_.jpg",
        "https://m.media-amazon.com/images/I/61MbwrGNAyL._SL1001_.jpg",
      ],
    },
    {
      id: 23,
      title: "Gillette Fusion Razor Kit",
      price: 599,
      rating: 4.5,
      reviews: 12345,
      image: "https://m.media-amazon.com/images/I/41IdcG5xHUL._SY300_SX300_QL70_FMwebp_.jpg",
      category: "Beauty",
      tag: "Grooming",
      description: "Gillette Fusion Razor Kit features 5 blades for a close, comfortable shave. Includes FlexBall Technology that follows the contours of your face for less irritation and a smoother shave.",
      specs: [
        { key: "Blades", value: "5 blades" },
        { key: "Technology", value: "FlexBall Technology" },
        { key: "Handle", value: "Ergonomic handle with grip" },
        { key: "Features", value: "Precision Trimmer, Lubricating strip" },
        { key: "Cartridges", value: "1 razor handle + 1 blade cartridge" },
        { key: "Benefits", value: "Close shave, less irritation" },
      ],
      images: [
        "https://m.media-amazon.com/images/I/41IdcG5xHUL._SY300_SX300_QL70_FMwebp_.jpg",
        "https://m.media-amazon.com/images/I/61vmPo0xeGL._SL1200_.jpg",
        "https://m.media-amazon.com/images/I/61rD787WERL._SL1200_.jpg",
      ],
    },
    {
      id: 24,
      title: "Maybelline New York Mascara",
      price: 349,
      rating: 4.3,
      reviews: 7890,
      image: "https://m.media-amazon.com/images/I/31O8dmASF6L._SY300_SX300_QL70_FMwebp_.jpg",
      category: "Beauty",
      tag: "Makeup",
      description: "Maybelline New York Mascara delivers dramatic length and volume with its unique formula. The micro-fine bristles coat every lash from root to tip for a full, fluttery look.",
      specs: [
        { key: "Effect", value: "Length and Volume" },
        { key: "Formula", value: "Micro-fine bristles" },
        { key: "Waterproof", value: "Available in waterproof and regular" },
        { key: "Application", value: "Coats every lash from root to tip" },
        { key: "Shade", value: "Black" },
        { key: "Size", value: "8ml" },
      ],
      images: [
        "https://m.media-amazon.com/images/I/31O8dmASF6L._SY300_SX300_QL70_FMwebp_.jpg",
        "https://m.media-amazon.com/images/I/618Oq-DF2HL._SL1500_.jpg",
        "https://m.media-amazon.com/images/I/715DbjqvTqL._SL1500_.jpg",
      ],
    },
    {
      id: 25,
      title: "The Body Shop Tea Tree Face Wash",
      price: 899,
      rating: 4.7,
      reviews: 4321,
      image: "https://m.media-amazon.com/images/I/710wslGO8ZL._SL1500_.jpg",
      category: "Beauty",
      tag: "Skincare",
      description: "The Body Shop Tea Tree Face Wash purifies and balances combination skin with naturally antibacterial Tea Tree Oil. Helps reduce blemishes and leaves skin feeling clean and refreshed.",
      specs: [
        { key: "Key Ingredient", value: "Tea Tree Oil" },
        { key: "Skin Type", value: "Combination/Oily skin" },
        { key: "Benefits", value: "Purifies, balances, reduces blemishes" },
        { key: "Formula", value: "Gel formula with micro-drops" },
        { key: "Usage", value: "Use daily on damp skin" },
        { key: "Size", value: "125ml" },
      ],
      images: [
        "https://m.media-amazon.com/images/I/710wslGO8ZL._SL1500_.jpg",
        "https://m.media-amazon.com/images/I/71D3p1NvuhL._SX522_.jpg",
        "https://m.media-amazon.com/images/I/81wZnoXyu9L._SX522_.jpg",
      ],
    },
    {
      id: 26,
      title: "IKEA Wooden Coffee Table",
      price: 4999,
      rating: 4.4,
      reviews: 3210,
      image: "https://m.media-amazon.com/images/I/41rMMsE-+UL._SY300_SX300_QL70_FMwebp_.jpg",
      category: "Furniture",
      tag: "Home Decor",
      description: "IKEA Wooden Coffee Table features a minimalist design with a natural wood finish. Perfect for modern living rooms, offering a sturdy surface for drinks, books, and decor items.",
      specs: [
        { key: "Material", value: "Solid wood with wood veneer" },
        { key: "Dimensions", value: "80x50x45 cm" },
        { key: "Weight", value: "15 kg" },
        { key: "Style", value: "Minimalist, modern" },
        { key: "Assembly", value: "Self-assembly required" },
        { key: "Features", value: "Durable, easy to clean" },
      ],
      images: [
        "https://m.media-amazon.com/images/I/41rMMsE-+UL._SY300_SX300_QL70_FMwebp_.jpg",
        "https://m.media-amazon.com/images/I/71nppreFXjL._SL1242_.jpg",
        "https://m.media-amazon.com/images/I/51U4M1e2e-L._SL1200_.jpg",
      ],
    },
    {
      id: 27,
      title: "Godrej Study Chair (Ergonomic)",
      price: 3499,
      rating: 4.5,
      reviews: 5678,
      image: "https://m.media-amazon.com/images/I/71ziuV0YyYL._SL1500_.jpg",
      category: "Furniture",
      tag: "Office",
      description: "Godrej Ergonomic Study Chair provides optimal support for long working hours. Features adjustable height, lumbar support, and breathable mesh back for maximum comfort.",
      specs: [
        { key: "Material", value: "Mesh back, steel frame" },
        { key: "Adjustability", value: "Height adjustable" },
        { key: "Features", value: "Lumbar support, armrests" },
        { key: "Weight Capacity", value: "100 kg" },
        { key: "Color", value: "Black" },
        { key: "Assembly", value: "Professional assembly recommended" },
      ],
      images: [
        "https://m.media-amazon.com/images/I/71ziuV0YyYL._SL1500_.jpg",
        "https://m.media-amazon.com/images/I/71awakwsDUL._SL1500_.jpg",
        "https://m.media-amazon.com/images/I/61cY0VBBlkL._SL1500_.jpg",
      ],
    },
    {
      id: 28,
      title: "Pepperfry Queen Size Bed",
      price: 19999,
      rating: 4.6,
      reviews: 2345,
      image: "https://m.media-amazon.com/images/I/71RgeM8+taL._SL1500_.jpg",
      category: "Furniture",
      tag: "Bedroom",
      description: "Pepperfry Queen Size Bed offers a perfect blend of style and comfort. Features a sturdy frame with elegant headboard design, ideal for a restful sleep experience.",
      specs: [
        { key: "Size", value: "Queen size (60x80 inches)" },
        { key: "Material", value: "Engineered wood with fabric upholstery" },
        { key: "Features", value: "Headboard included, slats support" },
        { key: "Style", value: "Modern contemporary" },
        { key: "Assembly", value: "Professional assembly required" },
        { key: "Warranty", value: "1 year warranty" },
      ],
      images: [
        "https://m.media-amazon.com/images/I/71RgeM8+taL._SL1500_.jpg",
        "https://m.media-amazon.com/images/I/51vZh4uO6rL._SL1500_.jpg",
        "https://m.media-amazon.com/images/I/51UkJApqvOL._SL1500_.jpg",
      ],
    },
    {
      id: 29,
      title: "Nilkamal Plastic Wardrobe (4 Doors)",
      price: 7999,
      rating: 4.3,
      reviews: 4567,
      image: "https://m.media-amazon.com/images/I/61MyTpBEn0L._SL1080_.jpg",
      category: "Furniture",
      tag: "Storage",
      description: "Nilkamal Plastic Wardrobe offers spacious storage with 4 doors and multiple compartments. Made from durable plastic with a sleek design that complements any room.",
      specs: [
        { key: "Material", value: "Durable plastic (PP)" },
        { key: "Doors", value: "4 doors" },
        { key: "Compartments", value: "Multiple shelves and hanging space" },
        { key: "Dimensions", value: "48x18x72 inches" },
        { key: "Features", value: "Easy assembly, lightweight" },
        { key: "Color", value: "White with wood grain finish" },
      ],
      images: [
        "https://m.media-amazon.com/images/I/61MyTpBEn0L._SL1080_.jpg",
        "https://m.media-amazon.com/images/I/514kR7b6etL._SL1500_.jpg",
        "https://m.media-amazon.com/images/I/51ACYL1SjjL._SL1080_.jpg",
      ],
    },
    {
      id: 30,
      title: "Urban Ladder Sofa Set (3 Seater)",
      price: 24999,
      rating: 4.7,
      reviews: 1890,
      image: "https://m.media-amazon.com/images/I/61nltPdO7vL._SX569_.jpg",
      category: "Furniture",
      tag: "Living Room",
      description: "Urban Ladder Sofa Set features a contemporary design with premium fabric upholstery. Offers comfortable seating with sturdy construction and elegant finish for your living space.",
      specs: [
        { key: "Seating", value: "3 seater + 2 armchairs (5 seater set)" },
        { key: "Material", value: "Fabric upholstery with wooden frame" },
        { key: "Dimensions", value: "84x34x36 inches" },
        { key: "Features", value: "Removable covers, durable frame" },
        { key: "Style", value: "Modern contemporary" },
        { key: "Assembly", value: "Professional assembly required" },
      ],
      images: [
        "https://m.media-amazon.com/images/I/61nltPdO7vL._SX569_.jpg",
        "https://m.media-amazon.com/images/I/51DBQq2-tSL._SX569_.jpg",
        "https://m.media-amazon.com/images/I/51sDSgspUmL._SX569_.jpg",
      ],
    },
    {
      id: 31,
      title: "Prestige Non-Stick Cookware Set",
      price: 1999,
      rating: 4.4,
      reviews: 6543,
      image: "https://m.media-amazon.com/images/I/51OUmYcUalL._SX569_.jpg",
      category: "Essentials",
      tag: "Kitchen",
      description: "Prestige Non-Stick Cookware Set includes multiple pots and pans with advanced non-stick coating. Perfect for healthy cooking with even heat distribution and easy cleaning.",
      specs: [
        { key: "Material", value: "Aluminum with non-stick coating" },
        { key: "Pieces", value: "6-piece set" },
        { key: "Features", value: "Non-stick coating, heat resistant handles" },
        { key: "Compatibility", value: "Gas, electric, induction compatible" },
        { key: "Size", value: "Multiple sizes included" },
        { key: "Warranty", value: "2-year warranty" },
      ],
      images: [
        "https://m.media-amazon.com/images/I/51OUmYcUalL._SX569_.jpg",
        "https://m.media-amazon.com/images/I/61Uo87atdDL._SX569_.jpg",
        "https://m.media-amazon.com/images/I/51O1x4q+8ZL._SX569_.jpg",
      ],
    },
    {
      id: 32,
      title: "Tata Salt (1kg Pack)",
      price: 20,
      rating: 4.8,
      reviews: 123456,
      image: "https://m.media-amazon.com/images/I/51sKXCIV3+L._SY300_SX300_QL70_FMwebp_.jpg",
      category: "Essentials",
      tag: "Groceries",
      description: "Tata Salt 1kg Pack is pure iodized salt that meets quality standards. Enriched with iodine for better health, it's perfect for daily cooking needs.",
      specs: [
        { key: "Type", value: "Iodized salt" },
        { key: "Weight", value: "1kg" },
        { key: "Quality", value: "Purity tested" },
        { key: "Nutrition", value: "Enriched with iodine" },
        { key: "Packing", value: "Hygienic packaging" },
        { key: "Brand", value: "Tata" },
      ],
      images: [
        "https://m.media-amazon.com/images/I/51sKXCIV3+L._SY300_SX300_QL70_FMwebp_.jpg",
        "https://m.media-amazon.com/images/I/516ck6OFdbL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61sa-T+D2tL._SX679_.jpg",
      ],
    },
    {
      id: 33,
      title: "Dettol Antiseptic Liquid (500ml)",
      price: 149,
      rating: 4.7,
      reviews: 8901,
      image: "https://m.media-amazon.com/images/I/51Pk9xHMgGL._SY450_.jpg",
      category: "Essentials",
      tag: "Health",
      description: "Dettol Antiseptic Liquid 500ml provides protection against germs and bacteria. Ideal for cleaning wounds, cuts, and general household disinfection.",
      specs: [
        { key: "Volume", value: "500ml" },
        { key: "Type", value: "Antiseptic liquid" },
        { key: "Uses", value: "Wound cleaning, household disinfection" },
        { key: "Active Ingredient", value: "Chloroxylenol" },
        { key: "Dilution", value: "Can be diluted for different uses" },
        { key: "Brand", value: "Dettol" },
      ],
      images: [
        "https://m.media-amazon.com/images/I/51Pk9xHMgGL._SY450_.jpg",
        "https://m.media-amazon.com/images/I/61rW8hF59qL._SL1000_.jpg",
        "https://m.media-amazon.com/images/I/61z8esNgJuL._SL1000_.jpg",
      ],
    },
    {
      id: 34,
      title: "Colgate Toothpaste (200g Pack of 2)",
      price: 99,
      rating: 4.6,
      reviews: 76543,
      image: "https://m.media-amazon.com/images/I/41kzaFz6q5L._SY300_SX300_QL70_FMwebp_.jpg",
      category: "Essentials",
      tag: "Personal Care",
      description: "Colgate Toothpaste 200g Pack of 2 offers complete oral care with cavity protection and fresh breath. Twin pack for great value and extended use.",
      specs: [
        { key: "Weight", value: "200g x 2" },
        { key: "Type", value: "Fluoride toothpaste" },
        { key: "Benefits", value: "Cavity protection, fresh breath" },
        { key: "Flavor", value: "Cool mint" },
        { key: "Packaging", value: "Value pack of 2" },
        { key: "Brand", value: "Colgate" },
      ],
      images: [
        "https://m.media-amazon.com/images/I/41kzaFz6q5L._SY300_SX300_QL70_FMwebp_.jpg",
        "https://m.media-amazon.com/images/I/71B+YWm5XOL._SL1500_.jpg",
        "https://m.media-amazon.com/images/I/71+TSPqm9vL._SL1500_.jpg",
      ],
    },
    {
      id: 35,
      title: "Philips Air Fryer (4.1L)",
      price: 7999,
      rating: 4.5,
      reviews: 6543,
      image: "https://m.media-amazon.com/images/I/41exFmRRtqL._SX569_.jpg",
      category: "Essentials",
      tag: "Kitchen",
      description: "Philips Air Fryer 4.1L with Rapid Air Technology allows you to enjoy healthier, crispy food with up to 90% less oil. Perfect for frying, baking, grilling and roasting.",
      specs: [
        { key: "Capacity", value: "4.1L" },
        { key: "Technology", value: "Rapid Air Technology" },
        { key: "Functions", value: "Fry, bake, grill, roast" },
        { key: "Power", value: "1500W" },
        { key: "Features", value: "Digital display, timer, auto shut-off" },
        { key: "Dishwasher Safe", value: "Pan and basket are dishwasher safe" },
      ],
      images: [
        "https://m.media-amazon.com/images/I/41exFmRRtqL._SX569_.jpg",
        "https://m.media-amazon.com/images/I/51L30yNS6sL._SX569_.jpg",
        "https://m.media-amazon.com/images/I/710NmWiEmSL._SX569_.jpg",
      ],
    },
    {
      id: 36,
      title: "Mi Power Bank 20000mAh",
      price: 2199,
      rating: 4.4,
      reviews: 9876,
      image: "https://m.media-amazon.com/images/I/21QnTw2-d9L._SY300_SX300_QL70_FMwebp_.jpg",
      category: "Essentials",
      tag: "Essentials",
      description: "Mi Power Bank 20000mAh offers high capacity charging for multiple devices. Features fast charging technology and multiple ports for simultaneous charging.",
      specs: [
        { key: "Capacity", value: "20000mAh" },
        { key: "Ports", value: "Multiple USB ports" },
        { key: "Technology", value: "Fast charging" },
        { key: "Compatibility", value: "All USB devices" },
        { key: "Safety", value: "Overcharge, overheat protection" },
        { key: "Brand", value: "Mi" },
      ],
      images: [
        "https://m.media-amazon.com/images/I/21QnTw2-d9L._SY300_SX300_QL70_FMwebp_.jpg",
        "https://m.media-amazon.com/images/I/71eSI9u9VUL._SL1500_.jpg",
        "https://m.media-amazon.com/images/I/71sxrHH4+EL._SL1500_.jpg",
      ],
    },
    {
      id: 37,
      title: "boAt Stone 1200F Bluetooth Speaker",
      price: 3999,
      rating: 4.3,
      reviews: 7654,
      image: "https://m.media-amazon.com/images/I/41FnJo9vp2L._SY300_SX300_QL70_FMwebp_.jpg",
      category: "Essentials",
      tag: "Audio",
      description: "boAt Stone 1200F Bluetooth Speaker delivers powerful sound with 20W RMS output. Features RGB lights, multiple connectivity options, and up to 12 hours of playtime.",
      specs: [
        { key: "Power", value: "20W RMS" },
        { key: "Battery Life", value: "Up to 12 hours" },
        { key: "Connectivity", value: "Bluetooth 5.0" },
        { key: "Features", value: "RGB lights, TWS, AUX, USB" },
        { key: "Water Resistance", value: "IPX5 rating" },
        { key: "Brand", value: "boAt" },
      ],
      images: [
        "https://m.media-amazon.com/images/I/41FnJo9vp2L._SY300_SX300_QL70_FMwebp_.jpg",
        "https://m.media-amazon.com/images/I/716aLsES2EL._SX569_.jpg",
        "https://m.media-amazon.com/images/I/71ycpRXidsL._SX569_.jpg",
      ],
    },
    {
      id: 38,
      title: "Himalaya Neem Face Wash",
      price: 199,
      rating: 4.5,
      reviews: 43210,
      image: "https://m.media-amazon.com/images/I/51ixwpTYK7L._SL1100_.jpg",
      category: "Essentials",
      tag: "Personal Care",
      description: "Himalaya Neem Face Wash is formulated with natural ingredients including neem and turmeric. Helps purify skin and control excess oil while maintaining skin's natural moisture balance.",
      specs: [
        { key: "Type", value: "Gel face wash" },
        { key: "Ingredients", value: "Neem, turmeric, natural extracts" },
        { key: "Skin Type", value: "All skin types" },
        { key: "Benefits", value: "Controls oil, purifies skin" },
        { key: "Size", value: "100ml" },
        { key: "Brand", value: "Himalaya" },
      ],
      images: [
        "https://m.media-amazon.com/images/I/51ixwpTYK7L._SL1100_.jpg",
        "https://m.media-amazon.com/images/I/61+xByXvt2L._SL1100_.jpg",
        "https://m.media-amazon.com/images/I/614v7qDIj5L._SL1100_.jpg",
      ],
    },
    {
      id: 39,
      title: "Surf Excel Detergent Powder (2kg)",
      price: 299,
      rating: 4.6,
      reviews: 56789,
      image: "https://m.media-amazon.com/images/I/51xoF1fPbgL._SL1000_.jpg",
      category: "Essentials",
      tag: "Household",
      description: "Surf Excel Detergent Powder 2kg offers superior stain removal and keeps clothes fresh and clean. With MicroSoft technology, it provides better whitening and color protection.",
      specs: [
        { key: "Weight", value: "2kg" },
        { key: "Type", value: "Detergent powder" },
        { key: "Technology", value: "MicroSoft technology" },
        { key: "Benefits", value: "Stain removal, whitening, color protection" },
        { key: "Usage", value: "Machine and hand wash" },
        { key: "Brand", value: "Surf Excel" },
      ],
      images: [
        "https://m.media-amazon.com/images/I/51xoF1fPbgL._SL1000_.jpg",
        "https://m.media-amazon.com/images/I/61YaoHoi14L._SL1000_.jpg",
        "https://m.media-amazon.com/images/I/71fovc1EVsL._SL1000_.jpg",
      ],
    },
    {
      id: 40,
      title: "Dabur Honey (500g)",
      price: 249,
      rating: 4.7,
      reviews: 32145,
      image: "https://m.media-amazon.com/images/I/41RhjqOCLEL._SY300_SX300_QL70_FMwebp_.jpg",
      category: "Essentials",
      tag: "Groceries",
      description: "Dabur Honey 500g is pure, natural honey sourced from high-quality beekeeping practices. Rich in antioxidants and provides natural energy with no added sugar.",
      specs: [
        { key: "Weight", value: "500g" },
        { key: "Type", value: "Pure natural honey" },
        { key: "Benefits", value: "Natural energy, antioxidants" },
        { key: "Purity", value: "Lab tested for purity" },
        { key: "Usage", value: "Direct consumption, in tea, recipes" },
        { key: "Brand", value: "Dabur" },
      ],
      images: [
        "https://m.media-amazon.com/images/I/41RhjqOCLEL._SY300_SX300_QL70_FMwebp_.jpg",
        "https://m.media-amazon.com/images/I/810kETGAZHL._SL1500_.jpg",
        "https://m.media-amazon.com/images/I/81rEfiPgC-L._SL1500_.jpg",
      ],
    },
    {
      id: 41,
      title: "Godrej Aer Pocket Air Freshener",
      price: 149,
      rating: 4.4,
      reviews: 23456,
      image: "https://m.media-amazon.com/images/I/516+BeHTRAL._SY300_SX300_QL70_FMwebp_.jpg",
      category: "Essentials",
      tag: "Household",
      description: "Godrej Aer Pocket Air Freshener provides long-lasting freshness for your space. Compact size with refillable option and long-lasting fragrance technology.",
      specs: [
        { key: "Type", value: "Plug-in air freshener" },
        { key: "Duration", value: "Up to 30 days" },
        { key: "Fragrance", value: "Long-lasting" },
        { key: "Refillable", value: "Yes" },
        { key: "Size", value: "Compact pocket size" },
        { key: "Brand", value: "Godrej" },
      ],
      images: [
        "https://m.media-amazon.com/images/I/516+BeHTRAL._SY300_SX300_QL70_FMwebp_.jpg",
        "https://m.media-amazon.com/images/I/71aPLynejML._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71cUxYUBt0L._SX679_.jpg",
      ],
    },
    {
      id: 42,
      title: "Borosil Glass Water Bottle (1L)",
      price: 499,
      rating: 4.5,
      reviews: 1890,
      image: "https://m.media-amazon.com/images/I/419z9GCHy+L._SY300_SX300_QL70_FMwebp_.jpg",
      category: "Essentials",
      tag: "Kitchen",
      description: "Borosil Glass Water Bottle 1L is made from high-quality borosilicate glass. Leak-proof design with silicone sleeve for grip and durability.",
      specs: [
        { key: "Material", value: "Borosilicate glass" },
        { key: "Capacity", value: "1L" },
        { key: "Features", value: "Leak-proof, silicone sleeve" },
        { key: "Safety", value: "BPA-free, non-toxic" },
        { key: "Design", value: "Ergonomic grip" },
        { key: "Brand", value: "Borosil" },
      ],
      images: [
        "https://m.media-amazon.com/images/I/419z9GCHy+L._SY300_SX300_QL70_FMwebp_.jpg",
        "https://m.media-amazon.com/images/I/61H0WEWsuCL._SL1000_.jpg",
        "https://m.media-amazon.com/images/I/618DNiJ5beL._SL1000_.jpg",
      ],
    },
    {
      id: 43,
      title: "Prestige Induction Cooktop",
      price: 2499,
      rating: 4.6,
      reviews: 9876,
      image: "https://m.media-amazon.com/images/I/81z6RfbuUcL._SL1500_.jpg",
      category: "Electronics",
      tag: "Kitchen Appliances",
      description: "Prestige Induction Cooktop offers fast and efficient cooking with precise temperature control. Energy-saving technology with multiple safety features and compact design.",
      specs: [
        { key: "Type", value: "Induction cooktop" },
        { key: "Power", value: "2000W" },
        { key: "Zones", value: "1 cooking zone" },
        { key: "Features", value: "Digital control, timer, safety lock" },
        { key: "Energy Efficiency", value: "90% energy transfer" },
        { key: "Brand", value: "Prestige" },
      ],
      images: [
        "https://m.media-amazon.com/images/I/81z6RfbuUcL._SL1500_.jpg",
        "https://m.media-amazon.com/images/I/713KUAofTLL._SL1500_.jpg",
        "https://m.media-amazon.com/images/I/81PYqWZDQxL._SL1500_.jpg",
      ],
    },
    {
      id: 44,
      title: "Allen Solly Men's Leather Belt",
      price: 799,
      rating: 4.4,
      reviews: 5432,
      image: "https://m.media-amazon.com/images/I/71BB6lhheDL._SX679_.jpg",
      category: "Fashion",
      tag: "Fashion Accessories",
      description: "Allen Solly Men's Leather Belt is crafted from genuine leather with a classic design. Features a durable buckle and comfortable fit, perfect for formal and casual wear.",
      specs: [
        { key: "Material", value: "Genuine leather" },
        { key: "Buckle", value: "Durable metal buckle" },
        { key: "Style", value: "Classic, formal and casual" },
        { key: "Sizes", value: "Multiple sizes available" },
        { key: "Color", value: "Black" },
        { key: "Brand", value: "Allen Solly" },
      ],
      images: [
        "https://m.media-amazon.com/images/I/71BB6lhheDL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71yFFzBR1LL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/817x9T38RqL._SX679_.jpg",
      ],
    },
    {
      id: 45,
      title: "Biozyme Performance Whey Protein Powder",
      price: 299,
      rating: 4.7, 
      reviews: 23456,
      image: "https://m.media-amazon.com/images/I/71VnwikGbSL._SX679_.jpg",
      category: "Essentials",
      tag: "Wellness",
      description: "Biozyme Performance Whey Protein Powder is a high-quality protein supplement with essential amino acids. Perfect for muscle recovery and growth with delicious chocolate flavor.",
      specs: [
        { key: "Type", value: "Protein supplement" },
        { key: "Flavor", value: "Chocolate" },
        { key: "Protein Content", value: "25g protein per serving" },
        { key: "Ingredients", value: "Whey protein, essential amino acids" },
        { key: "Usage", value: "Pre or post workout" },
        { key: "Size", value: "400g" },
      ],
      images: [
        "https://m.media-amazon.com/images/I/71VnwikGbSL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71KTS76tBDL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71LkTAxVsIL._SX679_.jpg",
      ],
    },
  ]


  return products.find(p => p.id === Number(id)) || products[0]; 
};

const ProductDetail = () => {
  const { id } = useParams(); // get product id from URL
  const navigate = useNavigate();
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist, wishlist } = useCart();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProductAndRelated = async () => {
      try {
        setLoading(true);
          
        // Fetch from Products collection only (not TopDeals)
        const productResponse = await fetch(`http://localhost:5000/api/products/${id}`);
        if (!productResponse.ok) {
          throw new Error('Product not found');
        }
        const productData = await productResponse.json();
        setProduct(productData);
          
        // Fetch related products from the same category (from products collection)
        const relatedResponse = await fetch(`http://localhost:5000/api/products?category=${productData.category}&limit=4`);
        if (relatedResponse.ok) {
          const relatedData = await relatedResponse.json();
          // Filter out the current product from related products
          const filteredRelated = relatedData.filter(p => p._id !== productData._id && p.id !== productData.id);
          setRelatedProducts(filteredRelated);
        }
      } catch (err) {
        setError(err.message);
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };
      
    fetchProductAndRelated();
  }, [id]);

  // Check if product is in wishlist
  const isWishlisted = product ? isInWishlist(product.id) : false;

  // For image carousel auto-scroll (optional)
  useEffect(() => {
    if (!product || !product.images || product.images.length === 0) return;
    
    const timer = setInterval(() => {
      setSelectedImage(prev => (prev + 1) % product.images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [product?.images?.length]);

  if (loading) {
    return <div className="text-center py-20 text-2xl">Loading...</div>;
  }
  
  if (error || !product) {
    return <div className="text-center py-20 text-2xl">{error || 'Product not found'}</div>;
  }

  return (
    <div className="bg-gray-50/50 min-h-screen py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 mb-6">
          Home {product.category && `/ ${product.category}`} / <span className="text-gray-900 font-medium">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left: Images Section */}
          <div className="space-y-6">
            {/* Main Image with Zoom */}
            <div className="relative bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-lg group">
              {product.images && product.images.length > 0 ? (
                <img
                  src={product.images[selectedImage]}
                  alt={product.title}
                  className="w-full h-[500px] md:h-[600px] object-contain transition-transform duration-500 group-hover:scale-110"
                />
              ) : (
                <div className="w-full h-[500px] md:h-[600px] flex items-center justify-center bg-gray-100">
                  <span className="text-gray-500">No image available</span>
                </div>
              )}
              {/* Zoom hint */}
              <div className="absolute bottom-4 right-4 bg-black/70 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm">
                Hover to Zoom
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-4 overflow-x-auto pb-4">
              {product.images && product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2 transition-all duration-200
                    ${selectedImage === index ? 'border-blue-600 shadow-lg' : 'border-gray-200 hover:border-gray-400'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="space-y-8">
            {/* Title & Rating */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                  {product.title}
                </h1>
                {product.tag && (
                  <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-semibold">
                    {product.tag}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-4 mt-4">
                {product.rating && (
                  <div className="flex items-center bg-green-600 text-white px-3 py-1 rounded-md text-sm font-medium">
                    {product.rating} <Star size={16} className="ml-1 fill-white" />
                  </div>
                )}
                {product.reviews && (
                  <span className="text-gray-600 text-sm">
                    {product.reviews.toLocaleString()} Ratings
                  </span>
                )}
              </div>
            </div>

            {/* Price */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <div className="flex items-end gap-3">
                {product.price && (
                  <div className="text-4xl md:text-5xl font-bold text-gray-900">
                    ₹{(product.price * quantity).toLocaleString()}
                  </div>
                )}
                {product.mrp && product.mrp > product.price && (
                  <div className="text-xl text-gray-500 line-through mb-2">
                    ₹{(product.mrp * quantity).toLocaleString()}
                  </div>
                )}
              </div>
              
              {product.discount && product.discount > 0 && (
                <div className="mt-2">
                  <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                    {product.discount}% OFF - Save ₹{((product.mrp - product.price) * quantity).toLocaleString()}
                  </span>
                </div>
              )}
              
              {product.price && (
                <p className="text-sm text-gray-500 mt-2">₹{product.price.toLocaleString()} × {quantity} item{quantity > 1 ? 's' : ''}</p>
              )}
              <p className="text-sm text-gray-500 mt-1">Inclusive of all taxes</p>
            </div>

            {/* Quantity & Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center bg-white border border-gray-300 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="px-5 py-3 text-xl font-bold hover:bg-gray-100 transition"
                >
                  -
                </button>
                <span className="px-8 py-3 text-xl font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="px-5 py-3 text-xl font-bold hover:bg-gray-100 transition"
                >
                  +
                </button>
              </div>

              <div className="flex-1 flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => product && addToCart({...product, quantity: quantity || 1})}
                  className="flex-1 flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold text-lg transition transform hover:scale-[1.02] shadow-lg">
                  <ShoppingCart size={22} />
                  Add to Cart
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (product && isInWishlist(product.id)) {
                      removeFromWishlist(product.id);
                    } else if (product) {
                      addToWishlist(product);
                    }
                  }}
                  className="p-3 bg-white rounded-full hover:bg-gray-100 transition"
                >
                  <Heart
                    size={22}
                    className={product && isInWishlist(product.id) ? "fill-red-500 text-red-500" : "text-gray-700"}
                  />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (navigator.share && product) {
                      navigator.share({
                        title: product.title,
                        text: `Check out ${product.title} for ₹${product.price ? product.price.toLocaleString() : '0'}!`,
                        url: window.location.href,
                      });
                    } else {
                      // Fallback: Copy link to clipboard
                      navigator.clipboard.writeText(window.location.href);
                      alert('Product link copied to clipboard!');
                    }
                  }}
                  className="p-3 bg-white rounded-full hover:bg-gray-100 transition"
                >
                  <Share2
                    size={22}
                    className="text-gray-700"
                  />
                </button>
              </div>
            </div>

            {/* Delivery & Offers */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-200">
                <Truck size={24} className="text-blue-600" />
                <div>
                  <p className="font-medium">Free Delivery</p>
                  <p className="text-gray-600">Get by 2-4 days</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-200">
                <ShieldCheck size={24} className="text-green-600" />
                <div>
                  <p className="font-medium">1 Year Warranty</p>
                  <p className="text-gray-600">Brand warranty included</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-200">
                <RefreshCw size={24} className="text-purple-600" />
                <div>
                  <p className="font-medium">7 Days Replacement</p>
                  <p className="text-gray-600">If defective</p>
                </div>
              </div>
            </div>

            {/* Buy Now Button */}
            <div className="mt-6">
              <button
                onClick={() => {
                  // Redirect to checkout page with product data
                  if (product) {
                    navigate('/checkout', { state: { product: {...product, quantity: quantity || 1}, buyNow: true } });
                  }
                }}
                className="w-full flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white py-4 px-6 rounded-xl font-semibold text-lg transition shadow-lg hover:shadow-xl"
                disabled={!product}
              >
                <ShoppingCart size={22} />
                Buy Now
              </button>
            </div>

            {/* Description */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200">
              <h2 className="text-2xl font-bold mb-4">About this item</h2>
              {product.description && (
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
              )}
            </div>

            {/* Specifications */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200">
              <h2 className="text-2xl font-bold mb-4">Specifications</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.specs && product.specs.map((spec, index) => (
                  <div key={index} className="flex justify-between py-2 border-b border-gray-100 last:border-b-0">
                    <span className="text-gray-600 font-medium">{spec.key}</span>
                    <span className="text-gray-900">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* You may also like - Simple carousel (can be improved later) */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8">You may also like</h2>
          <div className="flex gap-6 overflow-x-auto pb-6">
            {/* Add 4-5 related product cards here (same style as Products.jsx) */}
            {relatedProducts.length > 0 ? (
              relatedProducts.map(product => (
                <Link to={`/product/${product._id || product.id}`} key={product._id || product.id} className="min-w-[280px] bg-white rounded-2xl border p-4 hover:shadow-xl transition cursor-pointer">
                  <div className="h-64 bg-gray-100 rounded-xl mb-4 flex items-center justify-center overflow-hidden">
                    <img 
                      src={product.image || product.images?.[0] || "https://via.placeholder.com/300x300?text=Product"} 
                      alt={product.title}
                      className="h-full w-full object-contain"
                      onError={(e) => { e.target.src = "https://via.placeholder.com/300x300?text=Product"; }}
                    />
                  </div>
                  <h3 className="font-medium line-clamp-2 h-12">{product.title}</h3>
                  <p className="text-xl font-bold mt-2">₹{(product.price || 0).toLocaleString()}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={`${i < Math.floor(product.rating || 0) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                    <span className="text-xs text-gray-500 ml-1">
                      ({(product.reviews || 0).toLocaleString()})
                    </span>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-gray-500 col-span-full text-center py-8">No related products found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;