import Product from "./Product";
import { Product as ProductType } from "../types";

interface ProductListingProps {
  products: ProductType[];
  onEdit: (product: ProductType) => void;
  onDelete: (productId: string) => void;
  onAddToCart: (productId: string) => void;
}

const ProductListing = ({ products, onEdit, onDelete, onAddToCart }: ProductListingProps) => {
  return (
    <div className="prodcut-listing">
      <h2>Products</h2>
      <ul className="product-list">
        {products.map(product => {
          return <Product key={product._id} {...product} onEdit={onEdit} onDelete={onDelete} onAddToCart={onAddToCart} />
        })}
      </ul>
    </div>
  )
}

export default ProductListing;