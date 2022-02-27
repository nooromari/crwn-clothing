import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({ price }) => {
  const pricrForStripe = price * 100;
  const publishableKey =
    "pk_test_51JzepCEaJBgGhPJAhcnprOBgaFDsNxMpgz9MgCVmxq6grPK85Tjh5BVT3FKlcBkFQI656GI0QBv4oR1360beVZo400T5wTiyfx";
  const onToken = token => {
        console.log(token);
        alert('Payment Successful');
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
