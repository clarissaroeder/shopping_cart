import { useState, FormEvent } from "react";
import { Product as ProductType } from "../types";

interface EditProductFormProps {
  product: ProductType;
  onToggleEdit: () => void;
  onEdit: (product: ProductType) => void;
}

const EditProductForm = ({ product, onToggleEdit, onEdit }: EditProductFormProps) => {
  const [title, setTitle] = useState(product.title);
  const [price, setPrice] = useState(String(product.price));
  const [quantity, setQuantity] = useState(String(product.quantity));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const updatedProduct = { _id: product._id, title, price: Number(price), quantity: Number(quantity) }
    onEdit(updatedProduct);
    onToggleEdit();
  }

  return (
    <div className="edit-form">
      <h3>Edit Product</h3>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="product-name">Product Name</label>
          <input type="text" id="product-name" value={title} onChange={(e) => setTitle(e.target.value)}></input>
        </div>
        <div className="input-group">
          <label htmlFor="product-price">Price</label>
          <input type="number" id="product-price" value={price} min="0" step="0.01" onChange={(e) => setPrice(e.target.value)}></input>
        </div>
        <div className="input-group">
          <label htmlFor="product-quantity">Quantity</label>
          <input type="number" id="product-quantity" value={quantity} min="0" onChange={(e) => setQuantity(e.target.value)}></input>
        </div>
        <div className="actions form-actions">
          <button type="submit">Update</button>
          <button type="button" onClick={onToggleEdit}>Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default EditProductForm;