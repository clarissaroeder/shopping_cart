import Product from "./Product";

function ProductListing({ products }) {
  return (
    <div className="prodcut-listing">
      <h2>Products</h2>
      <ul className="product-list">
        {/* {products.map((product) => {
          <Product />
        })} */}
      </ul>
    </div>
  )
}

export default ProductListing;