import React from "react";

const FilterModal = ({
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
  closeModal,
  maxProductPrice,
}) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Filter by Price</h2>
        <label>
          Min Price: ${minPrice}
          <input
            type="range"
            min="0"
            max={maxProductPrice}
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
          />
        </label>
        <label>
          Max Price: ${maxPrice}
          <input
            type="range"
            min="0"
            max={maxProductPrice}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </label>
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
};

export default FilterModal;
