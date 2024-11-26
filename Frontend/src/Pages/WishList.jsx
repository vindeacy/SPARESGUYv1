import React from 'react'
import { CiSquareMinus } from "react-icons/ci";


const WishList = ({getCurrentPageItems, handleRemoveFromWishlist, handlePageChange, currentPage, totalPages}) => {
  return (
    <div id="wishlist" className="wishlist-container">
    <section className="grid-section">
      <div className="grid-container">
        {getCurrentPageItems().map((item, index) => (
          <div key={index} className="grid-item" style={{ cursor: 'pointer' }}>
            <CiSquareMinus onClick={() => handleRemoveFromWishlist(item.productId)} style={{ color: 'red' }} />
            <Link to={`/product/${item.productId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="product-image-container">
                {item.image ? (
                  <img src={`http://localhost:8000${item.image}`} alt={item.name} className="product-image" />
                ) : (
                  <span className="image-placeholder">Image not available</span>
                )}
              </div>
            </Link>
            <p className="product-name">{item.name}</p>
            <p className="product-cost">Ksh{item.price}</p>
            <button
              className="btn btn-dark"
              onClick={() => handleAddToCart(item)}
            >
              Add to Cart
            </button>

          </div>
        ))}
      </div>
      <div className="grid-pagination">
        <div className="pagination-arrows" onClick={() => handlePageChange(currentPage - 1)}>
          {currentPage > 1 && <IoIosArrowRoundBack />}
        </div>
        {[...Array(totalPages)].map((_, pageIndex) => (
          <div
            key={pageIndex + 1}
            className={`grid-number ${currentPage === pageIndex + 1 ? "active" : ""}`}
            onClick={() => handlePageChange(pageIndex + 1)}
          >
            {pageIndex + 1}
          </div>
        ))}
        <div className="pagination-arrows" onClick={() => handlePageChange(currentPage + 1)}>
          {currentPage < totalPages && <IoIosArrowRoundForward />}
        </div>
      </div>
    </section>
  </div>
  )
}

export default WishList