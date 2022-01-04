import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const STRIPE_PUBLISHABLE_KEY = 'pk_test_51JtxyyGwuVuhzCWOoFYLzedFDp4RDedEIEohGvtXjK49VB3boi6EhInykIAKZu6sd5X0FYKRwOEYYnF2voF56Asy00hXsZ1r1H'

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price;

    const onToken = token => {
        console.log(token);
        alert('Payment Successful')
    }
    
    return (
        <StripeCheckout
            label='Pay Now'
            name='CRWN Clothing Ltd.'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is $${priceForStripe}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={STRIPE_PUBLISHABLE_KEY}
        />
    )
}

export default StripeCheckoutButton;
