import { useEffect } from 'react';

export function Categories() {
  const categories = [
    {
      name: 'Electronics',
      image: 'https://images.unsplash.com/photo-1764557159396-419b85356035?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBoZWFkcGhvbmVzJTIwZWxlY3Ryb25pY3N8ZW58MXx8fHwxNzY2NzYxMzQxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      count: '250+ products'
    },
    {
      name: 'Fashion',
      image: 'https://images.unsplash.com/photo-1557153730-57fbae1cfae4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwY2xvdGhpbmclMjBtb2RlbHxlbnwxfHx8fDE3NjY2NTc1NDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      count: '500+ products'
    },
    {
      name: 'Accessories',
      image: 'https://images.unsplash.com/photo-1762513461072-5008c7f6511d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRjaCUyMGFjY2Vzc29yaWVzJTIwbHV4dXJ5fGVufDF8fHx8MTc2Njc2MTM0Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      count: '180+ products'
    },
    {
      name: 'Footwear',
      image: 'https://images.unsplash.com/photo-1622760807301-4d2351a5a942?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbmVha2VycyUyMHNob2VzJTIwcHJvZHVjdHxlbnwxfHx8fDE3NjY3NDc3OTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      count: '300+ products'
    }
  ];

  useEffect(() => {
    // Check if URL has #categories hash and scroll to this section
    if (window.location.hash === '#categories') {
      const element = document.getElementById('categories');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  return (
    <section id="categories" ref={(el) => {
      // Auto-scroll to this element if hash matches
      if (window.location.hash === '#categories' && el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }} className="py-16 container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl mb-4">Shop by Category</h2>
        <p className="text-gray-600">Browse our carefully curated collections</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <div 
            key={index}
            className="group relative overflow-hidden rounded-lg cursor-pointer bg-gray-100 aspect-square"
          >
            <img 
              src={category.image}
              alt={category.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors">
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-xl mb-1">{category.name}</h3>
                <p className="text-sm text-white/80">{category.count}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
export default Categories;