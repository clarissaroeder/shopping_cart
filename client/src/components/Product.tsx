import { useState } from "react";
import EditProductForm from "./EditProductForm";
import { Product as ProductType } from "../types";

interface ProductProps extends ProductType {
  onEdit: (product: ProductType) => void;
  onDelete: (productId: string) => void;
  onAddToCart: (productId: string) => void;
}


const Product = ({ _id, title, price, quantity, onEdit, onDelete, onAddToCart }: ProductProps) => {
  const [showEditForm, setShowEditForm] = useState(false);

  const handleToggleEdit = () => {
    setShowEditForm(!showEditForm);
  }

  // TODO: extract product details into separate component?
  return (
    <li className="product">
      <div className="product-details">
        <h3>{title}</h3>
        <p className="price">${price}</p>
        <p className="quantity">{quantity} left in stock</p>
        <div className="actions product-actions">
          <button className="add-to-cart" disabled={quantity === 0} onClick={() => onAddToCart(_id)}>Add to Cart</button>
          <button className="edit" onClick={handleToggleEdit}>Edit</button>
        </div>
        <button className="delete-button" onClick={() => onDelete(_id)}>
          <span>X</span>
        </button>
      </div>
      {showEditForm && <EditProductForm product={{_id, title, price, quantity }} onToggleEdit={handleToggleEdit} onEdit={onEdit}/>}
    </li>
  )
}

export default Product

// () => onEdit({ _id, title, price, quantity })