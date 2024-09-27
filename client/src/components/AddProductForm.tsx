import { useState, FormEvent } from "react";
import { NewProduct } from "../types";

interface AddProductFormProps {
  onAddProduct: (newProduct: NewProduct, reset: () => void) => void
}

const AddProductForm = ({ onAddProduct }: AddProductFormProps) => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  const reset = () => {
    setTitle('');
    setPrice('');
    setQuantity('');
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newProduct = { title, price: Number(price), quantity: Number(quantity) };
    onAddProduct(newProduct, reset);
  }

  return (
    <div className="add-form">
        <form action="" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="product-name">Product Name:</label>
            <input type="text" id="product-name" name="product-name" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div className="input-group">
            <label htmlFor="product-price">Price:</label>
            <input type="number" id="product-price" name="product-price" min="0" step="0.01" required value={price} onChange={(e) => setPrice(e.target.value)}/>
          </div>
          <div className="input-group">
            <label htmlFor="product-quantity">Quantity:</label>
            <input type="number" id="product-quantity" name="product-quantity" min="0" required value={quantity} onChange={(e) => setQuantity(e.target.value)}/>
          </div>
          <div className="actions form-actions">
            <button type="submit">Add</button>
            <button type="button">Cancel</button>
          </div>
        </form>
    </div>
  )
}

export default AddProductForm;