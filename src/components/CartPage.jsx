import React from "react";
import PropTypes from "prop-types";
import "./Cartpage.css";
import Item from "./Item";

function CartPage({ items, onAddOne, onRemoveOne }) {
    return (
      <ul className="CartPage-items">
        {items.map((item) => (
          <li key={item.id} className="CartPage-item">
            <Item item={item}>
              <div className="Item-controls">
                <button
                  className="Item-removeFromCart"
                  onClick={() => onRemoveOne(item)}
                >
                  -
                </button>
                <span className="Item-quantity-box">
                  <span className="Item-quantity">{item.count}</span>
                </span>
                <button className="Item-addToCart" onClick={() => onAddOne(item)}>
                  +
                </button>
              </div>
            </Item>
          </li>
        ))}
      </ul>
    );
  }
  CartPage.propTypes = {
    items: PropTypes.array.isRequired,
    onAddOne: PropTypes.func.isRequired,
    onRemoveOne: PropTypes.func.isRequired,
  };
  export default CartPage;