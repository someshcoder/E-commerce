import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';

const TopDeals = () => {
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [topDeals, setTopDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  


  // Fetch top deals from database
  useEffect(() => {
    const fetchTopDeals = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/topdeals');
        const deals = await response.json();
        
        setTopDeals(deals);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching top deals:', error);
        setLoading(false);
      }
    };

    fetchTopDeals();
  }, []);

  const checkScroll = () => {
    const { current } = scrollRef;
    if (current) {
      const { scrollLeft, scrollWidth, clientWidth } = current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  useEffect(() => {
    const current = scrollRef.current;
    if (current) {
      current.addEventListener('scroll', checkScroll);
      // Add a small delay to ensure elements are rendered before checking scroll
      setTimeout(() => {
        checkScroll();
      }, 100);
      return () => current.removeEventListener('scroll', checkScroll);
    }
  }, []);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      const cardWidth = current.querySelector('div')?.offsetWidth + 24;
      const scrollAmount = cardWidth * 4;
      current.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
      
      // Update arrow visibility after scroll animation completes
      setTimeout(() => {
        checkScroll();
      }, 100);
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

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          /* Carousel */
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
                <div key={item._id || item.id} className="min-w-[260px] sm:min-w-[280px] block">
                  <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group snap-start relative">
                    <div className="relative h-52 bg-gradient-to-b from-gray-50 to-white p-6 flex items-center justify-center overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="max-h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
                        onClick={() => window.location.href = `/topdeal/${item.id}`}
                      />
                
                      {item.discount && item.discount > 0 && (
                        <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md transform -rotate-6 z-10">
                          {item.discount}% OFF
                        </div>
                      )}
                
                      {item.tag && (
                        <div className="absolute top-3 right-3 bg-black/70 text-white text-xs px-2.5 py-1 rounded-full backdrop-blur-sm z-10">
                          {item.tag}
                        </div>
                      )}
                                      

                    </div>
                
                    <div className="p-5">
                      <h3 
                        className="text-base font-semibold text-gray-900 line-clamp-2 min-h-[2.8rem] group-hover:text-blue-600 transition-colors cursor-pointer"
                        onClick={() => window.location.href = `/topdeal/${item.id}`}
                      >
                        {item.title}
                      </h3>
                
                      <div className="mt-4 flex items-end gap-3">
                        <span className="text-2xl font-bold text-gray-900">
                          ₹{item.price.toLocaleString()}
                        </span>
                        {item.mrp && (
                          <span className="text-sm text-gray-500 line-through">
                            ₹{item.mrp.toLocaleString()}
                          </span>
                        )}
                      </div>
                
                      {item.mrp && (
                        <div className="mt-3 flex items-center gap-2 text-sm">
                          <span className="text-green-600 font-semibold">
                            Save ₹{(item.mrp - item.price).toLocaleString()}
                          </span>
                          <span className="text-gray-400">•</span>
                          <span className="text-red-500 font-medium">Limited Time</span>
                        </div>
                      )}
                                      

                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TopDeals;