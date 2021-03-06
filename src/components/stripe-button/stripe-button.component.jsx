import React from 'react';

import StripeCheckout from 'react-stripe-checkout';


const StripeCheckoutButton = ({price}) => {

	const priceForStripe = price * 100;
	const publishableKey = 'pk_test_51H9UUUH30qnnS4mKkM2QjRUBanPCueT3YTGJJUiABKGOjwBZbfxtvBtbSwzpIwFfVljs980KfbXhrtab7DHeTmN7007yYSRPP9';

	const onToken = token => {
		console.log(token);
		alert('Payment Successful');
	}

	return (

		<StripeCheckout
			label= 'Pay Now'
			name='CRWN Clothing Ltd'
			billingAddress
			shippingAddress
			image='https://svgshare.com/i/CUz.svg'
			description={`Your total is $${price}`}
			amount={priceForStripe}
			panelLabel='Pay Now'
			token={onToken}
			stripeKey={publishableKey}

		/>
	);
};

export default StripeCheckoutButton;


