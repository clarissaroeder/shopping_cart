import { useState, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ZodError } from "zod";

import AddProductForm from "./components/AddProductForm";
import ShoppingCart from "./components/ShoppingCart";
import ProductListing from "./components/ProductListing";
import Error from "./components/Error";
import { Product, NewProduct, CartItem } from "./types";
import { 
  getProducts, 
  addProduct, 
  editProduct,
  deleteProduct,
  getCartItems,
  checkout, 
  addCartItem,
} from "./services/products";

const App = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        if (error instanceof ZodError) {
          console.log("zod error");
        }

        setError(true);
        console.error(error);
      }
    }

    const fetchCartItems = async () => {
      try {
        const data = await getCartItems();
        setCartItems(data);
      } catch (error) {
        if (error instanceof ZodError) {
          console.log("zod error");
        }

        setError(true);
        console.error(error);
      }
    }

    try {
      fetchProducts();
      fetchCartItems();
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleAddProduct = async (newProduct: NewProduct, callback?: () => void) => {
    try {
      const data = await addProduct(newProduct);
      setProducts(prevProducts => prevProducts.concat(data));
  
      if (callback) {
        callback();
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleEdit = async (product: Product) => {
    try {
      const updatedProduct = await editProduct(product._id, {title: product.title, price: product.price, quantity: product.quantity});

      setProducts(previous => {
        return previous.map(previousProduct => {
          if (previousProduct._id === product._id) {
            return updatedProduct;
          } else {
            return previousProduct;
          }
        });
      });
    } catch (error) {
      console.error(error);
    }
  }

  const handleDelete = async (productId: string) => {
    try {
      await deleteProduct(productId);
      
      setProducts(previous => {
        return previous.filter(product => product._id !== productId);
      })
    } catch (error) {
      console.error(error);
    }
  }

  const handleCheckout = async () => {
    try {
      await checkout();
      
      setCartItems([]);
    } catch (error) {
      console.error(error);
    }
  }

  const handleAddToCart = async (productId: string) => {
    const product = products.find(product => product._id === productId);
    const existingCartItem = cartItems.find(cartItem => cartItem.productId === productId);

    // return if product is not found or is sold out
    if (!product || product.quantity === 0) return;

    try {
      const { product: updatedProduct, item } = await addCartItem(productId);

      setProducts(previous => {
        return previous.map(product => {
          if (product._id === updatedProduct._id) {
            return updatedProduct;
          } else {
            return product;
          }
        })
      });

      setCartItems(previous => {
        if (existingCartItem) {
          return previous.map(cartItem => {
            if (cartItem.productId == productId) {
              return item;
            } else {
              return cartItem;
            }
          })
        } else {
          return previous.concat(item)
        }
      });
    } catch (error) {
      console.error (error);
    }
  }

  if (error) {
    return <Error />;
  }

  return (
    <ErrorBoundary fallback={<Error />}>
      <div id='app'>
        <ShoppingCart cartItems={cartItems} onCheckout={handleCheckout}/>
        <main>
          <ProductListing products={products} onEdit={handleEdit} onDelete={handleDelete} onAddToCart={handleAddToCart} />
          <AddProductForm onAddProduct={handleAddProduct}/>
        </main>
      </div>
    </ErrorBoundary>
  )
}

export default App
