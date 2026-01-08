import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Hero() {
  return (
    <section className="relative h-[600px] bg-gradient-to-r from-gray-100 to-gray-200 overflow-hidden">
      <div className="container mx-auto px-4 h-full">
        <div className="grid lg:grid-cols-2 gap-8 h-full items-center">
          {/* Text Content */}
          <div className="space-y-6 z-10">
            <div className="inline-block px-4 py-1 bg-black text-white text-sm rounded-full">
              New Collection
            </div>
            <h1 className="text-5xl lg:text-6xl">
              Discover Your Style
            </h1>
            <p className="text-xl text-gray-600 max-w-md">
              Explore our latest collection of premium fashion and accessories. 
              Elevate your wardrobe with timeless pieces.
            </p>
            <div className="flex gap-4">
              <Link to="/products" className="px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-colors flex items-center">
                Shop Now
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
              <Link to="/" className="px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                View Collection
              </Link>
            </div>
          </div>

          {/* Hero Image */}
          <div className="hidden lg:block relative h-full">
            <img 
              src="https://images.unsplash.com/photo-1557153730-57fbae1cfae4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwY2xvdGhpbmclMjBtb2RlbHxlbnwxfHx8fDE3NjY2NTc1NDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Fashion model"
              className="absolute inset-0 w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
export default Hero;