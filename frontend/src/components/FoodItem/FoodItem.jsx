import React, { useContext, memo } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'

// Memoize the component to prevent unnecessary re-renders
const FoodItem = memo(({id, name, price, description, image}) => {
    const {cartItems, addToCart, removeFromCart, url} = useContext(StoreContext);

    return (
        <div className='food-item'>
            <div className="food-item-img-container">
                <img 
                    className='food-item-image' 
                    src={url+"/images/"+image} 
                    alt={name}
                    loading="lazy" // Add lazy loading
                    decoding="async" // Add async decoding
                />
                {!cartItems[id] ? (
                    <img 
                        className='add' 
                        onClick={() => addToCart(id)} 
                        src={assets.add_icon_white} 
                        alt="Add to cart"
                        loading="lazy"
                    />
                ) : (
                    <div className='food-item-counter'>
                        <img 
                            onClick={() => removeFromCart(id)} 
                            src={assets.remove_icon_red} 
                            alt="Remove"
                            loading="lazy"
                        />
                        <p>{cartItems[id]}</p>
                        <img 
                            onClick={() => addToCart(id)} 
                            src={assets.add_icon_green} 
                            alt="Add more"
                            loading="lazy"
                        />
                    </div>
                )}
            </div>
            <div className="food-item-info">
                <div className="food-item-name-rating">
                    <p>{name}</p>
                    <img 
                        src={assets.rating_starts} 
                        alt="Rating"
                        loading="lazy"
                    />
                </div>
                <p className="food-item-desc">{description}</p>
                <p className="food-item-price">₹{price}</p>
            </div>
        </div>
    )
});

export default FoodItem
