import React from 'react';
import CartItem from '../cart-item/cart-item.component';
import { connect } from 'react-redux'
import CustomButton from '../custom-button/custom-button.component';
import { selectCartItems } from '../../redux/cart/cart.selectors'
import { withRouter } from 'react-router-dom';
import { toggleCartHidden } from '../../redux/cart/cart.actions'

import './cart-dropdown.styles.scss';

import { createStructuredSelector } from 'reselect'

const CartDropdown = ({ cartItems, history, dispatch }) => (
  <div className='cart-dropdown'>
    <div className='cart-items'>
      {cartItems.length ?
        cartItems.map(cartItem => <CartItem id={cartItem.id} item={cartItem}></CartItem>) :
        (<span className="empty-message">Your cart is empty</span>)
      }
    </div>
    <CustomButton onClick={() => {
      history.push('/checkout')
      dispatch(toggleCartHidden())
    }}>
      GO TO CHECKOUT
    </CustomButton>
  </div>
);

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems
})

export default withRouter(connect(mapStateToProps)(CartDropdown));
