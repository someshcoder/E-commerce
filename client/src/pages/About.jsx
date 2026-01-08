import { Award, Users, Heart, Target, ShoppingBag, Sparkles, Globe, Check } from 'lucide-react';

export function AboutPage() {
  const stats = [
    { label: 'Happy Customers', value: '50K+' },
    { label: 'Products Sold', value: '1M+' },
    { label: 'Countries', value: '25+' },
    { label: 'Team Members', value: '100+' },
  ];

  const values = [
    {
      icon: Heart,
      title: 'Customer First',
      description: 'We put our customers at the heart of everything we do, ensuring exceptional service and quality.',
    },
    {
      icon: Sparkles,
      title: 'Quality Excellence',
      description: 'We carefully curate our products to bring you only the best, handpicked items.',
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Connecting customers worldwide with premium products and seamless delivery.',
    },
    {
      icon: Award,
      title: 'Innovation',
      description: 'Constantly evolving to provide cutting-edge shopping experiences and new discoveries.',
    },
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1649589244330-09ca58e4fa64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMHdvbWFufGVufDF8fHx8MTc2NzA3MjE3M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      name: 'Michael Chen',
      role: 'Head of Operations',
      image: 'https://images.unsplash.com/photo-1672685667592-0392f458f46f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMG1hbnxlbnwxfHx8fDE3NjcxMDExOTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      name: 'Emma Davis',
      role: 'Creative Director',
      image: 'https://images.unsplash.com/photo-1758518727888-ffa196002e59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHBlcnNvbnxlbnwxfHx8fDE3NjcwNDU3MTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
  ];

  const milestones = [
    { year: '2019', event: 'Company founded with a vision to revolutionize online shopping' },
    { year: '2020', event: 'Reached 10,000 customers and expanded to 5 countries' },
    { year: '2022', event: 'Launched mobile app and sustainability initiative' },
    { year: '2024', event: 'Serving 50,000+ customers across 25 countries' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <ShoppingBag className="w-5 h-5" />
              <span className="text-sm">Est. 2019</span>
            </div>
            <h1 className="mb-6 text-5xl md:text-6xl lg:text-7xl">
              Redefining Online Shopping
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              We're on a mission to bring you the finest products from around the world, 
              delivered with care and passion to your doorstep.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Stats Section */}
      <section className="py-16 -mt-8 relative z-20">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl text-blue-600 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl mb-6 text-gray-900">
                  Our Story
                </h2>
                <div className="space-y-4 text-gray-600 text-lg">
                  <p>
                    Founded in 2019, we started with a simple belief: online shopping should be 
                    delightful, trustworthy, and accessible to everyone. What began as a small 
                    team of passionate entrepreneurs has grown into a thriving global marketplace.
                  </p>
                  <p>
                    Today, we're proud to serve over 50,000 customers across 25 countries, 
                    offering carefully curated products that enhance everyday life. Our commitment 
                    to quality, sustainability, and exceptional customer service remains at the 
                    core of everything we do.
                  </p>
                  <p>
                    Every product we offer is handpicked with care, ensuring that when you shop 
                    with us, you're getting the very best.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1758873272869-9130397ff7d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3b3Jrc3BhY2UlMjBjcmVhdGl2ZXxlbnwxfHx8fDE3NjcwNDYxODR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Our modern workspace"
                    className="w-full h-[500px] object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/800x500?text=Image+Not+Available';
                    }}
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-blue-600 text-white p-6 rounded-xl shadow-xl max-w-xs">
                  <p className="text-sm">
                    "Quality and customer satisfaction are not just goals—they're our promise."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-blue-600">
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                  <Target className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-3xl mb-4 text-gray-900">Our Mission</h3>
                <p className="text-gray-600 text-lg">
                  To empower customers worldwide with access to premium products, exceptional 
                  service, and a seamless shopping experience that brings joy to everyday life.
                </p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-purple-600">
                <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                  <Sparkles className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-3xl mb-4 text-gray-900">Our Vision</h3>
                <p className="text-gray-600 text-lg">
                  To become the world's most trusted e-commerce platform, known for quality, 
                  innovation, and creating meaningful connections between products and people.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl mb-4 text-gray-900">
                Our Core Values
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 group"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <value.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl mb-3 text-gray-900">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl mb-4 text-gray-900">
                Our Journey
              </h2>
              <p className="text-xl text-gray-600">
                Key milestones that shaped who we are today
              </p>
            </div>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-blue-300"></div>
              
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div
                    key={index}
                    className={`relative flex items-center ${
                      index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    <div className={`w-full md:w-5/12 ${index % 2 === 0 ? '' : 'md:text-right'}`}>
                      <div className="bg-white p-6 rounded-xl shadow-lg">
                        <div className="text-2xl text-blue-600 mb-2">{milestone.year}</div>
                        <p className="text-gray-700">{milestone.event}</p>
                      </div>
                    </div>
                    <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-blue-600 rounded-full -ml-2 border-4 border-white shadow"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl mb-4 text-gray-900">
                Meet Our Team
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                The passionate people behind your shopping experience
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x400?text=Image+Not+Available';
                      }}
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                    <h3 className="text-2xl mb-1">{member.name}</h3>
                    <p className="text-blue-200">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Users className="w-16 h-16 mx-auto mb-6 opacity-90" />
            <h2 className="text-4xl md:text-5xl mb-6">
              Join Our Growing Community
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Become part of our family of 50,000+ satisfied customers who trust us 
              for their shopping needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/products" className="bg-white text-blue-600 px-8 py-4 rounded-full hover:bg-blue-50 transition-colors shadow-lg inline-block">
                Start Shopping
              </a>
              
              <a href="/contact" className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full hover:bg-white/10 transition-colors inline-block">
                Contact Us
              </a>
            </div>
            <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5" />
                <span>Free Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5" />
                <span>30-Day Returns</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5" />
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5" />
                <span>Secure Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default AboutPage;
