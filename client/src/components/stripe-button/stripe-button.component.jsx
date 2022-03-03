import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from 'axios';

const StripeCheckoutButton = ({ price }) => {
  const pricrForStripe = price * 100;
  const publishableKey =
    "pk_test_51JzepCEaJBgGhPJAhcnprOBgaFDsNxMpgz9MgCVmxq6grPK85Tjh5BVT3FKlcBkFQI656GI0QBv4oR1360beVZo400T5wTiyfx";
  const onToken = token => {
    axios({
      url: 'payment',
      method: 'POST',
      data: {
        amount: pricrForStripe,
        token
      }
    }).then(res => {
      alert('Payment Successful')
    }).catch(err => {
      alert('Payment Failed')
      console.log('Payment Error : ' + err)
    })
    }

  return (
    <StripeCheckout 
        label="Pay Now" 
        name ="CRWN Clothing ltd."
        billingAddress
        shippingAddress
        image='https://svgshare.com/i/CUz.svg'
        description={`Your total is $${price}`}
        amount={pricrForStripe}
        panelLabel="Pay now"
        token={onToken}
        stripeKey={publishableKey}
    />
  )
};

export default StripeCheckoutButton;
