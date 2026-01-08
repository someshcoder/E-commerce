import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Flame, Heart, ShoppingCart, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const topDeals = [
  {
    id: 1,
    title: "Apple iPhone 16 Plus (256GB) Desert Titanium",
    price: 84990,
    mrp: 164900,
    discount: 12,
    image: "https://m.media-amazon.com/images/I/711VzeHZAPL._SX679_.jpg",
    tag: "Best Seller",
    description: "The ultimate iPhone experience with A18 Pro chip, 48MP triple camera system, 6.9-inch Super Retina XDR display with ProMotion, and aerospace-grade titanium design.",
    specs: [
      { key: "Display", value: "6.9-inch Super Retina XDR, 120Hz ProMotion" },
      { key: "Processor", value: "A18 Pro chip" },
      { key: "Camera", value: "48MP Main + 48MP Ultra Wide + 12MP 5x Telephoto" },
      { key: "Battery", value: "Up to 33 hours video playback" },
      { key: "Build", value: "Titanium frame, Ceramic Shield front" },
    ],
    images: [
      "https://m.media-amazon.com/images/I/711VzeHZAPL._SX679_.jpg",
      "https://m.media-amazon.com/images/I/8111xWtl-PL._SX679_.jpg",
      "https://m.media-amazon.com/images/I/71kahbX9OlL._SX679_.jpg",
      "https://m.media-amazon.com/images/I/81YnXfZ-NwL._SX679_.jpg",
    ],
  },
  {
    id: 2,
    title: "Samsung Galaxy S24 Ultra 5G (Titanium Gray)",
    price: 109999,
    mrp: 129999,
    discount: 15,
    image: "https://m.media-amazon.com/images/I/71Sa3dqTqzL._SL1500_.jpg",
    tag: "Hot Deal",
    description: "Flagship power with Snapdragon 8 Gen 3, 200MP quad camera system, 6.8-inch Dynamic AMOLED 2X display, built-in S Pen, and titanium frame.",
    specs: [
      { key: "Display", value: "6.8-inch Dynamic AMOLED 2X, 120Hz" },
      { key: "Processor", value: "Snapdragon 8 Gen 3" },
      { key: "Camera", value: "200MP Main + 50MP 5x Telephoto" },
      { key: "Battery", value: "5000mAh with 45W fast charging" },
      { key: "Features", value: "S Pen included, IP68 rating" },
    ],
    images: [
      "https://m.media-amazon.com/images/I/71Sa3dqTqzL._SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71Q+ZPgDVKL._SL1500_.jpg",
      "https://m.media-amazon.com/images/I/81dmStBfSvL._SL1500_.jpg",
      "https://m.media-amazon.com/images/I/81hU-TyC-aL._SL1500_.jpg",
    ],
  },
  {
    id: 3,
    title: "Sony WH-1000XM5 Wireless Headphones",
    price: 24990,
    mrp: 34990,
    discount: 29,
    image: "https://m.media-amazon.com/images/I/61u1VALn6JL._SL1500_.jpg",
    tag: "Premium",
    description: "Industry-leading noise cancellation with new 30mm drivers, 40 hours battery life, crystal-clear calls, and premium build quality.",
    specs: [
      { key: "Battery", value: "Up to 40 hours (ANC on)" },
      { key: "Noise Cancellation", value: "HD Noise Cancelling Processor QN1" },
      { key: "Drivers", value: "30mm carbon fiber composite" },
      { key: "Features", value: "Speak-to-chat, multipoint connection" },
      { key: "Weight", value: "250g" },
    ],
    images: [
      "https://m.media-amazon.com/images/I/61u1VALn6JL._SL1500_.jpg",
      "https://m.media-amazon.com/images/I/51gaT35OeML._SL1080_.jpg",
      "https://m.media-amazon.com/images/I/61VUD9Zh9sL._SL1000_.jpg",
      "https://m.media-amazon.com/images/I/81q1SrpG1PL._SL1500_.jpg",
    ],
  },
  {
    id: 4,
    title: "MacBook Air M4 (13-inch, 16GB RAM, 512GB)",
    price: 119990,
    mrp: 129990,
    discount: 8,
    image: "https://m.media-amazon.com/images/I/711NKCLZfaL._SX679_.jpg",
    tag: "New Launch",
    description: "Supercharged performance with M3 chip, up to 18 hours battery life, 13.6-inch Liquid Retina display, and fanless design.",
    specs: [
      { key: "Chip", value: "Apple M3 (8-core CPU, 10-core GPU)" },
      { key: "Display", value: "13.6-inch Liquid Retina, 500 nits" },
      { key: "Battery", value: "Up to 18 hours" },
      { key: "Memory", value: "16GB unified" },
      { key: "Storage", value: "512GB SSD" },
    ],
    images: [
      "https://m.media-amazon.com/images/I/711NKCLZfaL._SX679_.jpg",
      "https://m.media-amazon.com/images/I/61wJeelYVaL._SX679_.jpg",
      "https://m.media-amazon.com/images/I/714a1gxpdiL._SX679_.jpg",
      "https://m.media-amazon.com/images/I/61Zrmf0OWeL._SX679_.jpg",
    ],
  },
  {
    id: 5,
    title: "boAt Airdopes 141 ANC TWS Earbuds",
    price: 1499,
    mrp: 4499,
    discount: 67,
    image: "https://m.media-amazon.com/images/I/716CRTrQzgL._SL1500_.jpg",
    tag: "Super Saver",
    description: "True wireless earbuds with 42dB ANC, 50 hours total playtime, ASAP Charge, and boAt Signature Sound for immersive audio experience.",
    specs: [
      { key: "Battery", value: "50 hours total playtime" },
      { key: "ANC", value: "Up to 42dB Active Noise Cancellation" },
      { key: "Charging", value: "ASAP Charge: 10 min = 150 min playback" },
      { key: "Drivers", value: "10mm drivers" },
      { key: "Features", value: "ENx™ tech, IPX5 water resistance" },
    ],
    images: [
      "https://m.media-amazon.com/images/I/716CRTrQzgL._SL1500_.jpg",
      "https://m.media-amazon.com/images/I/81IszvF4QJL._SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71v9DKF+bYL._SL1500_.jpg",
      "https://m.media-amazon.com/images/I/81cECOEaveL._SL1500_.jpg",
    ],
  },
  {
    id: 6,
    title: "OnePlus 13R (16GB+512GB) Nebula Noir",
    price: 42999,
    mrp: 49999,
    discount: 14,
    image: "https://m.media-amazon.com/images/I/418LdXdjiML._SY300_SX300_QL70_FMwebp_.jpg",
    tag: "Value King",
    description: "Powerful performance with Snapdragon 8 Gen 3, 120Hz AMOLED display, 100W fast charging, and clean OxygenOS experience.",
    specs: [
      { key: "Display", value: "6.78-inch AMOLED, 120Hz" },
      { key: "Processor", value: "Snapdragon 8 Gen 3" },
      { key: "Camera", value: "50MP Triple Camera" },
      { key: "Battery", value: "6000mAh with 100W SUPERVOOC" },
      { key: "OS", value: "OxygenOS 15 based on Android 15" },
    ],
    images: [
      "https://m.media-amazon.com/images/I/418LdXdjiML._SY300_SX300_QL70_FMwebp_.jpg",
      "https://m.media-amazon.com/images/I/61XtpELvh4L._SX569_.jpg",
      "https://m.media-amazon.com/images/I/71rPMsQJv2L._SX569_.jpg",
      "https://m.media-amazon.com/images/I/61caBJjbpKL._SX569_.jpg",
    ],
  },
  {
    id: 7,
    title: "JBL PartyBox 110 Portable Bluetooth Speaker",
    price: 18999,
    mrp: 28999,
    discount: 34,
    image: "https://m.media-amazon.com/images/I/417GshkqEQL._SY300_SX300_QL70_FMwebp_.jpg",
    tag: "Party Special",
    description: "Massive sound with 160W output, light show, splashproof design, and up to 12 hours playtime — perfect for parties.",
    specs: [
      { key: "Power", value: "160W output" },
      { key: "Battery", value: "Up to 12 hours" },
      { key: "Features", value: "Light show, mic/guitar inputs" },
      { key: "Connectivity", value: "Bluetooth 5.1, PartyBoost" },
      { key: "Waterproof", value: "IPX4 splashproof" },
    ],
    images: [
      "https://m.media-amazon.com/images/I/417GshkqEQL._SY300_SX300_QL70_FMwebp_.jpg",
      "https://m.media-amazon.com/images/I/71pr77gMM3L._SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71jBMiXs9vL._SL1500_.jpg",
      "https://m.media-amazon.com/images/I/9133t9NXeuL._SL1500_.jpg",
    ],
  },
  {
    id: 8,
    title: "LG 55-inch 4K Ultra HD Smart OLED TV (2025 Model)",
    price: 94999,
    mrp: 149999,
    discount: 37,
    image: "https://m.media-amazon.com/images/I/51peSjBMkvL._SX300_SY300_QL70_FMwebp_.jpg",
    tag: "Mega Deal",
    description: "Stunning OLED display with perfect blacks, Dolby Vision, webOS smart platform, and AI picture & sound optimization.",
    specs: [
      { key: "Display", value: "55-inch 4K OLED" },
      { key: "Processor", value: "α9 Gen7 AI Processor 4K" },
      { key: "HDR", value: "Dolby Vision, HDR10, HLG" },
      { key: "Smart OS", value: "webOS 25" },
      { key: "Audio", value: "Dolby Atmos, 40W speakers" },
    ],
    images: [
      "https://m.media-amazon.com/images/I/51peSjBMkvL._SX300_SY300_QL70_FMwebp_.jpg",
      "https://m.media-amazon.com/images/I/81GYLOm+NLL._SL1500_.jpg",
      "https://m.media-amazon.com/images/I/81jDOJMuWXL._SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71dJ0bw6WCL._SL1500_.jpg",
    ],
  },
  {
    id: 9,
    title: "Noise ColorFit Ultra 3 Smartwatch",
    price: 2499,
    mrp: 5999,
    discount: 58,
    image: "https://m.media-amazon.com/images/I/71Vx928Yx2L._SL1500_.jpg",
    tag: "Trending",
    description: "Advanced smartwatch with 1.96-inch AMOLED display, Bluetooth calling, 100+ sports modes, and up to 7 days battery life.",
    specs: [
      { key: "Display", value: "1.96-inch AMOLED" },
      { key: "Battery", value: "Up to 7 days" },
      { key: "Features", value: "Bluetooth calling, SpO2, heart rate" },
      { key: "Water Resistance", value: "IP68" },
      { key: "Sports Modes", value: "100+ modes" },
    ],
    images: [
      "https://m.media-amazon.com/images/I/71Vx928Yx2L._SL1500_.jpg",
      "https://m.media-amazon.com/images/I/51uH7hHuW0L.jpg",
      "https://m.media-amazon.com/images/I/61O21Cd-A7L._SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71qw55paOWL._SL1500_.jpg",
    ],
  },
  {
    id: 10,
    title: "Dyson V12 Detect Slim Cordless Vacuum Cleaner",
    price: 44990,
    mrp: 59990,
    discount: 25,
    image: "https://m.media-amazon.com/images/I/41Rvda0M1wL._SL1080_.jpg",
    tag: "Premium",
    description: "Lightweight cordless vacuum with laser dust detection, powerful suction, and whole-machine HEPA filtration.",
    specs: [
      { key: "Suction Power", value: "150 AW" },
      { key: "Battery", value: "Up to 60 minutes" },
      { key: "Features", value: "Laser dust detection, HEPA filtration" },
      { key: "Weight", value: "2.2 kg" },
      { key: "Attachments", value: "Motorbar cleaner head, crevice tool" },
    ],
    images: [
      "https://m.media-amazon.com/images/I/41Rvda0M1wL._SL1080_.jpg",
      "https://m.media-amazon.com/images/I/61T+I2oxkLL._SL1440_.jpg",
      "https://m.media-amazon.com/images/I/71iORLlV9fL._SL1440_.jpg",
      "https://m.media-amazon.com/images/I/61z8Edyh-6L._SL1080_.jpg",
    ],
  },
];

const TopDeals = () => {
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  
  // Cart context
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useCart();

  const checkScroll = () => {
    const { current } = scrollRef;
    if (current) {
      const { scrollLeft, scrollWidth, clientWidth } = current;
      setShowLeftArrow(scrollLeft > 10);
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  useEffect(() => {
    const current = scrollRef.current;
    if (current) {
      current.addEventListener('scroll', checkScroll);
      checkScroll();
      return () => current.removeEventListener('scroll', checkScroll);
    }
  }, []);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      const cardWidth = current.querySelector('div')?.offsetWidth + 24;
      const scrollAmount = cardWidth * 4;
      current.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-10 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-red-500 text-white p-2 rounded-lg">
              <Flame size={24} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Today's Top Deals
            </h2>
          </div>

          <div className="hidden sm:flex items-center gap-3 text-sm text-gray-600">
            <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full font-medium">
              Limited Stock
            </span>
            <span>Ends in 18 hours</span>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative">
          {showLeftArrow && (
            <button
              onClick={() => scroll(-1)}
              className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-lg hover:bg-gray-50 border border-gray-200 transition-all hover:scale-110 hover:shadow-xl"
              aria-label="Previous"
            >
              <ChevronLeft size={24} className="text-gray-700" />
            </button>
          )}

          {showRightArrow && (
            <button
              onClick={() => scroll(1)}
              className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-lg hover:bg-gray-50 border border-gray-200 transition-all hover:scale-110 hover:shadow-xl"
              aria-label="Next"
            >
              <ChevronRight size={24} className="text-gray-700" />
            </button>
          )}

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory scroll-smooth"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {topDeals.map((item) => (
              <div key={item.id} className="min-w-[260px] sm:min-w-[280px] block">
                <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group snap-start relative">
                  <div className="relative h-52 bg-gradient-to-b from-gray-50 to-white p-6 flex items-center justify-center overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="max-h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
                      onClick={() => window.location.href = `/product/${item.id}`}
                    />
              
                    {item.discount > 0 && (
                      <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md transform -rotate-6 z-10">
                        {item.discount}% OFF
                      </div>
                    )}
              
                    <div className="absolute top-3 right-3 bg-black/70 text-white text-xs px-2.5 py-1 rounded-full backdrop-blur-sm z-10">
                      {item.tag}
                    </div>
                                    
                    {/* Action buttons */}
                    <div className="absolute top-3 left-1/2 transform -translate-x-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (isInWishlist(item.id)) {
                            removeFromWishlist(item.id);
                          } else {
                            addToWishlist(item);
                          }
                        }}
                        className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition"
                      >
                        <Heart
                          size={18}
                          className={isInWishlist(item.id) ? "fill-red-500 text-red-500" : "text-gray-700"}
                        />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (navigator.share) {
                            navigator.share({
                              title: item.title,
                              text: `Check out ${item.title} for ₹${item.price.toLocaleString()}!`,
                              url: `${window.location.origin}/product/${item.id}`,
                            });
                          } else {
                            navigator.clipboard.writeText(`${window.location.origin}/product/${item.id}`);
                            alert('Product link copied to clipboard!');
                          }
                        }}
                        className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition"
                      >
                        <Share2
                          size={18}
                          className="text-gray-700"
                        />
                      </button>
                    </div>
                  </div>
              
                  <div className="p-5">
                    <h3 
                      className="text-base font-semibold text-gray-900 line-clamp-2 min-h-[2.8rem] group-hover:text-blue-600 transition-colors cursor-pointer"
                      onClick={() => window.location.href = `/product/${item.id}`}
                    >
                      {item.title}
                    </h3>
              
                    <div className="mt-4 flex items-end gap-3">
                      <span className="text-2xl font-bold text-gray-900">
                        ₹{item.price.toLocaleString()}
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        ₹{item.mrp.toLocaleString()}
                      </span>
                    </div>
              
                    <div className="mt-3 flex items-center gap-2 text-sm">
                      <span className="text-green-600 font-semibold">
                        Save ₹{(item.mrp - item.price).toLocaleString()}
                      </span>
                      <span className="text-gray-400">•</span>
                      <span className="text-red-500 font-medium">Limited Time</span>
                    </div>
                                    
                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={() => addToCart({...item, quantity: 1})}
                        className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg text-sm font-medium transition"
                      >
                        <ShoppingCart size={16} />
                        Add to Cart
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (isInWishlist(item.id)) {
                            removeFromWishlist(item.id);
                          } else {
                            addToWishlist(item);
                          }
                        }}
                        className="p-2.5 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
                      >
                        <Heart
                          size={18}
                          className={isInWishlist(item.id) ? "fill-red-500 text-red-500" : "text-gray-700"}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopDeals;