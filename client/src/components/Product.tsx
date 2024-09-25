

function Product() {
  return (
    <li className="product">
      <div className="product-details">
        <h3>insert product name</h3>
        <p className="price">insert price</p>
        <p className="quantity">insert quantity</p>
      </div>
      <div className="actions product-actions">
        <button className="add-to-cart">Add to Cart</button>
        <button className="edit">Edit</button>
      </div>
      <button className="delete-button">
        <span>X</span>
      </button>
    </li>
  )
}

export default Product