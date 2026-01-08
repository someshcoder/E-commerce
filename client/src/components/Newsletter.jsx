export function Newsletter() {
  return (
    <section className="py-20 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl mb-4">
            Join Our Newsletter
          </h2>
          <p className="text-gray-300 mb-8">
            Subscribe to get special offers, free giveaways, and exclusive deals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 bg-white/10 border border-white/20 text-white placeholder:text-gray-400 px-4 py-2 rounded"
            />
            <button className="bg-white text-black hover:bg-gray-100 px-6 py-2 rounded">
              Subscribe
            </button>
          </div>
          <p className="text-sm text-gray-400 mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
}
export default Newsletter;