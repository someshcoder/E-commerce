const categories = [
  {
    name: "Mobiles & Tablets",
    img: "https://th.bing.com/th/id/OIP.4UF7iAQmFwyHtuk2Gzk08AHaE8?w=242&h=180&c=7&r=0&o=7&pid=1.7&rm=3s",
  },
  {
    name: "Fashion",
    img: "https://rukminim2.flixcart.com/fk-p-flap/64/64/image/0d75b34f7d8fbcb3.png",
    dropdown: true,
  },
  {
    name: "Electronics",
    img: "https://th.bing.com/th/id/OIP.D7OFEeq18Auw_w6Ib3BJ1QHaEL?w=286&h=180&c=7&r=0&o=7&pid=1.7&rm=3",
    dropdown: true,
  },
  {
    name: "TVs & Appliances",
    img: "https://images.pexels.com/photos/28884413/pexels-photo-28884413.jpeg",
  },
  {
    name: "Home & Furniture",
    img: "https://th.bing.com/th/id/OIP.oTkS1LmWVxWHu_qw3OI3JQHaFH?w=263&h=182&c=7&r=0&o=7&pid=1.7&rm=3",
    dropdown: true,
  },
 
  {
    name: "Beauty Products",
    img: "https://images.pexels.com/photos/4620873/pexels-photo-4620873.jpeg",
    dropdown: true,
  },
  {
    name: "Grocery",
    img: "https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg",
  },
];

const Navbar = () => {
  return (
    <div className="bg-white border-b shadow-sm hidden md:block">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          {categories.map((cat, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center cursor-pointer group"
            >
              <img
                src={cat.img}
                alt={cat.name}
                className="w-14 h-14 object-contain"
              />

              <div className="flex items-center gap-1 mt-2">
                <span className="text-sm font-medium text-gray-800 group-hover:text-blue-600">
                  {cat.name}
                </span>

                {cat.dropdown && (
                  <span className="text-xs group-hover:text-blue-600"></span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
