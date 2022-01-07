import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { toggleCartHidden } from '../../redux/cart/cart.actions';
import { selectCartItemsCount } from '../../redux/cart/cart.selectors';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import './cart-icon.styles.scss';

const CartIcon = () => {
    const dispatch = useDispatch();
    const itemCount = useSelector(selectCartItemsCount);
    const toggleCartHiddenClickHandler = () => dispatch(toggleCartHidden());

    return (
        <div 
            className="cart-icon"
            onClick={toggleCartHiddenClickHandler}
        >
            <ShoppingIcon className="shopping-icon" />
            <span className='item-count'>{itemCount}</span>
        </div>
    )
}

export default CartIcon;
