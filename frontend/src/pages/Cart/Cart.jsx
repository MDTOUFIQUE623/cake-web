import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, addToCart , url} = useContext(StoreContext);

  const navigate = useNavigate();

  const handleQuantityChange = (itemId, action) => {
    if (action === 'add') {
      addToCart(itemId);
    } else if (action === 'remove' && cartItems[itemId] > 0) {
      removeFromCart(itemId);
    }
  };

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.some(item => cartItems[item._id] > 0) ? (
          food_list.map((item, index) => {
            if (cartItems[item._id] > 0) {
              return (
                <div key={item._id}>
                  <div className='cart-items-title cart-items-item'>
                    <img src={url+"/images/"+item.image} alt="" />
                    <p>{item.name}</p>
                    <p>₹{item.price}</p>
                    <div className="cart-quantity-controls">
                      <button onClick={() => handleQuantityChange(item._id, 'remove')}>-</button>
                      <p>{cartItems[item._id]}</p>
                      <button onClick={() => handleQuantityChange(item._id, 'add')}>+</button>
                    </div>
                    <p>₹{item.price * cartItems[item._id]}</p>
                    <p onClick={() => removeFromCart(item._id)} className='cross'>x</p>
                  </div>
                  <hr />
                </div>
              )
            }
            return null;
          })
        ) : (
          <div className="cart-empty">
            <h2>Your cart is empty</h2>
            <p>Add some delicious items to your cart!</p>
          </div>
        )}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹{getTotalCartAmount()===0?0:20}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>₹{getTotalCartAmount()===0?0:getTotalCartAmount()+20}</b>
            </div>
          </div>
            <button onClick={()=>navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, Enter it here</p>
            <div className='cart-promocode-input'>
                <input type="text" placeholder='promo code' />
                <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
