import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    // Load cart from localStorage if no user is logged in
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  const [wishlist, setWishlist] = useState(() => {
    // Load wishlist from localStorage if no user is logged in
    const savedWishlist = localStorage.getItem('wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  // Save cart to localStorage when it changes (only when not logged in)
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  // Save wishlist to localStorage when it changes (only when not logged in)
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }
  }, [wishlist]);

  // Load cart and wishlist from backend on component mount
  useEffect(() => {
    const loadCartAndWishlist = async () => {
      const token = localStorage.getItem('token');
      
      if (token) {
        try {
          // Load cart items
          const cartResponse = await fetch('http://localhost:5000/api/cart', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          if (cartResponse.ok) {
            const cartData = await cartResponse.json();
            setCartItems(cartData);
          }
          
          // Load wishlist items
          const wishlistResponse = await fetch('http://localhost:5000/api/wishlist', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          if (wishlistResponse.ok) {
            const wishlistData = await wishlistResponse.json();
            setWishlist(wishlistData);
          }
        } catch (error) {
          console.error('Error loading cart and wishlist:', error);
        }
      }
    };
    
    loadCartAndWishlist();
  }, []);

  // Add to cart
  const addToCart = async (product) => {
    const token = localStorage.getItem('token');
    
    // Check if user is logged in
    if (!token) {
      // Fallback to local state if no user is logged in
      const existing = cartItems.find((item) => {
        // Handle both structures: direct id/_id or {productId, quantity}
        const itemId = item._id || item.id || (item.productId && (item.productId._id || item.productId.id));
        const productIdToCheck = product._id || product.id;
        return itemId === productIdToCheck;
      });
      
      if (existing) {
        setCartItems(
          cartItems.map((item) => {
            const itemId = item._id || item.id || (item.productId && (item.productId._id || item.productId.id));
            const productIdToCheck = product._id || product.id;
            
            if (itemId === productIdToCheck) {
              return { ...item, quantity: (item.quantity || 1) + 1 };
            }
            return item;
          })
        );
      } else {
        setCartItems([...cartItems, { ...product, quantity: 1 }]);
      }
      return;
    }
    
    try {
      // Add to backend database
      const response = await fetch('http://localhost:5000/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          productId: product._id || product.id, // Use MongoDB _id if available, else regular id
          quantity: 1
        })
      });
      
      if (response.ok) {
        // After adding, fetch the updated cart to get the correct structure
        const cartResponse = await fetch('http://localhost:5000/api/cart', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (cartResponse.ok) {
          const updatedCartItems = await cartResponse.json();
          setCartItems(updatedCartItems);
        }
      } else {
        // Fallback to local state if backend fails
        const existing = cartItems.find((item) => {
          const itemId = item._id || item.id || (item.productId && (item.productId._id || item.productId.id));
          const productIdToCheck = product._id || product.id;
          return itemId === productIdToCheck;
        });
        
        if (existing) {
          setCartItems(
            cartItems.map((item) => {
              const itemId = item._id || item.id || (item.productId && (item.productId._id || item.productId.id));
                const productIdToCheck = product._id || product.id;
              
              if (itemId === productIdToCheck) {
                return { ...item, quantity: (item.quantity || 1) + 1 };
              }
              return item;
            })
          );
        } else {
          setCartItems([...cartItems, { ...product, quantity: 1 }]);
        }
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      // Fallback to local state if backend fails
      const existing = cartItems.find((item) => {
        const itemId = item._id || item.id || (item.productId && (item.productId._id || item.productId.id));
        const productIdToCheck = product._id || product.id;
        return itemId === productIdToCheck;
      });
      
      if (existing) {
        setCartItems(
          cartItems.map((item) => {
            const itemId = item._id || item.id || (item.productId && (item.productId._id || item.productId.id));
            const productIdToCheck = product._id || product.id;
            
            if (itemId === productIdToCheck) {
              return { ...item, quantity: (item.quantity || 1) + 1 };
            }
            return item;
          })
        );
      } else {
        setCartItems([...cartItems, { ...product, quantity: 1 }]);
      }
    }
  };

  // Remove item
  const removeFromCart = async (id) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      // Fallback to local state if no user is logged in
      setCartItems(cartItems.filter((item) => {
        const itemId = item._id || item.id || (item.productId && (item.productId._id || item.productId.id));
        return itemId === id;
      }));
      return;
    }
    
    try {
      // Remove from backend database
      const response = await fetch(`http://localhost:5000/api/cart/remove/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        // Update local state
        setCartItems(cartItems.filter(item => {
          const itemId = item._id || item.id || (item.productId && (item.productId._id || item.productId.id));
          return itemId !== id;
        }));
      } else {
        // Fallback to local state if backend fails
        setCartItems(cartItems.filter((item) => {
          const itemId = item._id || item.id || (item.productId && (item.productId._id || item.productId.id));
          return itemId !== id;
        }));
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
      // Fallback to local state if backend fails
      setCartItems(cartItems.filter((item) => {
        const itemId = item._id || item.id || (item.productId && (item.productId._id || item.productId.id));
        return itemId === id;
      }));
    }
  };

  // Increase quantity
  const increaseQty = async (id) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      // Fallback to local state if no user is logged in
      setCartItems(
        cartItems.map((item) => {
          const itemId = item._id || item.id || (item.productId && (item.productId._id || item.productId.id));
          
          if (itemId === id) {
            return { ...item, quantity: (item.quantity || 1) + 1 };
          }
          return item;
        })
      );
      return;
    }
    
    try {
      // Update quantity in backend database
      const response = await fetch(`http://localhost:5000/api/cart/${id}/quantity`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ change: 1 }) // Increase by 1
      });
      
      if (response.ok) {
        // After updating quantity, fetch the updated cart to get the correct structure
        const cartResponse = await fetch('http://localhost:5000/api/cart', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (cartResponse.ok) {
          const updatedCartItems = await cartResponse.json();
          setCartItems(updatedCartItems);
        }
      } else {
        // Fallback to local state if backend fails
        setCartItems(
          cartItems.map((item) => {
            const itemId = item._id || item.id || (item.productId && (item.productId._id || item.productId.id));
            
            if (itemId === id) {
              return { ...item, quantity: (item.quantity || 1) + 1 };
            }
            return item;
          })
        );
      }
    } catch (error) {
      console.error('Error increasing quantity:', error);
      // Fallback to local state if backend fails
      setCartItems(
        cartItems.map((item) => {
          const itemId = item._id || item.id || (item.productId && (item.productId._id || item.productId.id));
          
          if (itemId === id) {
            return { ...item, quantity: (item.quantity || 1) + 1 };
          }
          return item;
        })
      );
    }
  };

  // Decrease quantity
  const decreaseQty = async (id) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      // Fallback to local state if no user is logged in
      setCartItems(
        cartItems.map((item) => {
          const itemId = item._id || item.id || (item.productId && (item.productId._id || item.productId.id));
          
          if (itemId === id && (item.quantity || 1) > 1) {
            return { ...item, quantity: (item.quantity || 1) - 1 };
          }
          return item;
        })
      );
      return;
    }
    
    try {
      // Update quantity in backend database
      const response = await fetch(`http://localhost:5000/api/cart/${id}/quantity`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ change: -1 }) // Decrease by 1
      });
      
      if (response.ok) {
        // After updating quantity, fetch the updated cart to get the correct structure
        const cartResponse = await fetch('http://localhost:5000/api/cart', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (cartResponse.ok) {
          const updatedCartItems = await cartResponse.json();
          setCartItems(updatedCartItems);
        }
      } else {
        // Fallback to local state if backend fails
        setCartItems(
          cartItems.map((item) => {
            const itemId = item._id || item.id || (item.productId && (item.productId._id || item.productId.id));
            
            if (itemId === id && (item.quantity || 1) > 1) {
              return { ...item, quantity: (item.quantity || 1) - 1 };
            }
            return item;
          })
        );
      }
    } catch (error) {
      console.error('Error decreasing quantity:', error);
      // Fallback to local state if backend fails
      setCartItems(
        cartItems.map((item) => {
          const itemId = item._id || item.id || (item.productId && (item.productId._id || item.productId.id));
          
          if (itemId === id && (item.quantity || 1) > 1) {
            return { ...item, quantity: (item.quantity || 1) - 1 };
          }
          return item;
        })
      );
    }
  };

  // Clear entire cart
  const clearCart = async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      // Fallback to local state if no user is logged in
      setCartItems([]);
      return;
    }
    
    try {
      // Clear backend cart
      const response = await fetch('http://localhost:5000/api/cart/clear', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        // Update local state
        setCartItems([]);
      } else {
        // Fallback to local state if backend fails
        setCartItems([]);
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
      // Fallback to local state if backend fails
      setCartItems([]);
    }
  };

  // Wishlist functions
  const addToWishlist = async (product) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      // Fallback to local state if no user is logged in
      if (!wishlist.find(item => item._id === product._id || item.id === product.id)) {
        setWishlist([...wishlist, product]);
      }
      return;
    }
    
    try {
      // Add to backend wishlist
      const response = await fetch('http://localhost:5000/api/wishlist/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          productId: product._id || product.id
        })
      });
      
      if (response.ok) {
        const updatedWishlist = await response.json();
        // Update local state with the full wishlist from backend
        setWishlist(updatedWishlist);
      } else {
        // Fallback to local state if backend fails
        if (!wishlist.find(item => item._id === product._id || item.id === product.id)) {
          setWishlist([...wishlist, product]);
        }
      }
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      // Fallback to local state if backend fails
      if (!wishlist.find(item => item._id === product._id || item.id === product.id)) {
        setWishlist([...wishlist, product]);
      }
    }
  };

  const removeFromWishlist = async (id) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      // Fallback to local state if no user is logged in
      setWishlist(wishlist.filter(item => item._id !== id && item.id !== id));
      return;
    }
    
    try {
      // Remove from backend wishlist
      const response = await fetch(`http://localhost:5000/api/wishlist/remove/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        // Update local state
        setWishlist(wishlist.filter(item => item._id !== id && item.id !== id));
      } else {
        // Fallback to local state if backend fails
        setWishlist(wishlist.filter(item => item._id !== id && item.id !== id));
      }
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      // Fallback to local state if backend fails
      setWishlist(wishlist.filter(item => item._id !== id && item.id !== id));
    }
  };

  const toggleWishlist = (product) => {
    if (wishlist.find(item => item._id === product._id || item.id === product.id)) {
      removeFromWishlist(product._id || product.id);
    } else {
      addToWishlist(product);
    }
  };

  const isInWishlist = (id) => {
    return wishlist.some(item => item._id === id || item.id === id);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = item.price || 0;
      const quantity = item.quantity || 1;
      return total + (price * quantity);
    }, 0);
  };

  const clearWishlist = async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      // Fallback to local state if no user is logged in
      setWishlist([]);
      return;
    }
    
    try {
      // Clear backend wishlist
      const response = await fetch('http://localhost:5000/api/wishlist/clear', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        // Update local state
        setWishlist([]);
      } else {
        // Fallback to local state if backend fails
        setWishlist([]);
      }
    } catch (error) {
      console.error('Error clearing wishlist:', error);
      // Fallback to local state if backend fails
      setWishlist([]);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        wishlist,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
        clearWishlist,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
