import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded shadow p-4">
      <img
        src={product.image}
        className="h-40 w-full object-contain mb-3"
      />

      <h3 className="text-sm font-medium line-clamp-2">
        {product.title}
      </h3>

      <p className="font-bold text-green-600 mt-2">
        ₹{product.price}
      </p>

      <button
        onClick={() => addToCart(product)}
        className="mt-3 w-full bg-blue-600 text-white py-2 rounded"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
