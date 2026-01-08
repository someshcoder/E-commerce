import { Package, TrendingUp, ShoppingBag, Heart } from 'lucide-react';

export function Features() {
  const features = [
    {
      icon: Package,
      title: 'Free Shipping',
      description: 'On all orders above ₹499'
    },
    {
      icon: TrendingUp,
      title: 'Quality Products',
      description: 'Premium selection'
    },
    {
      icon: ShoppingBag,
      title: 'Easy Returns',
      description: '30-day return policy'
    },
    {
      icon: Heart,
      title: 'Customer Support',
      description: '24/7 assistance'
    }
  ];

  return (
    <section className="py-16 border-y bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Reasons to Shop with us</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-black text-white rounded-full mb-4">
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
export default Features;