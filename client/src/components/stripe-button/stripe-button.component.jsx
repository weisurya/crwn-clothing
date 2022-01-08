import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const STRIPE_PUBLISHABLE_KEY = 'pk_test_51JtxyyGwuVuhzCWOoFYLzedFDp4RDedEIEohGvtXjK49VB3boi6EhInykIAKZu6sd5X0FYKRwOEYYnF2voF56Asy00hXsZ1r1H'

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price;

    const onToken = token => {
        axios({
            url: 'payment',
            method: 'post',
            data: {
                amount: priceForStripe,
                token: token,
            }
        })
        .then(response => {
            alert("Payment successful!");
        }).catch(error => {
            console.log("Payment error: ", JSON.parser(error));
            alert("There was an issue with your payment. Please sure you use the provided credit card.")
        })
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
