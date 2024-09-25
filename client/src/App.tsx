import React from "react";

import ShoppingCart from "./components/ShoppingCart";
import ProductListing from "./components/ProductListing";
// import { mockProducts as data } from "./mockData/data";

import { getProducts } from "./services/products";


function App() {
  const [products, setProducts] = React.useState([]);

  // define handlers that fetch stuff here so you dont have to pass setstate as props to child components

  React.useEffect(() => {
    const data = getProducts();
    setProducts(data);
  }, []);

  return (
    <div id='app'>
      <ShoppingCart />
      <main>
        <ProductListing products={products}/>
      </main>
    </div>
  )
}

export default App
