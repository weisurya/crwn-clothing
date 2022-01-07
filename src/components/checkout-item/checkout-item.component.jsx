import React from "react";
import { useDispatch } from 'react-redux';

import { 
    clearItemFromCart,
    addItem,
    removeItem,
} from '../../redux/cart/cart.actions';

import './checkout-item.styles.scss';

const CheckoutItem = ({ cartItem }) => {
    const { name, imageUrl, price, quantity } = cartItem;
    const dispatch = useDispatch();
    const clearItemClickHandler = (item) => dispatch(clearItemFromCart(item));
    const addItemClickHandler = (item) => dispatch(addItem(item));
    const removeItemClickHandler = (item) => dispatch(removeItem(item));

    return (
        <div className="checkout-item">
            <div className='image-container'>
                <img alt='item' src={imageUrl} />
            </div>
            <span className='name'>{name}</span>
            <span className='quantity'>
                <div
                    className='arrow'
                    onClick={
                        () => removeItemClickHandler(cartItem)
                    }
                >&#10094;</div>
                <span className='value'>{quantity}</span>
                <div
                    className='arrow'
                    onClick={
                        () => addItemClickHandler(cartItem)
                    }
                >&#10095;</div>
            </span>
            <span className='price'>{price}</span>
            <div className='remove-button' onClick={
                () => clearItemClickHandler(cartItem)
            }>&#10005;</div>
        </div>
    )
}

export default CheckoutItem;
